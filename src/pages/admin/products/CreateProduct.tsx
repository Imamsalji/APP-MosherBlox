import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createProduct } from "./../../../api/admin";
import ProductForm from "./ProductForm";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";
import { useState } from "react";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<any>({});

  const mutation = useMutation({
    mutationFn: createProduct,
    onError: (error: any) => {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
    },
    onSuccess: () => {
      navigate("/admin/products", {
        state: { message: "Product Game berhasil diBuat" },
      });
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
        <ProductForm
          errors={errors}
          onSubmit={(data) => mutation.mutate(data)}
        />
      </ComponentCard>
    </>
  );
}
