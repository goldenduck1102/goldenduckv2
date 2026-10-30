# ATOTC V2 — Noctra

GitHub: https://github.com/goldenduck1102/goldenduckv2

V2 theo từng section và lớp giao diện của https://maroon-follow-959705.framer.app/, dùng nội dung và ảnh ATOTC V1.

Chạy `pnpm dev`, xem http://localhost:3030/. Kiểm tra `pnpm check`; build `pnpm build`; preview production `pnpm preview` (3031).

Mã nguồn: index.html (nội dung/section), tokens.css (tokens chung), styles.css (layout), src/components.css (component styles), src/content.mjs (FAQ/vé/chương trình), src/components.mjs (CTA/icon/nhãn, seat map, venue stack và footer dùng chung), vite.config.js (render component), app.js (tương tác). Ảnh: public/assets. Mapping và kiểm tra: docs/SECTION-MAPPING.md, docs/QA.md. Bản giao diện trước giữ trong docs/previous-layout.zip. V1 và Working không chỉnh sửa.

Trên máy khác: `pnpm install --frozen-lockfile`. Dependency trong repository được cài độc lập.

Giữ 17 ảnh, bảng giá, lịch diễn, sơ đồ và FAQ V1; nội dung giới thiệu được đưa vào phần về sự kiện. Nút mua vé mở hệ thống OrcheStars. Bản local, chưa deploy.

Quy ước bắt buộc khi chỉnh UI: docs/DESIGN.md. Sửa màu tại tokens.css; sửa CTA/icon tại src/components.mjs để áp dụng đồng bộ.

## GitHub Pages

Workflow: `.github/workflows/pages.yml`, xuất bản sau mỗi lần push vào `main` hoặc chạy thủ công.
Trong Settings → Pages, chọn Source: GitHub Actions. Tài khoản phải hỗ trợ Pages cho visibility của repository.

Đường dẫn dự kiến sau khi bật Pages và deploy thành công: https://goldenduck1102.github.io/goldenduckv2/

Build mô phỏng Pages từ máy local:

```sh
GITHUB_REPOSITORY=goldenduck1102/goldenduckv2 pnpm build
```

`pnpm dev` và `pnpm build` không có biến trên vẫn dùng đường dẫn gốc `/`.
