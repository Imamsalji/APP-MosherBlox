import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllGames, updateGame } from "./../../../api/admin";
import GameForm from "./GameForm";
import { Game } from "../../../types/Game";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";

export default function EditGame() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: games, isLoading } = useQuery({
    queryKey: ["admin-games"],
    queryFn: getAllGames,
  });

  const game = games?.find((g: Game) => g.id === Number(id));

  const mutation = useMutation({
    mutationFn: (data: FormData) => updateGame(Number(id), data),
  });

  const handleSubmit = async (formData: FormData) => {
    await mutation.mutateAsync(formData);
    navigate("/admin/game", {
      state: { message: "Game berhasil di Ubah" },
    });
  };

  if (isLoading) return <div>Loading...</div>;

  if (!game) return <div>Game tidak ditemukan</div>;

  return (
    <>
      <PageMeta title="Ubah Games" description="Halaman Ubah Games" />
      <PageBreadcrumb pageTitle="Game" />

      <ComponentCard title="Edit Game">
        <GameForm initialData={game} onSubmit={handleSubmit} />
      </ComponentCard>
    </>
  );
}
