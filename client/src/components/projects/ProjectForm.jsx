import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { services } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { createProject } from "@/lib/projectStore";
import { cn } from "@/lib/utils";

const initialValues = {
  projectName: "",
  clientName: "",
  location: "",
  service: "",
  contact: "",
  notes: "",
};

const fieldClass =
  "w-full border-0 border-b border-obsidian/20 bg-transparent px-0 py-3 text-[15px] text-obsidian placeholder:text-foreground/30 transition-colors focus:border-copper focus:outline-none focus:ring-0";

function validate(values) {
  const errors = {};
  if (values.projectName.trim().length < 3) errors.projectName = "Give the project a working name.";
  if (values.clientName.trim().length < 2) errors.clientName = "Record who the mandate is for.";
  if (values.location.trim().length < 2) errors.location = "Add the location or micro-market.";
  if (!values.service) errors.service = "Select the advisory discipline.";
  if (values.notes.trim().length < 20)
    errors.notes = "Add a short brief (at least a sentence) so the record is useful.";
  return errors;
}

function ErrorText({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[11.5px] text-destructive">
      <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={2} />
      {message}
    </p>
  );
}

export default function ProjectForm() {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [failure, setFailure] = useState(false);
  const refs = {
    projectName: useRef(null),
    clientName: useRef(null),
    location: useRef(null),
    service: useRef(null),
    notes: useRef(null),
  };

  const update = (field) => (event) => {
    const { value } = event.target;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      refs[firstInvalid]?.current?.focus();
      return;
    }

    setSaving(true);
    setFailure(false);
    try {
      await createProject(values);
      toast.success("Project saved successfully");
      navigate("/projects");
    } catch (error) {
      setFailure(true);
      setSaving(false);
    }
  };

  const summaryRows = [
    { label: "Project", value: values.projectName },
    { label: "Client", value: values.clientName },
    { label: "Location", value: values.location },
    { label: "Discipline", value: values.service },
    { label: "Contact", value: values.contact },
  ];

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="lg:col-span-7">
        <fieldset className="border-0 p-0">
          <legend className="mb-6 flex w-full items-center gap-3">
            <span className="font-display text-sm text-copper">01</span>
            <span className="eyebrow text-copper">Identity</span>
            <span className="h-px flex-1 bg-obsidian/12" />
          </legend>

          <div className="grid gap-7 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="projectName" className="meta-label block text-obsidian/60">
                Project name <span className="text-copper">*</span>
              </label>
              <input
                id="projectName"
                ref={refs.projectName}
                value={values.projectName}
                onChange={update("projectName")}
                className={fieldClass}
                placeholder="Working name for the mandate"
                aria-invalid={Boolean(errors.projectName)}
                aria-describedby={errors.projectName ? "projectName-error" : undefined}
              />
              <ErrorText id="projectName-error" message={errors.projectName} />
            </div>

            <div>
              <label htmlFor="clientName" className="meta-label block text-obsidian/60">
                Client / principal <span className="text-copper">*</span>
              </label>
              <input
                id="clientName"
                ref={refs.clientName}
                value={values.clientName}
                onChange={update("clientName")}
                className={fieldClass}
                placeholder="Name of the principal"
                aria-invalid={Boolean(errors.clientName)}
                aria-describedby={errors.clientName ? "clientName-error" : undefined}
              />
              <ErrorText id="clientName-error" message={errors.clientName} />
            </div>

            <div>
              <label htmlFor="location" className="meta-label block text-obsidian/60">
                Location <span className="text-copper">*</span>
              </label>
              <input
                id="location"
                ref={refs.location}
                value={values.location}
                onChange={update("location")}
                className={fieldClass}
                placeholder="Micro-market or address"
                aria-invalid={Boolean(errors.location)}
                aria-describedby={errors.location ? "location-error" : undefined}
              />
              <ErrorText id="location-error" message={errors.location} />
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-10 border-0 p-0">
          <legend className="mb-6 flex w-full items-center gap-3">
            <span className="font-display text-sm text-copper">02</span>
            <span className="eyebrow text-copper">Mandate</span>
            <span className="h-px flex-1 bg-obsidian/12" />
          </legend>

          <div className="grid gap-7 sm:grid-cols-2">
            <div>
              <label htmlFor="service" className="meta-label block text-obsidian/60">
                Advisory discipline <span className="text-copper">*</span>
              </label>
              <select
                id="service"
                ref={refs.service}
                value={values.service}
                onChange={update("service")}
                className={cn(fieldClass, "appearance-none")}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={errors.service ? "service-error" : undefined}
              >
                <option value="">Select a discipline</option>
                {services.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
                <option value="Multiple disciplines">Multiple disciplines</option>
              </select>
              <ErrorText id="service-error" message={errors.service} />
            </div>

            <div>
              <label htmlFor="contact" className="meta-label block text-obsidian/60">
                Contact (optional)
              </label>
              <input
                id="contact"
                value={values.contact}
                onChange={update("contact")}
                className={fieldClass}
                placeholder="Email or phone"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="mt-10 border-0 p-0">
          <legend className="mb-6 flex w-full items-center gap-3">
            <span className="font-display text-sm text-copper">03</span>
            <span className="eyebrow text-copper">Brief</span>
            <span className="h-px flex-1 bg-obsidian/12" />
          </legend>

          <div>
            <label htmlFor="notes" className="meta-label block text-obsidian/60">
              What is being decided? <span className="text-copper">*</span>
            </label>
            <textarea
              id="notes"
              ref={refs.notes}
              value={values.notes}
              onChange={update("notes")}
              rows={5}
              className={cn(fieldClass, "resize-none")}
              placeholder="The question at hand, timing, and what the diligence should cover."
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={errors.notes ? "notes-error" : undefined}
            />
            <ErrorText id="notes-error" message={errors.notes} />
          </div>
        </fieldset>

        {failure && (
          <div
            role="alert"
            className="mt-8 flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3 text-[12.5px] text-destructive"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            The record could not be saved. Your entries are still here — please try again.
          </div>
        )}

        <div className="mt-9 flex flex-col gap-3 border-t border-obsidian/10 pt-6 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex h-12 items-center justify-center gap-3 bg-copper px-7 font-body text-[10px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-obsidian disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
                Logging
              </>
            ) : (
              "Create project"
            )}
          </button>
          <Link
            to="/projects"
            className="inline-flex h-12 items-center justify-center border border-obsidian/20 px-7 font-body text-[10px] uppercase tracking-[0.28em] text-obsidian/70 transition-colors hover:border-copper hover:text-copper"
          >
            Cancel
          </Link>
        </div>
      </div>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="border border-obsidian/12 bg-white p-6 lg:sticky lg:top-28">
          <p className="meta-label text-copper">Record summary</p>
          <dl className="mt-4 space-y-3.5">
            {summaryRows.map((row) => (
              <div key={row.label} className="flex items-baseline justify-between gap-4">
                <dt className="font-body text-[9px] uppercase tracking-[0.2em] text-foreground/40">
                  {row.label}
                </dt>
                <dd
                  className={cn(
                    "max-w-[60%] text-right text-[12.5px] leading-snug",
                    row.value ? "text-obsidian" : "text-foreground/30"
                  )}
                >
                  {row.value || "Not set"}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 border-t border-obsidian/10 pt-4">
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-foreground/40">
              Status on creation
            </p>
            <p className="mt-1.5 font-display text-[1.05rem] text-obsidian">Intake logged</p>
          </div>

          <p className="mt-5 border-t border-obsidian/10 pt-4 text-[11px] leading-relaxed text-foreground/40">
            Prototype workflow. The record is kept in this browser only. Approval states, assignment
            and milestones are not implemented. Desk: {siteConfig.locationLabel}.
          </p>
        </div>
      </aside>
    </form>
  );
}