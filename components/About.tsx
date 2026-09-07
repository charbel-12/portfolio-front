import { about, education, languages, volunteering } from "@/lib/data";
import Reveal from "./Reveal";
export default function About() {
 return <section id="about" className="section-shell section-space"><Reveal><div className="about-grid"><div><p className="eyebrow">04 / About me</p><h2>Curiosity in the code.<br/><span className="text-muted">Care in the details.</span></h2></div><div className="about-copy">{about.map(text=><p key={text}>{text}</p>)}</div></div><dl className="about-facts"><div><dt>Education</dt><dd>{education.degree}<span>{education.school} · {education.period}</span></dd></div><div><dt>Languages</dt><dd>{languages.join(" & ")}</dd></div><div><dt>Community</dt><dd>{volunteering.role}, {volunteering.organization}<span>{volunteering.period}</span></dd></div></dl></Reveal></section>;
}
