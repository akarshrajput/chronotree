import { SiteHeader } from "@/app/_components/dashboard/site-header";
import CurrentUserProfile from "@/app/_components/user/CurrentUserProfile";
import { auth } from "@/app/_lib/auth";
import { SidebarInset } from "@/components/ui/sidebar";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <CurrentUserProfile session={session} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default page;
