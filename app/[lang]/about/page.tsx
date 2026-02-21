import { getDictionary } from "@/get-dictionary";
import { hasLocale } from "@/i18n-config";
import Content from "./Content";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!hasLocale(params.lang)) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);
  const meta = dictionary.metadata.about;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function Page({ params }: { params: { lang: string } }) {
  if (!hasLocale(params.lang)) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);
  return (
    <div>
      <Content dictionary={dictionary} lang={params.lang} />
    </div>
  );
}
