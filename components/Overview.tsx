'use client';

import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  KeyRound, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Plus, 
  ExternalLink,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { SocialAccount, ContentPost, SocialPlatform } from '@/types';
import { PLATFORM_CONFIGS } from '@/lib/initial-data';
import { ActiveTab } from './Navbar';

interface OverviewProps {
  accounts: SocialAccount[];
  posts: ContentPost[];
  totalFollowers: number;
  scheduledCount: number;
  onOpenCreatePost: () => void;
  onOpenAddAccount: () => void;
  setActiveTab: (tab: ActiveTab) => void;
  setSelectedPlatform: (p: SocialPlatform | 'all') => void;
}

export function Overview({
  accounts,
  posts,
  totalFollowers,
  scheduledCount,
  onOpenCreatePost,
  onOpenAddAccount,
  setActiveTab,
  setSelectedPlatform,
}: OverviewProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const upcomingPosts = posts
    .filter((p) => p.status === 'scheduled' || p.status === 'ready')
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="bg-[#A3E635] border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase text-black bg-white inline-block px-2 py-0.5 border border-black mb-1.5">
              ⚡ KENDALI SOSMED TANPA RIBET
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-black tracking-tight uppercase font-mono">
              Dashboard Konten & Vault Akun
            </h1>
            <p className="text-xs sm:text-sm font-medium text-neutral-800 mt-1 max-w-2xl font-mono">
              Kelola semua akun sosial media, username, password, dan jadwal posting harian secara mandiri. Buka kredensial akun, salin naskah, dan langsung unggah ke sosmed target Anda.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('vault')}
              className="flex items-center gap-1.5 px-4 py-2 bg-white text-black hover:bg-[#DCFCE7] font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Buka Vault Akun</span>
            </button>
            <button
              onClick={onOpenCreatePost}
              className="flex items-center gap-1.5 px-4 py-2 bg-black text-white hover:bg-neutral-800 font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#fff] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Plus className="w-3.5 h-3.5 text-[#A3E635]" />
              <span>+ Buat Jadwal Konten</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clean Brutalist KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between text-neutral-600 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Akun Sosmed Tersimpan</span>
            <Users className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono tabular-nums text-black">
            {accounts.length}
            <span className="text-xs font-normal text-neutral-500 ml-1.5 font-sans">akun aktif</span>
          </div>
          <div className="mt-2 text-xs font-medium text-neutral-600 flex items-center justify-between border-t border-black/10 pt-2 font-mono">
            <span>6 Platform Populer</span>
            <button
              onClick={() => setActiveTab('vault')}
              className="text-black font-bold hover:underline flex items-center"
            >
              Lihat Vault <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between text-neutral-600 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Total Audiens</span>
            <Users className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono tabular-nums text-black">
            {totalFollowers.toLocaleString('id-ID')}
            <span className="text-xs font-normal text-neutral-500 ml-1.5 font-sans">followers</span>
          </div>
          <div className="mt-2 text-xs font-medium text-neutral-600 flex items-center justify-between border-t border-black/10 pt-2 font-mono">
            <span>Akumulasi Semua Akun</span>
            <span className="text-emerald-700 font-bold">Terhubung</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#DCFCE7] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between text-neutral-700 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Siap Tayang</span>
            <Clock className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono tabular-nums text-black">
            {scheduledCount}
            <span className="text-xs font-normal text-neutral-600 ml-1.5 font-sans">konten antre</span>
          </div>
          <div className="mt-2 text-xs font-medium text-neutral-700 flex items-center justify-between border-t border-black/20 pt-2 font-mono">
            <span>Termasuk hari ini & besok</span>
            <button
              onClick={() => setActiveTab('content')}
              className="text-black font-bold hover:underline flex items-center"
            >
              Jadwal <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
          <div className="flex items-center justify-between text-neutral-600 mb-2">
            <span className="text-xs font-mono font-bold uppercase">Total Naskah Tersimpan</span>
            <Calendar className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-black font-mono tabular-nums text-black">
            {posts.length}
            <span className="text-xs font-normal text-neutral-500 ml-1.5 font-sans">postingan</span>
          </div>
          <div className="mt-2 text-xs font-medium text-neutral-600 flex items-center justify-between border-t border-black/10 pt-2 font-mono">
            <span>Draft & Terpublikasi</span>
            <button
              onClick={onOpenCreatePost}
              className="text-black font-bold hover:underline flex items-center"
            >
              + Buat <Plus className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Section: Content Ready To Post & Account Vault Quick Peek */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Antrean Konten Siap Tayang */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-black">
                Antrean Konten Siap Tayang
              </h2>
              <p className="text-xs text-neutral-600 font-mono">
                Salin caption dengan 1-klik lalu tempelkan langsung ke aplikasi sosial media.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('content')}
              className="text-xs font-mono font-bold text-black hover:underline uppercase"
            >
              Semua Jadwal ({posts.length})
            </button>
          </div>

          <div className="space-y-3">
            {upcomingPosts.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-neutral-300 space-y-2">
                <p className="text-xs font-mono text-neutral-600">Belum ada konten di antrean siap tayang.</p>
                <button
                  onClick={onOpenCreatePost}
                  className="px-3 py-1.5 bg-[#A3E635] text-black font-mono font-bold text-xs uppercase border border-black shadow-[2px_2px_0px_#000]"
                >
                  + Tambahkan Konten Baru
                </button>
              </div>
            ) : (
              upcomingPosts.map((post) => {
                const copyText = `${post.title}\n\n${post.caption}\n\n${post.linkUrl ? 'Link: ' + post.linkUrl : ''}`;

                return (
                  <div
                    key={post.id}
                    className="p-3.5 border-2 border-black bg-[#FAFBF8] hover:bg-white transition-colors space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold px-2 py-0.5 bg-black text-white text-[10px] uppercase">
                          {post.scheduledDate} · {post.scheduledTime}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 uppercase border border-black ${
                          post.status === 'ready' ? 'bg-[#A3E635]' : 'bg-[#FEF08A]'
                        }`}>
                          {post.status === 'ready' ? 'Siap Tayang' : 'Terjadwal'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        {post.platforms.map((p) => (
                          <span
                            key={p}
                            className="text-[9px] font-bold px-1.5 py-0.2 uppercase border border-black bg-white"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-mono font-bold text-sm text-black">
                      {post.title}
                    </h3>

                    <p className="text-xs text-neutral-700 bg-white p-2.5 border border-black/30 font-mono line-clamp-3 whitespace-pre-line">
                      {post.caption}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <div className="text-[11px] font-mono text-neutral-500">
                        {post.platforms.length} Platform Target
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopy(`post_${post.id}`, copyText)}
                          className="flex items-center gap-1 px-3 py-1 text-xs font-mono font-bold border border-black bg-[#A3E635] hover:bg-[#86EFAC]"
                        >
                          {copiedKey === `post_${post.id}` ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-black" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Salin Naskah</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column (5 cols): Akun Sosmed & Akses Login Cepat */}
        <div className="lg:col-span-5 bg-white border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div>
              <h2 className="text-base font-black uppercase font-mono text-black">
                Vault Kredensial Cepat
              </h2>
              <p className="text-xs text-neutral-600 font-mono">
                Akses username dan login instan.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('vault')}
              className="text-xs font-mono font-bold text-black hover:underline uppercase"
            >
              Semua Akun ({accounts.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {accounts.slice(0, 5).map((acc) => {
              const cfg = PLATFORM_CONFIGS[acc.platform];
              return (
                <div
                  key={acc.id}
                  className="p-3 border-2 border-black bg-[#FAFBF8] flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="space-y-0.5 truncate">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black uppercase bg-black text-white px-1">
                        {cfg.label}
                      </span>
                      <strong className="text-black truncate">{acc.name}</strong>
                    </div>
                    <div className="text-neutral-600 text-[11px] truncate">
                      {acc.loginEmailOrUsername}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopy(`q_${acc.id}`, acc.loginPassword)}
                      title="Salin Password Akun"
                      className="px-2 py-1 bg-white hover:bg-[#DCFCE7] border border-black font-bold text-[10px] uppercase flex items-center gap-1"
                    >
                      {copiedKey === `q_${acc.id}` ? (
                        <Check className="w-3 h-3 text-emerald-700" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Password</span>
                    </button>

                    <a
                      href={cfg.loginUrl}
                      target="_blank"
                      rel="noreferrer"
                      title="Buka Halaman Login"
                      className="p-1 bg-white hover:bg-neutral-100 border border-black text-black"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setActiveTab('vault')}
            className="w-full py-2 bg-[#DCFCE7] hover:bg-[#A3E635] text-black font-mono font-bold text-xs uppercase border border-black text-center"
          >
            + Kelola Semua Akun & Password di Vault →
          </button>
        </div>
      </div>
    </div>
  );
}
