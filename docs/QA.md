# Local QA — current rebuild 30/10/2026

This supersedes the first layout’s QA. Current machine-readable evidence: rebuild/final-check.json. Reference measurements/screenshots: reference/.

- JavaScript check and production build pass.
- Chromium 1440, 1280, 1024, 768, 767, 390, 320px: no horizontal overflow; no missing internal anchors; no broken loaded images.
- At 1440×1000 all nine section/footer top coordinates and heights match the inspected reference. No internal vertical overflow.
- Event panels hold at 50px and scale while scrolling; observed scale at scrollY4000 = 0.955437.
- Gallery has 17 unique photographs plus aria-hidden looping duplicates. Desktop autoscroll, explicit pause, navigation arrows, image enlargement, next-image key and Escape passed.
- Mobile menu, seat-map enlargement, FAQ, story chapters, venue/map dialog, reduced motion and tear-ticket return-to-top passed.
- All purchase links point to https://orchestars.vn/events/ttc2026. No transaction performed.
- No JavaScript page errors in the checks.
- Reviewed desktop hero, movement, event, four photographic price columns, event panel, archive, about, belief, footer, mobile hero/full page.

Limits: not a pixel-identity claim; reference imagery, language and audio differ. No Safari or physical-device check. No deploy.

Mobile layout was corrected after direct comparison of the reference’s 390px Nightmakers, Nights, Archive and About screenshots. Desktop captions now overlay the full 500px images. Final revised mobile screenshots are in rebuild/final-*-mobile.png.

## Browser comments 1–6 — official event hero

- Replaced hero archive photo with official landscape banner. On phones, use the official portrait poster as the responsive source. Removed green blend/filter from this artwork.
- Hero heading/subtitle use V1 Lora; paragraph uses V1 Be Vietnam Pro. Both fonts loaded successfully in Chromium.
- Hero action uses event burgundy #68171d with white text and gold #e4c68c border/accent. Hero indicators/wave accents also use the event gold.
- Unicode arrows replaced with centered inline SVGs in action circles and the poster control. The action icon center matches its circle center on both axes at every tested width.
- Checked 1440, 945, 768, 390 and 320px: no horizontal overflow, correct responsive artwork, correct computed fonts and button color. Poster enlargement works; no JavaScript errors.
- JavaScript check and production build pass. Screenshots and measurements: rebuild/hero-event-*.png and rebuild/hero-event-check.json.

## Shared tokens/components and global event palette — 30/10/2026

- Added tokens.css as the sole source of UI colors, font families, component sizing and shared event-panel spacing. Layout CSS contains zero literal hex colors and has no undefined CSS custom properties.
- Removed the neon accent, green photo blend and green gallery hue rotation across sections. Brand #68171d, accent #e4c68c; tier classification dots retain the seating map’s data colors.
- src/components.mjs renders 12 CTA instances, 17 SVG icons and 7 numbered section labels through the same templates. vite.config.js applies them in dev/build; HTTP source has no unrendered ui-* components.
- Primary and secondary button colors verified at runtime across all 12 buttons. Movement overlay computed rgb(104,23,29); all interface accent elements audited with no green values (excluding seat-tier data dots).
- Updated DESIGN.md to the current branding contract and component usage. SECTION-MAPPING.md and README.md now point to it.
- Chromium 1440/945/768/390/320: no horizontal overflow, missing anchors or invalid purchase destinations. Mobile menu, seat-map enlargement and story dialog pass; no JavaScript errors.
- Desktop and mobile screenshots: rebuild/tokens-*.png. Structured checks: rebuild/tokens-check.json. Build and syntax checks pass.

## Fourteen browser comments — final revision

