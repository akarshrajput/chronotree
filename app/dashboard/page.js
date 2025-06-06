import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../_components/dashboard/app-sidebar";
import { ChartAreaInteractive } from "../_components/dashboard/chart-area-interactive";
import { SectionCards } from "../_components/dashboard/section-cards";
import { SiteHeader } from "../_components/dashboard/site-header";
import { auth } from "../_lib/auth";

export default async function Page() {
  const session = await auth();
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "calc(var(--spacing) * 72)",
        "--header-height": "calc(var(--spacing) * 12)",
      }}
    >
      <AppSidebar session={session} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              {/* <p>Hi</p> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
