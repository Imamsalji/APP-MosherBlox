import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllGames, deleteGame } from "./../../../api/admin";
import type { Game, GameList } from "./../../../types/Game";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";
import Button from "../../../component/ui/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../component/ui/table";
import { useNotifStore } from "./../../../store/appStore";
import Badge from "../../../component/ui/badge/Badge";
import CyberpunkSpinner from "../../../component/transaksi/CyberpunkSpinner";
import Toast from "../../../component/transaksi/Toast";
import { useState } from "react";

export default function GameList() {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const message = location.state?.message;

  const { data: games, isLoading } = useQuery({
    queryKey: ["admin-games"],
    queryFn: getAllGames,
  });

  const attr = useMutation({
    mutationFn: deleteGame,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-games"] });
    },
  });

  const deleteMutation = (id: number) => {
    console.log(id);
    useNotifStore.getState().show({
      title: "Konfirmasi Delete",
      message:
        "Apakah yakin anda ingin menghapus Game ini?, jika di hapus semua produk akan ikut terhapus!!",
      onConfirm: async () => {
        attr.mutate(id);
      },
    });
  };

  if (isLoading) return <CyberpunkSpinner size={50} text="Loading" />;
  return (
    <>
      <PageMeta
        title="Game List Index"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Game" />
      {message && (
        <Toast show={true} message={message} onClose={() => setShow(false)} />
      )}
      <div className="space-y-6">
        <ComponentCard title="List Game">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <Table>
                {/* Table Header */}
                <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                  <TableRow>
                    {/* <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                      Image
                    </TableCell> */}
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
                      Status Game
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
                  {games?.map((order: GameList) => (
                    <TableRow key={order.id}>
                      {/* <TableCell className="px-5 py-4 sm:px-6 text-start">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 overflow-hidden rounded-full">
                            <img
                              loading="lazy"
                              width={40}
                              height={40}
                              src={order.image_url}
                              alt={order.name}
                            />
                          </div>
                        </div>
                      </TableCell> */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {order.name}
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
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() =>
                              navigate("/admin/game/edit/" + order.id)
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => deleteMutation(order.id)}
                          >
                            Delete
                          </Button>
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
}
