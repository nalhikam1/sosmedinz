'use client';

import React, { useState } from 'react';
import { 
  KeyRound, 
  Eye, 
  EyeOff, 
  Copy, 
  Check, 
  Plus, 
  Search, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { SocialAccount, SocialPlatform } from '@/types';
import { PLATFORM_CONFIGS } from '@/lib/initial-data';

interface PasswordVaultProps {
  accounts: SocialAccount[];
  selectedPlatform: SocialPlatform | 'all';
  setSelectedPlatform: (p: SocialPlatform | 'all') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onAddAccount: (acc: Omit<SocialAccount, 'id' | 'updatedAt'>) => void;
  onUpdateAccount: (id: string, updates: Partial<SocialAccount>) => void;
  onDeleteAccount: (id: string) => void;
}

export function PasswordVault({
  accounts,
  selectedPlatform,
  setSelectedPlatform,
  searchQuery,
  setSearchQuery,
  onAddAccount,
  onUpdateAccount,
  onDeleteAccount,
}: PasswordVaultProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<SocialAccount | null>(null);

  // Form State
  const [platform, setPlatform] = useState<SocialPlatform>('tiktok');
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [loginEmailOrUsername, setLoginEmailOrUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [followers, setFollowers] = useState<number>(1000);
  const [status, setStatus] = useState<SocialAccount['status']>('active');
  const [notes, setNotes] = useState('');

  const togglePasswordVisibility = (id: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openAddModal = () => {
    setEditingAccount(null);
    setPlatform(selectedPlatform === 'all' ? 'tiktok' : selectedPlatform);
    setName('');
    setHandle('@');
    setLoginEmailOrUsername('');
    setLoginPassword('');
    setProfileUrl('');
    setFollowers(1000);
    setStatus('active');
    setNotes('');
    setIsModalOpen(true);
  };

  const openEditModal = (acc: SocialAccount) => {
    setEditingAccount(acc);
    setPlatform(acc.platform);
    setName(acc.name);
    setHandle(acc.handle);
    setLoginEmailOrUsername(acc.loginEmailOrUsername);
    setLoginPassword(acc.loginPassword);
    setProfileUrl(acc.profileUrl || '');
    setFollowers(acc.followers);
    setStatus(acc.status);
    setNotes(acc.notes || '');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !loginEmailOrUsername.trim() || !loginPassword.trim()) {
      alert('Nama akun, email/username, dan password wajib diisi.');
      return;
    }

    if (editingAccount) {
      onUpdateAccount(editingAccount.id, {
        platform,
        name,
        handle,
        loginEmailOrUsername,
        loginPassword,
        profileUrl,
        followers: Number(followers) || 0,
        status,
        notes,
      });
    } else {
      onAddAccount({
        platform,
        name,
        handle,
        loginEmailOrUsername,
        loginPassword,
        profileUrl,
        followers: Number(followers) || 0,
        status,
        notes,
      });
    }

    setIsModalOpen(false);
  };

  // Filtered accounts
  const filtered = accounts.filter((acc) => {
    const matchPlat = selectedPlatform === 'all' || acc.platform === selectedPlatform;
    const matchSearch =
      acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.loginEmailOrUsername.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (acc.notes || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchPlat && matchSearch;
  });

  const platforms: (SocialPlatform | 'all')[] = [
    'all',
    'tiktok',
    'instagram',
    'youtube',
    'facebook',
    'threads',
    'x',
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#A3E635] border-[3px] border-black p-5 sm:p-6 shadow-[5px_5px_0px_#000]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono font-bold uppercase text-black bg-white inline-block px-2 py-0.5 border border-black mb-1.5">
              🔒 PENYIMPAN KREDENSIAL SOSIAL MEDIA
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black font-mono">
              Vault Akun & Password Sosmed
            </h1>
            <p className="text-xs sm:text-sm font-medium text-neutral-800 mt-1 max-w-2xl">
              Simpan semua username, email, dan kata sandi akun sosmed Anda dengan aman. Tampil tersembunyi secara default, dilengkapi tombol intip serta salin cepat 1-klik untuk login tanpa ribet.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-black text-[#A3E635] hover:bg-neutral-800 font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_#fff] active:translate-x-[1px] active:translate-y-[1px] whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Tambah Akun Baru</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_#000] space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {platforms.map((p) => {
              const label = p === 'all' ? 'Semua Platform' : PLATFORM_CONFIGS[p].label;
              const isSelected = selectedPlatform === p;
              const count = p === 'all' ? accounts.length : accounts.filter((a) => a.platform === p).length;

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

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari akun, handle, email..."
              className="w-full pl-8 pr-3 py-1.5 text-xs font-mono border-2 border-black bg-white focus:outline-none focus:bg-[#F0FDF4]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-neutral-600 pt-2 border-t border-black/10">
          <div>
            Menampilkan: <strong className="text-black">{filtered.length} dari {accounts.length} Akun Tersimpan</strong>
          </div>
          <div className="text-[11px] text-neutral-500">
            * Data tersimpan aman di penyimpanan lokal peramban Anda.
          </div>
        </div>
      </div>

      {/* Accounts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-full bg-white border-2 border-black p-8 text-center space-y-3">
            <p className="text-sm font-mono text-neutral-600">Tidak ada akun yang sesuai pencarian.</p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-[#A3E635] text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_#000]"
            >
              + Tambahkan Akun Pertama
            </button>
          </div>
        ) : (
          filtered.map((acc) => {
            const cfg = PLATFORM_CONFIGS[acc.platform];
            const isPasswordShown = !!visiblePasswords[acc.id];

            return (
              <div
                key={acc.id}
                className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] flex flex-col justify-between hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                {/* Header */}
                <div className="p-3 bg-[#FAFBF8] border-b-2 border-black flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[10px] font-mono font-black uppercase bg-black text-white">
                      {cfg.label}
                    </span>
                    <span className="font-mono font-bold text-xs text-black truncate max-w-[140px]">
                      {acc.handle}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEditModal(acc)}
                      title="Edit Akun & Password"
                      className="p-1 bg-white hover:bg-neutral-100 border border-black text-black"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Hapus akun ${acc.name} dari vault?`)) {
                          onDeleteAccount(acc.id);
                        }
                      }}
                      title="Hapus Akun"
                      className="p-1 bg-white hover:bg-red-50 border border-black text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Account Details */}
                <div className="p-4 space-y-3 flex-1">
                  <div>
                    <h3 className="font-mono font-black text-base text-black leading-tight">
                      {acc.name}
                    </h3>
                    <div className="text-[11px] font-mono text-neutral-600 mt-0.5">
                      Followers: <strong className="text-black tabular-nums">{acc.followers.toLocaleString('id-ID')}</strong>
                    </div>
                  </div>

                  {/* Username / Email Row */}
                  <div className="p-2.5 bg-[#FAFBF8] border-2 border-black space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-neutral-500">
                      <span>Email / Username Login:</span>
                      <button
                        onClick={() => handleCopy(`user_${acc.id}`, acc.loginEmailOrUsername)}
                        className="text-black hover:underline flex items-center gap-1 font-bold"
                      >
                        {copiedId === `user_${acc.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-700" />
                            <span className="text-emerald-700">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="font-mono text-xs font-bold text-black break-all select-all">
                      {acc.loginEmailOrUsername}
                    </div>
                  </div>

                  {/* Password Row with Show/Hide & Copy */}
                  <div className="p-2.5 bg-[#DCFCE7] border-2 border-black space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase text-neutral-700">
                      <span>Password Akun:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => togglePasswordVisibility(acc.id)}
                          className="text-neutral-800 hover:text-black flex items-center gap-0.5 font-bold"
                          title={isPasswordShown ? 'Sembunyikan Password' : 'Lihat Password'}
                        >
                          {isPasswordShown ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Tutup</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Intip</span>
                            </>
                          )}
                        </button>
                        <span>·</span>
                        <button
                          onClick={() => handleCopy(`pass_${acc.id}`, acc.loginPassword)}
                          className="text-black hover:underline flex items-center gap-1 font-bold"
                        >
                          {copiedId === `pass_${acc.id}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-700" />
                              <span className="text-emerald-700">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="font-mono text-xs font-bold text-black tracking-wider select-all">
                      {isPasswordShown ? acc.loginPassword : '••••••••••••'}
                    </div>
                  </div>

                  {acc.notes && (
                    <p className="text-[11px] text-neutral-600 bg-white p-2 border border-dashed border-neutral-300 font-mono italic">
                      &ldquo;{acc.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Footer Quick Links */}
                <div className="p-3 bg-[#FAFBF8] border-t-2 border-black flex items-center justify-between text-xs font-mono">
                  <a
                    href={cfg.loginUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-black hover:underline flex items-center gap-1"
                  >
                    <span>Buka Halaman Login</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  {acc.profileUrl && (
                    <a
                      href={acc.profileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-neutral-600 hover:text-black flex items-center gap-1"
                    >
                      <span>Profil</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Account Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-[3px] border-black p-5 sm:p-6 max-w-lg w-full shadow-[6px_6px_0px_#000] my-8 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h2 className="text-lg font-black uppercase font-mono text-black">
                {editingAccount ? 'Edit Akun & Password' : 'Simpan Akun & Password Baru'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 bg-black text-white font-mono font-bold flex items-center justify-center hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 font-mono">
              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Platform Media Sosial *
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as SocialPlatform)}
                  className="w-full p-2 text-xs border-2 border-black bg-white focus:outline-none"
                >
                  <option value="tiktok">TikTok</option>
                  <option value="instagram">Instagram</option>
                  <option value="youtube">YouTube</option>
                  <option value="facebook">Facebook</option>
                  <option value="threads">Threads</option>
                  <option value="x">X (Twitter)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Nama Akun / Brand *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Gadget Cuan Official"
                  className="w-full p-2 text-xs border-2 border-black focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Handle / Username Akun *
                  </label>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="@gadgetcuan.id"
                    className="w-full p-2 text-xs border-2 border-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                    Jumlah Followers
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={followers}
                    onChange={(e) => setFollowers(Number(e.target.value))}
                    className="w-full p-2 text-xs border-2 border-black focus:outline-none"
                  />
                </div>
              </div>

              {/* Credentials Section */}
              <div className="p-3 bg-[#DCFCE7] border-2 border-black space-y-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-black mb-1">
                    Email / Username untuk Login *
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmailOrUsername}
                    onChange={(e) => setLoginEmailOrUsername(e.target.value)}
                    placeholder="email@anda.com atau username login"
                    className="w-full p-2 text-xs border-2 border-black bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-black mb-1">
                    Password / Kata Sandi Akun *
                  </label>
                  <input
                    type="text"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Ketik password akun sosmed..."
                    className="w-full p-2 text-xs border-2 border-black bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Link Profil Sosmed (Opsional)
                </label>
                <input
                  type="url"
                  value={profileUrl}
                  onChange={(e) => setProfileUrl(e.target.value)}
                  placeholder="https://instagram.com/akunanda"
                  className="w-full p-2 text-xs border-2 border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-neutral-700 mb-1">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Catatan 2FA, nomor pemulihan, atau jadwal upload..."
                  className="w-full p-2 text-xs border-2 border-black focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-black/20 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold uppercase border-2 border-black bg-white hover:bg-neutral-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase border-2 border-black bg-[#A3E635] hover:bg-[#86EFAC] shadow-[2px_2px_0px_#000]"
                >
                  {editingAccount ? 'Simpan Perubahan' : 'Simpan Akun ke Vault'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
