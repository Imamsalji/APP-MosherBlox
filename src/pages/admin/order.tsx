import React from "react";
import { getAllOrders, verifyOrder } from "../../api/admin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import PageMeta from "../../component/common/PageMeta";
import PageBreadcrumb from "../../component/common/PageBreadCrumb";
import ComponentCard from "../../component/common/ComponentCard";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TableBody,
} from "../../component/ui/table";
import Badge from "../../component/ui/badge/Badge";
import Button from "../../component/ui/button/Button";

const order = () => {
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });
  const verifyMutation = useMutation({
    mutationFn: verifyOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "waiting_verification":
        return "bg-blue-500";
      case "paid":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Game Detail" />
      <div className="space-y-6">
        <ComponentCard title="List Game">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Name
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Harga
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      stock
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      aksi
                    </TableCell>
                  </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                  {product?.map((order: Product) => (
                    <TableRow key={order.id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.price}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.stock}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                          size="sm"
                          color={order.status === 1 ? "success" : "error"}
                        >
                          {order.status === 1 ? "Aktif" : "Non-Aktif"}
                        </Badge>
                      </TableCell>

                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <div className="flex items-center gap-5">
                          {order.status === "waiting_verification" && (
                            <>
                              <button
                                onClick={() => verifyMutation.mutate(order.id)}
                                className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                              >
                                Verify
                              </button>

                              <button
                                onClick={() => rejectMutation.mutate(order.id)}
                                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                              >
                                Reject
                              </button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
};

export default order;
