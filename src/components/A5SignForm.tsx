import React from 'react';
import { A5MultiSignData, MultiItemRow } from '../types';
import {
  KIABI_RETAIL_CATALOG,
  ALL_RETAIL_ITEMS,
  CURRENCY_OPTIONS,
  DEFAULT_A5_ITEMS,
} from '../data/presets';
import { Plus, Trash2, RotateCcw, Printer, Download, Check, Sparkles, HelpCircle } from 'lucide-react';
import { downloadA5StandaloneHTML } from '../utils/signUtils';

interface A5SignFormProps {
  data: A5MultiSignData;
  onChange: (data: A5MultiSignData) => void;
  onPrint: () => void;
}

export const A5SignForm: React.FC<A5SignFormProps> = ({
  data,
  onChange,
  onPrint,
}) => {
  const [downloadSuccess, setDownloadSuccess] = React.useState(false);

  const handleCurrencyChange = (currency: string) => {
    onChange({ ...data, currency });
  };

  const handleAddItem = () => {
    const newId = Date.now().toString();
    const defaultItem = ALL_RETAIL_ITEMS[0];
    const newItem: MultiItemRow = {
      id: newId,
      engName: defaultItem?.en || 'item',
      araName: defaultItem?.ar || '',
      price: '',
    };
    onChange({
      ...data,
      items: [...data.items, newItem],
    });
  };

  const handleRemoveItem = (id: string) => {
    onChange({
      ...data,
      items: data.items.filter((item) => item.id !== id),
    });
  };

  const handleItemPresetSelect = (id: string, selectedVal: string) => {
    if (selectedVal === '__custom__') {
      return;
    }
    const found = ALL_RETAIL_ITEMS.find((it) => it.en === selectedVal || it.label === selectedVal);
    if (found) {
      onChange({
        ...data,
        items: data.items.map((item) =>
          item.id === id
            ? {
                ...item,
                engName: found.en,
                araName: found.ar,
              }
            : item
        ),
      });
    }
  };

  const handleFieldChange = (
    id: string,
    field: 'engName' | 'araName' | 'price',
    val: string
  ) => {
    onChange({
      ...data,
      items: data.items.map((item) =>
        item.id === id ? { ...item, [field]: val } : item
      ),
    });
  };

  const handleResetToPhoto = () => {
    onChange({
      currency: 'KWD',
      items: [
        { id: '1', engName: 'sweater', araName: 'سترة', price: '2.2' },
        { id: '2', engName: 'trouser', araName: 'بنطال', price: '7.2' },
        { id: '3', engName: 't-shirt', araName: 'تي شيرت', price: '2.2' },
        { id: '4', engName: 'shoes', araName: 'أحذية', price: '5.5' },
      ],
      showKiabiLogo: true,
    });
  };

  const handleDownloadA5 = () => {
    downloadA5StandaloneHTML(data);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="no-print bg-white rounded-2xl p-4 sm:p-6 shadow-xs border border-gray-200/90 mb-6">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5">
              A5 PAYSAGE
            </span>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
              Multi-Item Price Stand Editor
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Select items from the Kiabi store menu — Arabic name translates automatically
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToPhoto}
          className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-[#e2001a] py-1 px-2 rounded-md hover:bg-gray-100 transition"
          title="Reset to store photo example (Sweater, Trouser, T-shirt, Shoes)"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Photo Sample</span>
        </button>
      </div>

      {/* Global Currency Setting */}
      <div className="rounded-xl border border-gray-150 p-3 bg-gray-50/70 mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <label htmlFor="a5CurrencyInput" className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Store Currency
          </label>
          <span className="text-[11px] text-gray-400 font-medium">Shown on right next to prices</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="a5CurrencyInput"
            type="text"
            value={data.currency}
            onChange={(e) => handleCurrencyChange(e.target.value)}
            placeholder="e.g. KWD, SAR, AED"
            className="w-28 min-h-[38px] px-3 py-1.5 text-sm font-bold bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20"
          />
          <div className="flex flex-wrap gap-1">
            {CURRENCY_OPTIONS.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => handleCurrencyChange(c.code)}
                className={`text-[11px] px-2.5 py-1 rounded-md font-semibold border transition ${
                  data.currency === c.code
                    ? 'bg-[#e2001a] text-white border-[#e2001a]'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                {c.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items List Rows */}
      <div className="space-y-3.5 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Items on Stand ({data.items.length})
          </span>
          <span className="text-[11px] text-gray-500">
            Auto-translates English & Arabic
          </span>
        </div>

        {data.items.map((item, index) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 p-3.5 bg-white shadow-2xs relative group transition hover:border-gray-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Item #{index + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveItem(item.id)}
                className="text-gray-400 hover:text-red-600 transition p-1 rounded hover:bg-red-50"
                title="Remove this item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Pre-selected Dropdown for retail clothing in Kiabi */}
            <div className="mb-2.5">
              <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">
                Select Retail Clothing / Item
              </label>
              <select
                value={item.engName}
                onChange={(e) => handleItemPresetSelect(item.id, e.target.value)}
                className="w-full min-h-[38px] px-3 py-1.5 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 transition"
              >
                <option value="__custom__">Custom / Type your own...</option>
                {KIABI_RETAIL_CATALOG.map((cat) => (
                  <optgroup key={cat.category} label={cat.category}>
                    {cat.items.map((it) => (
                      <option key={it.en} value={it.en}>
                        {it.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Direct Editable Fields (English, Arabic, Price) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5">
              <div className="sm:col-span-4">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                  English Name
                </label>
                <input
                  type="text"
                  value={item.engName}
                  onChange={(e) => handleFieldChange(item.id, 'engName', e.target.value)}
                  placeholder="e.g. sweater"
                  className="w-full min-h-[38px] px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20"
                />
              </div>

              <div className="sm:col-span-5">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                  Arabic Name (بالعربي)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={item.araName}
                  onChange={(e) => handleFieldChange(item.id, 'araName', e.target.value)}
                  placeholder="مثال: سترة"
                  className="w-full min-h-[38px] px-2.5 py-1.5 text-xs bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20 text-right font-medium"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-[10px] uppercase font-bold text-gray-400 mb-0.5">
                  Price ({data.currency})
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={item.price}
                  onChange={(e) => handleFieldChange(item.id, 'price', e.target.value)}
                  placeholder="e.g. 2.2"
                  className="w-full min-h-[38px] px-2.5 py-1.5 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2001a]/20"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add item button */}
        <button
          type="button"
          onClick={handleAddItem}
          className="w-full min-h-[42px] border-2 border-dashed border-gray-300 hover:border-[#e2001a] rounded-xl text-xs font-bold text-gray-600 hover:text-[#e2001a] transition flex items-center justify-center gap-1.5 bg-gray-50/50 hover:bg-red-50/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Item Row</span>
        </button>
      </div>

      {/* Brand logo toggle */}
      <div className="rounded-xl border border-gray-150 p-3 bg-white mb-5 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gray-800">KIABI Brand Logo at Bottom</span>
          <p className="text-[11px] text-gray-500">Matches official in-store acrylic stand footer</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={data.showKiabiLogo}
            onChange={(e) => onChange({ ...data, showKiabiLogo: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e2001a]"></div>
        </label>
      </div>

      {/* Print and Export Buttons */}
      <div className="flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onPrint}
          className="w-full min-h-[50px] px-5 py-3 rounded-xl bg-[#e2001a] hover:bg-[#b80015] text-white font-bold text-base shadow-sm hover:shadow active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          <Printer className="w-5 h-5" />
          <span>Print / AirPrint Options (A5 Stand)</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadA5}
          className="min-h-[44px] px-4 py-2.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-800 text-xs sm:text-sm font-semibold transition active:scale-[0.98] flex items-center justify-center gap-2 shadow-2xs"
        >
          {downloadSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Downloaded Combined A4 & A5 HTML!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4 text-[#e2001a]" />
              <span>Download Standalone A4 & A5 HTML</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
