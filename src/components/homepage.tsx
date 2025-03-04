"use client";

import { Bitcoin, Earth, Instagram, Users } from "lucide-react";
import Link from "next/link";
import { useId } from "react";
import { Card, CardContent } from "./ui/card";
import { motion } from "motion/react";

export default function HomeNav() {
  const pages = [
    {
      id: 1,
      name: "Countries",
      description: "fetching from a public api",
      link: "/countries",
      icon: <Earth width={128} height={"auto"} stroke="orange" />,
    },
    {
      id: 2,
      name: "Crypto",
      description: "fetching from a public api",
      link: "/crypto",
      icon: <Bitcoin width={128} height={"auto"} stroke="purple" />,
    },
    {
      id: 3,
      name: "Posts",
      description: "fetching from a public api",
      link: "/posts",
      icon: <Instagram width={128} height={"auto"} stroke="pink" />,
    },
    {
      id: 4,
      name: "Users",
      description: "fetching from a public api",
      link: "/users",
      icon: <Users width={128} height={"auto"} stroke="yellow" />,
    },
  ];

  const id = useId();
  return (
    <motion.div className="md:grid-cols1 grid flex-col gap-10 sm:grid-cols-1 lg:grid-cols-2">
      {pages.map((page) => (
        <Link key={`${id}-${page.id}`} href={page.link}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            transition={{ duration: 0.5, staggerChildren: 0.6 }}
          >
            <Card className="light:hover:bg-gray-100 m-0 h-[500px] min-h-[200px] w-[800px] min-w-[300px] cursor-pointer border-0 bg-white/5 p-0 transition-all duration-500 dark:hover:opacity-40">
              <CardContent className="h-full p-6">
                <div className="flex h-full flex-col justify-between">
                  <section className="w-full">{page.icon}</section>
                  <section className="w-full text-4xl">
                    {page.name}{" "}
                    <span className="opacity-60">{page.description}</span>
                  </section>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
