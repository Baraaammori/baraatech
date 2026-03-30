"use client";

import { useState } from "react";

export default function SidebarWrapper({ children, sidebarContent }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      
      <button
        onClick={toggleSidebar}
        className="dash-mobile-toggle"
        aria-label="Toggle Menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {isSidebarOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      
      {isSidebarOpen && (
        <div
          className="dash-sidebar-backdrop"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      
      <aside className={`dash-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {sidebarContent}
      </aside>

      
      <main className="dash-main">
        {children}
      </main>
    </>
  );
}
