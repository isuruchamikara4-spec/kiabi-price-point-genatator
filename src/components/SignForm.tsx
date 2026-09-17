import React from 'react';
import { SignData } from '../types';
import { ITEM_PRESETS, AGE_PRESETS, SIZE_PRESET_GROUPS, PREFIX_OPTIONS, CURRENCY_OPTIONS } from '../data/presets';
import { Printer, Download, Sparkles, Smartphone, Check, X, RotateCcw } from 'lucide-react';
import { downloadStandaloneFile, downloadCustomHTML } from '../utils/signUtils';

interface SignFormProps {
  data: SignData;
  onChange: (data: SignData) => void;
  onPrint: () => void;
  onOpenIPhoneGuide: () => void;
}

export const SignForm: React.FC<SignFormProps> = ({
  data,
  onChange,
  onPrint,
  onOpenIPhoneGuide,
}) => {
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const item = ITEM_PRESETS.find(p => p.label === val);
    if (item) {
      onChange({
        ...data,
        preset: val,
        engTitle: item.en,
        araTitle: item.ar,
      });
    }
  };

  const handleAgePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === 'custom') {
      onChange({
        ...data,
        agePreset: 'custom',
      });
      return;
    }

    const presetObj = AGE_PRESETS.find(p => p.id === val);
    if (presetObj) {
      onChange({
        ...data,
        agePreset: val,
        engDetail: presetObj.en,
        araDetail: presetObj.ar,
      });
    }
  };

  const handlePrefixPresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const pref = PREFIX_OPTIONS.find(p => p.label === val);
    if (pref) {
      onChange({
        ...data,
        engPrefix: pref.en,
        araPrefix: pref.ar,
      });
    }
  };

  const handleResetToExample = () => {
    onChange({
      preset: 'Jacket / جاكيت',
      engTitle: 'Jacket',
      araTitle: 'جاكيت',
      agePreset: '3-12',
      engDetail: '3-12 years',
      araDetail: '٤-١٢ سنة',
      customAgeText: '',
      engPrefix: 'from',
      araPrefix: 'من',
      sizeVal: '',
      sizeEngLabel: 'Size',
      sizeAraLabel: 'المقاس',
      currency: 'KWD',
      priceValue: '6.5',
    });
  };

  const handleDownload = () => {
    downloadStandaloneFile();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleDownloadCustom = () => {
    downloadCustomHTML(data);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="no-print bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-200/90 mb-6">
      {/* Top Controls Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
        <div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
            Sign Editor & Fields
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Clear any field to remove it and its &apos;/&apos; separator from the sign
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToExample}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#e2001a] py-1 px-2 rounded-md hover:bg-gray-100 transition"
          title="Reset to example (Jacket / 3-12 years / 6.5 KWD)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Quick Fill Dropdowns */}
      <div className="rounded-xl bg-gray-50/80 p-3.5 border border-gray-200/70 mb-5 space-y-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick Autofill Presets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label htmlFor="presetSelect" className="block text-[11px] font-semibold text-gray-600 mb-1">
              Select Item Preset
            </label>
            <select
              id="presetSelect"
              value={data.preset}
              onChange={handlePresetChange}
              className="w-full min-h-[38px] px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20"
            >
              {ITEM_PRESETS.map((item) => (
                <option key={item.label} value={item.label}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="ageSelect" className="block text-[11px] font-semibold text-gray-600 mb-1">
              Select Age Preset
            </label>
            <select
              id="ageSelect"
              value={data.agePreset}
              onChange={handleAgePresetChange}
              className="w-full min-h-[38px] px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20"
            >
              {AGE_PRESETS.map((age) => (
                <option key={age.id} value={age.id}>
                  {age.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Title Fields (English & Arabic) */}
        <div className="rounded-xl border border-gray-150 p-3.5 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              1. Title (Header Line 1)
            </span>
            {(data.engTitle || data.araTitle) && (
              <button
                type="button"
                onClick={() => onChange({ ...data, engTitle: '', araTitle: '' })}
                className="text-[11px] text-gray-500 hover:text-red-600 font-semibold"
              >
                Clear Line
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="engTitle" className="text-[11px] font-semibold text-gray-500">
                  English Title
                </label>
                {data.engTitle && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, engTitle: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="engTitle"
                type="text"
                value={data.engTitle}
                onChange={(e) => onChange({ ...data, engTitle: e.target.value })}
                placeholder="e.g. Jacket (Leave empty to remove)"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="araTitle" className="text-[11px] font-semibold text-gray-500">
                  Arabic Title (بالعربي)
                </label>
                {data.araTitle && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, araTitle: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="araTitle"
                type="text"
                dir="rtl"
                value={data.araTitle}
                onChange={(e) => onChange({ ...data, araTitle: e.target.value })}
                placeholder="مثال: جاكيت (اتركه فارغاً للإزالة)"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition font-medium text-right"
              />
            </div>
          </div>
        </div>

        {/* Age / Subline Fields */}
        <div className="rounded-xl border border-gray-150 p-3.5 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              2. Subtitle / Age (Header Line 2)
            </span>
            {(data.engDetail || data.araDetail) && (
              <button
                type="button"
                onClick={() => onChange({ ...data, engDetail: '', araDetail: '' })}
                className="text-[11px] text-gray-500 hover:text-red-600 font-semibold"
              >
                Clear Line
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="engDetail" className="text-[11px] font-semibold text-gray-500">
                  English Subtitle / Age
                </label>
                {data.engDetail && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, engDetail: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="engDetail"
                type="text"
                value={data.engDetail}
                onChange={(e) => onChange({ ...data, engDetail: e.target.value })}
                placeholder="e.g. 3-12 years (Leave empty to remove)"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="araDetail" className="text-[11px] font-semibold text-gray-500">
                  Arabic Subtitle / Age (بالعربي)
                </label>
                {data.araDetail && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, araDetail: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="araDetail"
                type="text"
                dir="rtl"
                value={data.araDetail}
                onChange={(e) => onChange({ ...data, araDetail: e.target.value })}
                placeholder="مثال: ٤-١٢ سنة (اتركه فارغاً للإزالة)"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition font-medium text-right"
              />
            </div>
          </div>
        </div>

        {/* Prefix Fields (English & Arabic) */}
        <div className="rounded-xl border border-gray-150 p-3.5 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                3. Prefix (Header Line 3)
              </span>
              {/* Quick prefix picker */}
              <select
                onChange={handlePrefixPresetChange}
                defaultValue="from / من"
                className="text-[11px] py-0.5 px-1.5 border border-gray-200 rounded bg-gray-50 text-gray-600"
              >
                {PREFIX_OPTIONS.map((p) => (
                  <option key={p.label} value={p.label}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            {(data.engPrefix || data.araPrefix) && (
              <button
                type="button"
                onClick={() => onChange({ ...data, engPrefix: '', araPrefix: '' })}
                className="text-[11px] text-gray-500 hover:text-red-600 font-semibold"
              >
                Clear Line
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="engPrefix" className="text-[11px] font-semibold text-gray-500">
                  English Prefix
                </label>
                {data.engPrefix && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, engPrefix: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="engPrefix"
                type="text"
                value={data.engPrefix}
                onChange={(e) => onChange({ ...data, engPrefix: e.target.value })}
                placeholder="e.g. from"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="araPrefix" className="text-[11px] font-semibold text-gray-500">
                  Arabic Prefix (بالعربي)
                </label>
                {data.araPrefix && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, araPrefix: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="araPrefix"
                type="text"
                dir="rtl"
                value={data.araPrefix}
                onChange={(e) => onChange({ ...data, araPrefix: e.target.value })}
                placeholder="مثال: من"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition font-medium text-right"
              />
            </div>
          </div>
        </div>

        {/* Size (Optional) */}
        <div className="rounded-xl border border-gray-150 p-3.5 bg-white shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
              4. Size Line (Optional - Leave blank to hide)
            </span>
            {data.sizeVal && (
              <button
                type="button"
                onClick={() => onChange({ ...data, sizeVal: '' })}
                className="text-[11px] text-gray-500 hover:text-red-600 font-semibold"
              >
                Clear Size
              </button>
            )}
          </div>

          {/* Size Preset Dropdown */}
          <div className="mb-2.5">
            <label htmlFor="sizePresetSelect" className="block text-[11px] font-semibold text-gray-500 mb-1">
              Select Size Option
            </label>
            <select
              id="sizePresetSelect"
              value={data.sizeVal}
              onChange={(e) => {
                const val = e.target.value;
                if (val === '__custom__') {
                  const input = document.getElementById('sizeVal');
                  if (input) input.focus();
                  return;
                }
                onChange({ ...data, sizeVal: val });
              }}
              className="w-full min-h-[40px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
            >
              <option value="">-- None (No size on sign) --</option>
              {SIZE_PRESET_GROUPS.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ))}
              <optgroup label="Custom">
                <option value="__custom__">Custom Size (Type below)...</option>
              </optgroup>
            </select>
          </div>

          {/* Quick preset pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
            <span className="text-[10px] uppercase font-bold text-gray-400 mr-1">Quick Picks:</span>
            {[
              { label: 'XS - L', group: 'Tops' },
              { label: 'XS - XXL', group: 'Tops' },
              { label: '34 - 42', group: 'Tops' },
              { label: '38 - 50', group: 'Pants' },
              { label: '32 - 42', group: 'Pants' },
            ].map((p) => {
              const isActive = data.sizeVal === p.label;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => onChange({ ...data, sizeVal: p.label })}
                  className={`text-[11px] px-2 py-0.5 rounded-md font-semibold border transition ${
                    isActive
                      ? 'bg-[#e2001a] text-white border-[#e2001a]'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                  title={`${p.group}: ${p.label}`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Editable Custom Size Text Input */}
          <div>
            <label htmlFor="sizeVal" className="block text-[11px] font-semibold text-gray-500 mb-1">
              Custom Size Value (Editable)
            </label>
            <div className="flex items-center gap-2">
              <input
                id="sizeVal"
                type="text"
                value={data.sizeVal}
                onChange={(e) => onChange({ ...data, sizeVal: e.target.value })}
                placeholder="e.g. XS - L or 38 - 50 or custom text (Leave empty to hide)"
                className="w-full min-h-[42px] px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
              />
              {data.sizeVal && (
                <button
                  type="button"
                  onClick={() => onChange({ ...data, sizeVal: '' })}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
                  title="Remove size line"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Currency & Price */}
        <div className="rounded-xl border border-gray-150 p-3.5 bg-white shadow-2xs">
          <span className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            5. Currency & Price Value
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="currencyInput" className="text-[11px] font-semibold text-gray-500">
                  Currency Symbol / Code
                </label>
                {data.currency && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, currency: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="currencyInput"
                type="text"
                value={data.currency}
                onChange={(e) => onChange({ ...data, currency: e.target.value })}
                placeholder="e.g. KWD, SAR, AED"
                className="w-full min-h-[42px] px-3 py-2 text-sm font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
              />
              {/* Quick Currency Pills */}
              <div className="flex flex-wrap gap-1 mt-1.5">
                {CURRENCY_OPTIONS.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => onChange({ ...data, currency: c.code })}
                    className={`text-[10px] px-2 py-0.5 rounded font-semibold border transition ${
                      data.currency === c.code
                        ? 'bg-[#e2001a] text-white border-[#e2001a]'
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="priceValue" className="text-[11px] font-semibold text-gray-500">
                  Price Value
                </label>
                {data.priceValue && (
                  <button
                    type="button"
                    onClick={() => onChange({ ...data, priceValue: '' })}
                    className="text-[10px] text-red-500 hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>
              <input
                id="priceValue"
                type="text"
                inputMode="decimal"
                value={data.priceValue}
                onChange={(e) => onChange({ ...data, priceValue: e.target.value })}
                placeholder="e.g. 6.5"
                className="w-full min-h-[42px] px-3 py-2 text-base font-black text-gray-900 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 focus:border-[#e2001a] transition"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons Block */}
      <div className="mt-6 flex flex-col gap-2.5">
        {/* Primary AirPrint / Print */}
        <button
          id="printButton"
          type="button"
          onClick={onPrint}
          className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#e2001a] hover:bg-[#b80015] text-white font-bold text-base shadow-sm hover:shadow active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <Printer className="w-5 h-5" />
          <span>Print / AirPrint Options (A4)</span>
        </button>

        {/* Secondary Download Single File HTML for iPhone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            id="downloadStandaloneButton"
            type="button"
            onClick={handleDownload}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold transition active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xs"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Downloaded to iPhone!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#e2001a]" />
                <span>Download A4 & A5 .html</span>
              </>
            )}
          </button>

          <button
            id="downloadConfiguredButton"
            type="button"
            onClick={handleDownloadCustom}
            className="min-h-[44px] px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold transition active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xs"
            title="Download unified offline HTML file pre-configured with the current sign content"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Save Combined Code (.html)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
