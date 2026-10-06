export function BackgroundSystem() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="premium-grid absolute inset-0 opacity-80" />
      <div className="absolute left-[-12rem] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-accent-purple/20 blur-3xl" />
      <div className="absolute right-[-10rem] top-20 h-[26rem] w-[26rem] rounded-full bg-primary-blue/15 blur-3xl" />
      <div className="absolute bottom-[-18rem] left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-accent-purple/10 blur-3xl" />
    </div>
  );
}
