import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Trees,
  Sparkles,
  Copy,
  Plus,
  Trash2,
  GripVertical,
  ChevronDown,
  Calendar,
  FileUp,
  ArrowLeft,
  Lock,
  Edit3,
  Eye,
} from "lucide-react";
import {
  Button,
  TextField,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
} from "@mui/material";

// Teacher's Course Builder - AI-Powered Course Creation with Flexible Templates

interface Milestone {
  id: string;
  name: string;
  date: string;
  requiresUpload: boolean;
}

interface CustomField {
  id: string;
  fieldName: string;
  fieldType: "text-paragraph" | "short-text" | "number" | "dropdown" | "file-upload";
  characterLimit?: number;
  hasCharacterLimit?: boolean;
  options?: string[];
}

export function TeacherCourseBuilder() {
  const navigate = useNavigate();
  const [smartPasteText, setSmartPasteText] = useState("");
  const [isAutofilling, setIsAutofilling] = useState(false);
  const [courseTitle, setCourseTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDuplicateDropdown, setShowDuplicateDropdown] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [allowResubmit, setAllowResubmit] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: "1", name: "", date: "", requiresUpload: false },
  ]);
  const [customFields, setCustomFields] = useState<CustomField[]>([
    {
      id: "1",
      fieldName: "Project Goals",
      fieldType: "text-paragraph",
      hasCharacterLimit: true,
      characterLimit: 500,
    },
    {
      id: "2",
      fieldName: "Technology Stack",
      fieldType: "short-text",
      hasCharacterLimit: false,
    },
  ]);

  const handleAIAutofill = () => {
    setIsAutofilling(true);
    
    // Simulate AI parsing
    setTimeout(() => {
      // Parse the smart paste text for common patterns
      const text = smartPasteText;
      
      // Try to extract course title
      const titleMatch = text.match(/(?:Course|Title):\s*(.+?)(?:\n|$)/i);
      if (titleMatch) {
        setCourseTitle(titleMatch[1].trim());
      } else {
        // Fallback: use first line as title
        const firstLine = text.split("\n")[0];
        if (firstLine) setCourseTitle(firstLine.trim());
      }
      
      // Try to extract dates
      const datePattern = /(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})/g;
      const dates = text.match(datePattern);
      if (dates && dates.length >= 2) {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
      }
      
      // Try to extract milestones/deadlines
      const milestonePatterns = [
        /(?:deadline|milestone|deliverable|due):\s*(.+?)(?:\n|$)/gi,
        /(?:week|phase)\s*\d+:\s*(.+?)(?:\n|$)/gi,
      ];
      
      const foundMilestones: Milestone[] = [];
      milestonePatterns.forEach((pattern) => {
        const matches = [...text.matchAll(pattern)];
        matches.forEach((match, idx) => {
          foundMilestones.push({
            id: `ai-${foundMilestones.length + 1}`,
            name: match[1].trim(),
            date: "",
            requiresUpload: match[1].toLowerCase().includes("submit") || 
                           match[1].toLowerCase().includes("upload"),
          });
        });
      });
      
      if (foundMilestones.length > 0) {
        setMilestones(foundMilestones);
      }
      
      setIsAutofilling(false);
    }, 1500);
  };

  const addMilestone = () => {
    setMilestones([
      ...milestones,
      { id: `${Date.now()}`, name: "", date: "", requiresUpload: false },
    ]);
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: string | boolean) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const removeMilestone = (id: string) => {
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const addCustomField = () => {
    setCustomFields([
      ...customFields,
      {
        id: `${Date.now()}`,
        fieldName: "",
        fieldType: "short-text",
        hasCharacterLimit: false,
      },
    ]);
  };

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setCustomFields(
      customFields.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
  };

  const removeCustomField = (id: string) => {
    setCustomFields(customFields.filter((f) => f.id !== id));
  };

  const handlePublish = () => {
    console.log("Publishing course:", {
      courseTitle,
      startDate,
      endDate,
      milestones,
      customFields,
    });
    // Navigate back or show success
    alert("Course published successfully!");
  };

  const handleDuplicatePrevious = () => {
    // Simulate loading previous course data
    setCourseTitle("Software Engineering Project (Copy)");
    setStartDate("09/01/2026");
    setEndDate("12/18/2026");
    setMilestones([
      { id: "dup-1", name: "Team Formation", date: "09/08/2026", requiresUpload: false },
      { id: "dup-2", name: "Project Plan", date: "09/22/2026", requiresUpload: true },
      { id: "dup-3", name: "Mid-Review Presentation", date: "10/28/2026", requiresUpload: true },
      { id: "dup-4", name: "Final Demo", date: "12/16/2026", requiresUpload: true },
    ]);
  };

  const getFieldTypeLabel = (type: CustomField["fieldType"]) => {
    switch (type) {
      case "text-paragraph":
        return "Text Paragraph";
      case "short-text":
        return "Short Text";
      case "number":
        return "Number";
      case "dropdown":
        return "Dropdown";
      case "file-upload":
        return "File Upload";
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Left: Logo & Breadcrumb */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/teacher")}>
              <Trees className="w-6 h-6 text-[#2d5a47]" strokeWidth={1.5} />
              <span className="text-lg font-medium text-gray-900">LuppoGrove</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span
                className="hover:text-[#2d5a47] cursor-pointer"
                onClick={() => navigate("/teacher")}
              >
                My Courses
              </span>
              <span>/</span>
              <span className="text-gray-900 font-medium">Add New Course</span>
            </div>
          </div>

          {/* Right: Publish Button */}
          <Button
            variant="contained"
            onClick={handlePublish}
            disabled={!courseTitle}
            sx={{
              textTransform: "none",
              backgroundColor: "#2d5a47",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: "#234739",
              },
              "&:disabled": {
                backgroundColor: "#e5e7eb",
                color: "#9ca3af",
              },
            }}
          >
            Publish Course
          </Button>
        </div>
      </header>

      {/* Main Content - Centered Column */}
      <main className="max-w-[800px] mx-auto px-8 py-12">
        {/* Top Action: Duplicate Previous Course */}
        <div className="mb-8">
          {/* My Course Management */}
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Course Management</h2>
          
          {/* Active Courses */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Active Courses</p>
            <div
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow mb-3"
              onClick={() => navigate("/teacher/courses/CT60A9800/proposals")}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2d5a47]/10 flex items-center justify-center">
                  <Edit3 size={18} className="text-[#2d5a47]" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-900">Fall 2026: Capstone Project</p>
                  <p className="text-xs text-gray-500">CT60A9800 &bull; Aug 15 – Dec 18, 2026 &bull; 6 proposals</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                Active
              </span>
            </div>
          </div>

          {/* Past Courses (Read-Only) */}
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Past Courses (Read-Only)</p>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between opacity-60 mb-3">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Eye size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-500">Spring 2025: Capstone Project</p>
                  <p className="text-xs text-gray-400">CT60A9800 &bull; Jan 6 – Jun 27, 2025 &bull; 4 proposals</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200 flex items-center gap-1.5">
                <Lock size={11} />
                CLOSED - Read Only
              </span>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center justify-between opacity-60">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Eye size={18} className="text-gray-400" />
                </div>
                <div>
                  <p className="text-base font-semibold text-gray-500">Fall 2024: Capstone Project</p>
                  <p className="text-xs text-gray-400">CT60A9800 &bull; Sep 1 – Dec 20, 2024 &bull; 5 proposals</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200 flex items-center gap-1.5">
                <Lock size={11} />
                CLOSED - Read Only
              </span>
            </div>
          </div>

          {/* Create New Course with Duplication */}
          <div className="flex items-center gap-3 mb-2">
            <Button
              variant="contained"
              startIcon={<Plus size={18} />}
              sx={{
                textTransform: "none",
                backgroundColor: "#2d5a47",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                borderRadius: "12px",
                "&:hover": { backgroundColor: "#234739" },
              }}
            >
              + Create New Course
            </Button>
            <div className="relative">
              <Button
                variant="outlined"
                startIcon={<Copy size={16} />}
                endIcon={<ChevronDown size={14} />}
                onClick={() => setShowDuplicateDropdown(!showDuplicateDropdown)}
                sx={{
                  textTransform: "none",
                  borderColor: "#d1d5db",
                  color: "#374151",
                  fontWeight: 500,
                  px: 2.5,
                  py: 1.5,
                  borderRadius: "12px",
                  borderStyle: "dashed",
                  "&:hover": { borderColor: "#2d5a47", backgroundColor: "#f0fdf4", borderStyle: "dashed" },
                }}
              >
                Duplicate from past course...
              </Button>
              {showDuplicateDropdown && (
                <div
                  className="absolute top-full left-0 mt-2 bg-white rounded-xl border border-gray-200 shadow-lg z-10 overflow-hidden"
                  style={{ minWidth: 260 }}
                >
                  <button
                    onClick={() => { handleDuplicatePrevious(); setShowDuplicateDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <span className="font-medium">Spring 2025 Capstone</span>
                    <br />
                    <span className="text-xs text-gray-400">CT60A9800 &bull; 4 milestones</span>
                  </button>
                  <button
                    onClick={() => { handleDuplicatePrevious(); setShowDuplicateDropdown(false); }}
                    className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium">Fall 2024 Capstone</span>
                    <br />
                    <span className="text-xs text-gray-400">CT60A9800 &bull; 5 milestones</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8 pt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">New Course Builder</h2>
          <p className="text-sm text-gray-500 mb-6">Fill in the fields below or use AI Smart Paste to auto-populate.</p>
        </div>

        {/* AI Smart Paste Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 border-2 border-[#c4b5fd] shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-[#8b5cf6]" />
            <h2 className="text-lg font-semibold text-gray-900">
              Import from your University Webpage
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Copy and paste your syllabus or course description directly from your Sisu/Moodle
            webpage, and let AI extract the key details.
          </p>
          <textarea
            value={smartPasteText}
            onChange={(e) => setSmartPasteText(e.target.value)}
            placeholder="Copy and paste your syllabus or course description directly from your Sisu/Moodle webpage here...&#10;&#10;Example:&#10;Course Title: Software Engineering Project&#10;Period: 01/09/2026 - 18/12/2026&#10;Deadline: Project Plan due 22/09/2026&#10;Deadline: Final Demo 16/12/2026"
            className="w-full h-40 p-4 border border-gray-300 rounded-xl text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] focus:border-transparent"
          />
          <div className="mt-4">
            <Button
              variant="contained"
              startIcon={isAutofilling ? null : <Sparkles size={18} />}
              onClick={handleAIAutofill}
              disabled={!smartPasteText.trim() || isAutofilling}
              sx={{
                textTransform: "none",
                backgroundColor: "#8b5cf6",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: "12px",
                "&:hover": {
                  backgroundColor: "#7c3aed",
                },
                "&:disabled": {
                  backgroundColor: "#e5e7eb",
                  color: "#9ca3af",
                },
              }}
            >
              {isAutofilling ? "Analyzing..." : "AI Autofill Fields"}
            </Button>
          </div>
        </div>

        {/* Course Settings Card */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Course Settings</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <TextField
                fullWidth
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="e.g., Software Engineering Project"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <TextField
                  fullWidth
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <TextField
                  fullWidth
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Moodle-Style Assignment Requests */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Milestones & Deliverables
            </h2>
            <p className="text-sm text-gray-600">
              Define key milestones for this course. These will appear as{" "}
              <span className="font-semibold text-[#2d5a47]">diamond markers</span> on the
              Company's Gantt chart and create submission portals in their Active Projects view.
            </p>
          </div>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="pt-3 cursor-move">
                  <GripVertical size={18} className="text-gray-400" />
                </div>
                
                <div className="flex-1 grid grid-cols-[1fr_200px_auto] gap-3 items-start">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Deliverable Name
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      value={milestone.name}
                      onChange={(e) => updateMilestone(milestone.id, "name", e.target.value)}
                      placeholder="e.g., Architecture Review"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Date
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      type="date"
                      value={milestone.date}
                      onChange={(e) => updateMilestone(milestone.id, "date", e.target.value)}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </div>

                  <div className="pt-6">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={milestone.requiresUpload}
                          onChange={(e) =>
                            updateMilestone(milestone.id, "requiresUpload", e.target.checked)
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#2d5a47",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#2d5a47",
                            },
                          }}
                        />
                      }
                      label={
                        <span className="text-xs text-gray-700 flex items-center gap-1">
                          <FileUp size={14} />
                          Requires Upload
                        </span>
                      }
                    />
                  </div>
                </div>

                <IconButton
                  onClick={() => removeMilestone(milestone.id)}
                  size="small"
                  sx={{ mt: 3 }}
                >
                  <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                </IconButton>
              </div>
            ))}
          </div>

          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            onClick={addMilestone}
            sx={{
              textTransform: "none",
              borderColor: "#d1d5db",
              color: "#374151",
              fontWeight: 500,
              px: 3,
              py: 1.5,
              mt: 3,
              borderRadius: "12px",
              borderStyle: "dashed",
              "&:hover": {
                borderColor: "#2d5a47",
                backgroundColor: "#f0fdf4",
                borderStyle: "dashed",
              },
            }}
          >
            Add Milestone
          </Button>
        </div>

        {/* Moodle-Style Feedback & Resubmit Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Set Up Company Deadlines & Tasks
            </h2>
            <p className="text-sm text-gray-600">
              Define tasks for companies and manage their submissions.
              When a company submits a deliverable, you can review it and leave feedback here.
            </p>
          </div>

          {/* Example task with feedback */}
          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-900">Architecture Review</p>
                <p className="text-xs text-gray-500">Deadline: March 6, 2026</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                Pending Review
              </span>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-2">
                Teacher Feedback
              </label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Leave a comment for the company about their submission..."
                className="w-full h-24 p-3 border border-gray-300 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2d5a47] focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between">
              <FormControlLabel
                control={
                  <Switch
                    checked={allowResubmit}
                    onChange={(e) => setAllowResubmit(e.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#2d5a47",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                        backgroundColor: "#2d5a47",
                      },
                    }}
                  />
                }
                label={
                  <span className="text-xs text-gray-700">
                    Allow Company to Resubmit (Opens submission box again)
                  </span>
                }
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  textTransform: "none",
                  backgroundColor: "#2d5a47",
                  fontWeight: 600,
                  px: 3,
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#234739" },
                }}
              >
                Send Feedback
              </Button>
            </div>
          </div>
        </div>

        {/* Company Proposal Template Builder */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              What should the AI ask companies to provide?
            </h2>
            <p className="text-sm text-gray-600">
              Create a custom proposal template. These fields will be presented to companies when
              they submit project ideas through the AI Project Wizard.
            </p>
          </div>

          <div className="space-y-4">
            {customFields.map((field, index) => (
              <div
                key={field.id}
                className="p-5 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="pt-2 cursor-move">
                    <GripVertical size={18} className="text-gray-400" />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Field Name
                      </label>
                      <TextField
                        fullWidth
                        size="small"
                        value={field.fieldName}
                        onChange={(e) =>
                          updateCustomField(field.id, { fieldName: e.target.value })
                        }
                        placeholder="e.g., Project Goals"
                        variant="outlined"
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "white",
                          },
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Field Type
                      </label>
                      <Select
                        fullWidth
                        size="small"
                        value={field.fieldType}
                        onChange={(e) =>
                          updateCustomField(field.id, {
                            fieldType: e.target.value as CustomField["fieldType"],
                          })
                        }
                        sx={{
                          borderRadius: "8px",
                          backgroundColor: "white",
                        }}
                      >
                        <MenuItem value="text-paragraph">Text Paragraph</MenuItem>
                        <MenuItem value="short-text">Short Text</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                        <MenuItem value="file-upload">File Upload</MenuItem>
                      </Select>
                    </div>
                  </div>

                  <IconButton onClick={() => removeCustomField(field.id)} size="small">
                    <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
                  </IconButton>
                </div>

                {/* Character Limit Option (for text fields) */}
                {(field.fieldType === "text-paragraph" || field.fieldType === "short-text") && (
                  <div className="ml-9 flex items-center gap-3">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={field.hasCharacterLimit || false}
                          onChange={(e) =>
                            updateCustomField(field.id, {
                              hasCharacterLimit: e.target.checked,
                            })
                          }
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#2d5a47",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                              backgroundColor: "#2d5a47",
                            },
                          }}
                        />
                      }
                      label={<span className="text-xs text-gray-700">Set Character Limit</span>}
                    />
                    {field.hasCharacterLimit && (
                      <TextField
                        size="small"
                        type="number"
                        value={field.characterLimit || ""}
                        onChange={(e) =>
                          updateCustomField(field.id, {
                            characterLimit: parseInt(e.target.value) || 0,
                          })
                        }
                        placeholder="e.g., 500"
                        sx={{
                          width: "120px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            backgroundColor: "white",
                          },
                        }}
                        InputProps={{
                          endAdornment: <span className="text-xs text-gray-500">words</span>,
                        }}
                      />
                    )}
                  </div>
                )}

                {/* Dropdown Options */}
                {field.fieldType === "dropdown" && (
                  <div className="ml-9 mt-3">
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Dropdown Options (comma-separated)
                    </label>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="e.g., Option 1, Option 2, Option 3"
                      variant="outlined"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "white",
                        },
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button
            variant="outlined"
            startIcon={<Plus size={18} />}
            onClick={addCustomField}
            sx={{
              textTransform: "none",
              borderColor: "#d1d5db",
              color: "#374151",
              fontWeight: 500,
              px: 3,
              py: 1.5,
              mt: 3,
              borderRadius: "12px",
              borderStyle: "dashed",
              width: "100%",
              "&:hover": {
                borderColor: "#2d5a47",
                backgroundColor: "#f0fdf4",
                borderStyle: "dashed",
              },
            }}
          >
            Add Custom Field
          </Button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-12"></div>
      </main>
    </div>
  );
}