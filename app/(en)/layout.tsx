import SiteDocument, { portfolioMetadata } from "@/components/SiteDocument";
export const metadata = portfolioMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) { return <SiteDocument language="en">{children}</SiteDocument>; }
