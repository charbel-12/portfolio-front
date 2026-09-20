import Link from "next/link";

const contexts: Record<string, { path: string; en: [string, string, string]; ar: [string, string, string] }> = {
 "centralized-sso-enterprise-applications": { path: "/work/britrip", en: ["My work on ", "Britrip’s shared SSO platform", " connects these identity concerns to a Spring Boot implementation used across the platform."], ar: ["يربط عملي على ", "منصة الدخول الموحد في Britrip", " هذه المسائل المتعلقة بالهوية بتنفيذ باستخدام Spring Boot يخدم تطبيقات المنصة."] },
 "payment-integrations-state-transitions": { path: "/work/britrip", en: ["The ", "Britrip case study", " describes my payment integrations with Network International, Stripe, and Cryptomus alongside the platform’s shared identity and support services."], ar: ["توضح ", "دراسة مشروع Britrip", " تكاملات الدفع التي طورتها مع Network International وStripe وCryptomus إلى جانب خدمات الهوية المشتركة والدعم."] },
 "real-time-systems-and-recovery": { path: "/work/callx", en: ["For the implementation context behind this topic, see ", "CallX’s calling and core-backend architecture", ", which separates live communication from tenant management, CRM, and HR."], ar: ["للاطلاع على سياق التنفيذ المرتبط بهذا الموضوع، راجع ", "بنية خدمات المكالمات والخدمة الأساسية في CallX", " التي تفصل الاتصال المباشر عن إدارة المؤسسات والعملاء والموارد البشرية."] },
 "erp-testing-business-rules-data-integrity": { path: "/work/al-ahlam-erp", en: ["My ", "Al-Ahlam ERP and manufacturing validation work", " provides the project context for this focus on business rules, complete workflows, and data integrity."], ar: ["يوفر عملي في ", "التحقق من نظام ERP والتصنيع للأحلام", " السياق العملي لهذا التركيز على قواعد العمل والمسارات الكاملة وسلامة البيانات."] },
 "laravel-performance-measure-before-caching": { path: "/experience", en: ["My ", "Laravel development experience at Prokoders", " includes query optimization, Redis caching, profiling, and PHPUnit and k6 testing—the practical foundation for this article."], ar: ["تشمل ", "خبرتي في تطوير Laravel لدى Prokoders", " تحسين الاستعلامات وRedis وتحليل الأداء واختبارات PHPUnit وk6، وهي الأساس العملي لهذا المقال."] },
};

export default function ArticleContext({ slug, language }: { slug: string; language: "en" | "ar" }) {
 const context = contexts[slug];
 if (!context) return null;
 const [before, label, after] = context[language];
 return <p className="article-context">{before}<Link href={`${language === "ar" ? "/ar" : ""}${context.path}`}>{label}</Link>{after}</p>;
}
