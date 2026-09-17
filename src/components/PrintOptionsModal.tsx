import React, { useState } from 'react';
import { Printer, ExternalLink, Download, Copy, Check, X, FileText, Smartphone, AlertCircle } from 'lucide-react';
import { PageMode, SignData, A5MultiSignData } from '../types';
import { openPrintWindow, isInsideIframe } from '../utils/printHelper';
import { downloadCombinedStandaloneHTML } from '../utils/signUtils';

interface PrintOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMode: PageMode;
  signData: SignData;
  a5Data: A5MultiSignData;
}

export const PrintOptionsModal: React.FC<PrintOptionsModalProps> = ({
  isOpen,
  onClose,
  currentMode,
  signData,
  a5Data,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const inIframe = isInsideIframe();

  if (!isOpen) return null;

  const isA4 = currentMode === 'a4_paysage';
  const paperTitle = isA4 ? 'A4 Paysage Sign (190 × 140 mm)' : 'A5 Retail Clothing Stand (148 × 210 mm)';

  const handlePrintNewTab = () => {
    const success = openPrintWindow(currentMode, signData, a5Data);
    if (!success) {
      alert('Popup was blocked by your browser. Please allow popups for this site, or download the standalone file below.');
    } else {
      onClose();
    }
  };

  const handleDirectPrint = () => {
    if (inIframe) {
      // In iframe, direct print is blocked by browser policy, so open the print window
      handlePrintNewTab();
    } else {
      window.print();
      onClose();
    }
  };

  const handleDownload = () => {
    downloadCombinedStandaloneHTML(signData, a5Data, currentMode);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopyText = async () => {
    let text = '';
    if (isA4) {
      text = `${signData.engTitle} / ${signData.araTitle}\n${signData.engDetail} / ${signData.araDetail}\n${signData.currency} ${signData.priceValue}`;
    } else {
      text = a5Data.items
        .map((it) => `${it.engName} / ${it.araName} — ${a5Data.currency} ${it.price}`)
        .join('\n');
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 sm:p-7 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-[#e2001a] shrink-0">
            <Printer className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">
              Print & Output Options
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Target: <span className="font-bold text-gray-800">{paperTitle}</span>
            </p>
          </div>
        </div>

        {/* Notice for iframe / sandbox environment */}
        {inIframe && (
          <div className="mb-4 rounded-xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Live Preview Sandbox Detected</p>
              <p className="text-amber-800 mt-0.5 leading-relaxed">
                Embedded browser previews block direct in-page printing dialogs. Click <strong>&quot;Open Clean Print Window&quot;</strong> below to open the dedicated print dialog instantly!
              </p>
            </div>
          </div>
        )}

        {/* Primary Actions List */}
        <div className="flex flex-col gap-2.5 my-4">
          {/* Option 1: Open in Clean Print Window (100% reliable) */}
          <button
            type="button"
            onClick={handlePrintNewTab}
            className="w-full min-h-[56px] rounded-xl bg-[#e2001a] hover:bg-[#b80015] text-white p-3.5 font-bold shadow-md hover:shadow-lg transition flex items-center justify-between gap-3 text-left group active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/15">
                <ExternalLink className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-black flex items-center gap-2">
                  <span>Open Clean Print Window</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white text-[#e2001a] rounded-full">
                    Recommended
                  </span>
                </div>
                <div className="text-xs text-white/85 font-normal">
                  Opens full page with print dialog automatically activated
                </div>
              </div>
            </div>
            <Printer className="w-5 h-5 opacity-70 group-hover:opacity-100 transition" />
          </button>

          {/* Option 2: Direct In-Page Print Attempt */}
          <button
            type="button"
            onClick={handleDirectPrint}
            className="w-full min-h-[50px] rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-800 p-3 font-semibold transition flex items-center justify-between gap-3 text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700">
                <Printer className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-gray-900">
                  Direct AirPrint / Printer Call
                </div>
                <div className="text-[11px] text-gray-500">
                  Triggers browser system print dialog directly
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">window.print</span>
          </button>

          {/* Option 3: Download Standalone HTML */}
          <button
            type="button"
            onClick={handleDownload}
            className="w-full min-h-[50px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-800 p-3 font-semibold transition flex items-center justify-between gap-3 text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span>Download Standalone .html (A4 & A5 Combined)</span>
                  {downloadSuccess && (
                    <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-gray-500">
                  One single offline file combining BOTH A4 single-item & A5 stand with official Kiabi logo
                </div>
              </div>
            </div>
            <span className="text-xs text-blue-600 font-medium">Save file</span>
          </button>

          {/* Option 4: Copy Details */}
          <button
            type="button"
            onClick={handleCopyText}
            className="w-full min-h-[46px] rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 p-2.5 font-medium transition flex items-center justify-between gap-3 text-left active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-xs sm:text-sm font-bold text-gray-800">
                  {copied ? 'Copied to Clipboard!' : 'Copy Sign Text'}
                </div>
                <div className="text-[11px] text-gray-500">
                  Copies item names, prices, and sizes to clipboard
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-medium">Text</span>
          </button>
        </div>

        {/* Recommended Printer Settings Checklist */}
        <div className="mt-5 rounded-xl border border-gray-200/80 bg-gray-50/70 p-3.5 text-xs text-gray-600">
          <div className="font-bold text-gray-800 mb-1.5 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-gray-500" />
            <span>Recommended AirPrint & Printer Settings:</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11.5px] text-gray-600">
            <li>
              <strong>Paper Size:</strong> {isA4 ? 'A4' : 'A5'}
            </li>
            <li>
              <strong>Orientation:</strong> {isA4 ? 'Landscape (أفقي)' : 'Portrait (عمودي)'}
            </li>
            <li>
              <strong>Margins:</strong> None or Minimum (0 mm)
            </li>
            <li>
              <strong>Background Graphics:</strong> Turn ON to ensure sharp borders and navy logo
            </li>
          </ul>
        </div>

        {/* Modal Footer */}
        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
