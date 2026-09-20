"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "./LanguageProvider";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [{href:"/expertise",label:"Expertise"},{href:"/experience",label:"Experience"},{href:"/work",label:"Work"},{href:"/about",label:"About"},{href:"/blog",label:"Blog"}];
export default function Navbar() {
 const { t, language } = usePortfolio();
 const pathname = usePathname();
 const base = language === "ar" ? "/ar" : "";
 const localPath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
 const translatedPath = language === "en" ? "/ar" + (localPath === "/" ? "" : localPath) : localPath;
 const [scrolled,setScrolled]=useState(false), [open,setOpen]=useState(false);
 const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
   const onScroll=()=>setScrolled(window.scrollY>12);
   onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
   return ()=>window.removeEventListener("scroll",onScroll);
 },[]);
 useEffect(()=>{
   if(!open)return;
   const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);toggle.current?.focus();}};
   const media=window.matchMedia("(min-width: 1051px)");
   const onResize=()=>{if(media.matches)setOpen(false);};
   document.addEventListener("keydown",onKey); media.addEventListener("change",onResize);
   return ()=>{document.removeEventListener("keydown",onKey);media.removeEventListener("change",onResize);};
 },[open]);
 return <>
   <Link className="skip-link" href="#main">{t("Skip to content")}</Link>
   <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
     <nav className="section-shell nav-shell" aria-label={t("Main navigation")}>
       <Link className="nav-brand" href={base || "/"} aria-label={t("Charbel Mdawar home")}><span className="wordmark" dir="ltr">cm<span>.</span></span></Link>
       <ul className="desktop-links">{links.map(link => <li key={link.href}><Link className={(localPath === link.href || (link.href === "/blog" && localPath.startsWith("/blog/"))) ? "active" : ""} aria-current={(localPath === link.href || (link.href === "/blog" && localPath.startsWith("/blog/"))) ? "location" : undefined} href={`${base}${link.href}`}>{link.label === "Blog" && language === "ar" ? "المدونة" : t(link.label)}</Link></li>)}</ul>
       <div className="nav-actions">
         <Link className="nav-contact" href={`${base}/contact`}>{t("Let’s talk")}<ArrowUpRight size={14} aria-hidden="true"/></Link>
         <ThemeToggle/><Link className="language-toggle" href={translatedPath} hrefLang={language === "en" ? "ar" : "en"} aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"} lang={language === "en" ? "ar" : "en"} dir={language === "en" ? "rtl" : "ltr"}>{language === "en" ? "العربية" : "English"}</Link>
         <button ref={toggle} type="button" className="menu-toggle" aria-label={t(open ? "Close navigation menu" : "Open navigation menu")} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
       </div>
     </nav>
     <div id="mobile-menu" className="mobile-menu" hidden={!open}><ul className="section-shell">{[...links, {href: "/contact", label: "Contact"}].map(link => <li key={link.href}><Link href={`${base}${link.href}`} aria-current={(localPath === link.href || (link.href === "/blog" && localPath.startsWith("/blog/"))) ? "location" : undefined} onClick={() => setOpen(false)}>{link.label === "Blog" && language === "ar" ? "المدونة" : t(link.label)}</Link></li>)}</ul></div>
   </header>
 </>;
}
