import { useState } from "react";
import { useNavigate } from "react-router";
import { Trees, Plus, UserCircle2, Inbox, CheckCircle2 } from "lucide-react";
import { DemoNav } from "@/app/components/DemoNav";

interface Project {
  id: string;
  title: string;
  company: string;
  duration: string;
  topic: string;
  ndaRequired: boolean;
  imageUrl: string;
}

export function CourseGallery() {
  const navigate = useNavigate();
  const [hideNDA, setHideNDA] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "1",
      title: "Predictive Maintenance Algorithm",
      company: "Konecranes Ltd.",
      duration: "12 Weeks",
      topic: "Software Engineering",
      ndaRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
    },
    {
      id: "2",
      title: "Customer Behavior Analytics Dashboard",
      company: "Nordea Bank",
      duration: "10 Weeks",
      topic: "Data Analytics",
      ndaRequired: false,
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
    },
    {
      id: "3",
      title: "AI-Powered Content Moderation",
      company: "Supercell",
      duration: "14 Weeks",
      topic: "AI",
      ndaRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop",
    },
    {
      id: "4",
      title: "Supply Chain Optimization Tool",
      company: "Wärtsilä",
      duration: "12 Weeks",
      topic: "Software Engineering",
      ndaRequired: false,
      imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=400&fit=crop",
    },
    {
      id: "5",
      title: "Real-Time Sentiment Analysis",
      company: "YLE",
      duration: "8 Weeks",
      topic: "AI",
      ndaRequired: false,
      imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    },
    {
      id: "6",
      title: "IoT Device Management Platform",
      company: "Nokia",
      duration: "16 Weeks",
      topic: "Software Engineering",
      ndaRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&h=400&fit=crop",
    },
  ];

  const filteredProjects = projects.filter((project) => {
    if (hideNDA && project.ndaRequired) return false;
    if (selectedTopic && project.topic !== selectedTopic) return false;
    return true;
  });

  const topics = Array.from(new Set(projects.map((p) => p.topic)));

  return (
    <div className="min-h-screen bg-background">
      <DemoNav />
      {/* Filter Bar */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTopic(null)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedTopic === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              All Topics
            </button>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  selectedTopic === topic
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {topic}
              </button>
            ))}
          </div>

          {/* NDA Toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground">Hide NDA Required</span>
            <button
              onClick={() => setHideNDA(!hideNDA)}
              className={`relative w-12 h-6 rounded-full transition-all ${
                hideNDA ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                  hideNDA ? "left-7" : "left-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* My Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">My Courses</h2>
              <p className="text-muted-foreground">
                Manage your courses and review incoming industry proposals
              </p>
            </div>
            <button 
              onClick={() => navigate("/teacher/course-builder")}
              className="flex items-center gap-2 px-4 py-2 bg-[#2d5a47] text-white rounded-lg hover:bg-[#234739] transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Course
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* CT60A9800 Capstone Project Course Card */}
            <div
              onClick={() => navigate("/teacher/courses/CT60A9800/proposals")}
              className="bg-white rounded-xl border border-[#eaeaea] p-6 cursor-pointer hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-primary transition-colors">
                    CT60A9800 Capstone Project
                  </h3>
                  <p className="text-sm text-muted-foreground">Spring 2024</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  <Inbox className="w-3 h-3" />
                  <span>7 New</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
            <div className="bg-white rounded-xl border border-[#eaeaea] p-6 opacity-50 cursor-not-allowed">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    CT50A6000 Software Engineering
                  </h3>
                  <p className="text-sm text-muted-foreground">Fall 2024</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <Inbox className="w-3 h-3" />
                  <span>0 New</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
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

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Available Project Proposals</h1>
          <p className="text-muted-foreground">
            Browse industry-sponsored projects and curate them for your course
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl overflow-hidden cursor-pointer group hover:shadow-md transition-all"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* NDA Badge */}
                <div
                  className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded ${
                    project.ndaRequired
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {project.ndaRequired ? "NDA Required" : "No NDA"}
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground">{project.company}</p>
                <p className="text-sm text-muted-foreground">
                  {project.duration} • {project.topic}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}