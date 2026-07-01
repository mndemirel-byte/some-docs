# Claude Code Prompt — Doküman Kütüphanesi: Renk Temaları + Dil/Mod Switcher

Aşağıdaki prompt'u, bu handoff klasörünü (özellikle `README.md` ve `design-files/`) proje köküne kopyaladıktan sonra Claude Code'a verin.

---

Bu projede bir **doküman kütüphanesi** sayfası uygulamamı istiyorum: 1 index (kart grid) sayfası + 4 doküman sayfası (uzun referans rehberleri). Tasarım referansları `design_handoff_doc_library/` klasöründe — önce `design_handoff_doc_library/README.md`'yi oku, sonra `design_handoff_doc_library/design-files/` altındaki HTML dosyalarını incele.

**Önemli:** `design-files/` altındaki HTML dosyaları doğrudan kopyalanacak prodüksiyon kodu değil — birebir uygulanması gereken görsel/etkileşim referanslarıdır. Bu projede [mevcut stack'imi: örn. Next.js + Tailwind / React + CSS Modules / vb. buraya yaz] kullanıyoruz; tasarımı bu ortamın kendi pattern'leri ve component yapısıyla yeniden inşa et. (Proje boşsa: bu tarz bir statik doküman sitesi için en uygun, basit stack'i sen seç ve gerekçeni belirt.)

Uygulanmasını istediğim özellikler:

1. **İki renk teması** — "Anthropic" (sıcak krem/light) ve "Bright SaaS" (koyu mor/neon dark). README'deki "Design Tokens" tablosundaki tüm hex/rgba değerlerini birebir kullan; rastgele renk üretme. Temayı CSS custom property seti (veya stack'e uygun bir theme-token mekanizması, örn. Tailwind CSS variables / CSS-in-JS theme objesi) olarak modelle — sayfa component'leri renkleri her zaman token üzerinden okusun, hardcoded hex kullanmasın.

2. **İki dil** (TR/EN) — Mevcut HTML dosyalarındaki TR ve EN metinlerini referans alarak içerik için bir i18n çözümü kur (stack'e göre: `next-intl`, basit bir `messages/tr.json` + `messages/en.json`, ya da projenin zaten kullandığı i18n kütüphanesi).

3. **Sol üstte LIGHT/DARK, sağ üstte TR/EN switcher** — sadece index sayfasında. README'deki "Etkileşim ve Davranış" + "Design Tokens → Switcher" bölümlerindeki tam stil ve davranış spesifikasyonunu uygula: aktif seçenek tıklanamaz/vurgulu, pasif seçenek tıklanabilir; tema değişince dil sabit kalır, dil değişince tema sabit kalır. Bunu statik dosya linki yerine gerçek state (`theme` + `locale`, ideal olarak `localStorage`'da persist edilen) ile uygula.

4. **4 doküman sayfası** — `design-files/.../setup.html`, `ai-coding-b1.html`, `ai-coding-b2.html`, `matt-pocock-skills.html` içeriğini (terminal mockup'ları, dosya ağacı görselleştirmeleri, skill kartları dahil) birebir koru; sadece renklerini yukarıdaki theme-token sistemine bağla.

5. Tipografi, spacing, radius, shadow değerlerini README'deki "Tipografi" ve "Spacing & Radius" bölümlerinden al.

Bittiğinde hem Anthropic+TR, hem Bright SaaS+EN kombinasyonunu (ve diğer 2 kombinasyonu) görsel olarak karşılaştırıp bana göster.
