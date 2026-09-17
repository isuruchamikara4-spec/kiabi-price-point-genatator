import React from 'react';
import { X, Smartphone, Download, Share, PlusSquare, Printer, CheckCircle2 } from 'lucide-react';
import { downloadStandaloneFile } from '../utils/signUtils';

interface IPhoneGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IPhoneGuideModal: React.FC<IPhoneGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-[#e2001a] p-2 text-white">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Use on your iPhone</h2>
              <p className="text-xs text-gray-500">2 easy methods to save and run anytime</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="mt-5 space-y-5">
          {/* Method 1: Download Offline File */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-sm mb-2">
              <Download className="w-4 h-4 text-blue-600" />
              <span>Method 1: Download Standalone File to "Files" App</span>
            </div>
            <p className="text-xs text-blue-800/90 mb-3 leading-relaxed">
              Download the single <code className="bg-white px-1.5 py-0.5 rounded font-mono border border-blue-200">kiabi-price-signs-a4-a5.html</code> file directly into your iPhone&apos;s Files app. It combines <strong>BOTH A4 Paysage and A5 Paysage</strong> codes together into one offline tool!
            </p>
            <ol className="text-xs text-gray-700 space-y-1.5 pl-5 list-decimal mb-3">
              <li>Tap the <strong>"Download Standalone .html"</strong> button below.</li>
              <li>When Safari asks <em>"Do you want to download kiabi-price-sign.html?"</em>, tap <strong>Download</strong>.</li>
              <li>Open the <strong>Files</strong> app on your iPhone and go to <strong>Downloads</strong>.</li>
              <li>Tap the file to open it in Safari anytime, anywhere!</li>
            </ol>
            <button
              type="button"
              onClick={() => downloadStandaloneFile()}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white hover:bg-blue-700 active:scale-98 transition shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download kiabi-price-signs-a4-a5.html Now
            </button>
          </div>

          {/* Method 2: Add to Home Screen (PWA) */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2">
              <Share className="w-4 h-4 text-emerald-600" />
              <span>Method 2: Add to iPhone Home Screen (Like an App)</span>
            </div>
            <p className="text-xs text-emerald-800/90 mb-3 leading-relaxed">
              You can turn this web link into an app icon on your iPhone home screen that opens fullscreen without Safari browser toolbars.
            </p>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[11px] font-bold text-emerald-900">
                  1
                </span>
                <span>Open this link in <strong>Safari</strong> on your iPhone.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[11px] font-bold text-emerald-900">
                  2
                </span>
                <span>
                  Tap the <strong>Share</strong> button (
                  <span className="inline-block px-1 bg-white rounded border border-emerald-200 text-[11px]">
                    ⤒
                  </span>
                  ) at the bottom toolbar.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[11px] font-bold text-emerald-900">
                  3
                </span>
                <span>
                  Scroll down and tap <strong>Add to Home Screen</strong> (
                  <PlusSquare className="inline w-3.5 h-3.5 mx-0.5 text-gray-600" />
                  ).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[11px] font-bold text-emerald-900">
                  4
                </span>
                <span>Tap <strong>Add</strong> in the top-right corner. Done!</span>
              </div>
            </div>
          </div>

          {/* AirPrint note */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-3.5 flex items-start gap-3">
            <Printer className="w-4 h-4 text-gray-600 shrink-0 mt-0.5" />
            <div className="text-xs text-gray-600">
              <strong className="text-gray-900">AirPrint & PDF Export:</strong> When you tap &quot;Print / AirPrint&quot; on your iPhone, iOS lets you select any wireless AirPrint printer or pinch-out to save as an A4 PDF document.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto rounded-xl bg-gray-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-gray-800 transition"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
