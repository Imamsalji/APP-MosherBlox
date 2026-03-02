import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllProducts, updateGame } from "../../../api/admin";
import ProductForm from "./ProductForm";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";
import { Product } from "../../../types/Product";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: games } = useQuery({
    queryKey: ["admin-games"],
    queryFn: getAllProducts,
  });

  const game = games?.find((g: Product) => g.id === Number(id));

  const mutation = useMutation({
    mutationFn: (data: FormData) => updateGame(Number(id), data),
    onSuccess: () => {
      navigate("/admin/game");
    },
  });

  if (!game) return <div>Loading...</div>;

  return (
    <>
      <PageMeta title="Ubah Games Product" description="Halaman Ubah Product" />
      <PageBreadcrumb pageTitle="Product Game" />
      <ComponentCard title="Ubah Product ">
        <ProductForm onSubmit={(data) => mutation.mutate(data)} />
      </ComponentCard>
    </>
  );
}
