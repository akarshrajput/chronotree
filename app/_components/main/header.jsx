"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { IconMenu2, IconHexagon } from "@tabler/icons-react";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const navigation = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/features" },
    { title: "Pricing", href: "/pricing" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-50 w-full">
      <div className="container flex  items-center justify-between max-w-7xl mx-auto px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          {/* <IconHexagon className="h-6 w-6 text-primary" /> */}
          <span className="font-bold text-lg tracking-tight text-foreground">
            Chronotree
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Search + Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <Input placeholder="Search..." className="w-[200px]" />
          <ThemeToggle />
          <Link href="/login">
            <Button className="cursor-pointer" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconMenu2 className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] p-0">
              <div className="p-4 flex items-center justify-between border-b">
                <Link href="/" className="flex items-center space-x-2">
                  <IconHexagon className="h-6 w-6 text-primary" />
                  <span className="font-bold text-lg tracking-tight text-foreground">
                    Chronotree
                  </span>
                </Link>
              </div>
              <ScrollArea className="h-full px-4 py-2">
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Separator />
                  <Link href="/login">
                    <Button variant="outline" className="w-full cursor-pointer">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
