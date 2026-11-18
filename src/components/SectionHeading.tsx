export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  center = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
}) {
  return (
    <div className={`reveal ${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      <p className={`eyebrow ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-accent" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="h2">
        {title}
      </h2>
      {lead && <p className={`lead ${center ? "mx-auto" : ""}`}>{lead}</p>}
    </div>
  );
}
