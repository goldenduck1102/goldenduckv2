# Quy ước thiết kế và component — ATOTC V2

Cập nhật theo yêu cầu ngày 30/10/2026: **mọi điểm nhấn xanh của giao diện chuyển sang đỏ đô và vàng kem của sự kiện**.

## Nguồn áp dụng

- Bố cục, thứ tự section, tỷ lệ ảnh/chữ và hiệu ứng: trang Noctra, https://maroon-follow-959705.framer.app/. Chi tiết trong `SECTION-MAPPING.md`.
- Nội dung, banner/poster, giá vé, lịch diễn, sơ đồ, 17 ảnh và FAQ: ATOTC V1.
- Màu thương hiệu: bản sự kiện V1. Font toàn trang: yêu cầu mới nhất của người dùng. Không lấy màu neon của mẫu làm màu thương hiệu.

## Tokens dùng chung

Nguồn duy nhất: **`tokens.css`**. `styles.css` chỉ dùng biến semantic cho màu, không chứa giá trị màu viết trực tiếp.

| Token | Giá trị / vai trò |
|---|---|
| `--color-brand` | `#68171d`, đỏ đô |
| `--color-brand-hover` | `#83232c`, trạng thái hover |
| `--color-accent` | `#e4c68c`, vàng kem cho số, dấu chấm, nhãn, barcode, waveform, focus và điểm nhấn |
| `--color-accent-soft` | `#f6e6c8`, nền icon / hover phụ |
| `--color-photo-tint` | Theo `--color-brand`; ảnh nền có lớp đỏ đô, không còn lớp xanh |
| `--color-canvas`, `--color-surface`, `--color-border` | Nền tối và đường phân cách chung |
| `--color-text`, `--color-text-muted`, `--color-text-subtle` | Ba cấp độ chữ |
| `--font-heading`, `--font-body` | Chỉ Cormorant Upright cho h1/h2/h3 và chữ nhấn; Roboto cho phần còn lại |
| Các alias `--font-display-*`, `--font-event-*`, `--font-ui`, `--font-readable` | Trỏ về hai font gốc, không thêm family khác |
| `--button-*`, `--icon-*` | Màu, kích thước và trạng thái component |
| `--layout-inset`, `--size-event-panel`, `--space-event-stack` | Lề 27px, panel 507px, khoảng cách 78px; có breakpoint chung |

Không định nghĩa lại màu theo từng section. Độ trong suốt dùng `color-mix()` với token gốc. Màu phân hạng vé là dữ liệu tương ứng sơ đồ chỗ ngồi (`--tier`), không dùng làm điểm nhấn thương hiệu. Ảnh gốc giữ nội dung tự nhiên.

## Component dùng chung

Template: **`src/components.mjs`**. Dữ liệu chung: **`src/content.mjs`**. Giao diện component: **`src/components.css`**; layout section còn lại trong `styles.css`.

| Component | Sử dụng |
|---|---|
| `Button` | CTA ở header, hero, sự kiện, sơ đồ và các panel; tạo từ cùng template |
| `Icon` | SVG mũi tên ngang / chéo; các nút, thẻ và nút phóng to dùng cùng nguồn |
| `Eyebrow` | 6 nhãn section có số thứ tự sau khi bỏ section Câu chuyện, gồm FAQ cuối trang |
| `TicketTiers` | 4 thẻ mảng màu, dữ liệu từ `src/content.mjs` |
| `ProgrammePanels` | Artwork 4 chương trình, tên và liên kết đi cùng banner |
| `FaqList` | 6 câu hỏi/đáp V1, render trực tiếp ở section 06 |
| `SeatMap` | Sơ đồ SVG hiển thị trực tiếp, chú giải hạng vé và phóng to |
| `VenueStack` | Ảnh tòa nhà, iframe bản đồ và liên kết chỉ đường xếp dọc |
| `SiteFooter` | 3 cột thông tin, chính sách và 4 mạng xã hội theo trang chủ OrcheStars |

Ví dụ trong `index.html`:

```html
<ui-button></ui-button>
<ui-icon name="phone"></ui-icon>
<ui-eyebrow number="1" label="Về đêm nhạc"></ui-eyebrow>
```

`Button()` là CTA mua vé dùng chung; không truyền nhãn, href hoặc variant riêng cho từng section. Component quản lý tên, link TTC2026 và SVG cuống vé.

`vite.config.js` render component thành HTML/SVG chuẩn ở cả dev và build. Chỉnh template sẽ khởi động lại dev server để nạp mẫu mới. Bản production không cần JavaScript để hiển thị CTA/icon/nhãn section. `app.js` phụ trách tương tác menu, dialog, gallery và hiệu ứng cuộn.

