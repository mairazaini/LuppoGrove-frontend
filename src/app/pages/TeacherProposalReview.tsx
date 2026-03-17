import { useState } from "react";
import { Trees, Check, MessageSquare, Sparkles, X, Mail, Linkedin, ExternalLink } from "lucide-react";
import { DemoNav } from "@/app/components/DemoNav";
import { useNavigate, useParams } from "react-router";

/* ═══════════════════════════════════════════════════════════
   PROPOSAL DATA — keyed by proposalId
   ═══════════════════════════════════════════════════════════ */
interface ProposalReviewData {
  title: string;
  company: string;
  contacts: { name: string; initials: string; role: string; email: string; linkedin: string }[];
  sections: { heading: string; content: string }[];
  nda: string;
}

const PROPOSALS_DB: Record<string, ProposalReviewData> = {
  "1": {
    title: "Code Ananas: AI-Powered Food Waste Reduction App",
    company: "Code Ananas Oy",
    contacts: [
      { name: "Tekla Wannas", initials: "TW", role: "Product Owner", email: "tekla.wannas@codeananas.fi", linkedin: "https://linkedin.com/in/teklawannas" },
      { name: "Roope Vuorinen", initials: "RV", role: "Technical Lead", email: "roope.vuorinen@codeananas.fi", linkedin: "https://linkedin.com/in/roopevuorinen" },
    ],
    nda: "LUT NDA Required",
    sections: [
      { heading: "1. Introduction (Business view & end users)", content: "Code Ananas Oy is developing an intelligent mobile application designed to combat household food waste through predictive expiration tracking and personalized recipe recommendations. The platform targets environmentally-conscious consumers aged 25-45 who seek practical tools to reduce their carbon footprint while saving money on groceries. Our solution integrates computer vision for receipt scanning, machine learning for consumption pattern analysis, and a community-driven recipe database to transform how families manage their kitchen inventory." },
      { heading: "2. Project Goals (MVP scope)", content: "The student team will deliver a functional MVP consisting of three core modules: (1) a mobile-responsive web application with user authentication and profile management, (2) an inventory tracking system with manual entry and camera-based receipt OCR, and (3) an expiration notification engine that sends timely alerts via push notifications. The deliverable must include comprehensive unit tests achieving 80% code coverage, responsive design supporting iOS Safari and Android Chrome, and full deployment to Azure App Service with CI/CD pipelines established through GitHub Actions." },
      { heading: "3. Technologies", content: "Frontend: React 18 with TypeScript, Tailwind CSS for styling, and Progressive Web App (PWA) capabilities for mobile installation.\n\nBackend: Node.js 20 with Express.js framework, PostgreSQL 15 for relational data storage, and Azure Blob Storage for image assets.\n\nCloud Infrastructure: Azure App Service for hosting, Azure Computer Vision API for OCR processing, and Azure DevOps for project management and sprint tracking." },
      { heading: "4. Requirements for Students", content: "Team Size: 4-5 students with diverse skill sets.\n\nTechnical Prerequisites: Proficiency in JavaScript/TypeScript, experience with React or similar component frameworks, understanding of RESTful API design, and familiarity with Git version control. Previous exposure to cloud platforms (preferably Azure) is beneficial but not mandatory.\n\nCommitment: Weekly 2-hour sprint meetings with the product owner, 12-week project timeline with milestone deliverables every 3 weeks, and final presentation to Code Ananas executive team." },
      { heading: "5. Legal Issues (IPR & NDA specifics)", content: "Intellectual Property Rights: All code developed during the project will be jointly owned by LUT University and Code Ananas Oy, with Code Ananas holding commercial exploitation rights and LUT retaining academic publication rights.\n\nNon-Disclosure Agreement: Students and supervising faculty must sign the LUT Standard NDA (Template #LUT-2024-TECH) before accessing proprietary business documentation. The NDA remains in effect for 2 years post-project completion.\n\nData Privacy: The project will handle simulated user data only; no real customer information will be accessible to the student team during development." },
      { heading: "6. Client (Company details & Product Owner)", content: "Company: Code Ananas Oy, a sustainability-focused software startup based in Lappeenranta, Finland. Founded in 2023.\n\nProduct Owner: Antti Virtanen, CTO & Co-Founder (antti.virtanen@codeananas.fi). 8 years of experience in mobile application development.\n\nAvailability: Bi-weekly sprint reviews (Tuesdays 14:00-16:00 EET), asynchronous Slack communication, and on-site visit during Week 6 milestone demo." },
    ],
  },
  "2": {
    title: "Lovnity: Post-Tinder Relationship Platform MVP",
    company: "Lovnity Oy",
    contacts: [
      { name: "Tomi Verkkomäki", initials: "TV", role: "Founder & CEO", email: "tomi@lovnity.fi", linkedin: "https://linkedin.com/in/tomiverkkomaki" },
    ],
    nda: "No NDA Required",
    sections: [
      { heading: "1. Introduction (Business view & end users)", content: "Lovnity Oy is building a social platform that helps couples who met through dating apps transition into long-term relationships. The platform provides structured relationship milestones, shared goal tracking, and community support features. Target users are couples aged 22-35 who met online and want intentional tools for relationship growth." },
      { heading: "2. Project Goals (MVP scope)", content: "Build a web application with user authentication, couple pairing system, milestone tracker with gamification, and a community forum. The MVP should support 100 concurrent users and include analytics for relationship health metrics." },
      { heading: "3. Technologies", content: "Frontend: React with TypeScript. Backend: Python/Django REST Framework. Database: PostgreSQL. Hosting: Heroku or similar PaaS." },
      { heading: "4. Requirements for Students", content: "Team of 4-5 students with full-stack web development experience. Familiarity with agile methodologies required." },
      { heading: "5. Legal Issues (IPR & NDA specifics)", content: "No NDA required. Open-source components allowed. IPR shared between university and company." },
      { heading: "6. Client (Company details & Product Owner)", content: "Lovnity Oy, early-stage startup based in Helsinki. Product Owner: Tomi Verkkomäki, available for weekly meetings." },
    ],
  },
  "3": {
    title: "ReEmber: Automating Retail Inventory with Computer Vision",
    company: "ReEmber Oy",
    contacts: [
      { name: "Oona Linna", initials: "OL", role: "CTO", email: "oona.linna@reember.fi", linkedin: "https://linkedin.com/in/oonalinna" },
    ],
    nda: "Custom Company NDA Required",
    sections: [
      { heading: "1. Introduction (Business view & end users)", content: "ReEmber Oy provides AI-powered inventory management for retail chains. The project focuses on using computer vision to automate shelf stock monitoring, reducing manual audit time by 80%." },
      { heading: "2. Project Goals (MVP scope)", content: "Develop a prototype CV pipeline for shelf image analysis, including object detection, stock level estimation, and integration with existing POS systems." },
      { heading: "3. Technologies", content: "PyTorch for CV models, Next.js for dashboard, AWS for cloud infrastructure, and a REST API for POS integration." },
      { heading: "4. Requirements for Students", content: "Team of 5-6 students with strong ML/CV background. Experience with AWS is a plus." },
      { heading: "5. Legal Issues (IPR & NDA specifics)", content: "Custom NDA required due to proprietary retail data and algorithms. Students must sign before accessing training datasets." },
      { heading: "6. Client (Company details & Product Owner)", content: "ReEmber Oy, based in Tampere. Series A funded. PO: Oona Linna, available bi-weekly." },
    ],
  },
  "4": {
    title: "Keys2Balance: Training & Assessment Platform",
    company: "Keys2Balance Oy",
    contacts: [
      { name: "Carita Nyberg", initials: "CN", role: "CEO", email: "carita@keys2balance.fi", linkedin: "https://linkedin.com/in/caritanyberg" },
    ],
    nda: "No NDA Required",
    sections: [
      { heading: "1. Introduction", content: "Keys2Balance develops physical training assessment tools for healthcare professionals. The platform needs a web-based interface for creating and managing training programs." },
      { heading: "2. Project Goals", content: "Build a responsive web app with exercise library, assessment forms, and progress tracking for patients." },
      { heading: "3. Technologies", content: "Full-stack web development, integration with existing Wix-based website." },
      { heading: "4. Requirements for Students", content: "3-4 students with web development skills." },
      { heading: "5. Legal Issues", content: "No NDA required. Standard university IP agreement applies." },
      { heading: "6. Client", content: "Keys2Balance Oy, Lappeenranta. PO: Carita Nyberg." },
    ],
  },
  "5": {
    title: "Virnex: Aihana Mobile Invoice Approval App",
    company: "Virnex",
    contacts: [
      { name: "Tom Gustafsson", initials: "TG", role: "Project Manager", email: "tom.gustafsson@virnex.fi", linkedin: "https://linkedin.com/in/tomgustafsson" },
    ],
    nda: "Standard LUT NDA Required",
    sections: [
      { heading: "1. Introduction", content: "Virnex provides enterprise software solutions. The Aihana project aims to create a mobile-first invoice approval workflow for SME customers." },
      { heading: "2. Project Goals", content: "Build a React Native mobile app with invoice scanning, approval workflows, and REST API integration with existing ERP systems." },
      { heading: "3. Technologies", content: "React Native, REST API, backend integration with existing Virnex services." },
      { heading: "4. Requirements for Students", content: "4-5 students with mobile development experience." },
      { heading: "5. Legal Issues", content: "Standard LUT NDA required for API documentation access." },
      { heading: "6. Client", content: "Virnex, enterprise software company. PO: Tom Gustafsson." },
    ],
  },
  "6": {
    title: "Peikko: 3D Step-file Converter SaaS",
    company: "Peikko Group",
    contacts: [
      { name: "Sampo Pilli-Sihvola", initials: "SP", role: "R&D Engineer", email: "sampo.pilli-sihvola@peikko.com", linkedin: "https://linkedin.com/in/sampopillisihvola" },
    ],
    nda: "Custom Company NDA Required",
    sections: [
      { heading: "1. Introduction", content: "Peikko Group manufactures concrete connections and composite structures. They need a web-based tool to convert 3D STEP files for customer use." },
      { heading: "2. Project Goals", content: "Develop a SaaS application using Blazor C# that converts and simplifies 3D STEP files for non-technical customers." },
      { heading: "3. Technologies", content: "Blazor C#, Azure cloud, 3D file processing libraries." },
      { heading: "4. Requirements for Students", content: "5-6 students with C# and 3D graphics experience." },
      { heading: "5. Legal Issues", content: "Custom NDA required. Proprietary file formats and conversion algorithms are confidential." },
      { heading: "6. Client", content: "Peikko Group, multinational corporation headquartered in Lahti. PO: Sampo Pilli-Sihvola." },
    ],
  },
};

