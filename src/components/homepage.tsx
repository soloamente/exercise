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
      description: "Explore countries informations",
      link: "/countries",
      icon: (
        <Earth
          className="text-orange-500"
          width={24}
          height={24}
          data-oid="juzsi_:"
        />
      ),

      gradient: "from-orange-500/10 to-orange-500/5",
    },
    {
      id: 2,
      name: "Crypto",
      description: "Real-time cryptocurrency data and market insights",
      link: "/crypto",
      icon: (
        <Bitcoin
          className="text-purple-500"
          width={24}
          height={24}
          data-oid="6c7a0nw"
        />
      ),

      gradient: "from-purple-500/10 to-purple-500/5",
    },
    {
      id: 3,
      name: "Posts",
      description: "Discover trending social media content and analytics",
      link: "/posts",
      icon: (
        <Instagram
          className="text-pink-500"
          width={24}
          height={24}
          data-oid="1:r_5-t"
        />
      ),

      gradient: "from-pink-500/10 to-pink-500/5",
    },
    {
      id: 4,
      name: "Users",
      description: "Users fetcher from public API",
      link: "/users",
      icon: (
        <Users
          className="text-yellow-500"
          width={24}
          height={24}
          data-oid="ve4dg0q"
        />
      ),

      gradient: "from-yellow-500/10 to-yellow-500/5",
    },
  ];

  const id = useId();

  return (
    <div
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2"
      data-oid="k-:u81v"
    >
      {pages.map((page) => (
        <Link key={`${id}-${page.id}`} href={page.link} data-oid="xe84h:c">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full"
            data-oid="yg_p_cz"
          >
            <Card
              className="group relative h-full overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/30 dark:hover:border-neutral-700"
              data-oid="oo3mm7y"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${page.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                data-oid="ko4f_45"
              />

              <CardContent
                className="relative z-10 flex h-full flex-col justify-between p-6"
                data-oid="7rmsnm3"
              >
                <div className="mb-6" data-oid="n0i.lx4">
                  <div
                    className="mb-4 inline-flex items-center justify-center rounded-lg border border-neutral-200 bg-white p-2 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
                    data-oid="602i6j2"
                  >
                    {page.icon}
                  </div>
                  <h3
                    className="mb-2 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
                    data-oid="83tumtt"
                  >
                    {page.name}
                  </h3>
                  <p
                    className="text-sm text-neutral-600 dark:text-neutral-400"
                    data-oid="kjow7o:"
                  >
                    {page.description}
                  </p>
                </div>
                <div
                  className="flex items-center text-sm font-medium text-neutral-900 dark:text-neutral-100"
                  data-oid="wmwzj04"
                >
                  Learn more
                  <svg
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    data-oid="xochgot"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                      data-oid="8rw3uwr"
                    />
                  </svg>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
