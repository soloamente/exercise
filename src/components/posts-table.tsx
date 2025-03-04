"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileTextIcon,
  ListFilterIcon,
  UserIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsGrid() {
  const id = useId();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const inputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Post[]>([]);
  const [filteredData, setFilteredData] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const fetchedData = (await res.json()) as Post[];
        setData(fetchedData);
        setFilteredData(fetchedData);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setData([]);
        setFilteredData([]);
      }
    }
    void fetchPosts();
  }, []);

  // Filter data based on search query
  useEffect(() => {
    const filtered = data.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filtered);
    setCurrentPage(0); // Reset to first page when filtering
  }, [searchQuery, data]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredData.slice(startIndex, endIndex);

  const canPreviousPage = currentPage > 0;
  const canNextPage = currentPage < totalPages - 1;

  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(data.length);
  }, [data.length]);

  return (
    <main
      className="flex min-h-screen flex-col transition-all duration-700"
      data-oid="pbzwc0p"
    >
      {/* Hero */}
      <div
        className="mt-16 mb-20 flex w-full flex-row items-center justify-center gap-3 text-2xl uppercase sm:mt-28 sm:mb-40 sm:text-4xl"
        data-oid=":p5qzn_"
      >
        <FileTextIcon height={36} width={36} data-oid="usm23zq" />
        <AnimatedNumber
          className="text-2xl sm:text-4xl"
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
          value={value}
          data-oid="4::zx6x"
        />{" "}
        <p data-oid="lec5pqo">Posts</p>
      </div>

      <div className="space-y-8" data-oid="meu_7uw">
        {/* Filters */}
        <div
          className="flex flex-col flex-wrap items-center justify-between gap-4 sm:flex-row"
          data-oid="_g::436"
        >
          <div className="w-full sm:w-auto" data-oid="nqld_.i">
            {/* Search input */}
            <div className="relative" data-oid="dfhgoh9">
              <Input
                id={`${id}-input`}
                ref={inputRef}
                className="peer w-full min-w-[300px] ps-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                type="text"
                aria-label="Search posts"
                data-oid="nsie24r"
              />

              <div
                className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
                data-oid=":uagfh6"
              >
                <ListFilterIcon
                  size={16}
                  aria-hidden="true"
                  data-oid="480fftr"
                />
              </div>
            </div>
          </div>

          {/* Cards per page selector */}
          <div className="flex items-center gap-3" data-oid="hm7jx3d">
            <Label
              htmlFor={id}
              className="whitespace-nowrap"
              data-oid="k7bjx2i"
            >
              Cards per page
            </Label>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(0);
              }}
              data-oid="bein4k."
            >
              <SelectTrigger id={id} className="w-[100px]" data-oid="ou5-0yo">
                <SelectValue placeholder="Select" data-oid="88d7:fq" />
              </SelectTrigger>
              <SelectContent data-oid="6e47tq4">
                {[6, 9, 12, 15].map((size) => (
                  <SelectItem
                    key={size}
                    value={size.toString()}
                    data-oid="v99mmsl"
                  >
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid of Cards */}
        <div
          className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-oid="dx6jbkp"
        >
          {currentData.map((post) => (
            <Card
              key={post.id}
              className="flex h-full flex-col"
              data-oid="1zzk.ih"
            >
              <CardHeader className="flex-none" data-oid="cck70-l">
                <CardTitle className="line-clamp-2 text-xl" data-oid="3_c-f60">
                  {post.title}
                </CardTitle>
                <CardDescription
                  className="flex items-center gap-2"
                  data-oid="--d_ybz"
                >
                  <UserIcon size={14} data-oid="n367eq9" />
                  User {post.userId}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" data-oid="n3x8ciy">
                <p
                  className="text-muted-foreground line-clamp-4"
                  data-oid="rze8ekw"
                >
                  {post.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div
          className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-8"
          data-oid="7dfap8s"
        >
          {/* Page information */}
          <div
            className="text-muted-foreground order-2 text-center text-sm sm:order-1 sm:text-left"
            data-oid="ea.tds3"
          >
            <p data-oid="nh20mhc">
              Showing{" "}
              <span className="text-foreground font-medium" data-oid="ed-mvv9">
                {startIndex + 1} - {Math.min(endIndex, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-medium" data-oid="lljnunx">
                {filteredData.length}
              </span>{" "}
              posts
            </p>
          </div>

          {/* Pagination buttons */}
          <div className="order-1 sm:order-2" data-oid="04m6:23">
            <Pagination data-oid="omtdeli">
              <PaginationContent data-oid="wkwpg6q">
                <PaginationItem data-oid="b01_t61">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(0)}
                    disabled={!canPreviousPage}
                    aria-label="Go to first page"
                    data-oid="0gh4k0t"
                  >
                    <ChevronFirstIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="3-j6pfv"
                    />
                  </Button>
                </PaginationItem>
                <PaginationItem data-oid="q-usdqp">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!canPreviousPage}
                    aria-label="Go to previous page"
                    data-oid="ycp32p6"
                  >
                    <ChevronLeftIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="wgfzwb7"
                    />
                  </Button>
                </PaginationItem>
                <PaginationItem data-oid="xc:7qbc">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!canNextPage}
                    aria-label="Go to next page"
                    data-oid="5g.an3i"
                  >
                    <ChevronRightIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="q_776xe"
                    />
                  </Button>
                </PaginationItem>
                <PaginationItem data-oid="gnqvwe0">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(totalPages - 1)}
                    disabled={!canNextPage}
                    aria-label="Go to last page"
                    data-oid=".23w89h"
                  >
                    <ChevronLastIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="8rmrtlp"
                    />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
