import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAllProducts, updateProduct } from "../../../api/admin";
import ProductForm from "./ProductForm";
import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";
import { Product } from "../../../types/Product";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product } = useQuery({
    queryKey: ["admin-product"],
    queryFn: getAllProducts,
  });

  const products = product?.find((g: Product) => g.id === Number(id));
  const mutation = useMutation({
    mutationFn: (data: FormData) => updateProduct(Number(id), data),
    onSuccess: () => {
      navigate("/admin/products", {
        state: { message: "Product Game berhasil diUbah" },
      });
    },
  });
  console.log("product");
  console.log(products);
  if (!products) return <div>Loading...</div>;

  return (
    <>
      <PageMeta title="Ubah Games Product" description="Halaman Ubah Product" />
      <PageBreadcrumb pageTitle="Product Game" />
      <ComponentCard title="Ubah Product ">
        <ProductForm
          initialData={products}
          onSubmit={(data) => mutation.mutate(data)}
        />
      </ComponentCard>
    </>
  );
}
