export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { default: Content } = await import(
    `../../../../content/${locale}/ai-coding-b1.mdx`
  );

  return <Content />;
}
