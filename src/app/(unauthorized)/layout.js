import Navbar from "@/components/Navbar/Navbar";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}