import { lazy, Suspense, useCallback, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import LandingPage from "./LandingPage";
import { Navbar } from "./components/Navbar";
import { AppSidebar } from "./components/AppSidebar";
import { ErrorBoundary } from "./components/ErrorStates";
import { DashboardSkeleton } from "./components/Skeletons";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./components/Toast";
import { AuthModal } from "./components/AuthModal";
import { isAuthenticated, clearAuth } from "./api/authApi";

const Dashboard = lazy(() =>
  import("./components/screens/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const Profile = lazy(() =>
  import("./components/screens/Profile").then((m) => ({ default: m.Profile }))
);
const Matches = lazy(() =>
  import("./components/screens/Matches").then((m) => ({ default: m.Matches }))
);
const Chat = lazy(() =>
  import("./components/screens/Chat").then((m) => ({ default: m.Chat }))
);
const Sessions = lazy(() =>
  import("./components/screens/Sessions").then((m) => ({ default: m.Sessions }))
);
const LearningPaths = lazy(() =>
  import("./components/screens/LearningPaths").then((m) => ({ default: m.LearningPaths }))
);
const Achievements = lazy(() =>
  import("./components/screens/Achievements").then((m) => ({ default: m.Achievements }))
);
const Settings = lazy(() =>
  import("./components/screens/Settings").then((m) => ({ default: m.Settings }))
);
const VideoCall = lazy(() =>
  import("./components/screens/VideoCall").then((m) => ({ default: m.VideoCall }))
);

function AppShell() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSearch = (q: string) => {
    if (q.trim()) {
      navigate(`/matches?q=${encodeURIComponent(q)}`);
    } else {
      navigate("/matches");
    }
  };

  const handleLogout = useCallback(() => {
    clearAuth();
    window.location.replace("/");
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[var(--background)]">
      <Navbar
        onNavigate={(page) => navigate(`/${page}`)}
        onSearch={handleSearch}
        onLogout={handleLogout}
      />
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar onNavigate={(page) => navigate(`/${page}`)} />
        <main className="flex-1 overflow-y-auto bg-[var(--background)]">
          <ErrorBoundary>
            <Suspense fallback={<DashboardSkeleton />}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/matches"
                  element={<Matches searchQuery={searchParams.get("q") ?? ""} />}
                />
                <Route path="/chat" element={<Chat />} />
                <Route path="/sessions" element={<Sessions />} />
                <Route path="/learning-paths" element={<LearningPaths />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/video-call" element={<VideoCall />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

function AuthGate() {
  const [showModal, setShowModal] = useState(false);
  const loggedIn = isAuthenticated();

  if (loggedIn) return <AppShell />;

  return (
    <>
      <Routes>
        <Route
          path="*"
          element={<LandingPage onEnterApp={() => setShowModal(true)} />}
        />
      </Routes>

      {showModal && (
        <AuthModal
          onSuccess={() => {
            setShowModal(false);
            window.location.replace("/dashboard");
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ToastProvider>
          <AuthGate />
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
