import React, { useState } from "react";
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
import CyberpunkSpinner from "../../component/transaksi/CyberpunkSpinner";
import TextArea from "../../component/form/input/TextArea";
import Label from "../../component/form/Label";
import Select from "../../component/form/Select";
import { formatRupiah } from "../../utils/format";
import FileInput from "../../component/form/input/FileInput";
import Toast from "../../component/transaksi/Toast";

interface formOrder {
  comment: string;
  status: string;
  bukti_admin: File;
}

const Order = () => {
  const queryClient = useQueryClient();
  const options = [
    { value: "success", label: "Sukses" },
    { value: "rejected", label: "Rejected" },
  ];
  const [form, setForm] = useState<Record<number, formOrder>>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [show, setShow] = useState(false);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getAllOrders,
  });

  // const verifyMutation = useMutation({
  //   mutationFn: verifyOrder,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
  //   },
  // });
  const openModal = (order: any) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const verifyMutation = useMutation({
    mutationFn: ({
      id,
      status,
      admin_note,
      bukti_admin,
    }: {
      id: number;
      status: string;
      admin_note: string;
      bukti_admin?: File;
    }) => {
      const formData = new FormData();

      formData.append("_method", "PUT");
      formData.append("status", status);
      formData.append("admin_note", admin_note);

      if (bukti_admin) {
        formData.append("bukti_admin", bukti_admin);
      }
      setShow(true);
      return verifyOrder(id, formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });

  const handleFileChange = (
    id: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setForm((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          bukti_admin: file,
        },
      }));
    }
  };

  const handleSubmit = (id: number, e: React.FormEvent) => {
    e.preventDefault();

    const data = form[id];
    console.log(id);

    verifyMutation.mutate({
      id: id,
      status: data.status,
      admin_note: data.comment,
      bukti_admin: data.bukti_admin,
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
        title="User Pesanan MosherBlox"
        description="seluruh transaksi ada di sini untuk konfirmasi pembayaran"
      />
      <PageBreadcrumb pageTitle="Game Detail" />
      <div className="space-y-6">
        <ComponentCard title="List Game">
          <Toast
            show={show}
            message="Status Berhasil di ubah! "
            onClose={() => setShow(false)}
          />
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
                        {order.status != "pending" ? (
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
                          {(order.status === "waiting_verification" ||
                            order.status === "success" ||
                            order.status === "rejected") && (
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

                                <div>
                                  <Label>Upload Bukti</Label>
                                  <FileInput
                                    onChange={(e) =>
                                      handleFileChange(order.id, e)
                                    }
                                  />
                                </div>

                                <button
                                  type="submit"
                                  className="bg-green-600 px-3 py-1 rounded hover:bg-green-700 mt-2"
                                >
                                  Proses
                                </button>

                                <button
                                  onClick={() => openModal(order)}
                                  className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 ml-2"
                                >
                                  Tampilkan Data
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
      {showModal && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white dark:bg-gray-900 text-white rounded-xl shadow-xl w-[500px] p-6">
            <h2 className="text-xl font-semibold mb-4">Detail Order</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="ttext-white">User</span>
                <span className="font-medium">{selectedOrder.user.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="ttext-white">Email</span>
                <span className="font-medium">{selectedOrder.email}</span>
              </div>

              <div className="flex justify-between">
                <span className="ttext-white">Total</span>
                <span className="font-medium">
                  {formatRupiah(selectedOrder.total_price)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="ttext-white">Status</span>

                <Badge size="md" color={statusBadge(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>

              <div className="flex justify-between">
                <span className="ttext-white">Username</span>
                <span className="text-fuchsia-400 font-semibold font-medium">
                  {selectedOrder.username}
                </span>
              </div>

              <div>
                <span className="ttext-white block mb-2">Bukti Pembayaran</span>

                {selectedOrder.payment_proof_url ? (
                  <img
                    src={selectedOrder.payment_proof_url}
                    alt="bukti"
                    className="w-full h-60 object-cover rounded-lg border"
                  />
                ) : (
                  <p className="text-gray-400">Tidak ada bukti</p>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;
