import EcommerceMetrics from "../../component/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../component/ecommerce/MonthlySalesChart";
import PageMeta from "../../component/common/PageMeta";

export default function Products() {
  return (
    <>
      <PageMeta title=" Admin Dashboard MosherBlox" description="isi admin" />
      <div className="grid grid-cols-6 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>
      </div>
    </>
  );
}
