import { useRef, useState } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { contactMethods, interestOptions } from "@/lib/content";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import * as Select from "@radix-ui/react-select";
import { ChevronDown, Check } from "lucide-react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  interest: "",
  method: "",
  message: "",
  consent: false,
};

const fieldClass =
  "w-full border-0 border-b border-obsidian/20 bg-transparent px-0 py-3 text-[15px] text-obsidian placeholder:text-foreground/30 transition-colors focus:border-copper focus:outline-none focus:ring-0";

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please tell us your name.";
  const email = values.email.trim();
  const phone = values.phone.trim();
  if (!email && !phone) errors.email = "Add an email or a phone number so we can reply.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email))
    errors.email = "That email address does not look right.";
  if (phone && phone.replace(/\D/g, "").length < 8)
    errors.phone = "Please add a complete phone number.";
  if (values.message.trim().length < 10)
    errors.message = "A sentence or two about what you are deciding helps us prepare.";
  if (!values.consent) errors.consent = "Please acknowledge the privacy notice to continue.";
  return errors;
}

function composeEnquiry(values) {
  const body = [
    `Name: ${values.name}`,
    values.email ? `Email: ${values.email}` : null,
    values.phone ? `Phone: ${values.phone}` : null,
    values.interest ? `Interest: ${values.interest}` : null,
    values.method ? `Preferred contact: ${values.method}` : null,
    "",
    values.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return {
    body,
    email: `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      `Consultation enquiry — ${values.name}`
    )}&body=${encodeURIComponent(body)}`,
    whatsapp: `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
      `Consultation enquiry\n\n${body}`
    )}`,
  };
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-[11.5px] text-destructive">
      <AlertCircle className="h-3 w-3 shrink-0" strokeWidth={2} />
      {message}
    </p>
  );
}

