import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/Landingpage";
import Dashboard from "../pages/Dashboard";
import Roadmap from "../pages/RoadMap";
import Timer from "../pages/Timer";
import Courses from "../pages/Course";
import StudyProgress from "../pages/Progress";
import Settings from "../pages/Setting";
import { Layout } from "../components/Layout";

export const publicRoutes = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "roadmap",
        Component: Roadmap,
      },
      {
        path: "courses",
        Component: Courses,
      },
      {
        path: "timer",
        Component: Timer,
      },
      {
        path: "progress",
        Component: StudyProgress,
      },
      {
        path: "settings",
        Component: Settings,
      },
    ],
  },
  {
    path: "/landing",
    Component: LandingPage,
  },
]);
