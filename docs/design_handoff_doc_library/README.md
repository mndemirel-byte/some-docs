# Handoff: AI Coding Doküman Kütüphanesi — Renk Temaları + Dil/Mod Switcher

## Genel Bakış

Bu paket, "AI Coding Serisi" doküman kütüphanesinin (1 index + 4 doküman sayfası) **iki renk paleti** ve **iki dil** varyantını, ve index sayfalarına eklenen **LIGHT/DARK + TR/EN switcher** kontrolünü içerir. Toplamda 5 mantıksal sayfa × 2 dil × 2 tema = 20 statik HTML dosyası.

İki tema:
- **Anthropic** — sıcak krem zemin (#F7F4EC), mürekkep siyahı metin, kiremit/toprak tonu vurgu rengi (#C2613F). Açık, editöryal, kağıt hissi.
- **Bright SaaS** — koyu mor-siyah zemin (#120D24), neon vurgu renkleri (violet/cyan/lime/amber/rose). Kartlarda hover'da neon glow shadow, başlıkta violet→magenta gradient.

## Tasarım Dosyaları Hakkında

Bu pakette `design-files/` altındaki dosyalar **HTML ile üretilmiş tasarım referanslarıdır** — doğrudan kopyalanacak prodüksiyon kodu değil, hedeflenen görünüm ve davranışı gösteren prototiplerdir. Görev, bu HTML tasarımlarını **hedef codebase'in mevcut ortamında** (React, Vue, Next.js, native, ya da statik bir doküman sitesi — proje neyse) yeniden üretmektir. Eğer henüz bir codebase/framework yoksa, bu tarz bir doküman kütüphanesi için en uygun yaklaşım seçilip (örn. basit statik site / Next.js docs sitesi) orada uygulanmalıdır.

## Fidelity

**High-fidelity.** Tüm renkler CSS custom property (`--bg`, `--accent` vb.) olarak tanımlı ve aşağıda tam hex/rgba değerleriyle listelenmiştir. Tipografi, spacing, border-radius, shadow değerleri orijinal HTML/CSS'te birebir mevcuttur — geliştirici bu değerleri doğrudan kullanabilir.

## Ekranlar / Görünümler

### 1. Index (Doküman Kütüphanesi Ana Sayfası)
**Amaç:** Kullanıcının 4 dokümandan birini seçip açması.

**Layout:**
- `body`: flex column, min-height:100vh, background `var(--bg)`.
- `.header`: ortalanmış, max-width 760px, padding `52px 40px 44px`. İçinde eyebrow pill rozet, H1 (36px/800, son kelime gradient accent renginde), açıklama paragrafı (16px, `var(--subtle)`), ve 3 meta etiketten oluşan bir satır (ikon + metin, 12px mono).
- `.divider`: 1px yüksekliğinde, kenarlardan şeffaflaşan gradient çizgi.
- `.grid`: `display:grid; grid-template-columns:1fr 1fr; gap:20px;` max-width 960px. 660px altında `1fr` tek kolon.
- 4 kart (`.card.c1`…`.c4`), her biri kendi vurgu rengiyle (`c1`=accent, `c2`=blue, `c3`=green, `c4`=amber): numara rozeti, tip etiketi, ikon kutusu (44×44, radius 12), başlık (18px/700), alt başlık (12px mono renkli), açıklama (13px), tag listesi, ve CTA satırı (hover'da ok ikonu 3px kayar, CTA arka planı dolgu renge döner).
- Kart hover: `border-color` vurgu rengine döner, `translateY(-3px)`, box-shadow büyür (tema bazlı, bkz. Design Tokens).
- `.footer`: ortalanmış, 12px mono, mütevazı renk.

**Switcher (bu turda eklendi):**
- Sol üst: `.switch-row` — `position:fixed; top:18px; left:18px;` içinde 2 buton: **LIGHT** / **DARK**.
- Sağ üst: `.switch-row.lang` — `right:18px` (aynı stil) — 2 buton: **TR** / **EN**.
- Konteyner stili: `background:var(--surface); border:1px solid var(--border); border-radius:10px; padding:3px; box-shadow:0 4px 14px rgba(0,0,0,.15); z-index:50;` — iki buton arası `gap:2px`.
- Buton stili: `font-family:var(--mono); font-size:11px; font-weight:700; letter-spacing:.04em; padding:6px 12px; border-radius:7px;`
  - **Aktif** durum (`<span>`, tıklanamaz): `background:var(--accent-bg); color:var(--accent-text);`
  - **Pasif** durum (`<a>`, tıklanabilir): `color:var(--muted);` hover'da `color:var(--text); background:var(--surface2);`
- Mobilde (≤660px): `top/left/right:10px`, konteyner `padding:2px`, buton `font-size:10px; padding:5px 9px`.

### 2–5. Doküman Sayfaları (setup, ai-coding-b1, ai-coding-b2, matt-pocock-skills)
Her biri uzun, tek-sütun bir referans/rehber dokümanı (terminal çıktıları, dosya ağacı mockup'ları, skill kartları, kod blokları içerir). Aynı kök CSS değişken sistemini kullanır ama switcher kontrolü **yalnızca index sayfalarına eklendi** — bu 4 sayfada switcher yok. Tam layout/komponent detayları için `design-files/` altındaki ilgili HTML dosyasına bakılmalı; bu README'nin kapsamı renk sistemi ve switcher'dır.

Not edilmesi gereken özel renk noktaları:
- `setup.html`: dosya ağacı mockup'ında klasör adı, özel dosya adı ve klasör ikonu renkleri tema bazlı override edilir (aşağıda Design Tokens'ta).
- `ai-coding-b2.html` / `matt-pocock-skills.html`: skill-letter rozetleri (`.la`–`.le`) 5 farklı vurgu rengini (accent/blue/green/amber/red) kullanır.
- `matt-pocock-skills.html`: terminal pencere başlık çubuğu (`.term-head`) arka planı `var(--surface2)`'nin sabit hex karşılığını kullanır.

## Etkileşim ve Davranış

**Switcher navigasyon mantığı** (statik dosya linkleri, JS yok):
- Klasör yapısı: `files-claude/` (TR) ve `files-claude-EN/` (EN) kardeş klasörler; her biri içinde `anthropic/` (light) ve `bright-saas/` (dark) alt klasörleri var.
- **DARK** butonuna basmak → aynı dil klasöründe `bright-saas/` alt klasörüne, **aynı dosya adına** gider (örn. `anthropic/index.html` → `../bright-saas/index.html`).
- **EN** butonuna basmak → aynı tema klasöründe kardeş dil köküne gider, dosya adına `-en` eklenir (örn. `files-claude/anthropic/index.html` → `../../files-claude-EN/anthropic/index-en.html`).
- Aktif olan seçenek tıklanamaz statik bir etiket; sadece karşı seçenek link'tir. Bu nedenle her index sayfasında tam olarak 2 link (1 tema + 1 dil) bulunur.
- Kart linkleri `target="_blank"` ile açılır (yeni sekme); switcher linkleri **aynı sekmede** navigate eder (`target` yok).

**Hedef codebase'e taşırken:** Bu statik dosya-bazlı navigasyon yerine gerçek bir uygulamada tema + locale, route/query param veya global state (örn. `theme: 'anthropic'|'bright-saas'`, `locale: 'tr'|'en'`) olarak modellenmeli; switcher bu state'i değiştiren 2 toggle olarak yeniden uygulanmalı. Sayfa içeriği aynı kalır, sadece renk token seti ve metin kaynağı değişir.

## State Management

Mevcut tasarım tamamen statik — client-side state yok. Gerçek bir uygulamada önerilen state:
- `theme`: `'anthropic' | 'bright-saas'` — CSS custom property setini değiştirir (bkz. Design Tokens).
- `locale`: `'tr' | 'en'` — sayfa metnini ve `<html lang>` değerini değiştirir.
- Her ikisi de tercihen `localStorage`'da persist edilmeli (sayfa yenilendiğinde kaybolmamalı).

## Design Tokens

Tüm renkler CSS custom property olarak tanımlı. İki ayrı token seti var: **Index sayfası** (`--pink` kullanır) ve **Doküman sayfaları** (`--red` kullanır, `setup.html` ayrıca `--cyan` adını kullanır — `--blue` ile aynı anlamda, orijinal kod tutarsızlığı, normalize edilmesi önerilir).

### Anthropic teması (light)
| Token | Index sayfası | Doküman sayfaları |
|---|---|---|
| `--bg` | `#F7F4EC` | `#F7F4EC` |
| `--surface` | `#FFFFFF` | `#FFFFFF` |
| `--surface2` | `#F0EBDF` | `#F0EBDF` |
| `--border` | `#E4DECF` | `#E4DECF` |
| `--border-strong` | `#D2C9B4` | `#D2C9B4` |
| `--accent` / `--accent-text` | `#C2613F` / `#A8502F` | `#C2613F` / `#A8502F` |
| `--blue` (`--cyan`) / text | `#3D5A73` / `#2F4759` | `#3D5A73` / `#2F4759` |
| `--green` / text | `#5F7A41` / `#4C6234` | `#5F7A41` / `#4C6234` |
| `--amber` / text | `#9C6B1F` / `#7F5614` | `#9C6B1F` / `#7F5614` |
| `--pink` / text | `#9C4F5E` / `#823F4C` | — |
| `--red` / text | — | `#A8412F` / `#8E3526` |
| `--text` | `#211D17` | `#211D17` |
| `--muted` | `#8A8270` | `#8A8270` |
| `--subtle` | `#5C5648` | `#5C5648` |

Tüm `*-bg` / `*-border` değerleri ilgili rengin `rgba(...,.07–.08)` / `rgba(...,.22–.25)` opasiteli halidir.

**Özel noktalar (Anthropic):**
- Başlık gradient: `linear-gradient(135deg, var(--accent) 0%, #9C4F5E 100%)`
- Kart hover shadow: `0 12px 32px rgba(120,90,60,.10)`
- `setup.html` dosya ağacı: klasör adı `#2F4759`, özel dosya adı `#A8502F`, klasör ikonu `#C9971F`
- Skill-letter rozetleri (`.la`–`.le`): bg `rgba(rengin-rgb,.12)`, border `rgba(...,.25)`
- `matt-pocock-skills.html` terminal başlığı arka planı: `#F0EBDF`

### Bright SaaS teması (dark)
| Token | Index sayfası | Doküman sayfaları |
|---|---|---|
| `--bg` | `#120D24` | `#120D24` |
| `--surface` | `#1C1633` | `#1C1633` |
| `--surface2` | `#261E45` | `#261E45` |
| `--border` | `#372C5C` | `#372C5C` |
| `--border-strong` | `#4D3F80` | `#4D3F80` |
| `--accent` / text | `#A78BFA` | `#A78BFA` |
| `--blue` (`--cyan`) | `#22D3EE` | `#22D3EE` |
| `--green` | `#A3E635` | `#A3E635` |
| `--amber` | `#FBBF24` | `#FBBF24` |
| `--pink` | `#F472B6` | — |
| `--red` | — | `#FB7185` |
| `--text` | `#F7F4FF` | `#F7F4FF` |
| `--muted` | `#948CB8` | `#948CB8` |
| `--subtle` | `#CBC4ED` | `#CBC4ED` |

Tüm `*-bg` opasitesi `.14`, `*-border` opasitesi `.38` (neon/glow için Anthropic'ten daha yüksek opasite).

**Özel noktalar (Bright SaaS):**
- Başlık gradient: `linear-gradient(135deg, var(--accent) 0%, #F472B6 100%)`
- Kart hover shadow (neon glow): `0 16px 40px rgba(167,139,250,.30)`
- Kart CTA hover arka planları (doygun, beyaz metin): c1 `#7C3AED`, c2 `#0E7490`, c3 `#059669`, c4 `#B45309`
- `setup.html` dosya ağacı: klasör adı `#22D3EE`, özel dosya adı `#A78BFA`, klasör ikonu `#FDE047`
- Skill-letter rozetleri: bg `rgba(...,.16)`, border `rgba(...,.4)`
- `matt-pocock-skills.html` terminal başlığı arka planı: `#261E45`

### Tipografi
- Gövde: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Mono (rozet/etiket/kod): `'JetBrains Mono', 'Fira Code', monospace`
- H1: 36px / 800 / line-height 1.15 / letter-spacing -.02em
- Kart başlığı: 18px/700, gövde metni: 13px/1.65, etiket/rozet: 10–12px mono

### Spacing & Radius
- Kart radius: 16px · ikon kutusu radius: 12px · rozet/tag radius: 4px · CTA radius: 8px · switcher konteyner radius: 10px, buton radius 7px
- Grid gap: 20px · kart iç padding: 24px (üst/yan), 16–22px (alt bölümler)

## Assets
- İkonlar: [Tabler Icons webfont](https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css) (CDN, harici bağımlılık — hedef projede yerel bir ikon seti ile değiştirilebilir, ör. `lucide-react`, `@tabler/icons-react`)
- Görsel/illüstrasyon yok — tasarım tamamen tipografi, renk ve ikon fontu ile kurulu.

## Ekran Görüntüleri

`screenshots/` klasöründe 12 referans görsel var:

- **Index — 4 kombinasyon:** `index-anthropic-tr.png`, `index-bright-saas-tr.png`, `index-anthropic-en.png`, `index-bright-saas-en.png` — switcher'ın sol/sağ üst köşedeki hali dahil.
- **setup — 2 tema × 2 bölüm:** `setup-anthropic-top.png` / `setup-bright-saas-top.png` (sayfa başı) ve `setup-anthropic-filetree.png` / `setup-bright-saas-filetree.png` (dosya ağacı mockup'ı — klasör/dosya adı renklerinin tema bazlı değiştiği yer).
- **ai-coding-b1 — 1 örnek:** `ai-coding-b1-anthropic.png` (sayfa başı).
- **ai-coding-b2 — 1 örnek:** `ai-coding-b2-anthropic-skillmap.png` (A–E skill-letter rozetleri, 5 farklı vurgu rengi).
- **matt-pocock-skills — 2 örnek:** `matt-pocock-skills-anthropic-top.png` (sayfa başı) ve `matt-pocock-skills-anthropic-terminal.png` (terminal mockup — `.term-head` arka planı).

Diğer 3 doküman sayfası (b1, b2, matt) sadece Anthropic temasında gösterildi; renk sisteminin onlara da nasıl uygulandığı `setup`'ın light/dark karşılaştırmasından ve yukarıdaki Design Tokens tablosundan çıkarılabilir.

## Dosyalar

`design-files/` klasörü orijinal klasör yapısını birebir korur (switcher linklerinin çalışması için):

```
design-files/
  files-claude/              ← Türkçe
    anthropic/                  (light tema)
      index.html, setup.html, ai-coding-b1.html, ai-coding-b2.html, matt-pocock-skills.html
    bright-saas/                (dark tema)
      (aynı 5 dosya)
  files-claude-EN/           ← İngilizce
    anthropic/
      index-en.html, setup-en.html, ai-coding-b1-en.html, ai-coding-b2-en.html, matt-pocock-skills-en.html
    bright-saas/
      (aynı 5 dosya)
```

Index sayfalarını tarayıcıda açıp LIGHT/DARK ve TR/EN butonlarına tıklayarak 4 kombinasyonu da canlı gezebilirsiniz.
