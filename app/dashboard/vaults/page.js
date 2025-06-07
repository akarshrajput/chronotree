import { SiteHeader } from "@/app/_components/dashboard/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";

const page = () => {
  return (
    <SidebarInset>
      <SiteHeader />
      Hello
    </SidebarInset>
  );
};

export default page;
