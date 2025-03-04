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
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CoinsIcon,
  ListFilterIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatedNumber } from "./ui/animated-number";
import Image from "next/image";

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
    header: "#",
    accessorKey: "market_cap_rank",
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("market_cap_rank")}</div>
    ),
    size: 70,
    enableHiding: true,
  },
  {
    header: "Coin",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.original.image}
          alt={`${row.getValue<string>("name")} logo`}
          width={24}
          height={24}
          className="h-6 w-6"
        />
        <div>
          <div className="font-medium">{row.getValue("name")}</div>
          <div className="text-muted-foreground text-sm uppercase">
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
      <div className="text-right font-medium">
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
            "text-right font-medium",
            isPositive ? "text-green-600" : "text-red-600",
          )}
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
      <div className="text-right">
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
      <div className="text-right">
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
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
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
    <div className="flex min-h-screen flex-col">
      {/* Hero */}
      <div className="mt-16 mb-20 flex w-full flex-row items-center justify-center gap-3 text-2xl uppercase sm:mt-28 sm:mb-40 sm:text-4xl">
        <CoinsIcon height={36} width={"auto"} />
        <AnimatedNumber
          className="text-2xl sm:text-4xl"
          springOptions={{
            bounce: 0,
            duration: 2000,
          }}
          value={value}
        />{" "}
        <p>Cryptocurrencies</p>
        <p className="hidden sm:block">from CoinGecko</p>
      </div>

      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col flex-wrap items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            {/* Filter by name or symbol */}
            <div className="relative">
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
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <ListFilterIcon size={16} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-background overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        style={{ width: `${header.getSize()}px` }}
                        className="h-11"
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
                                />
                              ),
                              desc: (
                                <ChevronDownIcon
                                  className="shrink-0 opacity-60"
                                  size={16}
                                  aria-hidden="true"
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
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between gap-8">
          {/* Results per page */}
          <div className="flex items-center gap-3">
            <Label htmlFor={id} className="max-sm:sr-only">
              Rows per page
            </Label>
            <Select
              value={table.getState().pagination.pageSize.toString()}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger id={id} className="w-fit whitespace-nowrap">
                <SelectValue placeholder="Select number of results" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 25, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={pageSize.toString()}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page number information */}
          <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
            <p className="text-muted-foreground text-sm whitespace-nowrap">
              <span className="text-foreground">
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
              <span className="text-foreground">
                {table.getRowCount().toString()}
              </span>
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
                    onClick={() => table.firstPage()}
                    disabled={!table.getCanPreviousPage()}
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
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
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
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
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
                    onClick={() => table.lastPage()}
                    disabled={!table.getCanNextPage()}
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
