import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import Link from "next/link";
import { Linkedin, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";


const Footer = ({ user }) => {

    const CompanyItems = [
      {sendTo: "#", text: "About Us"},
      {sendTo: "#", text: "Careers"},
      {sendTo: !user ? "/user/SignIn" : "/Help", text: !user ? undefined : "Help"}
    ].map((i, index) => {
      return (
        <li key={index}>
          <Link href={i.sendTo} className="hover:text-white">
            {i.text}
          </Link>
        </li>
      );
    });

    const QuickLinks = [
      { sendTo: "#", text: "Leaderboards" },
      { sendTo: "/SupportedGames", text: "Supported Games" },
      { sendTo: "/user/Profile", text: "Profile" }
    ].map((i, index) => {
      return (
        <li key={index}>
          <Link href={i.sendTo} className="hover:text-white">
            {i.text}
          </Link>
        </li>
      );
    });

    return (
        <footer className="bg-[#0a1020] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-3">
            <div>
              <h3 className="text-xl font-semibold mb-4">GameStats</h3>
              <p className="text-gray-400">
                Track your game stats across various platforms effortlessly.
              </p>
              <div className="flex mt-4 space-x-4">
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Linkedin />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-white">
                  <Instagram />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="text-gray-400 space-y-2">
                {user === undefined 
                ? <>
                    <li><Link href='/user/SignIn' className="hover:text-white">Sign In</Link></li>
                    <li><Link href='/user/SignUp' className="hover:text-white">Sign Up</Link></li>                
                </>
                :  QuickLinks
                }
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="text-gray-400 space-y-2">
                {CompanyItems}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                Subscribe to our newsletter
              </h3>
              <form className="flex flex-col">
                <Input
                  type="email" name="Email"
                  className="px-4 py-2 border-0 bg-gray-800 text-white rounded-lg mb-4"
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                <Button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
          <Separator className="mt-4" />
          <div className="mt-4 border-gray-700 pt-6 text-center text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} GameStats. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
}

export default Footer;