import React from 'react';
import { Smartphone, Download, Printer } from 'lucide-react';
import { downloadStandaloneFile } from '../utils/signUtils';
import { PageMode } from '../types';
import { KiabiLogo } from './KiabiLogo';

interface HeaderProps {
  onOpenIPhoneGuide: () => void;
  onPrint: () => void;
  currentMode?: PageMode;
  onDownload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenIPhoneGuide,
  onPrint,
  currentMode = 'a4_paysage',
  onDownload,
}) => {
  return (
    <header className="no-print mb-6 border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 shadow-xs">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <KiabiLogo className="h-6 sm:h-7 w-auto" />
          <div className="border-l border-gray-200 pl-2.5 sm:pl-3">
            <h1 className="text-sm sm:text-base font-bold text-gray-900 leading-none">Price Sign Generator</h1>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              {currentMode === 'a4_paysage' ? 'A4 Paysage Promo' : 'A5 Paysage Multi-Item'} • Bilingual Arabic & English
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            id="header-iphone-guide-btn"
            type="button"
            onClick={onOpenIPhoneGuide}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 active:scale-95 transition"
            title="How to use on iPhone"
          >
            <Smartphone className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden sm:inline">iPhone Setup</span>
            <span className="sm:hidden">iOS</span>
          </button>

          <button
            id="header-download-btn"
            type="button"
            onClick={onDownload ? onDownload : () => downloadStandaloneFile()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-semibold text-[#e2001a] hover:bg-red-100 active:scale-95 transition"
            title="Download unified offline HTML file with both A4 & A5 for iPhone"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save A4+A5 .html</span>
            <span className="sm:hidden">Save</span>
          </button>

          <button
            id="header-print-btn"
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#e2001a] px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-[#b80015] active:scale-95 transition"
            title={currentMode === 'a4_paysage' ? 'Print or AirPrint A4 Sign' : 'Print or AirPrint A5 Stand'}
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Options</span>
          </button>
        </div>
      </div>
    </header>
  );
};
