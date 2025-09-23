import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif} from "next/font/google";
import "./globals.css";
import  Sidebar  from "@/components/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-serif",
})

export const metadata: Metadata = {
  title: "Rive Bank",
  description: "A mobile banking platform for everyone",
  icons: {
    icon:'/icons/logo.svg'
  }
  
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  const loggedIn = {
    firstName: "Kingsley",
    lastName: "Doe"
  }

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexSerif.variable}  antialiased`}
      >
        <main className="flex h-screen w-full font-inter">
        <Sidebar user={loggedIn} />
        <div className="flex size-full flex-col">
          <div className="root-layout">

            <Image src="/icons/logo.svg" width={30} height={30} alt="RiveTrust logo"/>

            <div>
              <MobileNav user={loggedIn}/>
            </div>
          </div>

          {children}
        </div>
        
    </main>
      </body>
    </html>
  );
}
