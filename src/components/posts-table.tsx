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
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <div className="mt-28 mb-40 flex w-full flex-row items-center justify-center gap-3 text-4xl uppercase">
        <FileTextIcon height={36} width={"auto"} />
        <AnimatedNumber
          className="text-4xl"
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
          value={value}
        />{" "}
        <p>Posts Fetched</p>
        <p>from JSONPlaceholder</p>
      </div>

      <div className="space-y-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Search input */}
            <div className="relative">
              <Input
                id={`${id}-input`}
                ref={inputRef}
                className="peer min-w-60 ps-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                type="text"
                aria-label="Search posts"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ListFilterIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>

          {/* Cards per page selector */}
          <div className="flex items-center gap-3">
            <Label htmlFor={id} className="max-sm:sr-only">
              Cards per page
            </Label>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(0); // Reset to first page when changing page size
              }}
            >
              <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of cards" />
              </SelectTrigger>
              <SelectContent>
                {[6, 9, 12, 15].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {currentData.map((post) => (
            <Card key={post.id} className="flex min-w-[300px] flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <UserIcon size={14} />
                  User {post.userId}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-4">
                  {post.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-8">
          {/* Page information */}
          <div className="text-muted-foreground flex grow text-sm">
            <p>
              Showing{" "}
              <span className="text-foreground font-medium">
                {startIndex + 1} - {Math.min(endIndex, filteredData.length)}
              </span>{" "}
              of{" "}
              <span className="text-foreground font-medium">
                {filteredData.length}
              </span>{" "}
              posts
            </p>
          </div>

          {/* Pagination buttons */}
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(0)}
                    disabled={!canPreviousPage}
                    aria-label="Go to first page"
                  >
                    <ChevronFirstIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={!canPreviousPage}
                    aria-label="Go to previous page"
                  >
                    <ChevronLeftIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!canNextPage}
                    aria-label="Go to next page"
                  >
                    <ChevronRightIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => setCurrentPage(totalPages - 1)}
                    disabled={!canNextPage}
                    aria-label="Go to last page"
                  >
                    <ChevronLastIcon size={16} aria-hidden="true" />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
