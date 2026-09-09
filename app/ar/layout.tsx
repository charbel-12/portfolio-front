import SiteDocument, { portfolioMetadata } from "@/components/SiteDocument";
export const metadata = portfolioMetadata("ar");
export default function Layout({ children }: { children: React.ReactNode }) { return <SiteDocument language="ar">{children}</SiteDocument>; }
