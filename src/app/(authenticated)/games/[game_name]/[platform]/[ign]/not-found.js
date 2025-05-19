export default function NotFound() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-10 max-w-xl mx-auto px-4">
        <h2 className="text-3xl font-semibold">Page not found</h2>
        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg font-medium">This could be because:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>The game is not supported or has been deprecated</li>
            <li>The platform is not supported</li>
          </ul>
        </div>
      </div>
    </div>
  );
}