import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Trash2 } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import ActionLink from "@/components/site/ActionLink";
import {
  formatProjectDate,
  readProjects,
  removeProject,
} from "@/lib/projectStore";


function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    let active = true;
    readProjects().then((records) => { if (active) setProjects(records); })
      .catch(() => { if (active) setProjects([]); })
      .finally(() => { if (active) setLoaded(true); });
    return () => { active = false; };
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeProject(id);
      setProjects((current) => current.filter((project) => project._id !== id && project.id !== id));
    } finally { setConfirmId(null); }
  };

  return (
    <>
      <PageHero
        eyebrow="Internal · Prototype"
        title={
          <>
            Project desk.
          </>
        }
        lead="A private register for mandates being opened. This prototype workflow is separate from the public advisory site."
        meta={[{ label: "Records", value: loaded ? String(projects.length) : "—" }]}
      />

      <section className="bg-background py-14 lg:py-16">
        <div className="container-x">
          <Reveal className="flex flex-wrap items-center justify-between gap-5 border-b border-obsidian/12 pb-6">
            <div>
              <p className="eyebrow text-copper">Intake register</p>
              <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-foreground/50">
                Records are stored in the application database and are available to authorised users.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="font-body text-[10px] uppercase tracking-[0.22em] text-foreground/45 transition-colors hover:text-copper"
              >
                Public site
              </Link>
              <ActionLink to="/projects/new" variant="copper" icon={false} className="h-11 px-5 text-[9px]">
                New project
              </ActionLink>
            </div>
          </Reveal>

          {!loaded ? (
            <div className="py-16 text-center">
              <p className="font-body text-[10px] uppercase tracking-[0.24em] text-foreground/40">
                Reading the register
              </p>
            </div>
          ) : projects.length === 0 ? (
            <Reveal className="border-b border-obsidian/12 py-16">
              <p className="font-display text-[1.6rem] leading-tight text-obsidian">
                No projects logged yet.
              </p>
              <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-foreground/60">
                Open the first record to see how the intake workflow behaves. Fields are limited to
                what this prototype can support.
              </p>
              <div className="mt-7">
                <ActionLink to="/projects/new" variant="outline-dark">
                  Create a project
                </ActionLink>
              </div>
            </Reveal>
          ) : (
            <ul className="border-b border-obsidian/12">
              {projects.map((project) => (
                <li
                  key={project._id || project.id}
                  className="grid gap-4 border-t border-obsidian/10 py-6 sm:grid-cols-[1.5fr_1fr_auto] sm:items-center"
                >
                  <div>
                    <h2 className="font-display text-[1.3rem] leading-tight text-obsidian">
                      {project.projectName}
                    </h2>
                    <p className="mt-1 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                      {project.clientName}
                      {project.contact ? ` · ${project.contact}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 font-body text-[11.5px] text-foreground/60">
                    <span>{project.service}</span>
                    <span className="h-px w-3 bg-obsidian/25" />
                    <span>{project.location}</span>
                  </div>

                  <div className="flex items-center gap-4 sm:justify-end">
                    <span className="font-body text-[10px] uppercase tracking-[0.18em] text-foreground/40">
                      {formatProjectDate(project.created_at)}
                    </span>
                    {confirmId === (project._id || project.id) ? (
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleRemove(project._id || project.id)}
                          className="font-body text-[9.5px] uppercase tracking-[0.2em] text-destructive hover:underline"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmId(null)}
                          className="font-body text-[9.5px] uppercase tracking-[0.2em] text-foreground/45 hover:text-obsidian"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmId(project._id || project.id)}
                        aria-label={`Remove ${project.projectName}`}
                        className="inline-flex h-9 w-9 items-center justify-center border border-obsidian/15 text-foreground/40 transition-colors hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-8 flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-foreground/35">
            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} />
            Internal prototype — not linked from the public navigation
          </p>
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
