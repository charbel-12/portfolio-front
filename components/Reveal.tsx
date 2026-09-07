"use client";
import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/lib/useReveal";
export default function Reveal({children,delay=0}:{children:ReactNode;delay?:number}) { const ref=useReveal<HTMLDivElement>(); return <div ref={ref} className="reveal" style={{"--reveal-delay":`${delay}ms`} as CSSProperties}>{children}</div>; }