const DEFAULT_REVIEW = PROPOSALS_DB["1"];

export function TeacherProposalReview() {
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showApproveSuccess, setShowApproveSuccess] = useState(false);

  const proposal = PROPOSALS_DB[proposalId ?? ""] ?? DEFAULT_REVIEW;

  const checklistItems = [
    { id: 1, text: "1. Introduction" },
    { id: 2, text: "2. Project Goals" },
    { id: 3, text: "3. Technologies" },
    { id: 4, text: "4. Student Requirements" },
    { id: 5, text: "5. Legal Issues", sublabel: `Status: ${proposal.nda}` },
    { id: 6, text: "6. Client Info" },
  ];

  const handleApprove = () => {
    setShowApproveSuccess(true);
    setTimeout(() => {
      navigate("/teacher/courses/CT60A9800/proposals");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-[#fafaf9]">
      <DemoNav />

      <div className="flex-1 flex flex-col">
        {/* Top Header Navigation */}
        <header className="bg-white border-b border-[#eaeaea] h-20 flex items-center justify-between px-10 sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Trees className="w-6 h-6 text-primary" strokeWidth={1.5} />
              <span className="text-lg font-medium text-foreground">LuppoGrove</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <button
                onClick={() => navigate("/teacher")}
                className="hover:text-foreground cursor-pointer"
              >
                Courses
              </button>
              <span>/</span>
              <button
                onClick={() => navigate("/teacher/courses/CT60A9800/proposals")}
                className="hover:text-foreground cursor-pointer"
              >
                CT60A9800 Capstone Project
              </button>
              <span>/</span>
              <span className="text-foreground font-medium">Proposal Review</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Prof. Maria Paasivaara</p>
              <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                Course Coordinator
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-semibold">
              MP
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="flex-1 p-10">
          <div className="max-w-[1600px] mx-auto grid grid-cols-[65%_35%] gap-8">
            {/* LEFT COLUMN - Proposal Document */}
            <div className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] p-12">
              <h1 className="text-[32px] font-bold text-foreground mb-8 leading-tight">
                {proposal.title}
              </h1>

              <div className="space-y-8">
                {proposal.sections.map((section, idx) => (
                  <section key={idx}>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">
                      {section.heading}
                    </h2>
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </section>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN - Checklist & Actions */}
            <div className="space-y-6">
              {/* AI Compliance Checklist */}
              <div className="bg-white rounded-xl border border-[#eaeaea] p-6">
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">
                      CT60A9800 Template Compliance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      The AI assistant successfully mapped the company's idea to your course requirements.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {checklistItems.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#2d5a47] flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">{item.text}</p>
                        {item.sublabel && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                            {item.sublabel}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coordinator Actions */}
              <div className="bg-white rounded-xl border border-[#eaeaea] p-6 sticky top-28">
                <h3 className="text-base font-semibold text-gray-900 mb-4">
                  Coordinator Actions
                </h3>
                <div className="space-y-3">
                  {showApproveSuccess ? (
                    <div className="flex items-center justify-center gap-2 py-3 bg-green-50 text-green-700 rounded-xl border border-green-200">
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                      <span className="text-sm font-medium">Published to Marketplace!</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleApprove}
                      className="w-full px-5 py-3 bg-[#2d5a47] text-white rounded-xl hover:bg-[#234538] transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Check className="w-4 h-4" strokeWidth={2.5} />
                      Approve & Publish to Marketplace
                    </button>
                  )}
                  <button
                    onClick={() => setShowContactPopup(true)}
                    className="w-full px-5 py-3 bg-white border border-[#eaeaea] text-gray-700 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <MessageSquare className="w-4 h-4" strokeWidth={1.5} />
                    Request Revisions from Company
                  </button>
                </div>

                <p className="text-[10px] text-gray-400 mt-3 leading-relaxed">
                  Revision requests direct you to the company's external contact details.
                  LuppoGrove does not provide in-app messaging.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ═══════════════════════════════════════════════════════
          CONTACT POPUP MODAL
          ═══════════════════════════════════════════════════════ */}
      {showContactPopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}
          onClick={() => setShowContactPopup(false)}
        >
          <div
            className="bg-white relative"
            style={{
              width: 460,
              borderRadius: 20,
              padding: 36,
              boxShadow: "0 24px 64px rgba(0,0,0,0.12)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowContactPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X size={16} color="#6b7280" />
            </button>

            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 8 }}>
              Contact the Company
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0, marginBottom: 24, lineHeight: 1.5 }}>
              LuppoGrove is not a communication tool. Please use the contact details below to request revisions via email or LinkedIn.
            </p>

            {/* Contact Cards — Dynamic from proposal data */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {proposal.contacts.map((contact) => (
                <div
                  key={contact.email}
                  style={{
                    padding: "16px 20px",
                    borderRadius: 12,
                    backgroundColor: "#fafaf9",
                    border: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="shrink-0 rounded-full bg-[#2d5a47]/10 text-[#2d5a47] flex items-center justify-center"
                      style={{ width: 40, height: 40, fontSize: 13, fontWeight: 600 }}
                    >
                      {contact.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>
                        {contact.name}
                      </p>
                      <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                        {proposal.company} — {contact.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-[52px]">
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#2d5a47] hover:text-[#2d5a47] transition-all"
                      style={{ fontSize: 12, fontWeight: 500, color: "#374151", textDecoration: "none" }}
                    >
                      <Mail size={13} strokeWidth={1.5} />
                      {contact.email}
                    </a>
                    <a
                      href={contact.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#0077b5] hover:text-[#0077b5] transition-all"
                      style={{ fontSize: 12, fontWeight: 500, color: "#374151", textDecoration: "none" }}
                    >
                      <Linkedin size={13} strokeWidth={1.5} />
                      LinkedIn
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <p style={{ fontSize: 10, color: "#9ca3af", margin: "16px 0 0 0", textAlign: "center" }}>
              All communication happens on external third-party platforms
            </p>
          </div>
        </div>
      )}
    </div>
  );
}