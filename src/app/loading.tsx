export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-background">
      <div className="absolute inset-0 premium-grid opacity-60" />
      <div className="relative h-24 w-24 rounded-full border border-primary-blue/20 border-t-primary-blue shadow-premium" />
    </div>
  );
}
