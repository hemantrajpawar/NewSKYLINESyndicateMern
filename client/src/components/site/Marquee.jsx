const items = [
  "Property Advisory",
  "Investment Evaluation",
  "Market Research",
  "Prperty Sourcing",
  "Buyer Representation",
  "Real Estate Consulting"
];

export default function Marquee() {
  const track = [...items, ...items];

  return (
    <section
      aria-label="Advisory practices"
      className="marquee overflow-hidden border-y border-obsidian/10 bg-sand/40 py-4"
    >
      <div className="marquee-track flex w-max items-center">
        {track.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center">
            <span className="whitespace-nowrap px-7 font-display text-[1.05rem] tracking-wide text-obsidian/75">
              {item}
            </span>
            <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </section>
  );
}