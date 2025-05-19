export default function unauthorized() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="text-center space-y-6 max-w-lg mx-auto px-4">
        <h2 className="text-4xl font-bold text-red-900 animate-pulse">Access Denied</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            You don&apos;t have permission to access this page.
            If you believe this is an error, please contact an administrator.
          </p>
        </div>
      </div>
    </div>
  );
}