- Primary: đỏ đô, chữ trắng, viền vàng kem.
- Secondary: vàng kem, chữ đỏ đô.
- Icon: SVG căn giữa; không thay bằng ký tự font.
- Khi sửa nút/icon, sửa component chung hoặc token; không chép thêm markup/giá trị màu vào từng section.
- Giữ bố cục đã đối chiếu mẫu. Kiểm tra desktop, mobile, trạng thái hover/focus và reduced motion sau thay đổi chung.

## Trạng thái

Local preview: http://localhost:3030/. Chưa deploy. Kết quả kiểm tra cập nhật trong `QA.md`.

## Góp ý mới nhất — 14 chỉnh sửa giao diện

Các yêu cầu cụ thể này ưu tiên hơn tỷ lệ/chi tiết của mẫu Noctra:

- Thẻ thông tin chỉ còn **Địa điểm → Suất diễn → Ngày → Năm**. Bỏ hàng ATOTC 2026/barcode và hai đoạn mô tả bên dưới.
- Toàn trang chỉ dùng **Cormorant Upright** cho h1/h2/h3 và chữ nhấn; **Roboto** cho mô tả, menu, nút, giá và nhãn. Font display có subset Vietnamese trong Google Fonts metadata.
- Header bỏ trạng thái CHRISTMAS/2026. CTA nằm bên phải với nền vàng ấm theo token `--button-featured-bg`, icon đỏ đô. Header gọn dùng menu ở 1000px trở xuống; CTA vẫn hiện trên điện thoại.
- Câu chuyện dùng đúng ảnh nhóm nghệ sĩ Christmas 2025 được đính kèm: `christmas-2025-07-large.webp`.
- Khung/card bo 12px; button 8px; dialog 16px. Không bo tròn cả section nền tràn trang.
- 4 thẻ vé là mảng màu thương hiệu; không có ảnh. Giá/tên hạng vé giữ nguyên. Các chấm màu phân hạng vẫn theo sơ đồ ghế.
- Khối 04 là 4 artwork **A TALE OF TWO CHRISTMASES 2025, Once Upon a Time 2025, Attack on Titan, Dear Ghibli**. Dữ liệu và CTA được đổi theo đúng chương trình, không gắn lịch/mua vé 2026 lên banner cũ. Ghibli mở artwork vì trang sự kiện hiện không có đường dẫn công khai hoạt động; không ghi chương trình đã diễn ra.
- Khối 07 là FAQ trực tiếp, thay lời hẹn cũ. Các link “Hỏi đáp” đi tới `#hoi-dap`.

Nguồn font: https://fonts.google.com/specimen/Cormorant+Upright và https://fonts.google.com/specimen/Roboto. Ảnh so sánh font cũ trong `rebuild/font-comparison.png` chỉ là lịch sử, đã được thay bằng lựa chọn Cormorant Upright của người dùng.
Nguồn banner: `programme-assets.json`. Banner TTC2025 dùng bản OrcheStars đã lưu vì endpoint ảnh trên landing hiện trả 404; đã đối chiếu tên và ngày trên artwork. Các banner còn lại được tải từ media công khai OrcheStars. Ghibli dùng đúng artwork sự kiện dọc, hiển thị đủ bằng contain và nền mờ từ chính ảnh đó.

## Góp ý tiếp theo — font, artwork, gallery và thẻ vé

- Chỉ tải hai font từ Google Fonts: Cormorant Upright (400–700) và Roboto (400–700). Mọi alias font trỏ về hai token gốc. Cỡ tiêu đề được cân lại vì serif rộng hơn font condensed cũ.
- `TicketTiers` dùng bố cục vé nhà hát cao 370px desktop / 340px mobile: nhãn hình thức vé, tên hạng serif, tên/ngày sự kiện, giá Roboto và hàng chọn vé phân cách bằng đường xé. 4 cột desktop lớn, 2 cột tablet, 1 cột mobile. Không thêm ảnh hoặc thay đổi giá.
- `ProgrammePanels` tạo lớp ảnh blur từ cùng artwork khi dữ liệu có `backdrop: true`. Áp dụng Christmas2025, Disney2025 và Ghibli; banner chính vẫn contain, màu gốc.
- Gallery desktop: pointer vào ảnh dừng 3000ms (`--gallery-preview-duration`) và hiện màu bằng `.is-previewing`, hết thời gian xóa trạng thái và chạy tiếp dù pointer vẫn ở trên gallery. Chuyển pointer sang ảnh khác bắt đầu lượt xem mới. Focus bàn phím, kéo, nút tạm dừng và reduced motion giữ quyền ưu tiên.
- Bỏ toàn bộ `.footer-last` gồm vé xé và watermark chuyển động; footer kết thúc sau ba cột điều hướng. Bỏ listener vé xé khỏi `app.js`.

## Góp ý tiếp theo — 12 chỉnh sửa cấu trúc và nhận diện OrcheStars

Các yêu cầu này thay thế những phần tương ứng của baseline Noctra và các ghi chú lịch sử ở trên:

