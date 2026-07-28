export default function BrandIcon({ className = "w-4 h-4 text-white", plus = false }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      {plus && (
        <>
          <path d="M12 7v6" />
          <path d="M9 10h6" />
        </>
      )}
    </svg>
  );
}
