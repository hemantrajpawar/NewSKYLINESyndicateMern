import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import ProjectForm from "@/components/projects/ProjectForm";


function NewProjectPage() {
  return (
    <>
      <PageHero
        eyebrow="Internal · Prototype"
        title={
          <>
            New project.
          </>
        }
        lead="Open a mandate record before the first diligence conversation. Keep it factual — this is an intake register, not a proposal."
        meta={[{ label: "Desk", value: "Pune" }, { label: "Storage", value: "This browser" }]}
      />

      <section className="bg-background py-14 lg:py-16">
        <div className="container-x">
          <Reveal className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-obsidian/12 pb-5">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.22em] text-foreground/50 transition-colors hover:text-copper"
            >
              <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              Project desk
            </Link>
            <p className="font-body text-[9.5px] uppercase tracking-[0.2em] text-foreground/35">
              Fields marked <span className="text-copper">*</span> are required
            </p>
          </Reveal>

          <ProjectForm />
        </div>
      </section>
    </>
  );
}

export default NewProjectPage;
