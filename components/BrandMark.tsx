export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" role="img" aria-label="Red Deer Reavers stag shield">
      <path d="M32 3 55 11v18c0 15.3-9.6 25.8-23 32C18.6 54.8 9 44.3 9 29V11L32 3Z" fill="currentColor" opacity=".16" />
      <path d="M32 5.5 52.5 12.6v16.2c0 13.4-8.2 22.8-20.5 29-12.3-6.2-20.5-15.6-20.5-29V12.6L32 5.5Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M26 19c-4-1-7-3-9-7m11 10c-6 0-10-2-13-5m23 2c4-1 7-3 9-7m-11 10c6 0 10-2 13-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M25 25c0 6 2.7 10 7 12.5C36.3 35 39 31 39 25l-7-4-7 4Z" fill="currentColor" />
      <path d="M25.5 37.5h13L37 47H27l-1.5-9.5Z" fill="currentColor" opacity=".75" />
    </svg>
  );
}
