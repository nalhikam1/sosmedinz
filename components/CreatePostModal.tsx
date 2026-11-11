'use client';

import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  Calendar, 
  Clock, 
  Link as LinkIcon 
} from 'lucide-react';
import { ContentPost, PostStatus, SocialPlatform, SocialAccount } from '@/types';
import { PLATFORM_CONFIGS } from '@/lib/initial-data';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePost: (postData: Omit<ContentPost, 'id' | 'createdAt'>, existingId?: string) => void;
  accounts: SocialAccount[];
  postToEdit?: ContentPost | null;
}

function CreatePostModalForm({
  onClose,
  onSavePost,
  accounts,
  postToEdit,
}: Omit<CreatePostModalProps, 'isOpen'>) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const [title, setTitle] = useState(() => postToEdit?.title || '');
  const [caption, setCaption] = useState(() => postToEdit?.caption || '');
  const [status, setStatus] = useState<PostStatus>(() => postToEdit?.status || 'ready');
  const [scheduledDate, setScheduledDate] = useState(() => postToEdit?.scheduledDate || defaultDate);
  const [scheduledTime, setScheduledTime] = useState(() => postToEdit?.scheduledTime || '19:00');
  const [linkUrl, setLinkUrl] = useState(() => postToEdit?.linkUrl || '');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(
    () => postToEdit?.platforms || ['tiktok', 'instagram', 'facebook']
  );
  const [targetAccountIds, setTargetAccountIds] = useState<string[]>(
    () => postToEdit?.targetAccountIds || (accounts[0] ? [accounts[0].id] : [])
  );

  const togglePlatform = (p: SocialPlatform) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((item) => item !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const toggleAccount = (id: string) => {
    if (targetAccountIds.includes(id)) {
      setTargetAccountIds(targetAccountIds.filter((item) => item !== id));
    } else {
      setTargetAccountIds([...targetAccountIds, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !caption.trim()) {
      alert('Judul dan naskah caption wajib diisi.');
      return;
    }

    onSavePost(
      {
        title,
        caption,
        platforms: selectedPlatforms,
        targetAccountIds,
        scheduledDate,
        scheduledTime,
        status,
        linkUrl,
      },
      postToEdit ? postToEdit.id : undefined
    );

    onClose();
  };

  return (
    <div className="bg-white border-[3px] border-black p-5 sm:p-6 max-w-2xl w-full shadow-[6px_6px_0px_#000] my-6 max-h-[92vh] overflow-y-auto space-y-4 font-mono">
      {/* Modal Header */}
      <div className="flex items-center justify-between border-b-2 border-black pb-3">
        <div>
          <div className="text-[10px] font-bold uppercase text-neutral-500">
            JADWALKAN KONTEN SOSMED
          </div>
          <h2 className="text-lg font-black uppercase text-black">
            {postToEdit ? 'Edit Postingan Konten' : 'Buat Konten Baru'}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="w-8 h-8 bg-black text-white font-bold flex items-center justify-center hover:bg-neutral-800"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold uppercase text-neutral-700 mb-1">
            Judul Konten / Topik Utama *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Misal: 5 Rekomendasi Gadget Murah Bikin Video Jernih"
            className="w-full p-2 border-2 border-black focus:outline-none"
          />
        </div>

        <div>
          <label className="block font-bold uppercase text-neutral-700 mb-1">
            Isi Naskah / Caption Lengkap *
          </label>
          <textarea
            required
            rows={5}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Ketik naskah video, caption Instagram, tweet thread, atau status Facebook lengkap..."
            className="w-full p-2.5 border-2 border-black focus:outline-none leading-relaxed"
          />
        </div>

        {/* Platform Selection */}
        <div>
          <label className="block font-bold uppercase text-neutral-700 mb-1.5">
            Pilih Platform Target ({selectedPlatforms.length})
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(['tiktok', 'instagram', 'youtube', 'facebook', 'threads', 'x'] as SocialPlatform[]).map((p) => {
              const isSelected = selectedPlatforms.includes(p);
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => togglePlatform(p)}
                  className={`flex items-center gap-1.5 p-2 text-xs font-bold uppercase border-2 text-left transition-all ${
                    isSelected
                      ? 'bg-[#DCFCE7] border-black text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-white border-neutral-300 text-neutral-500'
                  }`}
                >
                  {isSelected ? <CheckSquare className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
                  <span>{PLATFORM_CONFIGS[p].label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Schedule & Status Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#FAFBF8] p-3 border-2 border-black">
          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">
              Status Konten
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PostStatus)}
              className="w-full p-1.5 border-2 border-black bg-white focus:outline-none"
            >
              <option value="ready">Siap Tayang</option>
              <option value="scheduled">Terjadwal</option>
              <option value="draft">Draft Ide</option>
              <option value="published">Terpublikasi</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">
              Tanggal Tayang
            </label>
            <input
              type="date"
              required
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full p-1.5 border-2 border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">
              Jam Tayang (WIB)
            </label>
            <input
              type="time"
              required
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full p-1.5 border-2 border-black focus:outline-none"
            />
          </div>
        </div>

        {/* Accounts Target Selector */}
        {accounts.length > 0 && (
          <div>
            <label className="block font-bold uppercase text-neutral-700 mb-1">
              Akun Penayang dari Vault
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#FAFBF8] border-2 border-black max-h-24 overflow-y-auto">
              {accounts.map((acc) => {
                const isSelected = targetAccountIds.includes(acc.id);
                return (
                  <button
                    type="button"
                    key={acc.id}
                    onClick={() => toggleAccount(acc.id)}
                    className={`flex items-center gap-1 px-2 py-1 border text-[11px] ${
                      isSelected
                        ? 'bg-[#A3E635] border-black text-black font-bold'
                        : 'bg-white border-neutral-300 text-neutral-600'
                    }`}
                  >
                    <span>{acc.name} ({acc.platform})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <label className="block font-bold uppercase text-neutral-700 mb-1">
            Link Tautan / Bio (Opsional)
          </label>
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            className="w-full p-2 border-2 border-black focus:outline-none"
          />
        </div>

        <div className="pt-3 border-t-2 border-black flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-bold uppercase border-2 border-black bg-white hover:bg-neutral-100"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 font-bold uppercase border-2 border-black bg-[#A3E635] hover:bg-[#86EFAC] shadow-[2px_2px_0px_#000]"
          >
            {postToEdit ? 'Simpan Perubahan' : 'Jadwalkan Konten'}
          </button>
        </div>
      </form>
    </div>
  );
}

export function CreatePostModal(props: CreatePostModalProps) {
  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <CreatePostModalForm
        key={props.postToEdit?.id || 'new-modal'}
        onClose={props.onClose}
        onSavePost={props.onSavePost}
        accounts={props.accounts}
        postToEdit={props.postToEdit}
      />
    </div>
  );
}
