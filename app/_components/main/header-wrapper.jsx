// components/HeaderWrapper.jsx
"use client";
import { usePathname } from "next/navigation";
import { Header } from "./header";

export function HeaderWrapper() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/login")) {
    return null; // hide Header on dashboard routes
  }
  return (
    <div>
      <div className="fixed bg-background top-0 left-0 w-full z-50">
        <Header />
      </div>
      <div className="bg-background h-12"></div>
    </div>
  );
}
