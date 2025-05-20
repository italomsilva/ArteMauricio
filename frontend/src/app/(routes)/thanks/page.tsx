import { TbMoodHappy } from "react-icons/tb";
import ThanksPageWrapper from "@/app/pages/thanks_page/ThanksPageWrapper";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p></p>}>
        <ThanksPageWrapper />
    </Suspense >
  );
}
