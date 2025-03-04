"use client";

import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import type {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpRight,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleXIcon,
  GlobeIcon,
  ListFilterIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";
import Image from "next/image";
import Link from "next/link";

type Country = {
  name: {
    common: string;
    official: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
};

const multiColumnFilterFn: FilterFn<Country> = (
  row,
  columnId,
  value: string,
) => {
  const searchableRowContent =
    `${row.original.name.common} ${row.original.name.official} ${row.original.capital?.[0] ?? ""} ${row.original.region}`.toLowerCase();
  const searchTerm = (value ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const columns: ColumnDef<Country>[] = [
  {
    header: "Flag",
    accessorKey: "flags",
    cell: ({ row }) => {
      const flags = row.getValue<Country["flags"]>("flags");
      return (
        <Image
          src={flags.png}
          alt={flags.alt ?? `Flag of ${row.original.name.common}`}
          className="h-6 w-auto"
          width={24}
          height={24}
          data-oid="02y9j9t"
        />
      );
    },
    size: 80,
    enableSorting: false,
  },
  {
    header: "Name",
    accessorFn: (row) => row.name.common,
    id: "name",
    cell: ({ row }) => {
      return (
        <div data-oid="upsa0sj">
          <div className="font-medium" data-oid="g9b12.o">
            {row.original.name.common}
          </div>
          <div className="text-muted-foreground text-sm" data-oid="ycpt4mg">
            {row.original.name.official}
          </div>
        </div>
      );
    },
    size: 300,
    filterFn: multiColumnFilterFn,
  },
  {
    header: "Capital",
    accessorKey: "capital",
    cell: ({ row }) => {
      const capitals = row.getValue<string[]>("capital");
      return <div data-oid="kh.f0:n">{capitals?.[0] ?? "N/A"}</div>;
    },
    size: 150,
  },
  {
    header: "Region",
    accessorKey: "region",
    cell: ({ row }) => <div data-oid="htvmn0y">{row.getValue("region")}</div>,
    size: 120,
  },
  {
    header: "Subregion",
    accessorKey: "subregion",
    cell: ({ row }) => (
      <div data-oid="ogxa75i">{row.getValue("subregion") ?? "N/A"}</div>
    ),

    size: 150,
  },
  {
    header: "Population",
    accessorKey: "population",
    cell: ({ row }) => (
      <div data-oid="m34tnp2">
        {new Intl.NumberFormat().format(row.getValue("population"))}
      </div>
    ),

    size: 120,
  },
];

export default function CountriesTable() {
  const id = useId();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "name",
      desc: false,
    },
  ]);

  const [data, setData] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch("https://restcountries.com/v3.1/all", {
          next: { revalidate: 3600 }, // Cache for 1 hour
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const fetchedData = (await res.json()) as Country[];
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch countries data",
        );
        setData([]);
      } finally {
        setIsLoading(false);
      }
    }
    void fetchCountries();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  });

  const [value, setValue] = useState(0);
  useEffect(() => {
    setValue(data.length);
  }, [data.length]);

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      data-oid="2ptw0wt"
    >
      {/* Hero */}
      <div
        className="mt-28 mb-40 flex w-full flex-row items-center justify-center gap-3 text-4xl uppercase"
        data-oid="lzevuls"
      >
        <GlobeIcon height={36} width={36} data-oid="xbbblsb" />
        <AnimatedNumber
          className="text-4xl"
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
          value={value}
          data-oid="-q-848l"
        />{" "}
        <p data-oid="mwwc0nv">Countries</p>
      </div>

      {error && (
        <div
          className="mb-4 rounded-md bg-red-50 p-4 text-red-700"
          data-oid="kalpgfi"
        >
          <p data-oid="y.x59np">Error: {error}</p>
          <p className="mt-2 text-sm" data-oid="7o7ldyp">
            Please try refreshing the page or check your internet connection.
          </p>
        </div>
      )}

      {isLoading ? (
        <div
          className="flex items-center justify-center py-8"
          data-oid="9pnezq3"
        >
          <div
            className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"
            data-oid="gvfa49e"
          ></div>
        </div>
      ) : (
        <div
          className="mb-20 flex flex-col items-center justify-center space-y-4"
          data-oid="l2:z_74"
        >
          {/* Filters */}
          <div
            className="flex flex-wrap items-center justify-between gap-3"
            data-oid="6ukkyrb"
          >
            <div className="flex items-center gap-3" data-oid="tn9mso3">
              {/* Filter by name or region */}
              <div className="relative" data-oid="-57g7jp">
                <Input
                  id={`${id}-input`}
                  ref={inputRef}
                  className={cn(
                    "peer min-w-60 ps-9",
                    Boolean(table.getColumn("name")?.getFilterValue()) &&
                      "pe-9",
                  )}
                  value={
                    (table.getColumn("name")?.getFilterValue() ?? "") as string
                  }
                  onChange={(e) =>
                    table.getColumn("name")?.setFilterValue(e.target.value)
                  }
                  placeholder="Filter by name or region..."
                  type="text"
                  aria-label="Filter by name or region"
                  data-oid="j166j7x"
                />

                <div
                  className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
                  data-oid="b.4xjly"
                >
                  <ListFilterIcon
                    size={16}
                    aria-hidden="true"
                    data-oid="du8i29_"
                  />
                </div>
                {Boolean(table.getColumn("name")?.getFilterValue()) && (
                  <button
                    className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Clear filter"
                    onClick={() => {
                      table.getColumn("name")?.setFilterValue("");
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }}
                    data-oid="ehwbu40"
                  >
                    <CircleXIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="1dz4f1g"
                    />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div
            className="bg-background overflow-hidden rounded-md border"
            data-oid="9kmla9g"
          >
            <Table data-oid="ugup-37">
              <TableHeader data-oid=":1btwec">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                    data-oid="n0dap1m"
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          style={{ width: `${header.getSize()}px` }}
                          className="h-11"
                          data-oid="6x7qc9q"
                        >
                          {header.isPlaceholder ? null : header.column.getCanSort() ? (
                            <div
                              className={cn(
                                header.column.getCanSort() &&
                                  "flex h-full cursor-pointer items-center justify-between gap-2 select-none",
                              )}
                              onClick={header.column.getToggleSortingHandler()}
                              onKeyDown={(e) => {
                                if (
                                  header.column.getCanSort() &&
                                  (e.key === "Enter" || e.key === " ")
                                ) {
                                  e.preventDefault();
                                  header.column.getToggleSortingHandler()?.(e);
                                }
                              }}
                              tabIndex={
                                header.column.getCanSort() ? 0 : undefined
                              }
                              data-oid="vwx3kri"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                              {{
                                asc: (
                                  <ChevronUpIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                    data-oid="k_s:fgc"
                                  />
                                ),

                                desc: (
                                  <ChevronDownIcon
                                    className="shrink-0 opacity-60"
                                    size={16}
                                    aria-hidden="true"
                                    data-oid="subscpw"
                                  />
                                ),
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          ) : (
                            flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody data-oid="t-rs:aq">
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      data-oid="d5mids:"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} data-oid="wt6_5.j">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow data-oid="4_m02i1">
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                      data-oid="bxdgj_m"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div
            className="flex items-center justify-between gap-8"
            data-oid="h.haevc"
          >
            {/* Results per page */}
            <div className="flex items-center gap-3" data-oid="2kx5x56">
              <Label htmlFor={id} className="max-sm:sr-only" data-oid="30d82if">
                Rows per page
              </Label>
              <Select
                value={table.getState().pagination.pageSize.toString()}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
                data-oid="8fur.:o"
              >
                <SelectTrigger
                  id={id}
                  className="w-fit whitespace-nowrap"
                  data-oid="9b:87f0"
                >
                  <SelectValue
                    placeholder="Select number of results"
                    data-oid="7h0kme2"
                  />
                </SelectTrigger>
                <SelectContent data-oid="rt27:4t">
                  {[5, 10, 25, 50].map((pageSize) => (
                    <SelectItem
                      key={pageSize}
                      value={pageSize.toString()}
                      data-oid=":9we36i"
                    >
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page number information */}
            <div
              className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap"
              data-oid="2kxaz.p"
            >
              <p
                className="text-muted-foreground text-sm whitespace-nowrap"
                data-oid="n9y874o"
              >
                <span className="text-foreground" data-oid="fawjfe1">
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                  -
                  {Math.min(
                    Math.max(
                      table.getState().pagination.pageIndex *
                        table.getState().pagination.pageSize +
                        table.getState().pagination.pageSize,
                      0,
                    ),
                    table.getRowCount(),
                  )}
                </span>{" "}
                of{" "}
                <span className="text-foreground" data-oid="a0pal7b">
                  {table.getRowCount().toString()}
                </span>
              </p>
            </div>

            {/* Pagination buttons */}
            <div data-oid="dqnbem-">
              <Pagination data-oid="179e6b0">
                <PaginationContent data-oid="-1hbbm_">
                  <PaginationItem data-oid="hkd1tbe">
                    <Button
                      size="icon"
                      variant="outline"
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => table.firstPage()}
                      disabled={!table.getCanPreviousPage()}
                      aria-label="Go to first page"
                      data-oid="b_2y3p3"
                    >
                      <ChevronFirstIcon
                        size={16}
                        aria-hidden="true"
                        data-oid="8omk840"
                      />
                    </Button>
                  </PaginationItem>
                  <PaginationItem data-oid="l0s1fxx">
                    <Button
                      size="icon"
                      variant="outline"
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      aria-label="Go to previous page"
                      data-oid="02zrtsj"
                    >
                      <ChevronLeftIcon
                        size={16}
                        aria-hidden="true"
                        data-oid="x.vh8xi"
                      />
                    </Button>
                  </PaginationItem>
                  <PaginationItem data-oid="x5.c9iv">
                    <Button
                      size="icon"
                      variant="outline"
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      aria-label="Go to next page"
                      data-oid="9t573qs"
                    >
                      <ChevronRightIcon
                        size={16}
                        aria-hidden="true"
                        data-oid="_9xa-cr"
                      />
                    </Button>
                  </PaginationItem>
                  <PaginationItem data-oid="3hbv5zt">
                    <Button
                      size="icon"
                      variant="outline"
                      className="disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => table.lastPage()}
                      disabled={!table.getCanNextPage()}
                      aria-label="Go to last page"
                      data-oid="8kb8l7."
                    >
                      <ChevronLastIcon
                        size={16}
                        aria-hidden="true"
                        data-oid="83nte18"
                      />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-row items-center">
        <p className="text-sm opacity-30">All data is fetched from</p>
        <Button
          variant={"link"}
          className="m-0 p-0 opacity-30 transition-all duration-500 hover:opacity-100"
        >
          <Link href={"https://restcountries.com"} target={"_blank"}>
            Restcountries
          </Link>

          <ArrowUpRight />
        </Button>
      </div>
    </div>
  );
}
