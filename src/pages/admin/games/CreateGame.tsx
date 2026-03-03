import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createGame } from "./../../../api/admin";
import GameForm from "./GameForm";
import { Game } from "../../../types/Game";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";

export default function CreateGame() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createGame,
    onSuccess: () => {
      navigate("/admin/game");
    },
  });

  return (
    <>
      <PageMeta title="Tambah Games" description="Halaman Simpan Games" />
      <PageBreadcrumb pageTitle="Game" />
      <ComponentCard title="Tambah Game ">
        <GameForm
          onSubmit={async (formData) => {
            await mutation.mutateAsync(formData);
          }}
        />
      </ComponentCard>
    </>
  );
}