1. Removed ticket-name, ATOTC 2026 and barcode row.
2. Verified fact label order: Địa điểm, Suất diễn, Ngày, Năm.
3. Removed ticket-notes paragraphs.
4. Compared Google Fonts Cormorant Garamond, Cinzel Decorative and Bodoni Moda. Selected Cormorant Garamond; verified font load and Vietnamese subset metadata.
5–6. Computed hero description and header menu use Roboto.
7. Removed event-indicator block.
8–9. CTA at the right edge; warm-gold featured state and burgundy SVG icon. Visible at all tested widths.
10. Movement background uses the exact supplied ensemble photo, V1 image 07.
11. Verified 12px corner radii on event ticket, poster frame, tier cards and programme panels; buttons use 8px.
12. Four brand-colour tier surfaces; zero tier images; all prices retained.
13. Four original OrcheStars programme artworks decode successfully. TTC2025 is from the verified local OrcheStars archive; remaining art downloaded from public OrcheStars media. Ghibli action opens its full artwork. No 2026 purchase overlay remains on these panels.
14. Six FAQ details are inline; old belief/closing section and FAQ dialog removed. Navigation resolves to #hoi-dap.

Chromium widths 1440/1100/1024/1000/945/768/390/320: no horizontal overflow, missing anchors or broken loaded images. Header CTA right margin measured 27/18/12px across desktop/tablet/phone. Menu, FAQ, seat-map modal and Ghibli artwork modal pass. No JavaScript errors. Reviewed desktop hero, information, tiers, story, programme banner and FAQ; reviewed mobile header/information/FAQ.

Checks: rebuild/fourteen-check.json. Screenshots: rebuild/fourteen-*.png. JavaScript/module checks and production build pass. No deployment.


## 30/10/2026 — 7 góp ý: Cormorant Upright, blur, gallery và hạng vé

- `pnpm check` và `pnpm build`: qua.
- Chromium local tại 1440, 1100, 1024, 945, 768, 390 và 320px: không tràn ngang, không tiêu đề tràn khung, không anchor thiếu; toàn bộ chữ giao diện đang dùng đúng hai family Cormorant Upright và Roboto. Mọi h1/h2/h3 dùng Cormorant Upright; font đã tải thành công.
- Ba nền artwork blur: TTC2025, Disney2025 và Ghibli. Ảnh chính contain, không cắt artwork; AoT giữ trạng thái cũ. Không có ảnh lỗi được phát hiện.
- Hover gallery: scrollLeft 24px trong khoảng dừng, ảnh hiện màu (`filter: none`). Sau 3 giây, trạng thái preview tắt; scrollLeft tăng 39px rồi 54px khi pointer vẫn ở trên gallery. Nút pause/resume và reduced motion đều qua.
- 4 thẻ vé được thiết kế lại từ cùng `TicketTiers`: tên/giá chính xác, nhãn vé và CTA giữ liên kết mua vé; desktop 4 cột, tablet 2, mobile 1. Xem ảnh `seven-chon-ve-desktop.png` và `seven-tiers-mobile-top.png`.
- `.footer-last` và listener vé xé đã được bỏ. Không có lỗi JavaScript.
- Menu mobile, dialog sơ đồ và câu chuyện hoạt động. Cỡ chữ dialog được cân lại cho mobile.
- Bằng chứng: `rebuild/seven-check.json`, `rebuild/seven-final.json` và các ảnh `rebuild/seven-*.png`.
- Cập nhật đồng thời `tokens.css`, component/data và `DESIGN.md` / `SECTION-MAPPING.md`. Kiểm tra token không phát hiện biến thiếu. Đây là bản local, chưa deploy.


## 30/10/2026 — 12 góp ý: giới thiệu sự kiện, seat map, địa điểm, CTA và footer

