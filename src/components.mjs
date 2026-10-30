import { FAQ_ITEMS, TICKET_TIERS, PROGRAMMES, COMPANY, EVENT_NAME } from './content.mjs';

/** Static UI components, rendered by Vite for both dev and production. */
export const PURCHASE_URL = 'https://orchestars.vn/events/ttc2026';

function escapeAttribute(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function Icon({ name = 'arrow-right' } = {}) {
  const paths = {
    'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
    'arrow-up-right': 'M6 18 18 6M6 6h12v12',
    'phone': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z',
    'pin': 'M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
    'mail': 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM2 6l10 7L22 6',
    'facebook': 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3Z',
    'instagram': 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM17.5 6.5h.01',
    'youtube': 'M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 50 50 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 50 50 0 0 1-16.2 0A2 2 0 0 1 2.5 17ZM10 9l5 3-5 3Z',
    'tiktok': 'M13 3h3c0 3 2 5 5 5v3a9 9 0 0 1-5-2v8a5 5 0 1 1-5-5v3a2 2 0 1 0 2 2Z',
  };
  if (!paths[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
}

export function Button() {
  return `<a class="button button-ticket purchase-cta" href="${PURCHASE_URL}" target="_blank" rel="noopener" aria-label="Mua vé ${escapeAttribute(EVENT_NAME)}"><svg class="ticket-button-shape" viewBox="0 0 122 42" preserveAspectRatio="none" aria-hidden="true"><path d="M22.6704 1H5C2.79086 1 1 2.79086 1 5V11.2857C1 13.4949 2.95479 15.1833 4.7588 16.4584C4.97412 16.6106 5.18108 16.7776 5.37808 16.9594C7.79602 19.191 7.79602 22.809 5.37808 25.0406C5.18108 25.2224 4.97412 25.3894 4.7588 25.5416C2.95479 26.8167 1 28.5051 1 30.7143V37C1 39.2091 2.79086 41 4.99999 41H117C119.209 41 121 39.2094 121 37.0003V30.714C121 28.5048 119.045 26.8167 117.241 25.5416C117.026 25.3894 116.819 25.2224 116.622 25.0406C114.204 22.809 114.204 19.191 116.622 16.9594C116.819 16.7776 117.026 16.6106 117.241 16.4584C119.045 15.1833 121 13.4949 121 11.2857V5C121 2.79086 119.209 1 117 1H22.6704Z"/></svg><span class="ticket-button-label">Mua vé</span><span class="ticket-button-perforation" aria-hidden="true"></span></a>`;
}

export function Eyebrow({ number, label }) {
  if (!number || !label) throw new Error('Eyebrow requires number and label');
  return `<p class="eyebrow"><span>${String(Number(number)).padStart(2, '0')}</span> ${escapeAttribute(label)}</p>`;
}

function attributes(source) {
  return Object.fromEntries([...source.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
}

export function renderComponents(html) {
  return html
    .replaceAll('{{EVENT_NAME}}', escapeAttribute(EVENT_NAME))
    .replaceAll('{{EVENT_HEADING}}', escapeAttribute(EVENT_NAME).replace(' TWO ', '<br>TWO '))
    .replaceAll('<ui-ticket-tiers></ui-ticket-tiers>', TicketTiers())
    .replaceAll('<ui-programmes></ui-programmes>', ProgrammePanels())
    .replaceAll('<ui-faq-list></ui-faq-list>', FaqList())
    .replaceAll('<ui-seat-map></ui-seat-map>', SeatMap())
    .replaceAll('<ui-venue-stack></ui-venue-stack>', VenueStack())
    .replaceAll('<ui-site-footer></ui-site-footer>', SiteFooter())
    .replaceAll('<ui-button></ui-button>', Button())
    .replace(/<ui-eyebrow\b([^>]*)><\/ui-eyebrow>/g, (_, source) => Eyebrow(attributes(source)))
    .replace(/<ui-icon\b([^>]*)><\/ui-icon>/g, (_, source) => Icon(attributes(source)));
}


export function TicketTiers() {
  return TICKET_TIERS.map(tier => `<article class="tier-card tier-${tier.key}" aria-label="${tier.name}, ${tier.price} đồng"><div class="tier-heading"><span class="tier-kind"><i style="--tier:var(--color-tier-${tier.marker})"></i>${tier.kind}</span><h3>${tier.name}</h3><p class="tier-event">${escapeAttribute(EVENT_NAME)}<span>19—20.12.2026</span></p></div><div class="tier-content"><small>Giá niêm yết / một vé</small><p class="tier-price">${tier.price}<span>đ</span></p></div><div class="tier-action">${Button()}</div></article>`).join('');
}

export function ProgrammePanels() {
  return PROGRAMMES.map(programme => {
    const image = escapeAttribute(programme.image);
    const action = Button();
    return `<div class="night-shell"><article class="night-panel programme-panel ${programme.portrait ? 'programme-portrait' : ''}">${programme.backdrop ? `<img class="programme-backdrop" src="${image}" alt="" aria-hidden="true" loading="lazy">` : ''}<img class="programme-art" src="${image}" alt="Banner ${escapeAttribute(programme.title)} từ OrcheStars" loading="lazy"><div class="card-shade"></div><span class="night-tag">${escapeAttribute(programme.eyebrow)}</span><div class="night-content"><h3>${escapeAttribute(programme.title)}</h3>${action}</div></article></div>`;
  }).join('');
}

export function FaqList() {
  return `<div class="faq-list">${FAQ_ITEMS.map((item, index) => `<details${index === 0 ? ' open' : ''}><summary>${escapeAttribute(item.question)}</summary><div><p>${escapeAttribute(item.answer)}</p></div></details>`).join('')}</div>`;
}

export function SeatMap() {
  return `<div class="seat-map"><div class="seat-map-heading"><h3>Sơ đồ khán phòng</h3><p>Chạm vào sơ đồ để phóng to</p></div><a class="seat-map-image" href="/assets/seating-map.svg" data-gallery-src="/assets/seating-map.svg" data-gallery-alt="Sơ đồ khán phòng: First Class, Premium, Eco và Standing" aria-label="Phóng to sơ đồ khán phòng"><img src="/assets/seating-map.svg" alt="Sơ đồ sân khấu và vị trí các khu vực vé" width="1430" height="1050" loading="lazy"></a><div class="seat-map-legend">${TICKET_TIERS.map(tier => `<span><i style="--tier:var(--color-tier-${tier.marker})"></i>${tier.name}</span>`).join('')}</div></div>`;
}

export function VenueStack() {
  const directions = 'https://www.google.com/maps/dir/?api=1&destination=Renaissance+Riverside+Hotel+Saigon+8-15+Ton+Duc+Thang';
  return `<div class="venue-stack"><figure class="venue-building"><img src="/assets/renaissance-exterior.jpg" alt="Tòa nhà Renaissance Riverside Hotel Saigon bên sông Sài Gòn" width="1200" height="800" loading="lazy"><figcaption>Renaissance Riverside Hotel Saigon <a href="https://www.marriott.com/en-us/hotels/sgnbr-renaissance-riverside-hotel-saigon/photos/" target="_blank" rel="noopener">Ảnh: Marriott</a></figcaption></figure><div class="venue-directions"><iframe title="Bản đồ dẫn đường đến Renaissance Riverside Sài Gòn" src="https://www.google.com/maps?q=Renaissance+Riverside+Hotel+Saigon+8-15+Ton+Duc+Thang&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe><a href="${directions}" target="_blank" rel="noopener">${Icon({ name: 'pin' })}<span>Mở chỉ đường trên Google Maps</span>${Icon({ name: 'arrow-up-right' })}</a></div></div>`;
}

export function SiteFooter() {
  return `<footer class="site-footer" id="footer"><div class="site-footer-grid"><div class="site-footer-connect"><h3>Liên hệ &amp; Kết nối với chúng tôi</h3><a class="footer-contact-row" href="https://www.google.com/maps/search/?api=1&query=675-677+Dien+Bien+Phu+Binh+Thanh+Ho+Chi+Minh" target="_blank" rel="noopener">${Icon({ name: 'pin' })}<span>${escapeAttribute(COMPANY.address)}</span></a><a class="footer-contact-row" href="${COMPANY.phoneHref}">${Icon({ name: 'phone' })}<span>${COMPANY.phone}</span></a><a class="footer-contact-row" href="mailto:${COMPANY.email}">${Icon({ name: 'mail' })}<span>${COMPANY.email}</span></a></div><div class="site-footer-company"><a class="site-footer-name" href="https://www.orchestars.vn/" target="_blank" rel="noopener">${escapeAttribute(COMPANY.name)}</a><p>Địa chỉ: ${escapeAttribute(COMPANY.address)}<br>Hotline OrcheStars: 0906502925<br>Email: ${COMPANY.email}<br>${escapeAttribute(COMPANY.registration)}</p></div><div class="site-footer-policies"><h3>Về công ty chúng tôi</h3><nav aria-label="Điều khoản và chính sách">${COMPANY.policies.map(label => `<a href="https://www.orchestars.vn/terms-policies" target="_blank" rel="noopener">${escapeAttribute(label)}</a>`).join('')}</nav></div></div><div class="site-footer-bottom"><p>© 2025 Công ty Cổ phần Orchestars. All rights reserved.</p><div class="site-footer-socials">${COMPANY.socials.map(social => `<a href="${social.href}" target="_blank" rel="noopener" aria-label="${social.name}">${Icon({ name: social.icon })}</a>`).join('')}</div></div></footer>`;
}
