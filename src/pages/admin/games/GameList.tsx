import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";
import BasicTableOne from "../../../component/tables/BasicTables/BasicTableOne";

export default function GameList() {
  return (
    <>
      <PageMeta
        title="Game List Index"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Game" />
      <div className="space-y-6">
        <ComponentCard title="List Game">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
