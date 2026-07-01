export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { default: Content } = await import(
    `../../../../content/${locale}/setup.mdx`
  );

  return <Content />;
}
