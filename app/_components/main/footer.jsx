"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background text-muted-foreground mt-24 mb-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* Brand & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              ChronoTree
            </h3>
            <p>Preserve your family’s story, vaults, and heritage — forever.</p>
            <div className="flex items-center gap-2">
              <Input placeholder="Your email" className="w-full" />
              <Button variant="default">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* <Separator className="my-10" /> */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground mt-6">
          <p>© {year} ChronoTree. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
