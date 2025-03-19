export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}