export default function NotFound() {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-semibold">Article not found</h2>
          <p className="text-muted-foreground">The article you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
}