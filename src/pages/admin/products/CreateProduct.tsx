import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import DefaultInputs from "../../../component/form/form-elements/DefaultInputs";
import InputGroup from "../../../component/form/form-elements/InputGroup";
import CheckboxComponents from "../../../component/form/form-elements/CheckboxComponents";
import FileInputExample from "../../../component/form/form-elements/FileInputExample";
import PageMeta from "../../../component/common/PageMeta";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
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
