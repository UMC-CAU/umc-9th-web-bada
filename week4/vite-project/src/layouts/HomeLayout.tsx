import { Outlet} from "react-router-dom";
import {Navbar} from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import FloatingButton from "../components/FloatingButton";
import CreateLpModal from "../components/CreateModal.tsx";

const HomeLayout =( ) => {
    const [open, setOpen] = useState(false);
    
  const [isCreateOpen, setIsCreateOpen] = useState(false); // 모달 상태

    

    useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);


    return (
        <div className="h-dvh flex flex-col">
        <Navbar onToggleSidebar={() => setOpen((s) => !s)} />

        <div className="flex flex-1 relative mt-16">
        {/* Sidebar */}
        <aside
          id="sidebar"
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-white border-r p-4 transition-transform duration-200 ease-in-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-hidden={!open}
        >
          <Sidebar />
        </aside>

        {/* 오버레이 */}
        {open && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-25"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}
        


        <main className="flex-1 mt-10">
            <Outlet />
        </main>
        </div>
        <Footer/>
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

export default HomeLayout;