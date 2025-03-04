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
  ArrowBigRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleXIcon,
  CoinsIcon,
  ListFilterIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";
import Image from "next/image";
import Link from "next/link";

type Crypto = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
};

const multiColumnFilterFn: FilterFn<Crypto> = (
  row,
  columnId,
  value: string,
) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.symbol}`.toLowerCase();
  const searchTerm = (value ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
};

const formatLargeNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(num);
};

const columns: ColumnDef<Crypto>[] = [
  {
    header: "Rank",
    accessorKey: "market_cap_rank",

    cell: ({ row }) => (
      <div className="text-center" data-oid="7z5_g6y">
        {row.getValue("market_cap_rank")}
      </div>
    ),

    size: 70,
    enableHiding: true,
  },
  {
    header: "Coin",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2" data-oid="smhgrm1">
        <Image
          src={row.original.image}
          alt={`${row.getValue<string>("name")} logo`}
          width={24}
          height={24}
          className="h-6 w-6"
          data-oid="m:icgev"
        />

        <div data-oid="5_l6i62">
          <div className="font-medium" data-oid="iga0_m5">
            {row.getValue("name")}
          </div>
          <div
            className="text-muted-foreground text-sm uppercase"
            data-oid="50-mc98"
          >
            {row.original.symbol}
          </div>
        </div>
      </div>
    ),

    size: 200,
    filterFn: multiColumnFilterFn,
  },
  {
    header: "Price",
    accessorKey: "current_price",
    cell: ({ row }) => (
      <div className="font-medium" data-oid="64_8f-i">
        {formatPrice(row.getValue("current_price"))}
      </div>
    ),

    size: 150,
  },
  {
    header: "24h %",
    accessorKey: "price_change_percentage_24h",
    cell: ({ row }) => {
      const change = row.getValue<number>("price_change_percentage_24h");
      const isPositive = change >= 0;
      return (
        <div
          className={cn(
            "font-medium",
            isPositive ? "text-green-600" : "text-red-600",
          )}
          data-oid="lrofx48"
        >
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
        </div>
      );
    },
    size: 100,
    enableHiding: true,
  },
  {
    header: "Volume",
    accessorKey: "total_volume",
    cell: ({ row }) => (
      <div data-oid="_1mtwuy">
        {formatLargeNumber(row.getValue("total_volume"))}
      </div>
    ),

    size: 150,
    enableHiding: true,
  },
  {
    header: "Market Cap",
    accessorKey: "market_cap",
    cell: ({ row }) => (
      <div data-oid="p3j.mev">
        {formatLargeNumber(row.getValue("market_cap"))}
      </div>
    ),

    size: 150,
    enableHiding: true,
  },
];

export default function CryptoTable() {
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
      id: "market_cap_rank",
      desc: false,
    },
  ]);

  const [data, setData] = useState<Crypto[]>([]);
  useEffect(() => {
    async function fetchCrypto() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false",
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const fetchedData = (await res.json()) as Crypto[];
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
        setData([]);
      }
    }
    void fetchCrypto();
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

  // Set initial column visibility based on screen size
  useEffect(() => {
    const updateColumnVisibility = () => {
      const isMobile = window.innerWidth < 768;
      const isTablet = window.innerWidth < 1024;

      setColumnVisibility({
        market_cap_rank: !isMobile,
        price_change_percentage_24h: !isMobile,
        total_volume: !isTablet,
        market_cap: !isTablet,
      });
    };

    updateColumnVisibility();
    window.addEventListener("resize", updateColumnVisibility);
    return () => window.removeEventListener("resize", updateColumnVisibility);
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center transition-all duration-700"
      data-oid="in0y0zm"
    >
      {/* Hero */}
      <div
        className="mt-16 mb-20 flex w-full flex-row items-center justify-center gap-3 text-2xl uppercase sm:mt-28 sm:mb-40 sm:text-4xl"
        data-oid="8k2i6lr"
      >
        <CoinsIcon height={36} width={36} />
        <AnimatedNumber
          className="text-2xl sm:text-4xl"
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
          value={value}
          data-oid="45uwde:"
        />{" "}
        <p>Cryptocurrencies</p>
      </div>
      <div
        className="mb-20 flex flex-col items-center justify-center space-y-4"
        data-oid="z4_5n8c"
      >
        {/* Filters */}
        <div
          className="flex flex-col flex-wrap items-center justify-between gap-3 sm:flex-row"
          data-oid="y5x492d"
        >
          <div className="flex items-center gap-3" data-oid="p7b_1vu">
            {/* Filter by name or symbol */}
            <div className="relative" data-oid="gtu0b9k">
              <Input
                id={`${id}-input`}
                ref={inputRef}
                className={cn(
                  "peer min-w-60 ps-9",
                  Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9",
                )}
                value={
                  (table.getColumn("name")?.getFilterValue() ?? "") as string
                }
                onChange={(e) =>
                  table.getColumn("name")?.setFilterValue(e.target.value)
                }
                placeholder="Filter by name or symbol..."
                type="text"
                aria-label="Filter by name or symbol"
                data-oid=":qqp03y"
              />

              <div
                className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50"
                data-oid="_ndqju8"
              >
                <ListFilterIcon
                  size={16}
                  aria-hidden="true"
                  data-oid="g8n:ykt"
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
                  data-oid="t_e.brr"
                >
                  <CircleXIcon
                    size={16}
                    aria-hidden="true"
                    data-oid="43p.tdf"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div
          className="bg-background overflow-hidden rounded-md border"
          data-oid="hnk_w1m"
        >
          <Table data-oid="-_zw8r3">
            <TableHeader data-oid="o0y6wvw">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="hover:bg-transparent"
                  data-oid="6v3bmak"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                        className="h-11"
                        data-oid="ypi4itd"
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
                            data-oid="y4amn1f"
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
                                  data-oid="324gu4."
                                />
                              ),

                              desc: (
                                <ChevronDownIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
                                  data-oid="c-oiw6u"
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
            <TableBody data-oid="vveqocb">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    data-oid="blh8dyh"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} data-oid="gdr0psc">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow data-oid="qqt23l7">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                    data-oid="0ohswa0"
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
          data-oid="iy:n:_1"
        >
          {/* Results per page */}
          <div className="flex items-center gap-3" data-oid="gvx.uwz">
            <Label htmlFor={id} className="max-sm:sr-only" data-oid="h6ehab_">
              Rows per page
            </Label>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
              data-oid="p1mlr6j"
            >
              <SelectTrigger
                id={id}
                className="w-fit whitespace-nowrap"
                data-oid="8b7a205"
              >
                <SelectValue
                  placeholder="Select number of results"
                  data-oid="3wy-t2z"
                />
              </SelectTrigger>
              <SelectContent data-oid="_yr5r0c">
                {[5, 10, 25, 50].map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={pageSize.toString()}
                    data-oid="ru.oi91"
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
            data-oid="a.08nd1"
          >
            <p
              className="text-muted-foreground text-sm whitespace-nowrap"
              data-oid="cjiy.vp"
            >
              <span className="text-foreground" data-oid="zelfxml">
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
              <span className="text-foreground" data-oid="i79knw9">
                {table.getRowCount().toString()}
              </span>
            </p>
          </div>

          {/* Pagination buttons */}
          <div data-oid="6xb:fym">
            <Pagination data-oid="-_yz4qb">
              <PaginationContent data-oid="tkeuq86">
                <PaginationItem data-oid="2g6pp_1">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to first page"
                    data-oid="dsy_0pz"
                  >
                    <ChevronFirstIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="c-91e-r"
                    />
                  </Button>
                </PaginationItem>
                <PaginationItem data-oid="tzjta6.">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    aria-label="Go to previous page"
                    data-oid="-smv:y2"
                  >
                    <ChevronLeftIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="hw16_.u"
                    />
                  </Button>
                </PaginationItem>
                <PaginationItem data-oid="-7m9iql">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to next page"
                    data-oid="mffj3lg"
                  >
                    <ChevronRightIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="5146c4y"
                    />
                  </Button>
                </PaginationItem>
                <PaginationItem data-oid="i095uw5">
                  <Button
                    size="icon"
                    variant="outline"
                    className="disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
                    aria-label="Go to last page"
                    data-oid="n3zgt3y"
                  >
                    <ChevronLastIcon
                      size={16}
                      aria-hidden="true"
                      data-oid="7hh_x7p"
                    />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <p className="text-sm opacity-30">All data is fetched from</p>
        <Button
          variant={"link"}
          className="m-0 p-0 opacity-30 transition-all duration-500 hover:opacity-100"
        >
          <Link
            href={"https://docs.coingecko.com/reference/introduction"}
            target={"_blank"}
          >
            Coingecko
          </Link>

          <ArrowUpRight />
        </Button>
      </div>
    </main>
  );
}
