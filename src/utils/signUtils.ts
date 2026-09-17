import { SignData, A5MultiSignData, PageMode } from '../types';
import { KIABI_LOGO_SVG_STRING } from '../components/KiabiLogo';

export function formatPrice(value: string): string {
  const raw = (value ?? '').toString().trim();
  if (!raw) return '';

  const cleaned = raw.replace(/[^\d,.]/g, '').replace(',', '.');
  if (!cleaned) return raw;

  return cleaned;
}

export function combineBilingual(en?: string, ar?: string): {
  hasContent: boolean;
  en: string;
  ar: string;
  showSlash: boolean;
  fullText: string;
} {
  const cleanEn = (en ?? '').trim();
  const cleanAr = (ar ?? '').trim();

  if (cleanEn && cleanAr) {
    return {
      hasContent: true,
      en: cleanEn,
      ar: cleanAr,
      showSlash: true,
      fullText: `${cleanEn} / ${cleanAr}`,
    };
  }
  if (cleanEn) {
    return {
      hasContent: true,
      en: cleanEn,
      ar: '',
      showSlash: false,
      fullText: cleanEn,
    };
  }
  if (cleanAr) {
    return {
      hasContent: true,
      en: '',
      ar: cleanAr,
      showSlash: false,
      fullText: cleanAr,
    };
  }
  return {
    hasContent: false,
    en: '',
    ar: '',
    showSlash: false,
    fullText: '',
  };
}

/**
 * Generates the unified standalone HTML string containing BOTH A4 Paysage and A5 Paysage code.
 * Allows store associates on iPhones/iPads/desktops to toggle and print both sign formats offline.
 */
