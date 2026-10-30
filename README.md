# ATOTC V2 — Noctra

GitHub: https://github.com/goldenduck1102/goldenduckv2

V2 theo từng section và lớp giao diện của https://maroon-follow-959705.framer.app/, dùng nội dung và ảnh ATOTC V1.

Chạy `pnpm dev`, xem http://localhost:3030/. Kiểm tra `pnpm check`; build `pnpm build`; preview production `pnpm preview` (3031).

Mã nguồn: index.html, styles.css, app.js. Ảnh: public/assets. Mapping và kiểm tra: docs/SECTION-MAPPING.md, docs/QA.md. Bản giao diện trước giữ trong docs/previous-layout.zip. V1 và Working không chỉnh sửa.

Trên máy khác: `pnpm install --frozen-lockfile`. Dependency được cài độc lập trong repository này.

Giữ 17 ảnh, bảng giá, lịch diễn, sơ đồ, nội dung câu chuyện và FAQ V1. Nút mua vé mở hệ thống OrcheStars. Bản local, chưa deploy.

## GitHub Pages

Workflow: `.github/workflows/pages.yml`, xuất bản sau mỗi lần push vào `main` hoặc chạy thủ công.
Trong Settings → Pages, chọn Source: GitHub Actions. Tài khoản phải hỗ trợ Pages cho visibility của repository.

Đường dẫn dự kiến sau khi bật Pages và deploy thành công: https://goldenduck1102.github.io/goldenduckv2/

Build mô phỏng Pages từ máy local:

```sh
GITHUB_REPOSITORY=goldenduck1102/goldenduckv2 pnpm build
```

`pnpm dev` và `pnpm build` không có biến trên vẫn dùng đường dẫn gốc `/`.
