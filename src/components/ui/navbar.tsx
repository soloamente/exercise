"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-row items-center justify-center gap-6 p-16">
      <Button variant={pathname === "/" ? "default" : "ghost"}>
        <Link href={"/"}>Home</Link>
      </Button>
      <Button variant={pathname === "/countries" ? "default" : "ghost"}>
        <Link href={"/countries"}>Countries</Link>
      </Button>
      <Button variant={pathname === "/crypto" ? "default" : "ghost"}>
        <Link href={"/crypto"}>Crypto</Link>
      </Button>
      <Button variant={pathname === "/posts" ? "default" : "ghost"}>
        <Link href={"/posts"}>Posts</Link>
      </Button>
      <Button variant={pathname === "/users" ? "default" : "ghost"}>
        <Link href={"/users"}>Users</Link>
      </Button>
    </div>
  );
}
