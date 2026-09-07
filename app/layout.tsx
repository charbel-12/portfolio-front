import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
const display=Space_Grotesk({subsets:["latin"],weight:["500","600","700"],variable:"--font-display",display:"swap"});
const body=Inter({subsets:["latin"],weight:["400","500","600"],variable:"--font-body",display:"swap"});
const mono=JetBrains_Mono({subsets:["latin"],weight:["400","500"],variable:"--font-mono",display:"swap"});
const title="Charbel Mdawar — Software Engineer";
const description="Software engineer specializing in backend development and quality engineering. Explore Java, Spring Boot, Laravel, real-time systems, and QA leadership.";
export const metadata: Metadata = {
 metadataBase: new URL("https://charbel-mdawar-portfolio.bushy-wand-2083.chatgpt.site"), title, description,
 openGraph:{title,description,type:"website",locale:"en_US",url:"/",siteName:"Charbel Mdawar",images:[{url:"/og.png",width:1730,height:909,alt:"Charbel Mdawar — Software Engineer. Backend Development · Quality Engineering."}]},
 twitter:{card:"summary_large_image",title,description,images:["/og.png"]},
};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body>{children}</body></html>;}

