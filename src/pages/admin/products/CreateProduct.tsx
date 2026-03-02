import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "./../../../api/admin";
import ProductForm from "./ProductForm";
import { Game } from "../../../types/Game";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";

export default function CreateProduct() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      navigate("/admin/products");
    },
  });

  return (
    <>
      <PageMeta
        title="Tambah Games Product"
        description="Halaman Simpan Product"
      />
      <PageBreadcrumb pageTitle="Product Game" />
      <ComponentCard title="Tambah Product ">
        <ProductForm onSubmit={(data) => mutation.mutate(data)} />
      </ComponentCard>
    </>
  );
}
