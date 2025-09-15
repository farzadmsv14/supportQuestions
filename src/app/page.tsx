import DescriptionUpload from "@/component/descriptions";
import Support from "@/component/support";
import { Metadata } from "next";

export const metadata: Metadata = { title: "", description: "", keywords: "" };

export default function Home() {
  return (
      <Support/>
  );
}
