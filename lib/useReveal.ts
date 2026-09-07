"use client";
import { useEffect, useRef } from "react";
export function useReveal<T extends HTMLElement>() {
 const ref=useRef<T|null>(null);
 useEffect(()=>{
   const node=ref.current;
   if(!node || !("IntersectionObserver" in window))return;
   const media=window.matchMedia("(prefers-reduced-motion: reduce)");
   if(media.matches)return;
   // Only arm content below the viewport. Server-rendered content stays visible without JS.
   if(node.getBoundingClientRect().top<window.innerHeight)return;
   node.classList.add("reveal-ready");
   const show=()=>{node.classList.remove("reveal-ready");node.classList.add("is-visible");};
   const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){show();observer.disconnect();}},{threshold:0,rootMargin:"0px 0px -24px 0px"});
   observer.observe(node);
   const onMotion=()=>{if(media.matches){show();observer.disconnect();}};
   media.addEventListener("change",onMotion);
   return ()=>{observer.disconnect();media.removeEventListener("change",onMotion);node.classList.remove("reveal-ready");};
 },[]);
 return ref;
}
