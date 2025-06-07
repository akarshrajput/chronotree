import { SiteHeader } from "@/app/_components/dashboard/site-header";
import VaultList from "@/app/_components/vault/VaultList";
import { auth } from "@/app/_lib/auth";
import { Button } from "@/components/ui/button";
import { SidebarInset } from "@/components/ui/sidebar";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <SidebarInset>
      <SiteHeader />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex flex-col items-center">
              <div className="w-full md:px-6 px-4">
                <div className="mb-4 flex items-center">
                  <Link href="/dashboard/vaults/new">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="cursor-pointer border text-sm font-semibold"
                    >
                      <Plus />
                    </Button>
                  </Link>
                  <div className="flex items-center gap-2 text-xs p-1 px-3 rounded-full font-medium w-fit">
                    <ArrowRight size={14} />
                    <p>Create new vault</p>
                  </div>
                </div>
                <VaultList session={session} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarInset>
  );
};

export default page;
