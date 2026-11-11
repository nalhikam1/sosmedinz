'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  CalendarDays, 
  KeyRound, 
  Plus, 
  Download, 
  Upload, 
  RotateCcw
} from 'lucide-react';

export type ActiveTab = 'overview' | 'content' | 'vault';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCreatePost: () => void;
  onOpenAddAccount: () => void;
  totalAccounts: number;
  totalScheduled: number;
  onExportJson: () => void;
  onImportJson: (json: string) => boolean;
  onResetData: () => void;
}

export function Navbar({
  activeTab,
  setActiveTab,
  onOpenCreatePost,
  onOpenAddAccount,
  totalAccounts,
  totalScheduled,
  onExportJson,
  onImportJson,
  onResetData,
}: NavbarProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = onImportJson(content);
      if (success) {
        alert('Data berhasil dipulihkan dari cadangan!');
      } else {
        alert('Format file JSON tidak sesuai.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F4F7F2] border-b-[3px] border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-9 h-9 bg-[#A3E635] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center font-black text-lg text-black group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform">
            ⚡
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-black uppercase font-mono">
              CUAN<span className="bg-[#A3E635] px-1 border border-black ml-0.5">STACK</span>
            </span>
            <div className="text-[10px] text-neutral-600 font-mono tracking-wider font-semibold">
              ORGANIZER & VAULT SOSMED
            </div>
          </div>
        </div>

        {/* Exactly 3 Core Nav Tabs (Top Bar Contract) */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wide border-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-neutral-800 border-black/80 hover:bg-[#DCFCE7]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Ringkasan</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wide border-2 transition-all whitespace-nowrap ${
              activeTab === 'content'
                ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-neutral-800 border-black/80 hover:bg-[#DCFCE7]'
            }`}
          >
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Jadwal & Konten ({totalScheduled})</span>
          </button>

          <button
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold font-mono uppercase tracking-wide border-2 transition-all whitespace-nowrap ${
              activeTab === 'vault'
                ? 'bg-[#A3E635] text-black border-black shadow-[2px_2px_0px_#000] translate-x-[-1px] translate-y-[-1px]'
                : 'bg-white text-neutral-800 border-black/80 hover:bg-[#DCFCE7]'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>Vault Akun & Password ({totalAccounts})</span>
          </button>
        </nav>

        {/* Actions Zone: Backup Utilities + Primary CTA */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Quick Backup/Restore Dropdown or Buttons */}
          <button
            onClick={onExportJson}
            title="Cadangkan Data (JSON)"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-neutral-100 text-black text-xs font-mono font-bold border-2 border-black"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup</span>
          </button>

          <label
            title="Pulihkan Data (JSON)"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 bg-white hover:bg-[#FEF08A] text-black text-xs font-mono font-bold border-2 border-black cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Restore</span>
            <input type="file" accept=".json" onChange={handleFileChange} className="hidden" />
          </label>

          <button
            onClick={onOpenCreatePost}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#A3E635] hover:bg-[#86EFAC] text-black font-black text-xs font-mono uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Buat Konten</span>
          </button>
        </div>
      </div>

      {/* Mobile Subnav Strip */}
      <div className="md:hidden flex items-center justify-around gap-1 px-3 py-2 border-t-2 border-black bg-white">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-bold font-mono border ${
            activeTab === 'overview' ? 'bg-[#A3E635] text-black border-black font-black' : 'text-neutral-700 border-transparent'
          }`}
        >
          <LayoutDashboard className="w-3.5 h-3.5" />
          <span>Ringkasan</span>
        </button>

        <button
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-bold font-mono border ${
            activeTab === 'content' ? 'bg-[#A3E635] text-black border-black font-black' : 'text-neutral-700 border-transparent'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Jadwal ({totalScheduled})</span>
        </button>

        <button
          onClick={() => setActiveTab('vault')}
          className={`flex items-center gap-1 px-2 py-1 text-xs font-bold font-mono border ${
            activeTab === 'vault' ? 'bg-[#A3E635] text-black border-black font-black' : 'text-neutral-700 border-transparent'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Vault ({totalAccounts})</span>
        </button>
      </div>
    </header>
  );
}
