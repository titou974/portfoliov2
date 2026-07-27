export default function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M21 3C21 13.5 13.5 21 3 21 3 10.5 10.5 3 21 3Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <path
        d="M3 21C8 15.5 13.5 9.5 21 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M9.5 14.5C11 13 13 12.5 15.5 12.8M12.5 11.5C13.5 9.5 14 8 14 5.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}
