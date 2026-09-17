import React from 'react';
import { A5MultiSignData } from '../types';
import { formatPrice } from '../utils/signUtils';
import { Copy, Check, Printer } from 'lucide-react';
import { KiabiLogo } from './KiabiLogo';

interface A5SignPreviewProps {
  data: A5MultiSignData;
  onPrint: () => void;
}

export const A5SignPreview: React.FC<A5SignPreviewProps> = ({ data, onPrint }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyText = async () => {
    const lines = data.items.map(
      (item) =>
        `${item.engName} / ${item.araName} — ${data.currency} ${formatPrice(item.price)}`
    );

    try {
      await navigator.clipboard.writeText(lines.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="preview-wrapper-a5">
      {/* Header bar on screen (hidden in print) */}
      <div className="no-print flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            A5 Live Print Preview
          </span>
          <span className="rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-800 border border-amber-200/70">
            A5 Paysage Stand (148 × 210 mm)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleCopyText}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 active:scale-95 transition"
            title="Copy price list text"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? 'Copied' : 'Copy'}</span>
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

      {/* Visual Stand representation matching in-store acrylic stand */}
      <div className="flex flex-col items-center">
        {/* The White Card in Acrylic Stand */}
        <div
          id="a5SignTagContainer"
          className="a5-stand-container bg-white border-2 border-gray-900 rounded-lg shadow-md w-full max-w-[440px] aspect-[1/1.42] p-6 sm:p-8 flex flex-col justify-between select-none relative box-border"
        >
          {/* Item Rows List */}
          <div className="flex flex-col gap-5 sm:gap-6 pt-3 sm:pt-4">
            {data.items.length === 0 ? (
              <div className="py-12 text-center text-gray-400 text-sm italic">
                No items added yet. Add items using the form.
              </div>
            ) : (
              data.items.map((item) => {
                const en = (item.engName || '').trim();
                const ar = (item.araName || '').trim();
                const price = formatPrice(item.price);
                const hasNames = en || ar;
                const showSlash = en && ar;

                return (
                  <div
                    key={item.id}
                    className="a5-item-row flex items-baseline justify-between border-b border-gray-100/80 pb-2 sm:pb-3 gap-3"
                  >
                    {/* Left Column: English / Arabic Title */}
                    <div className="a5-item-name flex items-baseline flex-wrap gap-x-1.5 text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                      {en && <span>{en}</span>}
                      {showSlash && <span className="text-gray-400 font-semibold">/</span>}
                      {ar && (
                        <span dir="rtl" className="font-bold text-gray-900">
                          {ar}
                        </span>
                      )}
                      {!hasNames && <span className="text-gray-300 italic">Item name</span>}
                    </div>

                    {/* Right Column: Currency + Price */}
                    <div className="a5-item-price flex items-start gap-1 font-black text-gray-900 shrink-0">
                      {data.currency && (
                        <span className="a5-curr text-[11px] sm:text-xs font-black tracking-tight text-gray-800 mt-0.5">
                          {data.currency}
                        </span>
                      )}
                      <span className="a5-num text-xl sm:text-2xl md:text-[26px] font-black tracking-tight leading-none">
                        {price || '—'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom KIABI Official Retail Brand Logo matching user reference image */}
          {data.showKiabiLogo && (
            <div className="a5-footer pt-6 pb-2 flex items-center justify-center">
              <KiabiLogo className="h-7 sm:h-8 md:h-9 w-auto select-none" />
            </div>
          )}
        </div>

        {/* Realistic Wooden Block Base for screen visual (hidden in print) */}
        <div className="no-print w-44 sm:w-52 h-5 sm:h-6 bg-[#d9ab7e] rounded-b-md shadow-xs border-t border-[#b88c5f] flex items-center justify-center">
          <div className="w-28 sm:w-36 h-1 bg-[#b38458]/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
