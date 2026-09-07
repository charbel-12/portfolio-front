import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
export default function Footer() { return <footer className="section-shell footer"><p>© {new Date().getFullYear()} {profile.name}</p><span>{profile.location}</span><a href="#top">Back to top <ArrowUpRight size={14}/></a></footer>; }

