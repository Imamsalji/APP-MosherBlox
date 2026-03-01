import { useState } from "react";
import { Game } from "../../../types/Game";
import Label from "../../../component/form/Label.tsx";
import Input from "../../../component/form/input/InputField";
import FileInput from "../../../component/form/input/FileInput";
import TextArea from "../../../component/form/input/TextArea";
import Radio from "../../../component/form/input/Radio";
import Select from "../../../component/form/Select.tsx";

type Props = {
  initialData?: Game;
  onSubmit: (formData: FormData) => void;
};

export default function GameForm({ initialData, onSubmit }: Props) {
  const options = [
    { value: "1", label: "Aktif" },
    { value: "0", label: "Non-Aktif" },
  ];
  const [form, setForm] = useState<Game>({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    image: null,
    description: initialData?.description || "",
    status: initialData?.status || 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    slug: "",
    image: null,
    description: "",
    status: 0,
  });
  const handleSelectChange = (value: string) => {
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

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("slug", form.slug);
    if (form.image) {
      formData.append("image", form.image);
    }
    formData.append("status", String(form.status));
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
              <Label htmlFor="slug">slug</Label>
              <Input
                type="text"
                id="slug"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
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
