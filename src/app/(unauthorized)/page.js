import Image from "next/image";
import herobg from "/public/icons/hero.jpg";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Plus, Dumbbell, Check, Linkedin, Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { getCurrentUser } from "../utils/auth/AuthActions";
import apexImage from "/public/icons/apexImage.jpg";
import csgoImage from "/public/icons/csgoImage.png";
import division2Image from "/public/icons/division2Image.jpg";
import splitgateImage from "/public/icons/splitgateImage.jpg";
import valorantImage from "/public/icons/valorantImage.jpg";
import gtaImage from "/public/icons/gtaImage.jpg";
import assassinscreedImage from "/public/icons/assassinscreedImage.jpg";
import eafcImage from "/public/icons/eafcImage.jpg";
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"


export default async function Home() {
    const user = await getCurrentUser()

    return (
      <div className="h-screen w-full flex flex-col">
        <div className="relative h-[50vh] w-full flex-shrink-0 bg-gradient-to-r from-[#0a1020] via-[#150025]">
          <Image
            src={herobg}
            alt="hero"
            className="absolute inset-0 h-full w-full object-cover z-0 rounded-bl-[20rem]"
          />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
            <h1 className="text-6xl text-white font-extrabold tracking-wide">
              Track Your Game Stats Effortlessly!
            </h1>
            <h2 className="text-3xl text-white font-bold mt-2">
              All your game stats in one place
            </h2>
            {user === undefined ? (
              <Button asChild className="h-14 w-28 text-xl rounded-2xl mt-5">
                <Link href="/user/SignIn">Log In</Link>
              </Button>
            ) : (
              <Button asChild className="h-14 w-28 text-xl rounded-2xl mt-5">
                <Link
                  href={
                    "/user/" +
                    user.user_metadata.first_name +
                    "/Profile"
                  }>
                  Profile
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="h-[15vh] bg-gradient-to-r from-[#0a1020] via-[#150025] to-[#1f0202] flex items-center justify-center flex-shrink-0">
          <div className="text-center">
            <h2 className="text-2xl text-white font-bold">
              Explore and track your game stats!
            </h2>
          </div>
        </div>

        <div className="flex flex-1 justify-start space-x-5 bg-[#02020c] p-8">
          <div className="flex flex-col">
            <Card className="w-[300px] bg-transparent border-0 text-[#cacaca]">
              <CardHeader>
                <CardTitle>Instant Stats Lookup</CardTitle>
                <CardDescription>
                  Quickly find your stats across various games.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  asChild
                  className="text-[#e0e0e0] bg-slate-950 hover:bg-slate-900">
                  <Link
                    href={
                      user
                        ? `/user/${user.user_metadata.first_name}/Profile`
                        : "/user/SignIn"
                    }>
                    Lookup Stats
                  </Link>
                  {/*have to change the /Profile to the suported games page  */}
                </Button>
              </CardContent>
            </Card>

            <Card className="w-[300px] mt-5 bg-transparent border-0 text-[#cacaca]">
              <CardHeader>
                <CardTitle>Leaderboards</CardTitle>
                <CardDescription>
                  Compare your ranking with top players.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button
                  asChild
                  className="text-[#e0e0e0] bg-slate-950 hover:bg-slate-900">
                  <Link
                    href={
                      user
                        ? `/user/${user.user_metadata.first_name}/Profile`
                        : "/user/SignIn"
                    }>
                    View Leaderboards
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <Card className="w-[300px] items-center my-auto bg-transparent border-0 text-[#cacaca]">
            <CardHeader>
              <CardTitle>Track Progress</CardTitle>
              <CardDescription>
                Stay updated with your latest in-game performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button
                asChild
                className="text-[#e0e0e0] bg-slate-950 hover:bg-slate-900">
                <Link
                  href={
                    user
                      ? `/user/${user.user_metadata.first_name}/Profile`
                      : "/user/SignIn"
                  }>
                  View Progress
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Carousel className="w-1/3 h-fit  mt-10">
            <CarouselContent>
              {[
                csgoImage,
                valorantImage,
                assassinscreedImage,
                division2Image,
                gtaImage,
                splitgateImage,
                eafcImage,
                apexImage,
              ].map((i, index) => {
                return (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Image
                        src={i}
                        alt={`game-nr-${index}`}
                        className="aspect-video"
                      />
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <div className="bg-transparent text-white py-4">
            <h2 className="text-2xl text-center mb-4">What Users Are Saying</h2>
            <div className="flex space-x-3 justify-center">
              <Card className="w-fit bg-transparent border text-center p-2">
                <CardTitle className="text-lg text-[#e0e0e0]">
                  Awesome tool to track all my game stats!
                </CardTitle>
                <CardDescription className="text-md mt-1">
                  - D1oni
                </CardDescription>
              </Card>
              <Card className="w-fit bg-transparent border text-center p-2">
                <CardTitle className="text-lg text-[#e0e0e0]">
                  The leaderboard feature is amazing!
                </CardTitle>
                <CardDescription className="text-md mt-1">
                  - RiskyW
                </CardDescription>
              </Card>
            </div>
            <Card className="w-fit bg-transparent border text-center mx-auto mt-5 p-2">
              <CardTitle className="text-lg text-[#e0e0e0]">
                I can check my progress in real-time!
              </CardTitle>
              <CardDescription className="text-md mt-1">
                - Anonymous
              </CardDescription>
            </Card>
          </div>
        </div>
        <div className="bg-[#02020c] py-12">
          <h2 className="text-3xl text-white font-extrabold text-center mb-10">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            <div className="bg-[#0f3460] p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-4">
                <Plus />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Step 1: Select Game
              </h3>
              <p className="text-gray-300 text-center">
                Choose your favorite supported game to get started.
              </p>
            </div>

            <div className="bg-[#0f3460] p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-4">
                <Dumbbell /> 
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Step 2: Enter Username
              </h3>
              <p className="text-gray-300 text-center">
                Enter your in-game username to fetch your stats.
              </p>
            </div>

            <div className="bg-[#0f3460] p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="bg-white p-4 rounded-full mb-4">
                <Check />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Step 3: View Stats
              </h3>
              <p className="text-gray-300 text-center">
                Instantly view and track your in-game performance.
              </p>
            </div>
          </div>
        </div>

        <footer className="bg-[#0a1020] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                    <li><Link href='/user/SignIn'>Sign In</Link></li>
                    <li><Link href='/user/SignUp'>Sign Up</Link></li>                
                </>
                :   ([{sendTo:'#',text:'Leaderboards'},{sendTo:'#',text:'Supported Games'},{sendTo:'#',text:'Profile'}].map((i)=>{
                        return (
                        <li key={i.text}>
                            <Link href={i.sendTo} className="hover:text-white">
                            {i.text}
                            </Link>
                        </li>
                        );
                    }))
                }
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Company</h3>
              <ul className="text-gray-400 space-y-2">
                {[{sendTo:'#',text:'About Us'},{sendTo:'#',text:'Careers'},{sendTo:'#',text:'Contact'}].map((i)=>{
                    return (
                        <li key={i.text}>
                            <Link href={i.sendTo} className="hover:text-white">
                            {i.text}
                            </Link>
                        </li>
                    );
                })}
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
      </div>
    );
};