import React from 'react';
import { PageMode } from '../types';
import { FileText, ListOrdered, Sparkles } from 'lucide-react';

interface PageModeTabsProps {
  currentMode: PageMode;
  onChangeMode: (mode: PageMode) => void;
}

export const PageModeTabs: React.FC<PageModeTabsProps> = ({
  currentMode,
  onChangeMode,
}) => {
  return (
    <div className="no-print w-full mb-6">
      {/* Browser Tab style container */}
      <div className="bg-gray-200/80 p-1.5 rounded-2xl border border-gray-300/80 shadow-xs">
        <div className="grid grid-cols-2 gap-2">
          {/* Tab 1: A4 Paysage */}
          <button
            id="tab-a4-paysage"
            type="button"
            onClick={() => onChangeMode('a4_paysage')}
            className={`flex items-center gap-3 p-3 sm:px-5 sm:py-3.5 rounded-xl text-left transition-all duration-150 relative ${
              currentMode === 'a4_paysage'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200/90 ring-2 ring-[#e2001a]/10'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-black text-xs transition ${
                currentMode === 'a4_paysage'
                  ? 'bg-[#e2001a] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              A4
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900">
                  A4 Paysage
                </span>
                {currentMode === 'a4_paysage' && (
                  <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-[#e2001a]" />
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 truncate mt-0.5">
                Single Item • Big Price Sign
              </p>
            </div>
          </button>

          {/* Tab 2: A5 Paysage */}
          <button
            id="tab-a5-paysage"
            type="button"
            onClick={() => onChangeMode('a5_paysage')}
            className={`flex items-center gap-3 p-3 sm:px-5 sm:py-3.5 rounded-xl text-left transition-all duration-150 relative ${
              currentMode === 'a5_paysage'
                ? 'bg-white text-gray-900 shadow-sm border border-gray-200/90 ring-2 ring-amber-500/20'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg font-black text-xs transition ${
                currentMode === 'a5_paysage'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              A5
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900">
                  A5 Paysage
                </span>
                {currentMode === 'a5_paysage' && (
                  <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-amber-500" />
                )}
                <span className="rounded bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2">
                  Multi-Item
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 truncate mt-0.5">
                Retail Price List Stand (Acrylic)
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
