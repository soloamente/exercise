"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full p-4 sm:p-6 md:p-8">
      {/* Mobile Navigation */}
      <div className="flex items-center justify-between sm:hidden">
        <Button
          className="w-auto"
          variant={pathname === "/" ? "default" : "ghost"}
        >
          <Link href={"/"}>Home</Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <div className="mt-4 flex flex-col gap-3">
              <Button
                className="w-full justify-start"
                variant={pathname === "/countries" ? "default" : "ghost"}
              >
                <Link className="w-full" href={"/countries"}>
                  Countries
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant={pathname === "/crypto" ? "default" : "ghost"}
              >
                <Link className="w-full" href={"/crypto"}>
                  Crypto
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant={pathname === "/posts" ? "default" : "ghost"}
              >
                <Link className="w-full" href={"/posts"}>
                  Posts
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant={pathname === "/users" ? "default" : "ghost"}
              >
                <Link className="w-full" href={"/users"}>
                  Users
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden flex-row items-center justify-center gap-4 sm:flex md:gap-6">
        <Button
          className="w-auto"
          variant={pathname === "/" ? "default" : "ghost"}
        >
          <Link href={"/"}>Home</Link>
        </Button>
        <Button
          className="w-auto"
          variant={pathname === "/countries" ? "default" : "ghost"}
        >
          <Link href={"/countries"}>Countries</Link>
        </Button>
        <Button
          className="w-auto"
          variant={pathname === "/crypto" ? "default" : "ghost"}
        >
          <Link href={"/crypto"}>Crypto</Link>
        </Button>
        <Button
          className="w-auto"
          variant={pathname === "/posts" ? "default" : "ghost"}
        >
          <Link href={"/posts"}>Posts</Link>
        </Button>
        <Button
          className="w-auto"
          variant={pathname === "/users" ? "default" : "ghost"}
        >
          <Link href={"/users"}>Users</Link>
        </Button>
      </div>
    </nav>
  );
}
