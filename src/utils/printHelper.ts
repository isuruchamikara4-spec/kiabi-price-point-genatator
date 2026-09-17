import { SignData, A5MultiSignData, PageMode } from '../types';
import { formatPrice, combineBilingual } from './signUtils';
import { KIABI_LOGO_SVG_STRING } from '../components/KiabiLogo';

/**
 * Checks if the current document is running inside an iframe (like AI Studio preview).
 */
export function isInsideIframe(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Generates an isolated, ultra-clean HTML page ready for direct printing or opening in a new tab.
 * This guarantees printing works even when the parent web page is in an iframe.
 */
export function generateCleanPrintHTML(
  mode: PageMode,
  a4Data: SignData,
  a5Data: A5MultiSignData
): string {
  if (mode === 'a4_paysage') {
    const formattedPrice = formatPrice(a4Data.priceValue);
    const titleInfo = combineBilingual(a4Data.engTitle, a4Data.araTitle);
    const ageInfo = combineBilingual(a4Data.engDetail, a4Data.araDetail);
    const prefixInfo = combineBilingual(a4Data.engPrefix, a4Data.araPrefix);
    const sizeValClean = (a4Data.sizeVal ?? '').trim();
    const currencyClean = (a4Data.currency ?? '').trim();

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Print - Kiabi A4 Paysage Sign</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f3f4f6;
      color: #111;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }
    .toolbar {
      width: 100%;
      max-width: 800px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      margin-bottom: 20px;
    }
    .toolbar-info { font-size: 14px; font-weight: 600; color: #374151; }
    .btn-print {
      background: #e2001a;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.15s;
    }
    .btn-print:hover { background: #b80015; }
    .btn-close {
      background: #e5e7eb;
      color: #374151;
      font-size: 13px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      margin-left: 8px;
    }
    .print-frame {
      background: #ffffff;
      width: 190mm;
      height: 140mm;
      border: 2px solid #000000;
      border-radius: 4px;
      padding: 10mm 12mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      position: relative;
    }
    .title-line { font-size: 26pt; font-weight: 900; color: #000; line-height: 1.1; margin-bottom: 4pt; }
    .sub-line { font-size: 19pt; font-weight: 800; color: #111; line-height: 1.1; margin-bottom: 3pt; }
    .size-line { font-size: 15pt; font-weight: 700; color: #222; margin-bottom: 2pt; }
    .prefix-line { font-size: 15pt; font-weight: 500; color: #444; }
    .price-block {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 12pt;
      margin-top: auto;
      padding-bottom: 4pt;
    }
    .currency { font-size: 38pt; font-weight: 900; color: #000; margin-top: 16pt; }
    .price { font-size: 140pt; font-weight: 900; color: #000; line-height: 0.82; letter-spacing: -3pt; }

    @media print {
      @page { size: A4 landscape; margin: 0; }
      html, body {
        background: #fff !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
      .toolbar { display: none !important; }
      .print-frame {
        width: 190mm !important;
        height: 140mm !important;
        border: 2px solid #000 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: auto !important;
        page-break-inside: avoid !important;
      }
      .title-line { font-size: 28pt !important; }
      .sub-line { font-size: 20pt !important; }
      .price { font-size: 155pt !important; }
      .currency { font-size: 40pt !important; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="toolbar-info">
      <strong>KIABI A4 Paysage Sign</strong> (190mm × 140mm)
    </div>
    <div>
      <button type="button" class="btn-print" onclick="window.print()">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
        </svg>
        Print / AirPrint Now
      </button>
      <button type="button" class="btn-close" onclick="window.close()">Close</button>
    </div>
  </div>

  <div class="print-frame">
    <div>
      ${titleInfo.hasContent ? `
        <div class="title-line">
          ${titleInfo.en ? `<span>${titleInfo.en}</span>` : ''}
          ${titleInfo.showSlash ? `<span style="color:#555; margin: 0 4px;">/</span>` : ''}
          ${titleInfo.ar ? `<span dir="rtl">${titleInfo.ar}</span>` : ''}
        </div>
      ` : ''}

      ${ageInfo.hasContent ? `
        <div class="sub-line">
          ${ageInfo.en ? `<span>${ageInfo.en}</span>` : ''}
          ${ageInfo.showSlash ? `<span style="color:#666; margin: 0 4px;">/</span>` : ''}
          ${ageInfo.ar ? `<span dir="rtl">${ageInfo.ar}</span>` : ''}
        </div>
      ` : ''}

      ${sizeValClean ? `
        <div class="size-line">
          <span>Size / المقاس:</span>
          <span>${sizeValClean}</span>
        </div>
      ` : ''}

      ${prefixInfo.hasContent ? `
        <div class="prefix-line">
          ${prefixInfo.en ? `<span>${prefixInfo.en}</span>` : ''}
          ${prefixInfo.showSlash ? `<span style="color:#888; margin: 0 4px;">/</span>` : ''}
          ${prefixInfo.ar ? `<span dir="rtl">${prefixInfo.ar}</span>` : ''}
        </div>
      ` : ''}
    </div>

    ${(currencyClean || formattedPrice) ? `
      <div class="price-block">
        ${currencyClean ? `<span class="currency">${currencyClean}</span>` : ''}
        ${formattedPrice ? `<span class="price">${formattedPrice}</span>` : ''}
      </div>
    ` : ''}
  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print triggered');
        }
      }, 350);
    });
  </script>
</body>
</html>`;
  }

  // A5 Paysage Multi-item acrylic stand with EXACT official Kiabi logo
  const currency = a5Data.currency || 'KWD';
  const rowsHtml = a5Data.items
    .map((item) => {
      const en = (item.engName || '').trim();
      const ar = (item.araName || '').trim();
      const pr = formatPrice(item.price);
      const showSlash = en && ar;

      return `
      <div class="item-row">
        <div class="item-name">
          ${en ? `<span>${en}</span>` : ''}
          ${showSlash ? `<span class="slash">/</span>` : ''}
          ${ar ? `<span dir="rtl">${ar}</span>` : ''}
        </div>
        <div class="item-price">
          <span class="curr">${currency}</span>
          <span class="val">${pr || '—'}</span>
        </div>
      </div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Print - Kiabi A5 Multi-Item Stand</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f3f4f6;
      color: #111;
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 100vh;
      padding: 16px;
    }
    .toolbar {
      width: 100%;
      max-width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
      margin-bottom: 20px;
    }
    .toolbar-info { font-size: 14px; font-weight: 600; color: #374151; }
    .btn-print {
      background: #e2001a;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      padding: 10px 20px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.15s;
    }
    .btn-print:hover { background: #b80015; }
    .btn-close {
      background: #e5e7eb;
      color: #374151;
      font-size: 13px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      padding: 10px 16px;
      cursor: pointer;
      margin-left: 8px;
    }
    .a5-card {
      background: #ffffff;
      width: 136mm;
      height: 196mm;
      border: 2px solid #000000;
      border-radius: 4px;
      padding: 18mm 14mm 12mm 14mm;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    }
    .items-container {
      display: flex;
      flex-direction: column;
      gap: 14pt;
    }
    .item-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 8pt;
      gap: 10pt;
    }
    .item-name {
      font-size: 20pt;
      font-weight: 800;
      color: #111;
      display: flex;
      align-items: baseline;
      gap: 6pt;
    }
    .item-name .slash { color: #9ca3af; font-weight: 600; }
    .item-price {
      display: flex;
      align-items: flex-start;
      gap: 3pt;
      font-weight: 900;
      color: #111;
      white-space: nowrap;
    }
    .item-price .curr {
      font-size: 11pt;
      font-weight: 900;
      color: #374151;
      margin-top: 3pt;
    }
    .item-price .val {
      font-size: 26pt;
      line-height: 1;
      font-weight: 900;
    }
    .logo-footer {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 14pt;
      padding-bottom: 4pt;
    }
    .logo-footer svg {
      height: 32px;
      width: auto;
    }

    @media print {
      @page { size: A5; margin: 0; }
      html, body {
        background: #fff !important;
        padding: 0 !important;
        margin: 0 !important;
        width: 100% !important;
        height: 100vh !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
      }
      .toolbar { display: none !important; }
      .a5-card {
        width: 136mm !important;
        height: 196mm !important;
        border: 2px solid #000 !important;
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: auto !important;
        page-break-inside: avoid !important;
      }
      .item-name { font-size: 22pt !important; }
      .item-price .val { font-size: 28pt !important; }
      .item-price .curr { font-size: 12pt !important; }
      .logo-footer svg { height: 36px !important; }
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <div class="toolbar-info">
      <strong>KIABI A5 Acrylic Stand</strong> (148mm × 210mm)
    </div>
    <div>
      <button type="button" class="btn-print" onclick="window.print()">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
        </svg>
        Print / AirPrint Now
      </button>
      <button type="button" class="btn-close" onclick="window.close()">Close</button>
    </div>
  </div>

  <div class="a5-card">
    <div class="items-container">
      ${rowsHtml}
    </div>

    ${a5Data.showKiabiLogo ? `
      <div class="logo-footer">
        ${KIABI_LOGO_SVG_STRING}
      </div>
    ` : ''}
  </div>

  <script>
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          window.print();
        } catch (e) {
          console.warn('Auto print triggered');
        }
      }, 350);
    });
  </script>
</body>
</html>`;
}

/**
 * Opens a clean printable window outside the iframe sandbox and prompts the print dialog.
 * Returns true if the window opened successfully, or false if blocked by browser popup blocker.
 */
export function openPrintWindow(
  mode: PageMode,
  a4Data: SignData,
  a5Data: A5MultiSignData
): boolean {
  const html = generateCleanPrintHTML(mode, a4Data, a5Data);
  const printWin = window.open('', '_blank');

  if (!printWin) {
    return false;
  }

  try {
    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
    printWin.focus();
    return true;
  } catch (err) {
    console.error('Failed to write print window document', err);
    return false;
  }
}

/**
 * Executes direct print:
 * 1. Tries direct window.print()
 * 2. If running inside an iframe or print fails, opens the printable window outside the iframe.
 */
export function executeSmartPrint(
  mode: PageMode,
  a4Data: SignData,
  a5Data: A5MultiSignData,
  onIframeDetected?: () => void
): boolean {
  // If inside an iframe, direct window.print() will be blocked by browser sandbox policy
  if (isInsideIframe()) {
    if (onIframeDetected) {
      onIframeDetected();
    }
    // Attempt opening the clean print window
    const opened = openPrintWindow(mode, a4Data, a5Data);
    if (!opened) {
      // If popup was blocked, fallback to direct print attempt
      try {
        window.print();
      } catch (e) {
        console.warn('Iframe print error', e);
      }
    }
    return opened;
  }

  // Not in iframe: normal direct print
  try {
    window.print();
    return true;
  } catch {
    return openPrintWindow(mode, a4Data, a5Data);
  }
}
