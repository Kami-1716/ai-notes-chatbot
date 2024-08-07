"use client";

import AddUpdateNoteDialog from "@/components/AddUpdateNoteDialog";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2, PlusCircle } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { dark } from "@clerk/themes";

const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { theme } = useTheme();
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link className="flex items-center gap-1" href="/notes">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                <span className="font-bold dark:text-black">IntelliNotes</span>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4">
              <ClerkLoaded>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    baseTheme: (theme === "dark" ? dark : "light") as any,
                    elements: {
                      avatarBox: {
                        width: "2.5rem",
                        height: "2.5rem",
                      },
                    },
                  }}
                />
              </ClerkLoaded>
              <ClerkLoading>
                <Loader2 className="h4 w-4 animate-spin text-muted-foreground" />
              </ClerkLoading>
              <Button onClick={() => setDialogOpen(true)}>
                <PlusCircle size={20} className="mr-2" />
                Add Note
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>
      <AddUpdateNoteDialog open={dialogOpen} setOpen={setDialogOpen} />
    </>
  );
};

export default Navbar;