- Bỏ section `#cau-chuyen` và dialog câu chuyện. Menu “Sự kiện” chuyển tới `#su-kien`. Các section đánh lại 01–06.
- `#su-kien` là phần **Về đêm nhạc**: tên chương trình, lời dẫn và nội dung giới thiệu V1, bốn dữ kiện (Địa điểm → Suất diễn → Ngày → Năm), CTA và poster. Không còn nhãn “Sự kiện sắp tới” hoặc caption chồng lên poster.
- Bỏ nút “Xem sơ đồ”. `SeatMap` nằm ngay trên 4 thẻ vé; hình SVG luôn hiển thị và bấm để phóng to. Các màu chú giải là dữ liệu sơ đồ.
- CTA “Xem khoảnh khắc” căn trái với đoạn giới thiệu chương trình.
- `Button` có thêm variant `site`: text-only pill nền `--color-site-cta`, cao 40px, rộng 160px desktop, nhãn “Mua vé”; đối chiếu CTA header trang chủ OrcheStars.vn. Link vẫn dẫn tới TTC2026 của landing này.
- `Button` variant `programme`: pill vàng ấm, arrow chéo trực tiếp, cao 46px, nhãn “Khám phá đêm nhạc” cho các trang chương trình; Ghibli giữ hành động mở artwork. Không có vòng tròn icon nhỏ như bản cũ.
- `VenueStack` thay câu “Giao hưởng. Broadway. Bên nhau.” bằng hai khung trên/dưới: ảnh tòa nhà có credit Marriott, iframe Google Maps và link directions.
- Hotline FAQ thêm SVG điện thoại từ component `Icon` dùng chung.
- Thay toàn bộ footer cũ, bỏ dải logo/tagline/hotline riêng. `SiteFooter` theo trang chủ thật: liên hệ bên trái, công ty/pháp lý ở giữa, chính sách bên phải; cuối trang copyright và Facebook/Instagram/YouTube/TikTok. Mobile đưa thông tin công ty lên trước. Nội dung/link lấy từ `COMPANY` trong `src/content.mjs`.
- Footer dùng nền trắng và chữ tối theo source chính thức; thêm semantic token `--color-site-*`. Tiêu đề vẫn Cormorant Upright, nội dung vẫn Roboto theo hợp đồng hai font của landing.

Nguồn đối chiếu live ngày 30/10/2026: https://www.orchestars.vn/. Bằng chứng CTA/footer: `reference/orchestars-home-cta-footer.json`, `reference/orchestars-home-header.png`, `reference/orchestars-home-footer.png`.

## Tên sự kiện dùng chung

Tên hiển thị chuẩn: **A TALE OF TWO CHRISTMASES**. Nguồn duy nhất `EVENT_NAME` trong `src/content.mjs`. HTML dùng `{{EVENT_NAME}}` / `{{EVENT_HEADING}}`; component vé và tên chương trình dùng cùng hằng số. Áp dụng title, description, nội dung hiển thị, alt, aria-label và caption gallery. URL nguồn/sự kiện giữ nguyên để không làm hỏng liên kết. Chữ đã in trong artwork ảnh gốc là một phần của asset, không thay bằng phép sửa chuỗi HTML.

## Góp ý mới nhất — CTA staging và thứ tự hạng vé

Các quy định dưới đây thay thế các variant Primary/Secondary/Site/Programme được ghi trong lịch sử ở trên:

- Mọi CTA nội dung dùng cùng `Button()`: **Mua vé**, liên kết `PURCHASE_URL` TTC2026, SVG hình cuống vé 122×42px với hai cạnh khoét, stroke trắng 40%, nền đỏ `--color-purchase` (#dd0000), đường xé trắng dọc ở mép phải. Mẫu lấy từ header https://staging.orchestars.vn/ ngày 30/10/2026; giữ Roboto theo hợp đồng hai font.
- 14 vị trí chung: header, hero, about sự kiện, intro programme, bốn programme, bốn thẻ vé, địa điểm và FAQ. Không còn CTA “Khám phá đêm nhạc”, “Xem khoảnh khắc” hoặc “Xem artwork”. Theo yêu cầu mới, bốn programme CTA cùng mở đặt vé TTC2026. Các link tiện ích ảnh, sơ đồ, map, điện thoại và các control đóng/cuộn vẫn thực hiện chức năng tương ứng.
- Đảo thứ tự data `TICKET_TIERS`: **Standing → Eco → Premium → First Class**. Giá và marker không thay đổi, chú giải sơ đồ theo cùng thứ tự.
- Thẻ là `article`, bên trong có CTA riêng; không lồng anchor. Viền Standing mảnh, Eco rõ hơn, Premium hai đường viền, First Class hai viền vàng kèm nét góc. Các màu/độ nhấn thuộc `--tier-stroke-*`.
- Bằng chứng reference: `reference/staging-purchase-button.json`, `reference/staging-purchase-header.png`, `reference/staging-home.html`.
