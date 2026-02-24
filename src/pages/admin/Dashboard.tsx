import EcommerceMetrics from "../../component/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../component/ecommerce/MonthlySalesChart";
import PageMeta from "../../component/common/PageMeta";

export default function Products() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-6 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>
      </div>
    </>
  );
}
