import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }) {
  return (
      //<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <div className="flex flex-col">
          <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
      //</ThemeProvider>
  );
}