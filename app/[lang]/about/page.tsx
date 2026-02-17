import { getDictionary } from "@/get-dictionary";
import { Locale } from "@/i18n-config";
import Content from "./Content";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
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

export default async function Page({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang);
  return (
    <div>
      <Content dictionary={dictionary} lang={params.lang} />
    </div>
  );
}
