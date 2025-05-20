import CatalogPageWrapper from "@/app/pages/catalog_page/CatalogPageWrapper";
import { Suspense } from "react";

export default function CatalogPageRoute() {
  return (
    <main>
      <Suspense fallback={<p></p>}>
        <CatalogPageWrapper />
      </Suspense>
    </main>
  );
}
