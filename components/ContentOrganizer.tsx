'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  List, 
  Plus, 
  Copy, 
  Check, 
  Edit3, 
  Trash2, 
  Download, 
  ExternalLink,
  Search,
  CheckCircle2
} from 'lucide-react';
import { ContentPost, PostStatus, SocialAccount, SocialPlatform } from '@/types';
import { PLATFORM_CONFIGS } from '@/lib/initial-data';

interface ContentOrganizerProps {
  posts: ContentPost[];
  accounts: SocialAccount[];
  selectedPlatform: SocialPlatform | 'all';
  setSelectedPlatform: (p: SocialPlatform | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCreatePost: (postToEdit?: ContentPost) => void;
  onUpdatePostStatus: (id: string, status: PostStatus) => void;
  onDeletePost: (id: string) => void;
  onExportCsv: () => void;
}

export function ContentOrganizer({
  posts,
  accounts,
  selectedPlatform,
  setSelectedPlatform,
  searchQuery,
  setSearchQuery,
  onOpenCreatePost,
  onUpdatePostStatus,
  onDeletePost,
  onExportCsv,
}: ContentOrganizerProps) {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const platforms: (SocialPlatform | 'all')[] = [
    'all',
    'tiktok',
    'instagram',
    'youtube',
    'facebook',
    'threads',
    'x',
  ];

  const filtered = posts.filter((p) => {
    const matchPlat = selectedPlatform === 'all' || p.platforms.includes(selectedPlatform);
    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;
    const matchSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.caption.toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlat && matchStatus && matchSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner and Toolbar */}
      <div className="bg-white border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase text-neutral-500">
              SOCIAL MEDIA CONTENT SCHEDULE & PLANNER
            </div>
            <h1 className="text-xl sm:text-2xl font-black uppercase font-mono text-black">
              Jadwal & Pengelola Konten
            </h1>
            <p className="text-xs text-neutral-600 font-mono mt-0.5">
              Rencanakan caption, tanggal, dan waktu publikasi konten untuk seluruh akun sosial media Anda secara teratur.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onExportCsv}
              className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>

            <button
              onClick={() => onOpenCreatePost()}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#A3E635] hover:bg-[#86EFAC] text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Buat Konten Baru</span>
            </button>
          </div>
        </div>

        {/* View Switcher and Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-[#F4F7F2] p-1 border-2 border-black">
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-mono font-bold uppercase ${
                viewMode === 'list' ? 'bg-black text-[#A3E635]' : 'text-neutral-700 hover:text-black'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Daftar Antrean</span>
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-1 px-3 py-1 text-xs font-mono font-bold uppercase ${
                viewMode === 'calendar' ? 'bg-black text-[#A3E635]' : 'text-neutral-700 hover:text-black'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Kalender Mingguan</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="p-1.5 border-2 border-black bg-white focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="ready">Siap Tayang</option>
              <option value="scheduled">Terjadwal</option>
              <option value="draft">Draft Ide</option>
              <option value="published">Terpublikasi</option>
            </select>

            <div className="relative min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul, caption..."
                className="w-full pl-8 pr-3 py-1.5 border-2 border-black bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
          {platforms.map((p) => {
            const label = p === 'all' ? 'Semua Platform' : PLATFORM_CONFIGS[p].label;
            const isSelected = selectedPlatform === p;
            const count = p === 'all' ? posts.length : posts.filter((post) => post.platforms.includes(p)).length;

            return (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-3 py-1 text-xs font-mono font-bold uppercase border-2 transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-black text-[#A3E635] border-black shadow-[2px_2px_0px_#000]'
                    : 'bg-[#F4F7F2] text-neutral-800 border-black/70 hover:bg-white'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW 1: LIST / CARDS VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white border-2 border-black p-8 text-center space-y-2">
              <p className="text-xs font-mono text-neutral-600">Tidak ada postingan dalam filter ini.</p>
              <button
                onClick={() => onOpenCreatePost()}
                className="px-4 py-2 bg-[#A3E635] text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]"
              >
                + Tambah Konten Sekarang
              </button>
            </div>
          ) : (
            filtered.map((post) => {
              const copyText = `${post.title}\n\n${post.caption}\n\n${post.linkUrl ? 'Link: ' + post.linkUrl : ''}`;

              return (
                <div
                  key={post.id}
                  className="bg-white border-2 border-black p-4 sm:p-5 shadow-[3px_3px_0px_#000] space-y-3"
                >
                  {/* Top Bar of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/20 pb-2.5 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold px-2 py-0.5 bg-black text-white text-[10px] uppercase">
                        {post.scheduledDate} · {post.scheduledTime} WIB
                      </span>

                      <select
                        value={post.status}
                        onChange={(e) => onUpdatePostStatus(post.id, e.target.value as PostStatus)}
                        className={`text-[10px] font-bold px-1.5 py-0.5 uppercase border border-black focus:outline-none ${
                          post.status === 'ready'
                            ? 'bg-[#A3E635] text-black'
                            : post.status === 'published'
                            ? 'bg-black text-white'
                            : post.status === 'scheduled'
                            ? 'bg-[#FEF08A] text-black'
                            : 'bg-neutral-100 text-neutral-700'
                        }`}
                      >
                        <option value="draft">Draft Ide</option>
                        <option value="ready">Siap Tayang</option>
                        <option value="scheduled">Terjadwal</option>
                        <option value="published">Terpublikasi</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1">
                      {post.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="text-[10px] font-bold uppercase px-2 py-0.5 border border-black bg-[#FAFBF8]"
                        >
                          {PLATFORM_CONFIGS[plat].label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title & Caption */}
                  <div className="space-y-1.5">
                    <h3 className="font-mono font-black text-base text-black">
                      {post.title}
                    </h3>
                    <div className="text-xs text-neutral-800 font-mono bg-[#FAFBF8] p-3 border border-black/30 whitespace-pre-line leading-relaxed">
                      {post.caption}
                    </div>
                    {post.linkUrl && (
                      <div className="text-xs font-mono text-neutral-600 flex items-center gap-1">
                        <strong>Tautan:</strong>
                        <a
                          href={post.linkUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-black underline flex items-center gap-0.5 truncate max-w-sm"
                        >
                          {post.linkUrl} <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-2 border-t border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-[11px] font-mono text-neutral-500">
                      Target Akun: {post.targetAccountIds.length > 0 ? (
                        accounts
                          .filter((a) => post.targetAccountIds.includes(a.id))
                          .map((a) => a.name)
                          .join(', ')
                      ) : 'Semua akun'}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(post.id, copyText)}
                        className="px-3 py-1.5 bg-[#A3E635] hover:bg-[#86EFAC] text-black font-mono font-bold text-xs uppercase border border-black flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                      >
                        {copiedId === post.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-black" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Caption</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onOpenCreatePost(post)}
                        className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-black font-mono font-bold text-xs uppercase border border-black"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Hapus konten ini?')) onDeletePost(post.id);
                        }}
                        className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-600 font-mono font-bold text-xs uppercase border border-black"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* VIEW 2: CALENDAR VIEW */}
      {viewMode === 'calendar' && (
        <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <h3 className="font-mono font-black text-base uppercase text-black">
              Kalender Mingguan
            </h3>
            <span className="text-xs font-mono text-neutral-500">
              {filtered.length} Konten
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].map((day, idx) => {
              const d = new Date();
              d.setDate(d.getDate() + idx);
              const dateStr = d.toISOString().split('T')[0];
              const dayPosts = filtered.filter((p) => p.scheduledDate === dateStr);

              return (
                <div key={day} className="border-2 border-black p-2 min-h-[220px] bg-[#FAFBF8] flex flex-col justify-between">
                  <div>
                    <div className="p-1.5 bg-black text-white text-center font-mono font-bold text-xs uppercase mb-2">
                      {day}
                      <div className="text-[10px] text-neutral-400 font-normal">{dateStr.substring(5)}</div>
                    </div>

                    <div className="space-y-2">
                      {dayPosts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onOpenCreatePost(p)}
                          className="p-1.5 border border-black bg-white cursor-pointer hover:bg-[#FEF08A] text-xs font-mono"
                        >
                          <div className="text-[9px] font-bold text-neutral-500 flex justify-between">
                            <span>{p.scheduledTime}</span>
                            <span className="uppercase">{p.platforms[0]}</span>
                          </div>
                          <div className="font-bold text-black line-clamp-2 mt-0.5">
                            {p.title}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenCreatePost()}
                    className="w-full mt-2 py-1 text-[10px] font-mono font-bold border border-dashed border-black/40 hover:border-black bg-white text-neutral-600 hover:text-black"
                  >
                    + Jadwalkan
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
