import { useState } from "react";
import { Product } from "../../../types/Product";
import Label from "../../../component/form/Label";
import Input from "../../../component/form/input/InputField";
import FileInput from "../../../component/form/input/FileInput";
import TextArea from "../../../component/form/input/TextArea";
import Select from "../../../component/form/Select";
import { getAllGames } from "../../../api/admin";
import { useQuery } from "@tanstack/react-query";

type Props = {
  initialData?: Product;
  errors?: any;
  onSubmit: (formData: FormData) => void;
};

export default function ProductForm({ initialData, errors, onSubmit }: Props) {
  const options = [
    { value: "1", label: "Aktif" },
    { value: "0", label: "Non-Aktif" },
  ];

  const [form, setForm] = useState<Product>({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    game_id: initialData?.game_id || 0,
    specification: initialData?.specification || "",
    image: initialData?.image || null,
    stock: initialData?.stock || 0,
    status: initialData?.status || 1,
  });

  const { data: games } = useQuery({
    queryKey: ["admin-games"],
    queryFn: getAllGames,
  });
  const gameOptions = [
    { value: "", label: "Pilih Game di bawah ini" },
    ...(games?.map((game: any) => ({
      value: game.id,
      label: game.name,
    })) ?? []),
  ];

  const handleSelectStatus = (value: number) => {
    setForm({ ...form, status: value });
  };

  const handleSelectGame = (value: number) => {
    setForm({ ...form, game_id: Number(value) });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", String(form.price));
    formData.append("game_id", String(form.game_id));
    formData.append("specification", form.specification);
    formData.append("stock", String(form.stock));
    formData.append("status", String(form.status));

    if (form.image instanceof File) {
      formData.append("image", form.image);
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {/* NAME */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            value={form.name}
            error={!!errors?.name}
            hint={errors?.name?.[0]}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        {/* GAME */}
        <div>
          <Label htmlFor="game_id">Game</Label>
          <Select
            defaultValue={String(form.game_id)}
            options={gameOptions}
            onChange={handleSelectGame}
            className={
              errors?.game_id
                ? "border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800"
                : "dark:bg-dark-900"
            }
          />
          {errors?.game_id && (
            <p className="text-red-500 text-sm mt-1">{errors.game_id[0]}</p>
          )}
        </div>

        {/* PRICE */}
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            value={form.price}
            error={!!errors?.price}
            hint={errors?.price?.[0]}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />
        </div>

        {/* STOCK */}
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input
            type="number"
            id="stock"
            value={form.stock}
            error={!!errors?.stock}
            hint={errors?.stock?.[0]}
            onChange={(e) =>
              setForm({ ...form, stock: Number(e.target.value) })
            }
          />
        </div>

        {/* IMAGE */}
        <div>
          <Label>Upload Image</Label>
          <FileInput onChange={handleFileChange} />
          {errors?.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image[0]}</p>
          )}
        </div>

        {/* SPECIFICATION */}
        <div>
          <Label>Specification</Label>
          <TextArea
            rows={6}
            value={form.specification}
            error={!!errors?.specification}
            hint={errors?.specification?.[0]}
            onChange={(value) => setForm({ ...form, specification: value })}
          />
        </div>

        {/* STATUS */}
        <div>
          <Label>Status Product</Label>
          <Select
            defaultValue={String(form.status)}
            options={options}
            placeholder="Select Status"
            onChange={handleSelectStatus}
            className={errors?.status ? "dark:bg-red-900" : "dark:bg-dark-900"}
          />
          {errors?.status && (
            <p className="text-red-500 text-sm mt-1">{errors.status[0]}</p>
          )}
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm bg-blue-500 text-white hover:bg-blue-600"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
