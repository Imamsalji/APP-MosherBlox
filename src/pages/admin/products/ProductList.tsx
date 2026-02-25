import PageBreadcrumb from "../../../component/common/PageBreadCrumb";
import ComponentCard from "../../../component/common/ComponentCard";
import PageMeta from "../../../component/common/PageMeta";
import BasicTableOne from "../../../component/tables/BasicTables/BasicTableOne";

export default function ProductList() {
  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Game Detail" />
      <div className="space-y-6">
        <ComponentCard title="List Game">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </>
  );
}
