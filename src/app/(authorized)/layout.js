import Sidebar from "@/components/Sidebar/Sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserProvider } from "../context/userContext";
import { LinkedAccountsProvider } from "../context/linkedAccountsContext";


export default function RootLayout({children}) {
  return (
      <UserProvider>
        <LinkedAccountsProvider>
          <div className="flex flex-1 mt-2 overflow-hidden">
            <Sidebar />
            <main className="flex-1 container mx-auto h-full p-8 pr-2 bg-background rounded-md overflow-hidden">
              <ScrollArea className="h-full pr-6">
                {children}
              </ScrollArea>
            </main>
          </div>
        </LinkedAccountsProvider>
      </UserProvider>
  );
}