import { useAuth } from "../context/AuthContext.tsx";
import { Navigate, Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import FloatingButton from "../components/FloatingButton";
import CreateLpModal from "../components/CreateModal.tsx";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false); // Sidebar 상태
  const [isCreateOpen, setIsCreateOpen] = useState(false); // 모달 상태

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-dvh flex flex-col relative">
      {/* Navbar */}
      <Navbar onToggleSidebar={() => setOpen((s) => !s)} />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r p-4 transition-transform duration-200 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Sidebar Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-25"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 mt-16">
        <Outlet />
      </main>

      <Footer />

      {/* Floating Button - z-index 최상단으로 설정 */}
      <div className="fixed right-6 bottom-6 z-[100]">
        <FloatingButton
          onClick={() => {
            console.log("버튼 클릭");
            setIsCreateOpen(true);
          }}
        />
      </div>

      {/* Create Modal */}
      <CreateLpModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};

export default ProtectedLayout;
