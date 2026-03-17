import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { 
  Trees, 
  BookOpen, 
  FileText, 
  FolderOpen,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Upload,
  FileIcon,
  Eye
} from "lucide-react";
import { DemoNav } from "@/app/components/DemoNav";

// Company Active Projects & Submissions - Moodle-style Interface for B2B Users

interface TeacherRequest {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "pending" | "completed";
  submittedFile?: {
    name: string;
    submittedOn: string;
  };
}

interface ProjectData {
  title: string;
  teacher: string;
  sponsor: string;
  currentWeek: number;
  totalWeeks: number;
  requests: TeacherRequest[];
}

/* ═══════════════════════════════════════════════════════════
   PROJECT DATA — keyed by projectId, aligned with ActiveProjects Fall 2026
   ═══════════════════════════════════════════════════════════ */
const PROJECT_DB: Record<string, ProjectData> = {
  "1": {
    title: "LUT Capstone: Software Engineering",
    teacher: "Prof. Jonas Hämäläinen",
    sponsor: "Konecranes",
    currentWeek: 4,
    totalWeeks: 18,
    requests: [
      {
        id: "1",
        title: "Project Plan & NDA Sign-off",
        description: "Upload the signed NDA documents and initial project plan with team role assignments and sprint schedule",
        deadline: "Sep 15, 2026",
        status: "pending",
      },
      {
        id: "2",
        title: "Architecture Review Document",
        description: "Upload the system architecture diagram showing data flow, component interactions, and technology stack decisions",
        deadline: "Oct 1, 2026",
        status: "pending",
      },
      {
        id: "3",
        title: "Team Registration Confirmation",
        description: "Confirm final team composition with student IDs and role assignments",
        deadline: "Aug 25, 2026",
        status: "completed",
        submittedFile: {
          name: "Team_Registration_LUT.pdf",
          submittedOn: "Aug 24, 2026",
        },
      },
    ],
  },
  "2": {
    title: "Aalto: Software Engineering Project",
    teacher: "Dr. Maria Rantanen",
    sponsor: "Konecranes",
    currentWeek: 7,
    totalWeeks: 18,
    requests: [
      {
        id: "1",
        title: "Mid-term Review Presentation",
        description: "Prepare and upload the mid-term review slide deck covering progress, blockers, and updated timeline",
        deadline: "Oct 28, 2026",
        status: "pending",
      },
      {
        id: "2",
        title: "Sprint Retrospective Report",
        description: "Summary of sprints 1-3 with velocity charts and burndown analysis",
        deadline: "Oct 15, 2026",
        status: "pending",
      },
      {
        id: "3",
        title: "Team Selection Confirmation",
        description: "Final team allocation with student preferences and skill mapping",
        deadline: "Sep 22, 2026",
        status: "completed",
        submittedFile: {
          name: "team-selection-v2.pdf",
          submittedOn: "Sep 20, 2026",
        },
      },
    ],
  },
  "3": {
    title: "Helsinki: OHTU — Software Production",
    teacher: "Prof. Antti Salminen",
    sponsor: "Konecranes",
    currentWeek: 5,
    totalWeeks: 10,
    requests: [
      {
        id: "1",
        title: "Sprint Review Documentation",
        description: "Upload sprint review notes including demo recording link, completed user stories, and customer feedback",
        deadline: "Oct 22, 2026",
        status: "pending",
      },
      {
        id: "2",
        title: "Team Allocation Confirmation",
        description: "Confirm final team allocation with student assignments",
        deadline: "Sep 22, 2026",
        status: "completed",
        submittedFile: {
          name: "allocation-confirmation.pdf",
          submittedOn: "Sep 21, 2026",
        },
      },
    ],
  },
};

const DEFAULT_PROJECT: ProjectData = PROJECT_DB["1"];