export default function ContactForm({ onOpenPrivacy }) {  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [prepared, setPrepared] = useState(null);
  const refs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    message: useRef(null),
    consent: useRef(null),
  };

  const update = (field) => (event) => {
    const value = field === "consent" ? event.target.checked : event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      setStatus("idle");
      refs[firstInvalid]?.current?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const apiBase = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Unable to submit enquiry");
      setPrepared(composeEnquiry(values));
      setStatus("ready");
    } catch (error) {
      setStatus("error");
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setPrepared(null);
    setStatus("idle");
  };

  if (status === "ready" && prepared) {
    return (
      <div className="border border-obsidian/15 bg-white p-7 sm:p-9" role="status">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center border border-copper/40 text-copper">
            <Check className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <p className="eyebrow text-copper">Enquiry received</p>
        </div>
        <h3 className="mt-5 font-display text-[1.6rem] leading-tight text-obsidian">
          Thank you, {values.name.split(" ")[0]}. Your enquiry has been recorded.
        </h3>
        <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/65">
          Your enquiry has been securely recorded. You can also use either route below to contact the advisory desk directly.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={prepared.email}
            className="inline-flex h-12 flex-1 items-center justify-center bg-copper px-6 font-body text-[10px] uppercase tracking-[0.26em] text-white transition-colors hover:bg-obsidian"
          >
            Send by email
          </a>
          <a
            href={prepared.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex h-12 flex-1 items-center justify-center border border-obsidian/20 px-6 font-body text-[10px] uppercase tracking-[0.26em] text-obsidian transition-colors hover:border-copper hover:text-copper"
          >
            Send on WhatsApp
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-obsidian/10 pt-4">
          <p className="font-body text-[10px] uppercase tracking-[0.2em] text-foreground/40">
            Enquiry saved
          </p>
          <button
            type="button"
            onClick={reset}
            className="font-body text-[10px] uppercase tracking-[0.2em] text-copper underline-offset-4 hover:underline"
          >
            Write another enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-7">
      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="meta-label block text-obsidian/60">
            Full name <span className="text-copper">*</span>
          </label>
          <input
            id="name"
            ref={refs.name}
            value={values.name}
            onChange={update("name")}
            className={fieldClass}
            placeholder="Your name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <label htmlFor="email" className="meta-label block text-obsidian/60">
            Email
          </label>
          <input
            id="email"
            ref={refs.email}
            type="email"
            value={values.email}
            onChange={update("email")}
            className={fieldClass}
            placeholder="name@example.com"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="phone" className="meta-label block text-obsidian/60">
            Phone
          </label>
          <input
            id="phone"
            ref={refs.phone}
            type="tel"
            value={values.phone}
            onChange={update("phone")}
            className={fieldClass}
            placeholder="+91"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <label htmlFor="interest" className="meta-label block text-obsidian/60">
            Interest
          </label>
          
<Select.Root
  value={values.interest}
  onValueChange={update("interest")}
>
  <Select.Trigger
    id="interest"
    className={cn(
      fieldClass,
      "flex w-full items-center justify-between gap-3 text-left outline-none transition-colors",
      "data-[placeholder]:text-foreground/45",
      "focus:border-copper focus:ring-1 focus:ring-copper/20"
    )}
  >
    <Select.Value placeholder="Select an interest" />
    <Select.Icon>
      <ChevronDown className="h-4 w-4 shrink-0 text-copper/70" />
    </Select.Icon>
  </Select.Trigger>

  <Select.Portal>
    <Select.Content
      position="popper"
      sideOffset={6}
      className="z-50 w-[var(--radix-select-trigger-width)] overflow-hidden border border-obsidian/15 bg-[#F5F2EC] shadow-xl"
    >
      <Select.Viewport className="p-1.5">
        {interestOptions.map((option) => (
          <Select.Item
            key={option}
            value={option}
            className={cn(
              "relative flex cursor-pointer select-none items-center justify-between px-3 py-2.5",
              "font-sans text-sm text-obsidian outline-none transition-colors",
              "data-[highlighted]:bg-copper/10 data-[highlighted]:text-copper"
            )}
          >
            <Select.ItemText>{option}</Select.ItemText>

            <Select.ItemIndicator>
              <Check className="h-4 w-4 text-copper" />
            </Select.ItemIndicator>
          </Select.Item>
        ))}
      </Select.Viewport>
    </Select.Content>
  </Select.Portal>
</Select.Root>

        </div>

        <div className="sm:col-span-2">
          <label htmlFor="method" className="meta-label block text-obsidian/60">
            Preferred contact method
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {contactMethods.map((method) => {
              const active = values.method === method;
              return (
                <button
                  key={method}
                  type="button"
                  onClick={() =>
                    setValues((current) => ({
                      ...current,
                      method: active ? "" : method,
                    }))
                  }
                  aria-pressed={active}
                  className={cn(
                    "border px-4 py-2 font-body text-[9.5px] uppercase tracking-[0.22em] transition-colors",
                    active
                      ? "border-copper bg-copper text-white"
                      : "border-obsidian/20 text-obsidian/60 hover:border-copper hover:text-copper"
                  )}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="meta-label block text-obsidian/60">
            What are you deciding? <span className="text-copper">*</span>
          </label>
          <textarea
            id="message"
            ref={refs.message}
            value={values.message}
            onChange={update("message")}
            rows={4}
            className={cn(fieldClass, "resize-none")}
            placeholder="The property, the location, the timeline  and what you need clarity on."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          <FieldError id="message-error" message={errors.message} />
        </div>
      </div>

     
<div>
  <div className="flex items-start gap-3 text-[12.5px] leading-relaxed text-foreground/65">
    <input
      id="consent"
      type="checkbox"
      ref={refs.consent}
      checked={values.consent}
      onChange={update("consent")}
      className="mt-0.5 h-4 w-4 shrink-0 accent-copper"
      aria-invalid={Boolean(errors.consent)}
      aria-describedby={errors.consent ? "consent-error" : undefined}
    />

    <div>
      <label htmlFor="consent" className="cursor-pointer">
        I have read the{" "}
      </label>

      <button
        type="button"
        onClick={onOpenPrivacy}
        className="text-copper underline underline-offset-4 transition-colors hover:text-obsidian"
      >
        privacy notice
      </button>

      {" "}and agree that my details may be used to respond to this enquiry.
    </div>
  </div>

  <FieldError id="consent-error" message={errors.consent} />
</div>


      {status === "error" && (
        <div
          role="alert"
          className="flex items-start gap-2 border border-destructive/30 bg-destructive/5 p-3 text-[12.5px] text-destructive"
        >
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          Something interrupted that attempt. Your details are still here — please try again.
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-obsidian/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-12 items-center justify-center gap-3 bg-copper px-7 font-body text-[10px] uppercase tracking-[0.28em] text-white transition-colors hover:bg-obsidian disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
              Preparing
            </>
          ) : (
            "Submit your enquiry"
          )}
        </button>
        <p className="max-w-xs font-body text-[10px] uppercase leading-relaxed tracking-[0.18em] text-foreground/40">
          Your details stay with the advisory desk and are never passed to a developer.
        </p>
      </div>
    </form>
  );
}