"use client";

import { useSearchParams } from "next/navigation";
import CatalogPage from "./CatalogPage";

export default function CatalogPageWrapper() {
  const queryParams = useSearchParams();
  const category = queryParams.get("category") ?? "";

  return <CatalogPage category={category} />;
}
