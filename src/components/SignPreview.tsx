import React from 'react';
import { SignData } from '../types';
import { formatPrice, combineBilingual } from '../utils/signUtils';
import { Copy, Check, Printer } from 'lucide-react';

interface SignPreviewProps {
  data: SignData;
  onPrint: () => void;
}

export const SignPreview: React.FC<SignPreviewProps> = ({ data, onPrint }) => {
  const [copied, setCopied] = React.useState(false);

  const formattedPrice = formatPrice(data.priceValue);
  const titleInfo = combineBilingual(data.engTitle, data.araTitle);
  const ageInfo = combineBilingual(data.engDetail, data.araDetail);
  const prefixInfo = combineBilingual(data.engPrefix, data.araPrefix);
  const sizeValClean = (data.sizeVal ?? '').trim();
  const currencyClean = (data.currency ?? '').trim();

  const handleCopyText = async () => {
    const lines = [
      titleInfo.fullText,
      ageInfo.fullText,
      sizeValClean ? `Size / المقاس: ${sizeValClean}` : '',
      prefixInfo.fullText,
      currencyClean && formattedPrice
        ? `${currencyClean} ${formattedPrice}`
        : currencyClean || formattedPrice,
    ].filter(Boolean);

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="preview-wrapper-print">
      {/* Visual Header bar on screen (hidden in print) */}
      <div className="no-print flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Live Print Preview</span>
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700 border border-gray-200/60">
            190 × 140 mm (A4 Centered)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
            title="Copy sign text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Text'}</span>
          </button>
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-[#e2001a] bg-red-50 hover:bg-red-100 active:scale-95 transition"
            title="Open Print Options"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Options</span>
          </button>
        </div>
      </div>

      {/* The Sign Tag itself - matched precisely to in-store photo */}
      <div
        id="signTagContainer"
        className="sign-print-container bg-white border-2 border-black rounded-lg shadow-sm w-full p-6 sm:p-7 md:p-8 flex flex-col justify-between aspect-[1.33/1] select-none relative"
      >
        {/* Top Header Group */}
        <div className="flex flex-col gap-1 sm:gap-1.5">
          {/* Line 1: Title */}
          {titleInfo.hasContent && (
            <div
              id="line1"
              className="tag-line-print text-xl sm:text-2xl md:text-3xl font-black text-black leading-tight tracking-tight flex items-baseline flex-wrap gap-x-1"
            >
              {titleInfo.en && <span id="outEngTitle">{titleInfo.en}</span>}
              {titleInfo.showSlash && <span id="slash1" className="font-bold text-gray-900 mx-0.5">/</span>}
              {titleInfo.ar && <span id="outAraTitle" dir="rtl">{titleInfo.ar}</span>}
            </div>
          )}

          {/* Line 2: Age / Subline */}
          {ageInfo.hasContent && (
            <div
              id="line2"
              className="tag-subline-print text-base sm:text-xl md:text-2xl font-extrabold text-gray-900 leading-tight flex items-baseline flex-wrap gap-x-1"
            >
              {ageInfo.en && <span id="outEngDetail">{ageInfo.en}</span>}
              {ageInfo.showSlash && <span id="slash2" className="font-bold text-gray-800 mx-0.5">/</span>}
              {ageInfo.ar && <span id="outAraDetail" dir="rtl">{ageInfo.ar}</span>}
            </div>
          )}

          {/* Size Line (only if sizeVal has content) */}
          {sizeValClean && (
            <div
              id="lineSize"
              className="tag-size-line-print text-sm sm:text-base md:text-lg font-bold text-gray-800 mt-0.5 flex items-baseline gap-1"
            >
              <span>Size / المقاس:</span>
              <span id="outSizeVal">{sizeValClean}</span>
            </div>
          )}

          {/* Line 3: Prefix */}
          {prefixInfo.hasContent && (
            <div
              id="line3"
              className="tag-prefix-print text-xs sm:text-base md:text-lg font-medium text-gray-700 mt-0.5 leading-snug flex items-baseline flex-wrap gap-x-1"
            >
              {prefixInfo.en && <span id="outEngPrefix">{prefixInfo.en}</span>}
              {prefixInfo.showSlash && <span id="slash3" className="font-normal text-gray-600 mx-0.5">/</span>}
              {prefixInfo.ar && <span id="outAraPrefix" dir="rtl">{prefixInfo.ar}</span>}
            </div>
          )}
        </div>

        {/* Price Block - matched to real sign: KWD placed to the left, top-aligned with giant numbers */}
        {(currencyClean || formattedPrice) && (
          <div
            id="linePrice"
            className="tag-price-block-print flex items-start justify-center gap-2 sm:gap-3.5 mt-auto pb-1 sm:pb-2"
          >
            {currencyClean && (
              <span
                id="outCurrency"
                className="tag-currency-print text-xl sm:text-3xl md:text-4xl font-black text-black tracking-tight mt-1.5 sm:mt-2.5 md:mt-3"
              >
                {currencyClean}
              </span>
            )}

            {formattedPrice && (
              <span
                id="outPrice"
                className="tag-price-print text-6xl sm:text-8xl md:text-9xl font-black text-black tracking-tight leading-[0.82]"
              >
                {formattedPrice}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
