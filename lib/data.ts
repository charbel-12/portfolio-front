export type Profile = { name: string; role: string; location: string; summary: string; email: string; phone: string; resumeHref: string; imageHref: string; github?: string; linkedin?: string };
export const profile: Profile = {
  name: "Charbel Mdawar", role: "Software Engineer", location: "Damascus, Syria",
  summary: "Backend engineering with a quality-first mindset. I build secure services, connect real-time systems, and lead the testing that helps teams ship with confidence.",
  email: "charbel.mdawar45@gmail.com", phone: "+963 998 173 418",
  resumeHref: "/Charbel_Mdawar.pdf", imageHref: "/charbel-mdawar.jpg",
};
export const hero = { headline: "Building secure systems.", accent: "Delivering reliable software.", specialties: ["Java & Spring Boot", "Laravel", "Quality Engineering"] };
export const skillGroups = [
  { label: "Backend development", description: "Secure services and the business logic behind them.", items: ["Java 21", "Spring Boot", "Spring Security", "REST APIs", "PHP", "Laravel"] },
  { label: "Identity & integrations", description: "Connected applications with thoughtful access control.", items: ["OAuth 2.0", "SAML", "JWT", "Payment gateways", "WebSockets"] },
  { label: "Quality engineering", description: "Test strategies that turn requirements into release confidence.", items: ["Test planning", "Playwright", "Postman", "PHPUnit", "Regression testing"] },
  { label: "Performance & security", description: "Validation under load and across application attack surfaces.", items: ["k6", "JMeter", "Burp Suite", "OWASP ZAP", "Access-control testing"] },
  { label: "Data & messaging", description: "Persistence, caching, and asynchronous communication.", items: ["Oracle", "MySQL", "Redis", "Kafka", "RabbitMQ"] },
  { label: "DevOps & delivery", description: "Reliable environments and practical production troubleshooting.", items: ["Docker", "GitLab CI/CD", "Git", "Linux", "Nginx", "SSL/TLS"] },
];
export type Experience = { role: string; company: string; period: string; summary: string; points: string[]; stack: string[] };
export const experience: Experience[] = [
  { role: "QA Manager", company: "IXCoders", period: "Dec 2025 — Present", summary: "Leading quality across web applications, APIs, and backend services.", points: ["Lead manual, automated, performance, and security testing, with functional, integration, regression, and exploratory coverage.", "Assess authentication, authorization, session management, and common OWASP risks; coordinate remediation with developers.", "Validate reliability under load and communicate risks and release readiness to stakeholders."], stack: ["QA leadership", "Test strategy", "Security testing", "Performance testing"] },
  { role: "Java Spring Developer / Team Lead", company: "Prokoders", period: "Jan 2025 — Nov 2025", summary: "Building enterprise identity and payment services with Java and Spring Boot.", points: ["Led a centralized SSO platform with Java 21, Spring Boot, Spring Security, OAuth 2.0, SAML, and JWT.", "Designed secure APIs and identity workflows covering roles, OTP, device trust, and audit-focused controls.", "Architected gateway integrations for checkout, capture, webhooks, and payment links with resilient error handling.", "Supported Oracle, Kafka events, WebSocket notifications, CI/CD, and Linux production troubleshooting."], stack: ["Java 21", "Spring Boot", "OAuth 2.0 / SAML", "Oracle", "Kafka"] },
  { role: "Laravel Developer", company: "Prokoders", period: "May 2024 — Nov 2025", summary: "Delivering real-time applications and improving performance across the stack.", points: ["Developed Laravel applications and reusable Blade components with WebSockets and Laravel Reverb.", "Maintained Nginx, SSL/TLS, caching headers, and deployment environments.", "Improved performance through query optimization, Redis caching, profiling, and targeted refactoring.", "Built PHPUnit and k6 tests to validate code quality and behavior under load."], stack: ["Laravel", "Blade", "Reverb", "Nginx", "PHPUnit", "k6"] },
  { role: "Quality Assurance Specialist", company: "ecmarkt.com", period: "Mar 2023 — Apr 2024", summary: "Validating APIs and web interfaces from business rules to security.", points: ["Tested REST APIs with Postman for data integrity, business rules, error handling, and database integration.", "Performed functional, responsive, cross-browser, and form-validation testing.", "Conducted baseline security tests with OWASP ZAP and manual techniques; documented reproducible defects and verified fixes."], stack: ["Postman", "OWASP ZAP", "API testing", "Regression testing"] },
];
export type Project = { name: string; tagline: string; status: string; description: string; highlights: { title: string; detail: string }[]; stack: string[]; architecture?: boolean; href?: string; secondary?: boolean };
export const projects: Project[] = [
  { name: "CallX", tagline: "Multi-tenant SaaS call center platform", status: "In active development", architecture: true,
    description: "A call center platform connecting real-time calling with the customer and organizational workflows behind every conversation.",
    highlights: [
      { title: "Real-time calling", detail: "Spring Boot, LiveKit, and WebRTC power calling, IVR flows, DTMF handling, and live queues. WebSocket/STOMP handles signaling; Firebase Cloud Messaging notifies offline agents." },
      { title: "Business operations", detail: "A separate core backend manages tenants, users, roles, presence, CRM, and HR. Customer timelines automatically capture call activity." },
      { title: "Connected architecture", detail: "Oracle stores business data, RabbitMQ carries asynchronous events, and Redis supports hot-path data. A Python LiveKit Agent integrates ElevenLabs text-to-speech." },
    ], stack: ["Spring Boot", "LiveKit / WebRTC", "Oracle", "RabbitMQ", "Redis", "WebSocket / STOMP"] },
  { name: "Brag CRM", tagline: "Customer relationship management", status: "CRM project", href: "https://brag-sa.com/",
    description: "A CRM project for Al-Barq Al-Mudee, a Saudi telecommunications retailer offering smart devices, installment programs, and after-sales services.",
    highlights: [
      { title: "Digital storefront", detail: "Built around a catalog of phones, smartwatches, gaming devices, and accessories with product-led browsing." },
      { title: "Flexible financing", detail: "Presents installment programs designed to make current devices accessible without an upfront payment." },
      { title: "Customer experience", detail: "Connects product discovery with support, warranty, maintenance, and direct customer contact." },
    ], stack: ["CRM", "Telecommunications", "Device retail", "Customer support"] },
  { name: "Al-Ahlam ERP & Manufacturing System", tagline: "Food production & enterprise operations", status: "Quality assurance", href: "https://www.linkedin.com/company/alahlamsy",
    description: "Al-Ahlam is a Syrian food manufacturer and exporter established in 1974. Its ERP and manufacturing system supports the business and production workflows behind a broad range of food products.",
    highlights: [
      { title: "End-to-end validation", detail: "Led validation of ERP and manufacturing workflows for a large food producer." },
      { title: "Business-rule coverage", detail: "Focused on business rules across enterprise and production processes." },
      { title: "Data integrity", detail: "Validated data integrity to reduce operational risk." },
    ], stack: ["ERP", "Manufacturing", "Business-rule testing", "Data integrity"] },
  { name: "Salaza ERP, CRM & HR", tagline: "Multi-branch salon operations", status: "Quality assurance", href: "https://salazagroup.com/",
    description: "Salaza Group provides hair, beauty, nail, and bridal services through 16 salons across Syria, the UAE, and Iraq. The project covers enterprise, customer, and workforce operations across branches.",
    highlights: [
      { title: "Business operations", detail: "Validated multi-branch business workflows across the ERP system." },
      { title: "Customers & workforce", detail: "Tested customer-management and HR workflows supporting salon operations." },
      { title: "Release confidence", detail: "Improved release confidence across a network of 16 salons in three countries." },
    ], stack: ["ERP", "CRM", "HR", "Multi-branch testing"] },
  { name: "El-Salleh E-Commerce", tagline: "Everyday shopping & grocery delivery", status: "Quality assurance", href: "https://el-salleh.com/",
    description: "El-Salleh is a Syrian shopping and delivery platform connecting households with everyday essentials through a digital catalog and home delivery.",
    highlights: [
      { title: "Shopping journeys", detail: "Tested catalog browsing, cart behavior, and ordering journeys." },
      { title: "Coverage & delivery", detail: "Validated store coverage and delivery journeys across the shopping experience." },
      { title: "Order accuracy", detail: "Focused on protecting order accuracy and providing a more reliable grocery-shopping experience." },
    ], stack: ["E-commerce", "Cart & checkout", "Delivery", "Journey testing"] },
  { name: "GoPal", tagline: "Children’s activities & family experiences", status: "Quality assurance", href: "https://gopalsa.com/",
    description: "GoPal helps families in Saudi Arabia discover and book sports, arts, and educational activities. Child assessments guide recommendations, while STC Qitaf integration enables loyalty-point bookings.",
    highlights: [
      { title: "Family journeys", detail: "Validated child profiles, activity discovery, and booking workflows." },
      { title: "Provider operations", detail: "Tested provider workflows to strengthen reliability for activity centers." },
      { title: "Assessments & loyalty", detail: "Validated assessment outputs and loyalty integration for a dependable family experience." },
    ], stack: ["Activity booking", "Child profiles", "Assessments", "Loyalty integration"] },
  { name: "Smo Al Mosafer", tagline: "Transport booking & service requests", status: "Quality assurance", href: "https://smoalmosafer.sa/",
    description: "A transport booking and service-request platform connecting customer trip journeys with operational workflows.",
    highlights: [
      { title: "Transport booking", detail: "Tested booking journeys and trip creation across customer-facing features." },
      { title: "Service requests", detail: "Validated service-request journeys across customer and operational workflows." },
      { title: "Release reliability", detail: "Focused on reducing release risk in trip creation and customer-facing features." },
    ], stack: ["Transport", "Booking", "Service requests", "Workflow validation"] },
  { name: "CryptoX", tagline: "Crypto trading platform", status: "May 2025 — Mar 2026", secondary: true,
    description: "A Laravel application bringing the platform backend, customer workflows, and web interface together.",
    highlights: [
      { title: "Application development", detail: "Developed the backend with Laravel and built the web interface using reusable Blade templates." },
      { title: "Crypto payments", detail: "Integrated a cryptocurrency payment method to support payment workflows within the platform." },
      { title: "Customer management", detail: "Implemented CRM functionality to organize customer information and related business activities." },
    ], stack: ["Laravel", "PHP", "Blade", "Crypto payment integration", "CRM"] },
];
export const architecture = {
  caption: "Two backends. Clear responsibilities.",
  calling: ["LiveKit / WebRTC", "IVR & call queues", "WebSocket / STOMP"],
  core: ["Users & tenants", "Roles & presence", "CRM & HR"],
  contract: "Shared service-token contract",
  infrastructure: ["Oracle · persistence", "RabbitMQ · events", "Redis · hot-path data"],
};
export const about = [
  "My experience spans both building software and validating it. From testing APIs and web interfaces to leading authentication, payment, and quality initiatives, I bring a practical understanding of how systems behave beyond the happy path.",
  "I work across backend services, application security, performance, and delivery—collaborating with developers and stakeholders to make software more reliable from development through release.",
];
export const education = { degree: "Bachelor of Computer Science", school: "Damascus University", period: "2020 — 2025" };
export const languages = ["Arabic", "English"];
export const volunteering = { role: "Volunteer", organization: "RBCs Team", period: "2020 — 2025" };
