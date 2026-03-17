import { useState } from "react";
import { useNavigate } from "react-router";
import { Trees, Plus, UserCircle2, Inbox, CheckCircle2 } from "lucide-react";
import { DemoNav } from "@/app/components/DemoNav";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

interface ProjectProposal {
  id: string;
  title: string;
  company: string;
  duration: string;
  topic: string;
  ndaRequired: boolean;
  imageUrl: string;
  imageGradient: string;
  detail: string;
}

const PROPOSAL_TOPIC_FILTERS = ["Software", "Service Design", "Data Analytics", "AI"];

const projectProposals: ProjectProposal[] = [
  {
    id: "proj-1",
    company: "Konecranes Ltd.",
    title: "Predictive Maintenance Algorithm",
    detail: "12 Weeks \u2022 Software Engineering",
    duration: "12 Weeks",
    topic: "Software",
    ndaRequired: true,
    imageUrl: "https://images.unsplash.com/photo-1762889597634-264f0907820b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY3JhbmUlMjBtYWNoaW5lcnklMjBlbmdpbmVlcmluZ3xlbnwxfHx8fDE3NzIzOTQ4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageGradient: "linear-gradient(135deg, #2d5a47 0%, #4a7c5d 100%)",
  },
  {
    id: "proj-2",
    company: "Nordea Bank",
    title: "Customer Behavior Analytics Dashboard",
    detail: "10 Weeks \u2022 Data Analytics",
    duration: "10 Weeks",
    topic: "Data Analytics",
    ndaRequired: false,
    imageUrl: "https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwc2NyZWVufGVufDF8fHx8MTc3MjM3NjI5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: "proj-3",
    company: "Supercell",
    title: "AI-Powered Content Moderation",
    detail: "14 Weeks \u2022 AI",
    duration: "14 Weeks",
    topic: "AI",
    ndaRequired: true,
    imageUrl: "https://images.unsplash.com/photo-1761223956849-c6912f2179aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBSSUyMGFydGlmaWNpYWwlMjBpbnRlbGxpZ2VuY2UlMjBhYnN0cmFjdCUyMG5ldXJhbHxlbnwxfHx8fDE3NzIzOTQ4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageGradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
  {
    id: "proj-4",
    company: "W\u00e4rtsil\u00e4",
    title: "Supply Chain Optimization Tool",
    detail: "12 Weeks \u2022 Software Engineering",
    duration: "12 Weeks",
    topic: "Software",
    ndaRequired: false,
    imageUrl: "https://images.unsplash.com/photo-1619070284836-e850273d69ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBwbHklMjBjaGFpbiUyMGxvZ2lzdGljcyUyMHdhcmVob3VzZXxlbnwxfHx8fDE3NzIzNjEyNDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: "proj-5",
    company: "YLE",
    title: "Real-Time Sentiment Analysis",
    detail: "8 Weeks \u2022 AI",
    duration: "8 Weeks",
    topic: "AI",
    ndaRequired: false,
    imageUrl: "https://images.unsplash.com/photo-1760895653496-b28ed02f3705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9hZGNhc3QlMjBtZWRpYSUyMHN0dWRpbyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyMzk0ODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageGradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  },
  {
    id: "proj-6",
    company: "Nokia",
    title: "IoT Device Management Platform",
    detail: "16 Weeks \u2022 Software Engineering",
    duration: "16 Weeks",
    topic: "Software",
    ndaRequired: true,
    imageUrl: "https://images.unsplash.com/photo-1746017187853-936e4c4e4895?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJb1QlMjBzbWFydCUyMGRldmljZSUyMGNpcmN1aXQlMjBib2FyZHxlbnwxfHx8fDE3NzIzOTQ4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    imageGradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  },
];

export function CourseGallery() {
  const navigate = useNavigate();
  const [activeProposalFilter, setActiveProposalFilter] = useState<string | null>(null);

  const filteredProposals = activeProposalFilter
    ? projectProposals.filter((p) => p.topic === activeProposalFilter)
    : projectProposals;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafaf9", fontFamily: "Inter, sans-serif" }}>
      <DemoNav />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* My Courses Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1a2332", margin: 0, marginBottom: 6 }}>
                My Courses
              </h2>
              <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
                Manage your courses and review incoming industry proposals
              </p>
            </div>
            <button
              onClick={() => navigate("/teacher/course-builder")}
              className="flex items-center gap-2 transition-all"
              style={{
                padding: "10px 20px",
                backgroundColor: "#2d5a47",
                color: "#ffffff",
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#234739";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = "#2d5a47";
              }}
            >
              <Plus className="w-4 h-4" />
              Add New Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* CT60A9800 Capstone Project Course Card */}
            <div
              onClick={() => navigate("/teacher/courses/CT60A9800/proposals")}
              className="bg-white overflow-hidden group"
              style={{
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                padding: 24,
                cursor: "pointer",
                transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0, marginBottom: 4 }}>
                    CT60A9800 Capstone Project
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Spring 2024</p>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    backgroundColor: "rgba(45,90,71,0.1)",
                    color: "#2d5a47",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Inbox className="w-3 h-3" />
                  <span>7 New</span>
                </div>
              </div>
              <div className="flex items-center gap-4" style={{ fontSize: 13, color: "#6b7280" }}>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span>12 Approved</span>
                </div>
                <div>
                  <span>45 Students Enrolled</span>
                </div>
              </div>
            </div>

            {/* Additional Course Card Example */}
            <div
              className="bg-white overflow-hidden"
              style={{
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                padding: 24,
                opacity: 0.5,
                cursor: "not-allowed",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0, marginBottom: 4 }}>
                    CT50A6000 Software Engineering
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Fall 2024</p>
                </div>
                <div
                  className="flex items-center gap-2"
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    backgroundColor: "#f3f4f6",
                    color: "#9ca3af",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  <Inbox className="w-3 h-3" />
                  <span>0 New</span>
                </div>
              </div>
              <div className="flex items-center gap-4" style={{ fontSize: 13, color: "#6b7280" }}>
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  <span>8 Approved</span>
                </div>
                <div>
                  <span>32 Students Enrolled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────
            AVAILABLE PROJECT PROPOSALS — Airbnb-style Cards
            ───────────────────────────────────────────────── */}
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: "#1a2332", margin: 0, marginBottom: 6 }}>
            Available Project Proposals
          </h2>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0, marginBottom: 20 }}>
            Browse industry-sponsored projects and curate them for your course
          </p>

          {/* Topic Filter Bar */}
          <div className="flex items-center gap-3" style={{ marginBottom: 28 }}>
            {PROPOSAL_TOPIC_FILTERS.map((f) => {
              const active = activeProposalFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveProposalFilter(active ? null : f)}
                  className="transition-all"
                  style={{
                    padding: "8px 20px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 500,
                    backgroundColor: active ? "#2d5a47" : "#ffffff",
                    color: active ? "#ffffff" : "#4a4a4a",
                    border: active ? "1px solid #2d5a47" : "1px solid #e5e5e5",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#2d5a47";
                      (e.currentTarget as HTMLElement).style.color = "#2d5a47";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.borderColor = "#e5e5e5";
                      (e.currentTarget as HTMLElement).style.color = "#4a4a4a";
                    }
                  }}
                >
                  {f}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 32, justifyContent: "center" }}>
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="bg-white overflow-hidden group flex flex-col"
                style={{
                  width: 340,
                  height: 420,
                  borderRadius: 16,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.05)",
                  transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                }}
              >
                {/* Image Header — 140px */}
                <div
                  className="relative overflow-hidden"
                  style={{ height: 140, background: proposal.imageGradient }}
                >
                  <ImageWithFallback
                    src={proposal.imageUrl}
                    alt={proposal.title}
                    className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                  />
                  {/* Company Overlay Pill */}
                  <div className="absolute bottom-3 left-4">
                    <span
                      className="bg-white/95 text-gray-700 backdrop-blur-sm"
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 600,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      }}
                    >
                      {proposal.company}
                    </span>
                  </div>
                  {/* NDA Badge */}
                  <div className="absolute top-3 right-4">
                    <span
                      style={{
                        display: "inline-block",
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontSize: 10,
                        fontWeight: 700,
                        backgroundColor: proposal.ndaRequired ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)",
                        color: proposal.ndaRequired ? "#dc2626" : "#059669",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {proposal.ndaRequired ? "NDA Required" : "No NDA"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{ padding: "16px 20px 0 20px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}
                >
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: "#111827", lineHeight: 1.3, margin: 0 }}>
                    {proposal.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                    {proposal.detail}
                  </p>
                </div>

                {/* Card Footer — Pinned to bottom */}
                <div style={{ padding: "12px 20px 20px 20px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/company/overview/${proposal.id}`);
                    }}
                    className="w-full transition-all"
                    style={{
                      height: 44,
                      borderRadius: 12,
                      fontSize: 14,
                      fontWeight: 500,
                      backgroundColor: "#2d5a47",
                      color: "#ffffff",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#234739";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(45,90,71,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "#2d5a47";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    View Project Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProposals.length === 0 && (
            <div className="text-center py-20">
              <p style={{ fontSize: 14, color: "#6b7280" }}>No proposals match your filters.</p>
            </div>
          )}
        </div>

        {/* Bottom spacer for DemoNav */}
        <div style={{ height: 100 }} />
      </div>
    </div>
  );
}
