import IndexPage from "@/components/IndexPage";
import { getDictionary } from "@/get-dictionary";
import { hasLocale } from "@/i18n-config";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);
  return (
    <div>
      <IndexPage dictionary={dictionary} />
    </div>
  );
}
