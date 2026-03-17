import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { EntryPortal } from "./pages/EntryPortal";
import { CompanyHub } from "./pages/CompanyHub";
import { CourseDetails } from "./pages/CourseDetails";
import { AaltoCourseDetails } from "./pages/AaltoCourseDetails";
import { HelsinkiCourseDetails } from "./pages/HelsinkiCourseDetails";
import { OuluCourseDetails } from "./pages/OuluCourseDetails";
import { TampereCourseDetails } from "./pages/TampereCourseDetails";
import { JyvaskylaCourseDetails } from "./pages/JyvaskylaCourseDetails";
import { MyProposals } from "./pages/MyProposals";
import { ProposalEditor } from "./pages/ProposalEditor";
import { ActiveProjects } from "./pages/ActiveProjects";
import { ProjectWorkspace } from "./pages/ProjectWorkspace";
import { ProjectOverview } from "./pages/ProjectOverview";
import { CourseGallery } from "./pages/CourseGallery";
import { ProjectMarketplace } from "./pages/ProjectMarketplace";
import { TeacherProposalReview } from "./pages/TeacherProposalReview";
import { TeacherProposalDetail } from "./pages/TeacherProposalDetail";
import { TeacherCourseBuilder } from "./pages/TeacherCourseBuilder";
import { CoordinatorProposalPipeline } from "./pages/CoordinatorProposalPipeline";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/login",
    Component: EntryPortal,
  },
  {
    path: "/company",
    Component: CompanyHub,
  },
  {
    path: "/company/courses/:courseId",
    Component: CourseDetails,
  },
  {
    path: "/company/courses/aalto/:courseId",
    Component: AaltoCourseDetails,
  },
  {
    path: "/company/courses/helsinki/:courseId",
    Component: HelsinkiCourseDetails,
  },
  {
    path: "/company/courses/oulu/:courseId",
    Component: OuluCourseDetails,
  },
  {
    path: "/company/courses/tampere/:courseId",
    Component: TampereCourseDetails,
  },
  {
    path: "/company/courses/jyvaskyla/:courseId",
    Component: JyvaskylaCourseDetails,
  },
  {
    path: "/company/proposals",
    Component: MyProposals,
  },
  {
    path: "/company/proposals/:proposalId/edit",
    Component: ProposalEditor,
  },
  {
    path: "/company/projects",
    Component: ActiveProjects,
  },
  {
    path: "/company/projects/:projectId/workspace",
    Component: ProjectWorkspace,
  },
  {
    path: "/company/overview/:projectId",
    Component: ProjectOverview,
  },
  {
    path: "/teacher",
    Component: CourseGallery,
  },
  {
    path: "/teacher/course-builder",
    Component: TeacherCourseBuilder,
  },
  {
    path: "/teacher/courses/:courseId/proposals",
    Component: CoordinatorProposalPipeline,
  },
  {
    path: "/teacher/proposals/:proposalId/review",
    Component: TeacherProposalReview,
  },
  {
    path: "/teacher/proposals/:proposalId/details",
    Component: TeacherProposalDetail,
  },
  {
    path: "/student",
    Component: ProjectMarketplace,
  },
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-muted-foreground mb-8">Page not found</p>
          <a
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all"
          >
            Go Home
          </a>
        </div>
      </div>
    ),
  },
]);