import { SiteHeader } from "@/app/_components/dashboard/site-header";
import VaultPage from "@/app/_components/vault/VaultPage";
import { SidebarInset } from "@/components/ui/sidebar";

export default async function page({ params }) {
  const { id } = await params;

  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <VaultPage vaultId={id} />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
