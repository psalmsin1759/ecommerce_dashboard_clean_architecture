"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
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
import { ArrowUpDown, Download } from "lucide-react";

// Define the data type
export type Order = {
  id: string;
  customer: string;
  status: "pending" | "completed" | "cancelled";
  amount: number;
  date: string;
};

// Example data
const orders: Order[] = [
  { id: "1", customer: "John Doe", status: "completed", amount: 120, date: "2025-09-01" },
  { id: "2", customer: "Jane Smith", status: "pending", amount: 85, date: "2025-09-03" },
  { id: "3", customer: "Michael Lee", status: "cancelled", amount: 50, date: "2025-09-04" },
  { id: "4", customer: "Emily Davis", status: "completed", amount: 230, date: "2025-09-05" },
  { id: "5", customer: "Chris Evans", status: "pending", amount: 140, date: "2025-09-06" },
  { id: "6", customer: "Sophia Brown", status: "completed", amount: 300, date: "2025-09-07" },
];

// Table column definitions
const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customer",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      const color =
        status === "completed"
          ? "text-green-600"
          : status === "pending"
          ? "text-yellow-600"
          : "text-red-600";
      return <span className={color}>{status}</span>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Amount ($)
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

export default function RecentOrders() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filtering, setFiltering] = React.useState("");

  const table = useReactTable({
    data: orders,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 4, // ✅ Show 4 rows per page
      },
    },
  });

  // Export table data as CSV
  const handleExport = () => {
    const rows = table.getRowModel().rows.map((row) => row.original);
    const header = Object.keys(rows[0]).join(",");
    const csv = [
      header,
      ...rows.map((row) =>
        Object.values(row)
          .map((v) => `"${v}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow w-full mt-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Recent Orders</h2>

      {/* Search + Export */}
      <div className="mb-4 flex items-center justify-between">
        <Input
          placeholder="Search orders..."
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
