"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Folder, Info, Shield, ShieldCheck, Vault } from "lucide-react";
import { LoadingSpinner } from "../main/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { IconTrendingUp } from "@tabler/icons-react";

// Map themes to Tailwind classes
const themeClasses = {
  red: "border-red-400 bg-red-200",
  blue: "border-blue-400 bg-blue-200",
  green: "border-green-400 bg-green-200",
  yellow: "border-yellow-400 bg-yellow-200",
  orange: "border-orange-400 bg-orange-200",
};

const VaultList = ({ session }) => {
  const [vaults, setVaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaults = async () => {
      try {
        const response = await axios.get(
          `/api/vaults?author=${session.user.userId}`
        );

        setVaults(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        console.error("Failed to fetch vaults:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.userId) {
      fetchVaults();
    }
  }, [session?.user?.userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <LoadingSpinner className="h-6 w-6" />
      </div>
    );
  }
  if (!vaults.length)
    return <p className="text-center mt-10">No vaults found.</p>;

  return (
    <div className="mt-6">
      <Badge className="mb-4">
        <Shield size={14} />
        <p>Vaults are password protected</p>
      </Badge>
      <div className="flex flex-wrap items-center gap-2">
        {vaults.map((vault, index) => {
          const themeClass = themeClasses[vault.theme || "gray"];
          return (
            <Link key={vault.id} href={`/dashboard/vaults/${vault.id}`}>
              <Card className="w-[300px] rounded-2xl border bg-background shadow-md hover:shadow-xl transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="text-blue-600 dark:text-blue-400 size-5" />
                      <CardTitle className="text-lg font-semibold line-clamp-1">
                        {vault.title || `Vault ${index + 1}`}
                      </CardTitle>
                    </div>
                    <Badge variant="outline" className="text-xs px-2 py-1">
                      <ShieldCheck className="size-4 mr-1 text-green-500" />
                      Locked
                    </Badge>
                  </div>
                </CardHeader>

                {/* <CardContent>
                  <CardDescription className="line-clamp-1 text-sm text-muted-foreground">
                    {vault.description || "No description available."}
                  </CardDescription>
                </CardContent> */}

                <CardFooter className="flex flex-col items-start gap-1.5">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <IconTrendingUp className="size-4 text-yellow-500" />
                    Last Accessed Recently
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Secured by <strong>6-digit PIN</strong>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
      <div className="mt-8">
        <div className="flex items-center gap-2 text-xs p-1 rounded-full font-medium w-fit">
          <Info size={14} />
          <p>At max only 2 vaults per user is provided</p>
        </div>
        <div className="flex items-center gap-2 text-xs p-1 rounded-full font-medium w-fit">
          <Info size={14} />
          <p>Vault password cannot be recovered</p>
        </div>
      </div>
    </div>
  );
};

export default VaultList;
