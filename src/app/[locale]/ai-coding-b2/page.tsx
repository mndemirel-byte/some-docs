import { PageWrap } from "@/components/doc/page-wrap";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { default: Content } = await import(
    `../../../../content/${locale}/ai-coding-b2.mdx`
  );

  return (
    <PageWrap>
      <Content />
    </PageWrap>
  );
}
