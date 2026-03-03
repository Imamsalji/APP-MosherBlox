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
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function GameForm({ initialData, onSubmit }: Props) {
  const options = [
    { value: "1", label: "Aktif" },
    { value: "0", label: "Non-Aktif" },
  ];
  const [form, setForm] = useState<Game>({
    name: initialData?.name || "",
    image: null,
    description: initialData?.description || "",
    status: initialData?.status || 0,
  });
  const [errors, setErrors] = useState<{
    name?: string;
    image?: string;
    description?: string;
    status?: string;
  }>({});
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    // formData.append("slug", form.slug);
    formData.append("description", form.description);

    if (form.image) {
      formData.append("image", form.image);
    }

    formData.append("status", String(form.status));

    if (initialData) {
      formData.append("_method", "PUT");
    }

    try {
      console.log("apiErrors");
      setErrors({}); // reset error dulu
      console.log(await onSubmit(formData));
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const apiErrors = error.response.data.errors;
        console.log("apiErrors");
        console.log(apiErrors);

        setErrors({
          name: apiErrors.name?.[0],
          image: apiErrors.image?.[0],
          description: apiErrors.description?.[0],
          status: apiErrors.status?.[0],
        });
      }
    }
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
                value={form.name}
                error={!!errors.name}
                hint={errors.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <Label>Upload Image</Label>
              <FileInput onChange={handleFileChange} className="custom-class" />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>
            {/* Default TextArea */}
            <div>
              <Label>Description</Label>
              <TextArea
                value={form.description}
                rows={6}
                error={!!errors.description}
                hint={errors.description}
                onChange={(value) => setForm({ ...form, description: value })}
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
                defaultValue={form.description}
                options={options}
                placeholder="Select an option"
                onChange={handleSelectChange}
                className="dark:bg-dark-900"
              />
              {errors.status && (
                <p className="text-red-500 text-sm mt-1">{errors.status}</p>
              )}
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