- Đã đối chiếu live CTA/footer https://www.orchestars.vn/; lưu DOM/computed styles và ảnh trong `reference/orchestars-home-*`.
- Bỏ caption poster, section Câu chuyện và story dialog. About sự kiện thay khối “Sự kiện sắp tới”; nội dung V1 được biên tập lại trong section này. Navigation không có anchor hỏng. Nhãn section đổi 01–06.
- Sơ đồ SVG hiển thị ngay trước 4 vé; nút “Xem sơ đồ” cũ được bỏ. Click vào sơ đồ mở/đóng gallery dialog thành công.
- “Xem khoảnh khắc” có margin-left 0. Programme CTA đổi pill vàng, arrow chéo không vòng tròn; header là pill tối text-only theo trang chủ, link vẫn TTC2026.
- Thay slogan địa điểm bằng ảnh khách sạn trên / Google Maps dưới, có link directions. Iframe tải HTTP200 và đã kiểm tra trực quan đúng pin “Khách sạn Renaissance Riverside Sài Gòn”; xem `rebuild/twelve-map-loaded.png` (ảnh chụp đầu có thể trắng trong khi lazy iframe đang tải).
- Hotline FAQ có icon call. Footer cũ được bỏ hoàn toàn; footer chính thức 3 cột trên nền trắng, thông tin công ty/pháp lý, 6 policy links và 4 mạng xã hội. Mobile công ty trước, liên hệ và chính sách sau.
- Chromium local 1440, 1100, 1024, 945, 768, 390, 320px: không overflow ngang, không heading overflow, không missing anchor; chỉ Cormorant Upright và Roboto trong giao diện landing. Không có pageerror hoặc ảnh tải lỗi.
- Mobile menu và zoom seat map qua. Tiếp tục dùng component `Button`, `Icon`, `Eyebrow` và bổ sung `SeatMap`, `VenueStack`, `SiteFooter`; data footer chung `COMPANY`.
- `pnpm check`, `pnpm build` qua. Không có token thiếu, màu literal ngoài tokens trong component, hoặc ui-* tag chưa render trong production HTML.
- Bằng chứng: `rebuild/twelve-check.json`, `rebuild/twelve-*-desktop.png`, `rebuild/twelve-*-mobile.png`, `rebuild/twelve-map-loaded.png`.
- Cập nhật `DESIGN.md`, `SECTION-MAPPING.md`, `README.md`. Bản local tại http://localhost:3030/, chưa deploy.


## 30/10/2026 — Chuẩn hóa tên A TALE OF TWO CHRISTMASES

- Đổi tên hiện hành ở title, description, nội dung, tên programme, thẻ vé, alt/aria và gallery caption. Dùng chung `EVENT_NAME` trong `src/content.mjs`; không sửa URL nguồn.
- Build/check qua. Chromium 1440, 768, 390, 320px: không còn chuỗi tên cũ trong nội dung/metadata/nhãn ảnh của trang, không placeholder chưa render, không tràn ngang/tiêu đề.
- Chữ in sẵn trong artwork ảnh gốc không được thay bởi chỉnh sửa text HTML. Hồ sơ reference/QA lịch sử giữ nguyên.


## 30/10/2026 — 5 góp ý: thống nhất CTA staging, đảo hạng vé

- Đọc live header staging qua Chromium; lưu DOM/computed styles và screenshot trong `reference/staging-purchase-*`. Nút dùng hình cuống vé đỏ #dd0000, cạnh khoét, đường xé dọc; dựng SVG trong component chung.
- Toàn bộ 14 CTA hiển thị “Mua vé”, cùng link TTC2026, cùng computed style 122×42px / Roboto600 16px / fill đỏ. Gồm header, hero, sự kiện, intro chương trình, 4 banner, 4 vé, địa điểm, FAQ. Các utility map/gallery/điện thoại và control giữ chức năng.
- Hạng vé từ trái sang phải và trên xuống dưới: Standing200.000đ → Eco800.000đ → Premium1.200.000đ → First Class1.800.000đ. Viền tăng từ mảnh lên đôi; First Class viền vàng/nét góc. Thẻ đổi thành article với link CTA bên trong, không có anchor lồng nhau.
- Chromium 1440, 1100, 1024, 945, 768, 390, 320px: không overflow ngang/heading overflow, không ui-* chưa render, không lỗi JavaScript. Menu mobile và seat map zoom qua.
- `pnpm check`, `pnpm build` qua. Không có token thiếu hoặc màu literal trong component CSS. DESIGN.md và SECTION-MAPPING.md đồng bộ yêu cầu mới.
- Bằng chứng: `rebuild/five-check.json`, `rebuild/five-*-desktop.png`, `rebuild/five-*-mobile.png`. Bản local, chưa deploy.
