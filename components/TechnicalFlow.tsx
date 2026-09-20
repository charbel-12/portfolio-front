export default function TechnicalFlow({ labels, caption }: { labels: string[]; caption: string }) {
 return <figure className="technical-flow"><figcaption>{caption}</figcaption><ol>{labels.map((label, i) => <li key={label}><span>{String(i + 1).padStart(2, "0")}</span>{label}</li>)}</ol></figure>;
}
