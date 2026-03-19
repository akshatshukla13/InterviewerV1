import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./app/store.js";
import { LandingPage } from "./components/LandingPage.jsx";
import CandidateLogin from "./components/CandidateLogin.jsx";
import InterviewerLogin from "./components/InterviewerLogin";
import InterviewDashBoard from "./components/InterviewDashBoard";
import Lobby from "./components/Lobby";
import RoomCandidate from "./components/RoomCandidate";
import ScheduleInterview from "./components/ScheduleInterview";
import EvalFormDashBoard from "./components/EvalFormDashBoard";
import CreateEvaluationForm from "./components/CreateEvaluationForm";
import NotFound from "./components/NotFound";

const RoomPage = lazy(() => import("./components/InterviewComponents/RoomPage"));
const CandidateRoom = lazy(() => import("./components/InterviewComponents/CandidateRoom"));

const RouteLoadingFallback = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-slate-600">
    Loading workspace...
  </div>
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/candidate-signup" element={<CandidateLogin />} />
          <Route path="/interviewer-signup" element={<InterviewerLogin />} />
          <Route path="/interview-dashboard" element={<InterviewDashBoard />} />
          <Route path="/lobby/:interviewID" element={<Lobby />} />
          <Route path="/room/:roomId" element={<RoomCandidate />} />
          <Route path="/room/i/:roomId" element={<RoomPage />} />
          <Route path="/room/c/:roomId" element={<CandidateRoom />} />
          <Route path="/schedule-interview" element={<ScheduleInterview />} />
          <Route path="/evalForm" element={<EvalFormDashBoard />} />
          <Route path="/create-evalForm" element={<CreateEvaluationForm />} />
          <Route path="*" element={<NotFound />} /> {/* catch-all 404 route */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
