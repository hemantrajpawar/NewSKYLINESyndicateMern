import Project from "../models/Project.js";
export async function listProjects(req, res) {
  const projects = await Project.find({ createdBy: req.user._id }).sort({ createdAt: -1 }).lean();
  res.json({ projects: projects.map((p) => ({ ...p, id: p._id, created_at: p.createdAt })) });
}
export async function createProject(req, res) {
  const fields = ["projectName", "clientName", "location", "service", "notes"];
  for (const field of fields) if (!String(req.body[field] || "").trim()) return res.status(400).json({ message: `${field} is required` });
  const project = await Project.create({ ...Object.fromEntries([...fields, "contact"].map((key) => [key, String(req.body[key] || "").trim()])), createdBy: req.user._id });
  res.status(201).json({ project: { ...project.toObject(), id: project._id, created_at: project.createdAt } });
}
export async function deleteProject(req, res) {
  const result = await Project.deleteOne({ _id: req.params.id, createdBy: req.user._id });
  if (!result.deletedCount) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
}
