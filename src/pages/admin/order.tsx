import React, { useState } from "react";
import { getAllOrders, rejectOrder, verifyOrder } from "../../api/admin";
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
import { GetOrders, Orders } from "../../types/Order";
import CyberpunkSpinner from "../../component/transaksi/CyberpunkSpinner";
import TextArea from "../../component/form/input/TextArea";
import Label from "../../component/form/Label";
import Select from "../../component/form/Select";
import { formatRupiah } from "../../utils/format";

interface formOrder {
  comment: string;
  status: string;
}

const order = () => {
  const queryClient = useQueryClient();
  const options = [
    { value: "success", label: "Sukses" },
    { value: "rejected", label: "Rejected" },
  ];
  const [form, setForm] = useState<Record<number, formOrder>>({});

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  const verifyMutation = useMutation({
    mutationFn: ({
      id,
      status,
      admin_note,
    }: {
      id: number;
      status: string;
      admin_note: string;
    }) => verifyOrder(id, status, admin_note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  // const verifyMutation = useMutation({
  //   mutationFn: verifyOrder,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
  //   },
  // });

  const handleSubmit = (id: number, e: React.FormEvent) => {
    e.preventDefault();

    const data = form[id];
    console.log(data);

    verifyMutation.mutate({
      id: id,
      status: data.status,
      admin_note: data.comment,
    });
  };
  const statusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "waiting_verification":
        return "primary";
      case "paid":
        return "info";
      case "rejected":
        return "error";
      default:
        return "primary";
    }
  };
  if (isLoading) return <CyberpunkSpinner size={50} text="Loading" />;
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
                      User
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Total
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Bukti
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
                  {orders?.map((order: any) => (
                    <TableRow key={order.id}>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.user.name}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ">
                        {formatRupiah(order.total_price)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge size="sm" color={statusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.payment_proof_url ? (
                          <img
                            src={order.payment_proof_url}
                            alt="bukti"
                            className="w-16 h-16 object-cover rounded"
                          />
                        ) : (
                          "-"
                        )}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-white-500 text-start text-theme-sm dark:text-white/90">
                        <div className="flex items-center gap-5">
                          {order.status === "waiting_verification" && (
                            <>
                              <form
                                key={order.id}
                                onSubmit={(event) =>
                                  handleSubmit(order.id, event)
                                }
                              >
                                <div>
                                  <Label>Comment</Label>
                                  <TextArea
                                    value={form[order.id]?.comment || ""}
                                    onChange={(value) =>
                                      setForm({
                                        ...form,
                                        [order.id]: {
                                          ...form[order.id],
                                          comment: value,
                                        },
                                      })
                                    }
                                    rows={6}
                                    // hint="Please enter a valid message."
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="game_id">Status Order</Label>
                                  <Select
                                    options={options}
                                    placeholder="Select an option"
                                    onChange={(value) =>
                                      setForm({
                                        ...form,
                                        [order.id]: {
                                          ...form[order.id],
                                          status: value,
                                        },
                                      })
                                    }
                                    className="dark:bg-dark-900"
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 mt-2"
                                >
                                  Proses
                                </button>
                              </form>
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
