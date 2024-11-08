import { Inter } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProvider } from "../context/userContext";


export default function RootLayout({children}) {
  return (
        <div className="flex flex-col min-h-screen">
          <UserProvider>
            <Navbar />
            <div className="flex flex-1 mt-2 overflow-hidden">
              <Sidebar />
              <main className="flex-1 container mx-auto h-full p-8 pr-2 bg-gray-50 rounded-md overflow-hidden">
                <ScrollArea className="h-full pr-6">
                  {children}
                </ScrollArea>
              </main>
            </div>
          </UserProvider>
        </div>
  );
}

//ose
// return (
//   <html lang="en">
//     <body className={inter.className}>
//     {/* <ThemeProvider attribute="class" defaultTheme="system"  > */}
//       <div>
//         <Navbar />
//       </div>
//       <div className="flex min-h-screen mt-2">
//         <Sidebar />
//         <main className="flex-1 container mx-auto p-8 bg-gray-50 rounded-md min-h-full h-fit">
//             {children}
//         </main>
//       </div>
//     {/* </ThemeProvider> */}
//     </body>
//   </html>
// );

