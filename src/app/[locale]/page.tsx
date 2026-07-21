import {
  IconArrowRight,
  IconBooks,
  IconCode,
  IconFileText,
  IconFolderCog,
  IconMap,
  IconRoute,
  IconGitFork,
  IconSitemap,
  IconStack2,
  IconTerminal,
  IconTerminal2,
} from "@tabler/icons-react";
import { createTranslator } from "next-intl";
import Link from "next/link";
import { getMessages } from "@/i18n/get-messages";
import styles from "./index.module.css";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeSwitcher } from "./theme-switcher";

type CardText = {
  num: string;
  type: string;
  title: string;
  subtitle: string;
  desc: string;
  tags: string[];
  cta: string;
};

const cardChrome = [
  { variant: "c1", href: "setup", icon: IconFolderCog },
  { variant: "c2", href: "ai-coding-b1", icon: IconRoute },
  { variant: "c3", href: "ai-coding-b2", icon: IconMap },
  { variant: "c4", href: "matt-pocock-skills", icon: IconTerminal2 },
  { variant: "c5", href: "agentic-workflow-cheat-sheet", icon: IconStack2 },
  { variant: "c6", href: "subagents-companion-guide", icon: IconSitemap },
  { variant: "c7", href: "parallel-and-nested-subagents-guide", icon: IconGitFork },
] as const;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages, namespace: "IndexPage" });
  const cardText = t.raw("cards") as CardText[];
  const cards = cardChrome.map((chrome, index) => ({
    ...chrome,
    ...cardText[index],
  }));

  return (
    <>
      <ThemeSwitcher />
      <LocaleSwitcher locale={locale} />

      <div className={styles.header}>
        <div className={styles.headerEyebrow}>
          <IconBooks size={14} /> {t("eyebrow")}
        </div>
        <h1 className={styles.title}>
          {
            // @ts-expect-error -- next-intl's rich-tag type inference doesn't
            // pick up the <br>/<em> tags in this message's literal type; the
            // tags are handled correctly at runtime (see page.test.tsx).
            t.rich("title", {
              br: () => <br />,
              em: (chunks: React.ReactNode) => (
                <em className={styles.titleAccent}>{chunks}</em>
              ),
            })
          }
        </h1>
        <p className={styles.description}>{t("description")}</p>
        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <IconFileText size={14} /> {t("meta.documents")}
          </span>
          <span className={styles.metaItem}>
            <IconCode size={14} /> {t("meta.prompts")}
          </span>
          <span className={styles.metaItem}>
            <IconTerminal size={14} /> {t("meta.compatible")}
          </span>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.grid}>
        {cards.map((card) => (
          <Link
            key={card.href}
            className={`${styles.card} ${styles[card.variant]}`}
            href={`/${locale}/${card.href}`}
          >
            <div className={styles.cardTop}>
              <div className={styles.cardBadgeRow}>
                <span className={styles.cardNum}>{card.num}</span>
                <span className={styles.cardType}>{card.type}</span>
              </div>
              <div className={styles.cardIcon}>
                <card.icon size={22} />
              </div>
              <div className={styles.cardTitle}>{card.title}</div>
              <div className={styles.cardSubtitle}>{card.subtitle}</div>
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardDesc}>{card.desc}</p>
            </div>
            <div className={styles.cardFooter}>
              <div className={styles.cardTags}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.cardTag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.cardCta}>
                <span>{card.cta}</span>
                <IconArrowRight size={16} className={styles.cardCtaIcon} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className={styles.footer}>{t("footer")}</div>
    </>
  );
}
