import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Link className="block" href="/notes">
              <Image src="/vercel.svg" alt="Logo" width={120} height={40} />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "2.5rem",
                    height: "2.5rem",
                  },
                },
              }}
            />
            <Button>
              <PlusCircle size={20} className="mr-2" />
              Add Note
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
