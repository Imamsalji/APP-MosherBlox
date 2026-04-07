import EcommerceMetrics from "../../component/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../component/ecommerce/MonthlySalesChart";
import PageMeta from "../../component/common/PageMeta";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../../api/admin";

export default function Products() {
  const { data: games, isLoading } = useQuery({
    queryKey: ["admin-games"],
    queryFn: getDashboard,
  });
  console.log(games);

  return (
    <>
      <PageMeta title=" Admin Dashboard MosherBlox" description="isi admin" />
      <div className="grid grid-cols-6 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics user={games.user} game={games.products} />

          <MonthlySalesChart />
        </div>
      </div>
    </>
  );
}
