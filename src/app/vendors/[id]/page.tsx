import { MOCK_VENDORS } from "@/data/mockData";
import VendorStorefrontClient from "./VendorStorefrontClient";

export function generateStaticParams() {
  return MOCK_VENDORS.map((vendor) => ({
    id: vendor.id,
  }));
}

export default async function VendorStorefrontPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <VendorStorefrontClient vendorId={id} />;
}
