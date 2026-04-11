interface SectionLabelProps {
  label: string;
  className?: string;
}

export default function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-accent-cyan text-xs tracking-[0.3em] uppercase mb-3 ${className}`}
    >
      {"// "}{label}{" //"}
    </p>
  );
}