/* ═══════════════════════════════════════════════════════════
   NAV ITEMS
   ═══════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "browse", label: "Browse Courses", icon: BookOpen, path: "/company" },
  { id: "proposals", label: "My Proposals", icon: FileText, path: "/company/proposals" },
  { id: "projects", label: "Active Projects", icon: FolderOpen, path: "/company/projects", notif: true },
];

export function ProjectWorkspace() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File>>({});
  const [dragActive, setDragActive] = useState<Record<string, boolean>>({});

  const project = PROJECT_DB[projectId ?? ""] ?? DEFAULT_PROJECT;
  const progressPercentage = Math.round((project.currentWeek / project.totalWeeks) * 100);

  const pendingRequests = project.requests.filter(req => req.status === "pending");
  const completedRequests = project.requests.filter(req => req.status === "completed");

  const handleFileUpload = (requestId: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [requestId]: file }));
  };

  const handleDragEnter = (requestId: string) => {
    setDragActive(prev => ({ ...prev, [requestId]: true }));
  };

  const handleDragLeave = (requestId: string) => {
    setDragActive(prev => ({ ...prev, [requestId]: false }));
  };

  const handleDrop = (requestId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(prev => ({ ...prev, [requestId]: false }));
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(requestId, files[0]);
    }
  };

  const handleFileSelect = (requestId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(requestId, files[0]);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#fafaf9]" style={{ fontFamily: "Inter, sans-serif" }}>
      <DemoNav />

      {/* Sidebar — 260px Fixed (consistent with other views) */}
      <aside
        className="fixed left-0 top-0 h-screen flex flex-col bg-white z-20"
        style={{ width: 260, padding: 24, borderRight: "1px solid #e8e8e6" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-10">
          <Trees className="w-6 h-6 text-[#2d5a47]" strokeWidth={1.5} />
          <span
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#2d5a47",
              letterSpacing: "-0.02em",
            }}
          >
            LuppoGrove
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = item.id === "projects";
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative ${
                  active
                    ? "bg-[#2d5a47] text-white"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                }`}
                style={{ fontSize: 14, fontWeight: active ? 500 : 400 }}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                <span className="flex-1 text-left">{item.label}</span>
                {item.notif && !active && (
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3">
            <div
              className="shrink-0 rounded-full bg-[#2d5a47]/8 text-[#2d5a47] flex items-center justify-center"
              style={{ width: 32, height: 32, fontSize: 11, fontWeight: 600 }}
            >
              EK
            </div>
            <div className="flex-1 min-w-0">
              <p style={{ fontSize: 13, fontWeight: 600, color: "#111827", margin: 0 }}>
                Elina K.
              </p>
              <p style={{ fontSize: 12, fontWeight: 400, color: "#6b7280", margin: 0 }}>
                Konecranes Ltd.
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ marginLeft: 260, flex: 1, minHeight: "100vh" }}>
        <div style={{ padding: "40px 40px 120px 40px", maxWidth: 1200 }}>
          {/* Breadcrumb */}
          <button
            onClick={() => navigate("/company/projects")}
            className="flex items-center gap-2 transition-colors group"
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "#6b7280",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginBottom: 24,
            }}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" strokeWidth={1.5} />
            Back to Active Projects
          </button>

          {/* Main Content Header */}
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#111827",
                margin: 0,
                marginBottom: 6,
              }}
            >
              {project.title}
            </h1>
            <p
              style={{
                fontSize: 15,
                fontWeight: 400,
                color: "#6b7280",
                margin: 0,
              }}
            >
              Sponsored by {project.sponsor} &bull; Teacher: {project.teacher}
            </p>
          </div>

          {/* Project Tracking Card */}
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.05)",
              padding: 32,
            }}
          >
            {/* Progress Header */}
            <div className="flex items-center justify-between" style={{ marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: "#6b7280", margin: 0, marginBottom: 4 }}>
                  Overall Progress
                </p>
                <div className="flex items-center gap-3">
                  <div style={{ width: 240, height: 6, backgroundColor: "#f0f0ed", borderRadius: 3, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${progressPercentage}%`,
                        height: "100%",
                        backgroundColor: "#2d5a47",
                        borderRadius: 3,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#2d5a47" }}>
                    {progressPercentage}%
                  </span>
                </div>
              </div>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: "rgba(34, 197, 94, 0.08)",
                  color: "#15803d",
                }}
              >
                Week {project.currentWeek} of {project.totalWeeks}
              </span>
            </div>

            {/* Teacher Requests & Submission Section (The Moodle Vibe) */}
            <div>
              {/* Section Header */}
              <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 24, marginBottom: 20 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 4 }}>
                  Pending Action Items from {project.teacher}
                </h3>
                <p style={{ fontSize: 13, fontWeight: 400, color: "#6b7280", margin: 0 }}>
                  Complete these deliverables and submit them to your course coordinator
                </p>
              </div>

              {/* Pending Tasks List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                {pendingRequests.map((request) => (
                  <div
                    key={request.id}
                    style={{
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: 12,
                      padding: 20,
                      transition: "border-color 0.2s ease",
                    }}
                  >
                    <div className="flex items-start justify-between gap-6">
                      {/* Left Side - Task Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                          <div>
                            <h4 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0, marginBottom: 4 }}>
                              {request.title}
                            </h4>
                            <p style={{ fontSize: 12, fontWeight: 400, color: "#6b7280", margin: 0, marginBottom: 8, lineHeight: 1.5 }}>
                              {request.description}
                            </p>
                            <p style={{ fontSize: 12, fontWeight: 600, color: "#b45309", margin: 0 }}>
                              Deadline: {request.deadline}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Side - File Dropzone */}
                      <div className="flex-shrink-0" style={{ width: 300 }}>
                        {uploadedFiles[request.id] ? (
                          <div
                            style={{
                              padding: 16,
                              borderRadius: 12,
                              border: "2px solid rgba(34,197,94,0.3)",
                              backgroundColor: "rgba(34,197,94,0.04)",
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="flex items-center justify-center rounded-lg flex-shrink-0"
                                style={{ width: 40, height: 40, backgroundColor: "#d1fae5" }}
                              >
                                <FileIcon className="w-5 h-5 text-green-700" strokeWidth={1.5} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="truncate" style={{ fontSize: 13, fontWeight: 600, color: "#065f46", margin: 0 }}>
                                  {uploadedFiles[request.id].name}
                                </p>
                                <p style={{ fontSize: 11, color: "#15803d", margin: 0 }}>Ready to submit</p>
                              </div>
                            </div>
                            <button
                              className="w-full transition-all"
                              style={{
                                marginTop: 12,
                                padding: "8px 16px",
                                borderRadius: 8,
                                fontSize: 13,
                                fontWeight: 600,
                                backgroundColor: "#2d5a47",
                                color: "#ffffff",
                                border: "none",
                                cursor: "pointer",
                              }}
                            >
                              Submit to Teacher
                            </button>
                          </div>
                        ) : (
                          <div
                            onDragEnter={() => handleDragEnter(request.id)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragLeave={() => handleDragLeave(request.id)}
                            onDrop={(e) => handleDrop(request.id, e)}
                            className="transition-all"
                            style={{
                              padding: 20,
                              borderRadius: 12,
                              backgroundColor: dragActive[request.id] ? "rgba(45,90,71,0.04)" : "#f0f0ed",
                              border: dragActive[request.id]
                                ? "2px dashed #2d5a47"
                                : "2px dashed #d1d5db",
                              cursor: "pointer",
                            }}
                          >
                            <input
                              type="file"
                              id={`file-upload-${request.id}`}
                              accept=".pdf,.ppt,.pptx,.doc,.docx"
                              onChange={(e) => handleFileSelect(request.id, e)}
                              className="hidden"
                            />
                            <label htmlFor={`file-upload-${request.id}`} className="cursor-pointer">
                              <div className="flex flex-col items-center text-center" style={{ gap: 8 }}>
                                <div
                                  className="flex items-center justify-center rounded-full"
                                  style={{ width: 40, height: 40, backgroundColor: dragActive[request.id] ? "rgba(45,90,71,0.08)" : "#e5e5e3" }}
                                >
                                  <Upload
                                    className="w-5 h-5"
                                    color={dragActive[request.id] ? "#2d5a47" : "#9ca3af"}
                                    strokeWidth={1.5}
                                  />
                                </div>
                                <div>
                                  <p style={{ fontSize: 12, fontWeight: 500, color: dragActive[request.id] ? "#2d5a47" : "#6b7280", margin: 0 }}>
                                    {dragActive[request.id] ? "Drop file here" : "Drag and drop PDF/PPTX here"}
                                  </p>
                                  <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0 0" }}>
                                    or click to browse files
                                  </p>
                                </div>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Completed Tasks Section */}
              {completedRequests.length > 0 && (
                <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", margin: 0, marginBottom: 16 }}>
                    Completed Submissions
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {completedRequests.map((request) => (
                      <div
                        key={request.id}
                        style={{
                          border: "1px solid rgba(34,197,94,0.12)",
                          backgroundColor: "rgba(34,197,94,0.02)",
                          borderRadius: 12,
                          padding: 20,
                        }}
                      >
                        <div className="flex items-center justify-between gap-6">
                          {/* Left Side - Task Info */}
                          <div className="flex items-start gap-3 flex-1">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                            <div>
                              <h4 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>
                                {request.title}
                              </h4>
                              <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0 0" }}>
                                {request.description}
                              </p>
                            </div>
                          </div>

                          {/* Right Side - Submission Info */}
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p style={{ fontSize: 13, fontWeight: 500, color: "#111827", margin: 0 }}>
                                {request.submittedFile?.name}
                              </p>
                              <p style={{ fontSize: 11, color: "#6b7280", margin: "2px 0 0 0" }}>
                                Submitted on {request.submittedFile?.submittedOn}
                              </p>
                            </div>
                            <button
                              className="flex items-center gap-2 transition-all"
                              style={{
                                padding: "7px 14px",
                                borderRadius: 8,
                                fontSize: 12,
                                fontWeight: 500,
                                color: "#374151",
                                backgroundColor: "transparent",
                                border: "1px solid #e5e7eb",
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              <Eye className="w-4 h-4" strokeWidth={1.5} />
                              View Submission
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