export function generateCombinedStandaloneHTML(
  a4Data?: Partial<SignData>,
  a5Data?: Partial<A5MultiSignData>,
  activeMode: PageMode = 'a4_paysage'
): string {
  const defaultA5Items = [
    { id: '1', engName: 'Sweater', araName: 'كنزة', price: '4.5' },
    { id: '2', engName: 'Trouser', araName: 'بنطلون', price: '6.0' },
    { id: '3', engName: 'T-Shirt', araName: 'تي شيرت', price: '2.5' },
    { id: '4', engName: 'Shoes', araName: 'أحذية', price: '6.5' }
  ];

  const a4 = {
    engTitle: a4Data?.engTitle ?? 'Jacket',
    araTitle: a4Data?.araTitle ?? 'جاكيت',
    engDetail: a4Data?.engDetail ?? '3-12 years',
    araDetail: a4Data?.araDetail ?? '٤-١٢ سنة',
    engPrefix: a4Data?.engPrefix ?? 'from',
    araPrefix: a4Data?.araPrefix ?? 'من',
    sizeVal: a4Data?.sizeVal ?? '',
    currency: a4Data?.currency ?? 'KWD',
    priceValue: a4Data?.priceValue ?? '6.5'
  };

  const a5ItemsJson = JSON.stringify(a5Data?.items && a5Data.items.length > 0 ? a5Data.items : defaultA5Items);
  const a5Currency = a5Data?.currency ?? 'KWD';
  const a5ShowLogo = a5Data?.showKiabiLogo !== false;
  const initialMode = activeMode === 'a5_paysage' ? 'a5' : 'a4';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <meta name="apple-mobile-web-app-title" content="Kiabi Signs">
  <meta name="theme-color" content="#040037">
  <title>KIABI Price Sign Generator - Combined A4 & A5 Paysage</title>
  <style>
    :root {
      --bg-color: #f4f5f7;
      --card-bg: #ffffff;
      --primary: #111111;
      --navy: #040037;
      --accent: #e2001a;
      --accent-hover: #b80015;
      --muted: #6b7280;
      --border: #d1d5db;
      --shadow: rgba(0, 0, 0, 0.06);
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      -webkit-tap-highlight-color: transparent;
    }
    body {
      background-color: var(--bg-color);
      color: var(--primary);
      padding: calc(14px + env(safe-area-inset-top)) 14px calc(24px + env(safe-area-inset-bottom));
      min-height: 100vh;
    }
    .no-print {
      max-width: 640px;
      margin: 0 auto 20px;
    }
    .top-brand-header {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 14px;
      padding: 12px 16px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 4px var(--shadow);
    }
    .brand-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-logo svg {
      height: 26px;
      width: auto;
      display: block;
    }
    .brand-title-wrap h1 {
      font-size: 15px;
      font-weight: 800;
      color: var(--navy);
      line-height: 1.1;
    }
    .brand-title-wrap p {
      font-size: 11px;
      color: var(--muted);
      font-weight: 500;
      margin-top: 2px;
    }
    .mode-tab-bar {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      background: #e5e7eb;
      padding: 5px;
      border-radius: 12px;
      margin-bottom: 16px;
    }
    .mode-tab-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 8px;
      border: 1px solid transparent;
      background: transparent;
      font-size: 13px;
      font-weight: 700;
      color: #4b5563;
      cursor: pointer;
      text-align: left;
      transition: all 0.15s ease;
    }
    .mode-tab-btn.active {
      background: #fff;
      color: var(--navy);
      border-color: #d1d5db;
      box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    }
    .badge-tab {
      padding: 3px 7px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 900;
      color: #fff;
    }
    .badge-a4 { background: #e2001a; }
    .badge-a5 { background: #040037; }
    .card {
      background: var(--card-bg);
      padding: 18px;
      border-radius: 16px;
      box-shadow: 0 4px 16px var(--shadow);
      margin-bottom: 16px;
      border: 1px solid #e5e7eb;
    }
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f3f4f6;
    }
    .card-title {
      font-size: 16px;
      font-weight: 800;
      color: var(--navy);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .helper-hint {
      font-size: 12px;
      color: #374151;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 8px;
      margin-bottom: 14px;
      line-height: 1.4;
    }
    .form-group { margin-bottom: 12px; }
    .form-label-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    label {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: var(--muted);
    }
    .clear-link {
      font-size: 11px;
      color: var(--accent);
      background: none;
      border: none;
      cursor: pointer;
      padding: 0 2px;
      font-weight: 600;
    }
    input, select {
      width: 100%;
      min-height: 42px;
      padding: 8px 12px;
      font-size: 15px;
      border: 1px solid var(--border);
      border-radius: 8px;
      background: #fafafa;
      color: var(--primary);
      -webkit-appearance: none;
      appearance: none;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding-right: 36px;
    }
    input:focus, select:focus {
      outline: none;
      border-color: var(--navy);
      box-shadow: 0 0 0 3px rgba(4, 0, 55, 0.12);
      background: #fff;
    }
    .row { display: flex; gap: 10px; }
    .row > div { flex: 1; }
    .btn-print {
      width: 100%;
      min-height: 48px;
      padding: 14px;
      font-size: 16px;
      font-weight: 700;
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(226, 0, 26, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 14px;
      transition: transform 0.1s ease, background-color 0.15s ease;
    }
    .btn-print:active { transform: scale(0.98); background-color: var(--accent-hover); }
    .btn-print-navy { background: var(--navy); box-shadow: 0 4px 12px rgba(4, 0, 55, 0.25); }
    .btn-print-navy:active { background: #020020; }

    /* A4 Screen Preview (190mm x 140mm acrylic stand landscape) */
    .preview-wrapper { max-width: 600px; margin: 0 auto; }
    .preview-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      color: var(--muted);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .sign-container {
      width: 100%;
      aspect-ratio: 1.33 / 1;
      background: #ffffff;
      border: 2px solid #111111;
      border-radius: 8px;
      padding: 7% 7.5%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      position: relative;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
      user-select: none;
    }
    .tag-header { display: flex; flex-direction: column; gap: 4px; }
    .tag-line { font-size: min(4.4vw, 27px); font-weight: 800; color: #111; line-height: 1.25; }
    .tag-subline { font-size: min(3.8vw, 23px); font-weight: 700; color: #111; line-height: 1.25; }
    .tag-size-line { font-size: min(3.3vw, 20px); font-weight: 700; color: #222; line-height: 1.25; }
    .tag-prefix { font-size: min(3vw, 18px); font-weight: 500; color: #444; margin-top: 2px; line-height: 1.25; }
    .tag-price-block {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      margin-top: auto;
      gap: 12px;
      padding-bottom: 2%;
    }
    .tag-currency { font-size: min(5.5vw, 36px); font-weight: 900; color: #111; margin-top: min(1.5vw, 12px); letter-spacing: -0.5px; }
    .tag-price { font-size: min(24vw, 148px); font-weight: 900; line-height: 0.82; color: #111; letter-spacing: -2px; }

    /* A5 Screen Preview (148mm x 210mm acrylic stand portrait) */
    .preview-wrapper-a5 { margin: 16px auto; max-width: 440px; }
    .a5-stand-card {
      background: #fff;
      border: 2px solid #111;
      border-radius: 8px;
      padding: 24px 20px 16px;
      aspect-ratio: 1 / 1.42;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 14px rgba(0,0,0,0.08);
      user-select: none;
    }
    .a5-item-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #f3f4f6;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .a5-name { font-size: 18px; font-weight: 800; color: #111; display: flex; gap: 6px; align-items: baseline; }
    .a5-name .slash { color: #9ca3af; font-weight: 600; }
    .a5-pr { font-size: 24px; font-weight: 900; color: #111; display: flex; align-items: flex-start; gap: 3px; }
    .a5-curr { font-size: 11px; font-weight: 900; color: #374151; margin-top: 3px; }
    .kiabi-logo-bottom { display: flex; justify-content: center; align-items: center; margin-top: 16px; }
    .kiabi-logo-bottom svg { height: 32px; width: auto; display: block; }
    .a5-row-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px; margin-bottom: 10px; background: #fafafa; }
    .btn-add-item {
      width: 100%;
      height: 42px;
      border: 2px dashed #cbd5e1;
      background: #f8fafc;
      font-size: 13px;
      font-weight: 700;
      color: #334155;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 12px;
      transition: all 0.15s ease;
    }

    @media print {
      @page { margin: 0; }
      html, body {
        width: 100% !important;
        height: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      .no-print { display: none !important; }

      /* A4 Mode Printing */
      body.mode-a4 .preview-wrapper-a5 { display: none !important; }
      body.mode-a4 .preview-wrapper {
        width: 100% !important;
        height: 100vh !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 !important;
      }
      body.mode-a4 .sign-container {
        width: 190mm !important;
        height: 140mm !important;
        border: 2.5px solid #000000 !important;
        border-radius: 0 !important;
        padding: 24mm 20mm 16mm 20mm !important;
        box-shadow: none !important;
        margin: auto !important;
        box-sizing: border-box !important;
        page-break-inside: avoid !important;
      }
      body.mode-a4 .tag-line { font-size: 34pt !important; }
      body.mode-a4 .tag-subline { font-size: 28pt !important; }
      body.mode-a4 .tag-size-line { font-size: 24pt !important; }
      body.mode-a4 .tag-prefix { font-size: 22pt !important; }
      body.mode-a4 .tag-currency { font-size: 42pt !important; margin-top: 14pt !important; }
      body.mode-a4 .tag-price { font-size: 165pt !important; }

      /* A5 Mode Printing */
      body.mode-a5 .preview-wrapper { display: none !important; }
      body.mode-a5 .preview-wrapper-a5 {
        width: 100% !important;
        height: 100vh !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        margin: 0 !important;
      }
      body.mode-a5 .a5-stand-card {
        width: 136mm !important;
        height: 196mm !important;
        border: 2px solid #000000 !important;
        border-radius: 0 !important;
        padding: 18mm 14mm 12mm 14mm !important;
        box-shadow: none !important;
        margin: auto !important;
        box-sizing: border-box !important;
        page-break-inside: avoid !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: space-between !important;
        background: #fff !important;
      }
      body.mode-a5 .a5-item-row {
        border-bottom: 1px solid #e5e7eb !important;
        padding-bottom: 8pt !important;
        margin-bottom: 8pt !important;
      }
      body.mode-a5 .a5-name { font-size: 20pt !important; font-weight: 800 !important; }
      body.mode-a5 .a5-pr { font-size: 26pt !important; font-weight: 900 !important; }
      body.mode-a5 .a5-curr { font-size: 12pt !important; }
      body.mode-a5 .kiabi-logo-bottom svg { height: 36px !important; }
    }
  </style>
</head>
<body class="mode-${initialMode}">
  <div class="no-print">
    <!-- Top Brand Header -->
    <div class="top-brand-header">
      <div class="brand-left">
        <div class="brand-logo">
          ${KIABI_LOGO_SVG_STRING}
        </div>
        <div class="brand-title-wrap">
          <h1>Price Sign Generator</h1>
          <p>Combined A4 & A5 Paysage Edition</p>
        </div>
      </div>
    </div>

    <!-- Mode Tabs Switcher -->
    <div class="mode-tab-bar">
      <button type="button" id="tabBtnA4" class="mode-tab-btn ${initialMode === 'a4' ? 'active' : ''}" onclick="switchMode('a4')">
        <span class="badge-tab badge-a4">A4</span>
        <div>
          <div>A4 Paysage Sign</div>
          <div style="font-size:10px; font-weight:normal; color:#6b7280;">Single-Item Promo (190 × 140 mm)</div>
        </div>
      </button>
      <button type="button" id="tabBtnA5" class="mode-tab-btn ${initialMode === 'a5' ? 'active' : ''}" onclick="switchMode('a5')">
        <span class="badge-tab badge-a5">A5</span>
        <div>
          <div>A5 Retail Stand</div>
          <div style="font-size:10px; font-weight:normal; color:#6b7280;">Multi-Item Clothing (148 × 210 mm)</div>
        </div>
      </button>
    </div>

    <!-- A4 Section Editor -->
    <div id="sectionA4" style="${initialMode === 'a4' ? 'display:block;' : 'display:none;'}">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span class="badge-tab badge-a4">A4</span>
            <span>A4 Single-Item Sign Editor</span>
          </div>
          <button type="button" class="clear-link" onclick="resetA4Sample()">Reset Sample</button>
        </div>

        <div class="helper-hint">
          💡 <strong>Live Dynamic Preview:</strong> Changes reflect instantly on the 190mm × 140mm acrylic stand card. The bilingual slash <code>/</code> auto-hides if one language is cleared!
        </div>

        <!-- Presets -->
        <div class="row">
          <div class="form-group">
            <label for="presetSelect">Item Preset</label>
            <select id="presetSelect" onchange="applyPreset(this.value)">
              <option value="Jacket / جاكيت">Jacket / جاكيت</option>
              <option value="T-Shirt / تي شيرت">T-Shirt / تي شيرت</option>
              <option value="Dress / فستان">Dress / فستان</option>
              <option value="Jeans / جينز">Jeans / جينز</option>
              <option value="Trousers / بنطلون">Trousers / بنطلون</option>
              <option value="Pants / بنطلون">Pants / بنطلون</option>
              <option value="Sweatshirt / سويت شيرت">Sweatshirt / سويت شيرت</option>
              <option value="Sweater / كنزة">Sweater / كنزة</option>
              <option value="Shirt / قميص">Shirt / قميص</option>
              <option value="Shorts / شورت">Shorts / شورت</option>
              <option value="Pyjamas / ملابس نوم">Pyjamas / ملابس نوم</option>
              <option value="Leggings / ليجنز">Leggings / ليجنز</option>
              <option value="Bodysuit / بودي ثوب">Bodysuit / بودي ثوب</option>
              <option value="Shoes / أحذية">Shoes / أحذية</option>
            </select>
          </div>

          <div class="form-group">
            <label for="ageSelect">Age / Detail Preset</label>
            <select id="ageSelect" onchange="applyAge(this.value)">
              <option value="00-03 months|٠٠-٠٣ شهر">00-03 months / ٠٠-٠٣ شهر</option>
              <option value="0-3 months|٠-٣ أشهر">0-3 months / ٠-٣ أشهر</option>
              <option value="03-36 months|٠٣-٣٦ شهر">03-36 months / ٠٣-٣٦ شهر</option>
              <option value="3-12 years|٤-١٢ سنة" selected>3-12 years / ٤-١٢ سنة</option>
              <option value="custom">Custom Text...</option>
            </select>
          </div>
        </div>

        <!-- Titles -->
        <div class="row">
          <div class="form-group">
            <div class="form-label-row">
              <label for="engTitle">English Title</label>
              <button type="button" class="clear-link" onclick="clearField('engTitle')">Clear</button>
            </div>
            <input type="text" id="engTitle" value="${a4.engTitle}" placeholder="e.g. Jacket">
          </div>
          <div class="form-group">
            <div class="form-label-row">
              <label for="araTitle">Arabic Title (بالعربي)</label>
              <button type="button" class="clear-link" onclick="clearField('araTitle')">Clear</button>
            </div>
            <input type="text" id="araTitle" value="${a4.araTitle}" placeholder="مثال: جاكيت" dir="rtl">
          </div>
        </div>

        <!-- Age Sublines -->
        <div class="row">
          <div class="form-group">
            <div class="form-label-row">
              <label for="engDetail">English Age / Subline</label>
              <button type="button" class="clear-link" onclick="clearField('engDetail')">Clear</button>
            </div>
            <input type="text" id="engDetail" value="${a4.engDetail}" placeholder="e.g. 3-12 years">
          </div>
          <div class="form-group">
            <div class="form-label-row">
              <label for="araDetail">Arabic Age (بالعربي)</label>
              <button type="button" class="clear-link" onclick="clearField('araDetail')">Clear</button>
            </div>
            <input type="text" id="araDetail" value="${a4.araDetail}" placeholder="مثال: ٤-١٢ سنة" dir="rtl">
          </div>
        </div>

        <!-- Size -->
        <div class="form-group">
          <div class="form-label-row">
            <label for="sizePresetSelect">Size Preset</label>
            <button type="button" class="clear-link" onclick="clearSize()">Clear</button>
          </div>
          <select id="sizePresetSelect" onchange="applySizePreset(this.value)">
            <option value="">-- None (No size on sign) --</option>
            <optgroup label="Tops, Shirts & T-Shirts">
              <option value="XS - L">XS - L (Tops / Shirts)</option>
              <option value="XS - XXL">XS - XXL (Tops / Shirts)</option>
              <option value="34 - 42">34 - 42 (Tops / Shirts)</option>
              <option value="S - XL">S - XL</option>
            </optgroup>
            <optgroup label="Pants & Trousers">
              <option value="38 - 50">38 - 50 (Pants / Trousers)</option>
              <option value="32 - 42">32 - 42 (Pants / Trousers)</option>
              <option value="30 - 40">30 - 40 (Pants)</option>
              <option value="28 - 38">28 - 38 (Pants)</option>
            </optgroup>
            <optgroup label="Kids & Baby Sizes">
              <option value="68 - 98 cm">68 - 98 cm</option>
              <option value="104 - 152 cm">104 - 152 cm</option>
            </optgroup>
            <optgroup label="Custom">
              <option value="__custom__">Custom Size (Type below)...</option>
            </optgroup>
          </select>

          <div style="margin-top: 8px;">
            <input type="text" id="sizeVal" value="${a4.sizeVal}" placeholder="e.g. XS - L or 38 - 50 (or leave blank)">
          </div>
        </div>

        <!-- Prefix -->
        <div class="row">
          <div class="form-group">
            <div class="form-label-row">
              <label for="engPrefix">English Prefix</label>
              <button type="button" class="clear-link" onclick="clearField('engPrefix')">Clear</button>
            </div>
            <input type="text" id="engPrefix" value="${a4.engPrefix}" placeholder="e.g. from">
          </div>
          <div class="form-group">
            <div class="form-label-row">
              <label for="araPrefix">Arabic Prefix (بالعربي)</label>
              <button type="button" class="clear-link" onclick="clearField('araPrefix')">Clear</button>
            </div>
            <input type="text" id="araPrefix" value="${a4.araPrefix}" placeholder="مثال: من" dir="rtl">
          </div>
        </div>

        <!-- Currency & Price -->
        <div class="row">
          <div class="form-group">
            <div class="form-label-row">
              <label for="currencyInput">Currency</label>
              <button type="button" class="clear-link" onclick="clearField('currencyInput')">Clear</button>
            </div>
            <input type="text" id="currencyInput" value="${a4.currency}" placeholder="e.g. KWD, SAR, AED">
          </div>

          <div class="form-group">
            <div class="form-label-row">
              <label for="priceValue">Price Value</label>
              <button type="button" class="clear-link" onclick="clearField('priceValue')">Clear</button>
            </div>
            <input type="text" id="priceValue" value="${a4.priceValue}" placeholder="e.g. 6.5" inputmode="decimal">
          </div>
        </div>

        <button class="btn-print" type="button" onclick="triggerPrint('a4')">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / AirPrint (A4 Centered)
        </button>
      </div>
    </div>

    <!-- A5 Section Editor -->
    <div id="sectionA5" style="${initialMode === 'a5' ? 'display:block;' : 'display:none;'}">
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <span class="badge-tab badge-a5">A5</span>
            <span>A5 Retail Price Stand Editor</span>
          </div>
          <button type="button" class="clear-link" onclick="resetA5ToPhoto()">Reset Sample</button>
        </div>

        <div class="helper-hint">
          💡 <strong>Multi-Item Retail Clothing Stand:</strong> Select items from the Kiabi clothing catalog — Arabic name auto-fills! Includes official Kiabi logo.
        </div>

        <div class="row">
          <div class="form-group">
            <label for="a5CurrencyInput">Store Currency</label>
            <input type="text" id="a5CurrencyInput" value="${a5Currency}" placeholder="e.g. KWD, SAR, AED" oninput="renderA5()">
          </div>
          <div class="form-group" style="display:flex; align-items:flex-end; padding-bottom:8px;">
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:12px; text-transform:none; font-weight:600;">
              <input type="checkbox" id="a5ShowLogo" ${a5ShowLogo ? 'checked' : ''} onchange="toggleA5Logo(this.checked)" style="width:18px; min-height:18px;">
              <span>Show Official Kiabi Logo</span>
            </label>
          </div>
        </div>

        <div id="a5ItemsList"></div>

        <button type="button" class="btn-add-item" onclick="addA5Item()">+ Add Another Clothing Item Row</button>

        <button class="btn-print btn-print-navy" type="button" onclick="triggerPrint('a5')">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / AirPrint A5 Stand
        </button>
      </div>
    </div>
  </div>

  <!-- Live In-Store Sign Preview (A4) -->
  <div class="preview-wrapper" id="previewA4Wrap" style="${initialMode === 'a4' ? 'display:block;' : 'display:none;'}">
    <div class="preview-title no-print">
      <span>A4 Live Print Preview (Centered)</span>
      <span style="font-size: 11px; font-weight: 500; color: #888;">190mm × 140mm Stand</span>
    </div>

    <div class="sign-container" id="signContainer">
      <div class="tag-header">
        <!-- Line 1: Title -->
        <div class="tag-line" id="line1">
          <span id="outEngTitle">${a4.engTitle}</span><span id="slash1"> / </span><span id="outAraTitle">${a4.araTitle}</span>
        </div>

        <!-- Line 2: Age / Subtitle -->
        <div class="tag-subline" id="line2">
          <span id="outEngDetail">${a4.engDetail}</span><span id="slash2"> / </span><span id="outAraDetail">${a4.araDetail}</span>
        </div>

        <!-- Line Size -->
        <div class="tag-size-line" id="lineSize" style="${a4.sizeVal ? 'display:block;' : 'display:none;'}">
          <span>Size / المقاس: </span><span id="outSizeVal">${a4.sizeVal}</span>
        </div>

        <!-- Line 3: Prefix -->
        <div class="tag-prefix" id="line3">
          <span id="outEngPrefix">${a4.engPrefix}</span><span id="slash3"> / </span><span id="outAraPrefix">${a4.araPrefix}</span>
        </div>
      </div>

      <!-- Price Block -->
      <div class="tag-price-block" id="linePrice">
        <span class="tag-currency" id="outCurrency">${a4.currency}</span>
        <span class="tag-price" id="outPrice">${a4.priceValue}</span>
      </div>
    </div>
  </div>

  <!-- Live A5 Stand Preview -->
  <div class="preview-wrapper-a5" id="previewA5Wrap" style="${initialMode === 'a5' ? 'display:block;' : 'display:none;'}">
    <div class="preview-title no-print">
      <span>A5 Stand Preview</span>
      <span style="font-size: 11px; font-weight: 500; color: #888;">148 × 210 mm Stand</span>
    </div>
    <div class="a5-stand-card" id="a5StandCard">
      <div id="a5CardRows"></div>
      <div class="kiabi-logo-bottom" id="a5LogoBox" style="${a5ShowLogo ? 'display:flex;' : 'display:none;'}">
        ${KIABI_LOGO_SVG_STRING}
      </div>
    </div>
  </div>

  <script>
    const el = id => document.getElementById(id);

    let currentMode = '${initialMode}';
    function switchMode(mode) {
      currentMode = mode;
      document.body.classList.remove('mode-a4', 'mode-a5');
      document.body.classList.add(mode === 'a4' ? 'mode-a4' : 'mode-a5');

      el('tabBtnA4').classList.toggle('active', mode === 'a4');
      el('tabBtnA5').classList.toggle('active', mode === 'a5');

      el('sectionA4').style.display = mode === 'a4' ? 'block' : 'none';
      el('sectionA5').style.display = mode === 'a5' ? 'block' : 'none';

      el('previewA4Wrap').style.display = mode === 'a4' ? 'block' : 'none';
      el('previewA5Wrap').style.display = mode === 'a5' ? 'block' : 'none';
    }

    function triggerPrint(mode) {
      if (currentMode !== mode) {
        switchMode(mode);
      }
      setTimeout(() => {
        window.print();
      }, 50);
    }

    // --- A4 Logics ---
    function clearField(id) {
      const field = el(id);
      if (field) {
        field.value = '';
        updateA4Sign();
      }
    }

    function clearSize() {
      const sel = el('sizePresetSelect');
      const inp = el('sizeVal');
      if (sel) sel.value = '';
      if (inp) inp.value = '';
      updateA4Sign();
    }

    function resetA4Sample() {
      el('engTitle').value = 'Jacket';
      el('araTitle').value = 'جاكيت';
      el('engDetail').value = '3-12 years';
      el('araDetail').value = '٤-١٢ سنة';
      el('engPrefix').value = 'from';
      el('araPrefix').value = 'من';
      el('sizeVal').value = '';
      el('currencyInput').value = 'KWD';
      el('priceValue').value = '6.5';
      updateA4Sign();
    }

    function applyPreset(val) {
      if (!val) return;
      const parts = val.split('/').map(s => s.trim());
      el('engTitle').value = parts[0] || '';
      el('araTitle').value = parts[1] || '';
      updateA4Sign();
    }

    function applyAge(val) {
      if (val === 'custom') return;
      const parts = val.split('|');
      el('engDetail').value = parts[0] || '';
      el('araDetail').value = parts[1] || '';
      updateA4Sign();
    }

    function applySizePreset(val) {
      if (val === '__custom__') {
        el('sizeVal').focus();
        return;
      }
      el('sizeVal').value = val;
      updateA4Sign();
    }

    function updateA4Sign() {
      const enTitle = (el('engTitle').value || '').trim();
      const arTitle = (el('araTitle').value || '').trim();
      const enDetail = (el('engDetail').value || '').trim();
      const arDetail = (el('araDetail').value || '').trim();
      const enPref = (el('engPrefix').value || '').trim();
      const arPref = (el('araPrefix').value || '').trim();
      const sizeVal = (el('sizeVal').value || '').trim();
      const curr = (el('currencyInput').value || '').trim();
      const price = (el('priceValue').value || '').trim();

      // Line 1: Title
      if (!enTitle && !arTitle) {
        el('line1').style.display = 'none';
      } else {
        el('line1').style.display = 'block';
        el('outEngTitle').textContent = enTitle;
        el('outAraTitle').textContent = arTitle;
        el('slash1').style.display = (enTitle && arTitle) ? 'inline' : 'none';
      }

      // Line 2: Detail
      if (!enDetail && !arDetail) {
        el('line2').style.display = 'none';
      } else {
        el('line2').style.display = 'block';
        el('outEngDetail').textContent = enDetail;
        el('outAraDetail').textContent = arDetail;
        el('slash2').style.display = (enDetail && arDetail) ? 'inline' : 'none';
      }

      // Line Size
      if (!sizeVal) {
        el('lineSize').style.display = 'none';
      } else {
        el('lineSize').style.display = 'block';
        el('outSizeVal').textContent = sizeVal;
      }

      // Line 3: Prefix
      if (!enPref && !arPref) {
        el('line3').style.display = 'none';
      } else {
        el('line3').style.display = 'block';
        el('outEngPrefix').textContent = enPref;
        el('outAraPrefix').textContent = arPref;
        el('slash3').style.display = (enPref && arPref) ? 'inline' : 'none';
      }

      // Price
      el('outCurrency').textContent = curr;
      el('outCurrency').style.display = curr ? 'inline' : 'none';
      el('outPrice').textContent = price;
      el('outPrice').style.display = price ? 'inline' : 'none';
      el('linePrice').style.display = (!curr && !price) ? 'none' : 'flex';
    }

    // --- A5 Logics ---
    const A5_CATALOG = [
      { en: 'Sweater', ar: 'كنزة', cat: 'Tops & Knitwear' },
      { en: 'Trouser', ar: 'بنطلون', cat: 'Pants & Bottoms' },
      { en: 'T-Shirt', ar: 'تي شيرت', cat: 'Tops & Knitwear' },
      { en: 'Shoes', ar: 'أحذية', cat: 'Footwear' },
      { en: 'Shirt', ar: 'قميص', cat: 'Tops & Knitwear' },
      { en: 'Jeans', ar: 'جينز', cat: 'Pants & Bottoms' },
      { en: 'Pants', ar: 'بنطلون', cat: 'Pants & Bottoms' },
      { en: 'Jacket', ar: 'جاكيت', cat: 'Outwear' },
      { en: 'Coat', ar: 'معطف', cat: 'Outwear' },
      { en: 'Hoodie', ar: 'هودي', cat: 'Tops & Knitwear' },
      { en: 'Cardigan', ar: 'كارديجان', cat: 'Tops & Knitwear' },
      { en: 'Polo Shirt', ar: 'قميص بولو', cat: 'Tops & Knitwear' },
      { en: 'Vest', ar: 'سترة بدون أكمام', cat: 'Tops & Knitwear' },
      { en: 'Dress', ar: 'فستان', cat: 'Dresses & Skirts' },
      { en: 'Skirt', ar: 'تنورة', cat: 'Dresses & Skirts' },
      { en: 'Shorts', ar: 'شورت', cat: 'Pants & Bottoms' },
      { en: 'Leggings', ar: 'ليجنز', cat: 'Pants & Bottoms' },
      { en: 'Joggers', ar: 'بنطلون رياضي', cat: 'Pants & Bottoms' },
      { en: 'Sneakers', ar: 'حذاء رياضي', cat: 'Footwear' },
      { en: 'Boots', ar: 'حذاء طويل / بوت', cat: 'Footwear' },
      { en: 'Sandals', ar: 'صندل', cat: 'Footwear' },
      { en: 'Slippers', ar: 'شبشب', cat: 'Footwear' },
      { en: 'Pyjamas', ar: 'ملابس نوم', cat: 'Sleepwear' },
      { en: 'Underwear', ar: 'ملابس داخلية', cat: 'Basics' },
      { en: 'Bodysuit', ar: 'بودي ثوب', cat: 'Babywear' },
      { en: 'Socks', ar: 'جوارب', cat: 'Accessories' },
      { en: 'Belt', ar: 'حزام', cat: 'Accessories' },
      { en: 'Cap', ar: 'قبعة كاب', cat: 'Accessories' },
      { en: 'Hat', ar: 'قبعة', cat: 'Accessories' },
      { en: 'Scarf', ar: 'وشاح', cat: 'Accessories' },
      { en: 'Gloves', ar: 'قفازات', cat: 'Accessories' },
      { en: 'Bag', ar: 'حقيبة', cat: 'Accessories' }
    ];

    let a5Items = ${a5ItemsJson};

    function resetA5ToPhoto() {
      a5Items = [
        { id: '1', engName: 'Sweater', araName: 'كنزة', price: '4.5' },
        { id: '2', engName: 'Trouser', araName: 'بنطلون', price: '6.0' },
        { id: '3', engName: 'T-Shirt', araName: 'تي شيرت', price: '2.5' },
        { id: '4', engName: 'Shoes', araName: 'أحذية', price: '6.5' }
      ];
      el('a5CurrencyInput').value = 'KWD';
      renderA5();
    }

    function addA5Item() {
      a5Items.push({
        id: String(Date.now()),
        engName: 'Shirt',
        araName: 'قميص',
        price: '3.5'
      });
      renderA5();
    }

    function removeA5Item(idx) {
      if (a5Items.length <= 1) return;
      a5Items.splice(idx, 1);
      renderA5();
    }

    function onSelectA5Catalog(idx, value) {
      const found = A5_CATALOG.find(c => c.en === value);
      if (found) {
        a5Items[idx].engName = found.en;
        a5Items[idx].araName = found.ar;
      }
      renderA5();
    }

    function toggleA5Logo(show) {
      const box = el('a5LogoBox');
      if (box) box.style.display = show ? 'flex' : 'none';
    }

    function renderA5() {
      const currency = el('a5CurrencyInput') ? el('a5CurrencyInput').value : 'KWD';
      const listEl = el('a5ItemsList');

      if (listEl) {
        var htmlStr = '';
        for (var idx = 0; idx < a5Items.length; idx++) {
          var item = a5Items[idx];
          var catOpts = '';
          for (var c = 0; c < A5_CATALOG.length; c++) {
            var cat = A5_CATALOG[c];
            var sel = (cat.en.toLowerCase() === item.engName.toLowerCase()) ? ' selected' : '';
            catOpts += '<option value="' + cat.en + '"' + sel + '>' + cat.en + ' / ' + cat.ar + ' (' + cat.cat + ')</option>';
          }
          var removeBtn = a5Items.length > 1 ? '<button type="button" class="clear-link" onclick="removeA5Item(' + idx + ')">&#10005; Remove</button>' : '';

          htmlStr += '<div class="a5-row-card">' +
            '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">' +
              '<span style="font-size:11px; font-weight:800; color:#040037;">ITEM #' + (idx + 1) + '</span>' +
              removeBtn +
            '</div>' +
            '<div style="margin-bottom:6px;">' +
              '<label style="font-size:10px;">Select from Retail Catalog (Auto-translates Arabic):</label>' +
              '<select onchange="onSelectA5Catalog(' + idx + ', this.value)" style="width:100%; padding:6px; font-size:13px; border-radius:6px; border:1px solid #ccc; background:#fff;">' +
                '<option value="">-- Choose retail item --</option>' +
                catOpts +
              '</select>' +
            '</div>' +
            '<div class="row">' +
              '<div class="form-group" style="margin-bottom:0;">' +
                '<label style="font-size:10px;">English Name</label>' +
                '<input type="text" value="' + (item.engName || '') + '" oninput="a5Items[' + idx + '].engName = this.value; renderA5Preview();" style="font-size:13px; padding:6px;">' +
              '</div>' +
              '<div class="form-group" style="margin-bottom:0;">' +
                '<label style="font-size:10px;">Arabic Name (بالعربي)</label>' +
                '<input type="text" dir="rtl" value="' + (item.araName || '') + '" oninput="a5Items[' + idx + '].araName = this.value; renderA5Preview();" style="font-size:13px; padding:6px;">' +
              '</div>' +
            '</div>' +
            '<div class="form-group" style="margin-top:6px; margin-bottom:0;">' +
              '<label style="font-size:10px;">Price (' + currency + ')</label>' +
              '<input type="text" inputmode="decimal" value="' + (item.price || '') + '" oninput="a5Items[' + idx + '].price = this.value; renderA5Preview();" style="font-size:14px; font-weight:bold; padding:6px; max-width:140px;">' +
            '</div>' +
          '</div>';
        }
        listEl.innerHTML = htmlStr;
      }

      renderA5Preview();
    }

    function renderA5Preview() {
      const currency = el('a5CurrencyInput') ? el('a5CurrencyInput').value : 'KWD';
      const rowsEl = el('a5CardRows');
      if (!rowsEl) return;

      var rowsHtml = '';
      for (var i = 0; i < a5Items.length; i++) {
        var it = a5Items[i];
        var slash = (it.engName && it.araName) ? '<span class="slash">/</span>' : '';
        rowsHtml += '<div class="a5-item-row">' +
          '<div class="a5-name">' +
            '<span>' + (it.engName || '') + '</span>' +
            slash +
            '<span dir="rtl">' + (it.araName || '') + '</span>' +
          '</div>' +
          '<div class="a5-pr">' +
            '<span class="a5-curr">' + currency + '</span>' +
            '<span>' + (it.price || '') + '</span>' +
          '</div>' +
        '</div>';
      }
      rowsEl.innerHTML = rowsHtml;
    }

    // Attach listeners
    ['engTitle', 'araTitle', 'engDetail', 'araDetail', 'engPrefix', 'araPrefix', 'sizeVal', 'currencyInput', 'priceValue'].forEach(id => {
      const input = el(id);
      if (input) input.addEventListener('input', updateA4Sign);
    });

    // Initial setup
    updateA4Sign();
    renderA5();
  </script>
</body>
</html>`;
}

/**
 * Downloads the complete combined HTML file containing BOTH A4 Paysage and A5 Paysage code.
 * One single file for all formats!
 */
export function downloadCombinedStandaloneHTML(
  a4Data?: SignData,
  a5Data?: A5MultiSignData,
  activeMode: PageMode = 'a4_paysage'
): void {
  const html = generateCombinedStandaloneHTML(a4Data, a5Data, activeMode);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kiabi-price-signs-a4-a5.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Primary standalone download: generates the single combined A4 + A5 code!
 */
export function downloadStandaloneFile(
  a4Data?: SignData,
  a5Data?: A5MultiSignData,
  activeMode: PageMode = 'a4_paysage'
): void {
  downloadCombinedStandaloneHTML(a4Data, a5Data, activeMode);
}

/**
 * Backward compatibility: Both A4 and A5 download actions now download the combined all-in-one code!
 */
export function downloadCustomHTML(data: SignData, a5Data?: A5MultiSignData): void {
  downloadCombinedStandaloneHTML(data, a5Data, 'a4_paysage');
}

export function downloadA5StandaloneHTML(data: A5MultiSignData, a4Data?: SignData): void {
  downloadCombinedStandaloneHTML(a4Data, data, 'a5_paysage');
}
