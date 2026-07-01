import type { AbstractIntlMessages } from "next-intl";

export async function getMessages(locale: string): Promise<AbstractIntlMessages> {
  return (await import(`../../messages/${locale}.json`)).default;
}
