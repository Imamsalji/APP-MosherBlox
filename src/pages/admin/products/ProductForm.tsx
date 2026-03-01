import { useState } from "react";
import { Product } from "../../../types/Product.ts";
import Label from "../../../component/form/Label.tsx";
import Input from "../../../component/form/input/InputField.tsx";
import FileInput from "../../../component/form/input/FileInput.tsx";
import TextArea from "../../../component/form/input/TextArea.tsx";
import Select from "../../../component/form/Select.tsx";

type Props = {
  initialData?: Product;
  onSubmit: (formData: FormData) => void;
};

export default function ProductForm({ initialData, onSubmit }: Props) {
  const options = [
    { value: "1", label: "Aktif" },
    { value: "0", label: "Non-Aktif" },
  ];
  const [form, setForm] = useState<Product>({
    name: initialData?.name || "",
    price: initialData?.price || 0,
    game_id: initialData?.game_id || null,
    specification: initialData?.specification || "",
    image: initialData?.image || null,
    stock: initialData?.stock || 0,
    status: initialData?.status || 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    image: null,
    description: "",
    status: 0,
  });
  const handleSelectChange = (value: number) => {
    console.log("Selected value:", value);
    setForm({ ...form, status: value });
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
      setForm({ ...form, image: file });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    const formData: any = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    formData.append("game_id", form.game_id);
    formData.append("specification", form.specification);
    formData.append("stock", form.stock);
    if (form.image) {
      formData.append("image", form.image);
    }
    formData.append("status", form.status);
    if (initialData) {
      formData.append("_method", "PUT");
    }

    onSubmit(formData);
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">name</Label>
              <Input
                type="text"
                id="input"
                //   error
                //   hint={"This is an invalid email address."}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="game_id">slug</Label>
              <Input
                type="text"
                id="game_id"
                value={form.game_id}
                onChange={(e) => setForm({ ...form, game_id: e.target.value })}
                //   error
                //   hint={"This is an invalid email address."}
              />
            </div>
            <div>
              <Label>Upload Image</Label>
              <FileInput onChange={handleFileChange} className="custom-class" />
            </div>
            {/* Default TextArea */}
            <div>
              <Label>Description</Label>
              <TextArea
                value={form.description}
                onChange={(value) => setForm({ ...form, description: value })}
                rows={6}
                // hint="Please enter a valid message."
              />
            </div>
            {/* Error TextArea */}
            {/* <div>
              <Label>Description</Label>
              <TextArea
                rows={6}
                value={messageTwo}
                error
                onChange={(value) => setMessageTwo(value)}
                hint="Please enter a valid message."
              />
            </div> */}
            <div>
              <Label>Status Game</Label>
              <Select
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-3 text-sm bg-blue-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-blue-300"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
