import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PageModeTabs } from './components/PageModeTabs';
import { SignForm } from './components/SignForm';
import { SignPreview } from './components/SignPreview';
import { A5SignForm } from './components/A5SignForm';
import { A5SignPreview } from './components/A5SignPreview';
import { IPhoneGuideModal } from './components/IPhoneGuideModal';
import { PrintOptionsModal } from './components/PrintOptionsModal';
import { SignData, PageMode, A5MultiSignData } from './types';
import { ITEM_PRESETS, DEFAULT_A5_ITEMS } from './data/presets';

export default function App() {
  const [guideOpen, setGuideOpen] = useState(false);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [pageMode, setPageMode] = useState<PageMode>('a4_paysage');

  // A4 Paysage State (Single item big price sign)
  const [signData, setSignData] = useState<SignData>({
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

  // A5 Paysage State (Multi-item acrylic price stand from photo)
  const [a5Data, setA5Data] = useState<A5MultiSignData>({
    currency: 'KWD',
    items: DEFAULT_A5_ITEMS,
    showKiabiLogo: true,
  });

  // Set class on body for targetted print CSS
  useEffect(() => {
    document.body.classList.remove('mode-a4', 'mode-a5');
    document.body.classList.add(pageMode === 'a4_paysage' ? 'mode-a4' : 'mode-a5');
  }, [pageMode]);

  const handlePrint = () => {
    setPrintModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f4f5f7] text-[#111111] antialiased selection:bg-[#e2001a] selection:text-white">
      {/* Header */}
      <Header
        currentMode={pageMode}
        onOpenIPhoneGuide={() => setGuideOpen(true)}
        onPrint={handlePrint}
        onDownload={() => {
          import('./utils/signUtils').then((u) =>
            u.downloadCombinedStandaloneHTML(signData, a5Data, pageMode)
          );
        }}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-4xl px-4 pb-12 pt-1 sm:pt-4">
        {/* Page Size / Format Switcher Tabs */}
        <PageModeTabs
          currentMode={pageMode}
          onChangeMode={setPageMode}
        />

        {/* Dynamic Mode Content */}
        {pageMode === 'a4_paysage' ? (
          /* A4 Paysage: Single-Item Bold Promo Sign */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Controls Form Column */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <SignForm
                data={signData}
                onChange={setSignData}
                onPrint={handlePrint}
                onOpenIPhoneGuide={() => setGuideOpen(true)}
              />
            </div>

            {/* Live Preview Column (Sticky on desktop) */}
            <div className="lg:col-span-6 order-1 lg:order-2 lg:sticky lg:top-20">
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-200/90">
                <SignPreview data={signData} onPrint={handlePrint} />
              </div>

              {/* Quick Presets Bar under preview */}
              <div className="no-print mt-3 flex flex-wrap items-center gap-1.5 px-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase mr-1">Quick:</span>
                {ITEM_PRESETS.slice(0, 5).map((item) => (
                  <button
                    key={item.en}
                    type="button"
                    onClick={() =>
                      setSignData((prev) => ({
                        ...prev,
                        preset: item.label,
                        engTitle: item.en,
                        araTitle: item.ar,
                      }))
                    }
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition ${
                      signData.engTitle === item.en
                        ? 'bg-[#e2001a] text-white border-[#e2001a]'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {item.en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* A5 Paysage: Multi-Item Retail Clothing Price List Stand */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* A5 Controls Form Column */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <A5SignForm
                data={a5Data}
                onChange={setA5Data}
                onPrint={handlePrint}
              />
            </div>

            {/* A5 Live Preview Column (Sticky on desktop) */}
            <div className="lg:col-span-6 order-1 lg:order-2 lg:sticky lg:top-20">
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-gray-200/90">
                <A5SignPreview
                  data={a5Data}
                  onPrint={handlePrint}
                />
              </div>

              {/* Quick action notice */}
              <div className="no-print mt-3 text-center">
                <p className="text-xs text-gray-400">
                  Ready to print directly on A5 or centered on A4 paper via AirPrint
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* iPhone Guide Modal */}
      <IPhoneGuideModal
        isOpen={guideOpen}
        onClose={() => setGuideOpen(false)}
      />

      {/* Activated Print Options Modal */}
      <PrintOptionsModal
        isOpen={printModalOpen}
        onClose={() => setPrintModalOpen(false)}
        currentMode={pageMode}
        signData={signData}
        a5Data={a5Data}
      />
    </div>
  );
}
