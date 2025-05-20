"use client";
import ThanksPage from "./ThanksPage";
import { useSearchParams } from "next/navigation";

export default function ThanksPageWrapper() {
  const queryParams = useSearchParams();
  const message = queryParams.get("message") ?? "Obrigado!";
  return <ThanksPage message={message} />;
}
