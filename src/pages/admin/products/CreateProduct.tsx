import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import { useState } from "react";
import ComponentCard from "../../../component/common/ComponentCard";
import Label from "../../../component/form/Label.tsx";
import Input from "../../../component/form/input/InputField";
import PageMeta from "../../../component/common/PageMeta";
import FileInput from "../../../component/form/input/FileInput";
import TextArea from "../../../component/form/input/TextArea";
import Radio from "../../../component/form/input/Radio";

export default function CreateProduct() {
  const [message, setMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState<string>("option2");

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };
  return (
    <div>
      <PageMeta
        title=" Detail Game"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Game" />
      <ComponentCard title="Tambah Detail Game">
        <div className="space-y-6">
          <div>
            <Label htmlFor="name">name</Label>
            <Input
              type="text"
              id="input"
              error
              hint={"This is an invalid email address."}
            />
          </div>
          <div>
            <Label htmlFor="slug">slug</Label>
            <Input
              type="text"
              id="slug"
              error
              hint={"This is an invalid email address."}
            />
          </div>
          <div>
            <Label>Upload Image</Label>
            <FileInput onChange={handleFileChange} className="custom-class" />
          </div>
          <div className="space-y-6">
            {/* Default TextArea */}
            <div>
              <Label>Description</Label>
              <TextArea
                value={message}
                onChange={(value) => setMessage(value)}
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
          </div>
          <div className="flex flex-wrap items-center gap-8">
            <Label>Status Game</Label>
            <Radio
              id="radio1"
              name="group1"
              value="option1"
              checked={selectedValue === "option1"}
              onChange={handleRadioChange}
              label="Aktif"
            />
            <Radio
              id="radio2"
              name="group1"
              value="option2"
              checked={selectedValue === "option2"}
              onChange={handleRadioChange}
              label="Non-Aktif"
            />
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
