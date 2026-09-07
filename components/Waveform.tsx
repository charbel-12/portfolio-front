const bars = [
  "animate-bar1 h-8",
  "animate-bar2 h-14",
  "animate-bar3 h-6",
  "animate-bar4 h-16",
  "animate-bar5 h-9",
  "animate-bar2 h-12",
  "animate-bar1 h-5",
  "animate-bar4 h-14",
  "animate-bar3 h-8",
  "animate-bar5 h-11",
  "animate-bar1 h-6",
  "animate-bar2 h-14",
];

export default function Waveform() {
  return (
    <div
      className="flex h-16 items-center gap-1.5"
      role="img"
      aria-label="Live call signal waveform"
    >
      {bars.map((cls, i) => (
        <span
          key={i}
          className={`w-1.5 origin-center rounded-full bg-gradient-to-t from-signal/40 to-signal ${cls}`}
        />
      ))}
    </div>
  );
}
