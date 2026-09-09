"use client";
import ThemeToggle from "./ThemeToggle";
import { usePortfolio } from "./LanguageProvider";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
const links = [{href:"#skills",label:"Expertise"},{href:"#experience",label:"Experience"},{href:"#work",label:"Work"},{href:"#about",label:"About"}];
export default function Navbar() {
 const { t, language } = usePortfolio();
 const [scrolled,setScrolled]=useState(false), [open,setOpen]=useState(false), [active,setActive]=useState("");
 const toggle=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
   const onScroll=()=>setScrolled(window.scrollY>12);
   onScroll(); window.addEventListener("scroll",onScroll,{passive:true});
   const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)setActive("#"+entry.target.id);});},{rootMargin:"-15% 0px -65% 0px"});
   document.querySelectorAll("main section[id]").forEach(section=>observer.observe(section));
   return ()=>{window.removeEventListener("scroll",onScroll);observer.disconnect();};
 },[]);
 useEffect(()=>{
   if(!open)return;
   const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setOpen(false);toggle.current?.focus();}};
   const media=window.matchMedia("(min-width: 901px)");
   const onResize=()=>{if(media.matches)setOpen(false);};
   document.addEventListener("keydown",onKey); media.addEventListener("change",onResize);
   return ()=>{document.removeEventListener("keydown",onKey);media.removeEventListener("change",onResize);};
 },[open]);
 return <>
   <a className="skip-link" href="#main">{t("Skip to content")}</a>
   <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
     <nav className="section-shell nav-shell" aria-label={t("Main navigation")}>
       <a className="nav-brand" href="#top" aria-label={t("Charbel Mdawar home")}><span className="wordmark" dir="ltr">cm<span>.</span></span></a>
       <ul className="desktop-links">{links.map(link => <li key={link.href}><a className={active === link.href ? "active" : ""} aria-current={active === link.href ? "location" : undefined} href={link.href}>{t(link.label)}</a></li>)}</ul>
       <div className="nav-actions">
         <a className="nav-contact" href="#contact">{t("Let’s talk")}<ArrowUpRight size={14} aria-hidden="true"/></a>
         <ThemeToggle/><a className="language-toggle" href={language === "en" ? "/ar" : "/"} hrefLang={language === "en" ? "ar" : "en"} aria-label={language === "en" ? "Switch to Arabic" : "التبديل إلى الإنجليزية"} lang={language === "en" ? "ar" : "en"} dir={language === "en" ? "rtl" : "ltr"}>{language === "en" ? "العربية" : "English"}</a>
         <button ref={toggle} type="button" className="menu-toggle" aria-label={t(open ? "Close navigation menu" : "Open navigation menu")} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
       </div>
     </nav>
     <div id="mobile-menu" className="mobile-menu" hidden={!open}><ul className="section-shell">{[...links, {href: "#contact", label: "Contact"}].map(link => <li key={link.href}><a href={link.href} aria-current={active === link.href ? "location" : undefined} onClick={() => setOpen(false)}>{t(link.label)}</a></li>)}</ul></div>
   </header>
 </>;
}
