export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-semibold">Game not found</h2>
        <p className="text-muted-foreground">The game you&apos;re looking for doesn&apos;t exist, is not supported yet or is deprecated.</p>
      </div>
    </div>
  );
}