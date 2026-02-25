import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import DefaultInputs from "../../../component/form/form-elements/DefaultInputs";
import InputGroup from "../../../component/form/form-elements/InputGroup";
import CheckboxComponents from "../../../component/form/form-elements/CheckboxComponents";
import FileInputExample from "../../../component/form/form-elements/FileInputExample";
import PageMeta from "../../../component/common/PageMeta";

export default function CreateGame() {
  return (
    <div>
      <PageMeta
        title="Tambah Games"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Game" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
        </div>
      </div>
    </div>
  );
}
