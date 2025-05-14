export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-6 max-w-lg mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-900 animate-pulse">404</h2>
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold">Looks like you&apos;re lost</h3>
          <p className="text-muted-foreground">
            The page you&apos;re looking for has been moved, deleted, or never existed. 
            Try checking the URL or navigate back to the homepage.
          </p>
        </div>
      </div>
    </div>
  );
}