import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Game Stats",
  description: "Get stats from games",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-full`}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
        <div className="flex flex-col">
          <Navbar />
            <main className="flex-1">
                {children}
            </main>
        </div>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}