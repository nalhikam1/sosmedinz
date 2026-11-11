import { SocialAccount, ContentPost, SocialPlatform, PlatformConfig } from '@/types';

export const PLATFORM_CONFIGS: Record<SocialPlatform, PlatformConfig> = {
  tiktok: {
    name: 'TikTok',
    label: 'TikTok',
    color: '#000000',
    loginUrl: 'https://www.tiktok.com/login',
  },
  instagram: {
    name: 'Instagram',
    label: 'Instagram',
    color: '#E1306C',
    loginUrl: 'https://www.instagram.com/accounts/login/',
  },
  youtube: {
    name: 'YouTube',
    label: 'YouTube',
    color: '#FF0000',
    loginUrl: 'https://studio.youtube.com',
  },
  facebook: {
    name: 'Facebook',
    label: 'Facebook',
    color: '#1877F2',
    loginUrl: 'https://www.facebook.com/login',
  },
  threads: {
    name: 'Threads',
    label: 'Threads',
    color: '#000000',
    loginUrl: 'https://www.threads.net/login',
  },
  x: {
    name: 'X (Twitter)',
    label: 'X (Twitter)',
    color: '#000000',
    loginUrl: 'https://x.com/i/flow/login',
  },
};

export const INITIAL_ACCOUNTS: SocialAccount[] = [
  {
    id: 'acc_tt_1',
    platform: 'tiktok',
    name: 'Gadget Cuan Official',
    handle: '@gadgetcuan.id',
    loginEmailOrUsername: 'gadgetcuan.official@gmail.com',
    loginPassword: 'TikTokMaster2026!',
    profileUrl: 'https://www.tiktok.com/@gadgetcuan.id',
    followers: 142500,
    status: 'monetized',
    notes: 'Akun utama review barang elektronik & affiliate.',
    updatedAt: '2026-10-23',
  },
  {
    id: 'acc_ig_1',
    platform: 'instagram',
    name: 'Bisnis & Mindset Studio',
    handle: '@bisnis.mindset',
    loginEmailOrUsername: 'bisnis.mindset.id@gmail.com',
    loginPassword: 'IgMindsetSecure88#',
    profileUrl: 'https://www.instagram.com/bisnis.mindset',
    followers: 89400,
    status: 'monetized',
    notes: 'Fokus konten infografis edukasi dan template digital.',
    updatedAt: '2026-10-22',
  },
  {
    id: 'acc_yt_1',
    platform: 'youtube',
    name: 'Kamus Teknologi ID',
    handle: '@KamusTeknoID',
    loginEmailOrUsername: 'creator.kamustekno@gmail.com',
    loginPassword: 'YtStudioPass990*',
    profileUrl: 'https://www.youtube.com/@KamusTeknoID',
    followers: 45600,
    status: 'monetized',
    notes: 'Jadwal upload video panjang tiap Kamis jam 19:00.',
    updatedAt: '2026-10-21',
  },
  {
    id: 'acc_fb_1',
    platform: 'facebook',
    name: 'Komunitas UMKM Berkembang',
    handle: 'facebook.com/umkm.berkembang',
    loginEmailOrUsername: 'admin.umkm@gmail.com',
    loginPassword: 'FacebookUmkm2026$',
    profileUrl: 'https://www.facebook.com/umkm.berkembang',
    followers: 67300,
    status: 'active',
    notes: 'Halaman fanspage dan grup diskusi seller online.',
    updatedAt: '2026-10-20',
  },
  {
    id: 'acc_threads_1',
    platform: 'threads',
    name: 'Catatan Founder Muda',
    handle: '@catatanfounder',
    loginEmailOrUsername: 'founder.daily@gmail.com',
    loginPassword: 'ThreadsDailyPass123!',
    profileUrl: 'https://www.threads.net/@catatanfounder',
    followers: 28900,
    status: 'active',
    notes: 'Diskusi seputar karir, freelance, dan tips produktivitas.',
    updatedAt: '2026-10-23',
  },
  {
    id: 'acc_x_1',
    platform: 'x',
    name: 'Tech Alpha Hunter',
    handle: '@TechAlphaID',
    loginEmailOrUsername: 'techalpha.id@gmail.com',
    loginPassword: 'XPassAlpha2026#',
    profileUrl: 'https://x.com/TechAlphaID',
    followers: 51200,
    status: 'monetized',
    notes: 'Akun kurasi tips software dan tren teknologi.',
    updatedAt: '2026-10-23',
  },
];

export const INITIAL_POSTS: ContentPost[] = [
  {
    id: 'post_1',
    title: '5 Rekomendasi Gadget Murah untuk Tingkatkan Kualitas Video',
    caption: `Banyak kreator pemula bingung mau mulai dari mana. Sebenarnya dengan modal di bawah 200 ribu, kualitas audio dan pencahayaan video sudah bisa meningkat drastis.

Berikut 5 rekomendasi alatnya:
1. Mic clip-on wireless portable
2. Mini ringlight klip HP
3. Phone stand fleksibel 360 derajat
4. Lensa makro tempel
5. Lampu LED saku dua warna

Simpan postingan ini dan cek link di bio untuk rekomendasi tokonya! 🚀`,
    platforms: ['tiktok', 'instagram', 'facebook'],
    targetAccountIds: ['acc_tt_1', 'acc_ig_1'],
    scheduledDate: '2026-10-24',
    scheduledTime: '08:30',
    status: 'ready',
    linkUrl: 'https://gadgetcuan.id/alat-ngonten',
    createdAt: '2026-10-22',
  },
  {
    id: 'post_2',
    title: 'Cara Mengatur Waktu Jualan Online Sambil Kerja Kantoran',
    caption: `Tips manajemen waktu praktis bagi yang sedang merintis side business:

1. Batching Konten: Siapkan 5 postingan sekaligus di hari Minggu.
2. Atur Jadwal Balas Chat: Batasi di jam makan siang dan setelah jam kantor.
3. Otomatisasi Order: Gunakan format template pesan agar tidak mengetik ulang.

Konsistensi kecil setiap hari akan menghasilkan dampak besar dalam 3 bulan ke depan.`,
    platforms: ['instagram', 'threads', 'facebook', 'x'],
    targetAccountIds: ['acc_ig_1', 'acc_threads_1', 'acc_x_1'],
    scheduledDate: '2026-10-24',
    scheduledTime: '19:00',
    status: 'scheduled',
    createdAt: '2026-10-23',
  },
  {
    id: 'post_3',
    title: 'Tutorial Lengkap Pemula: Setup Akun Sosmed untuk Bisnis',
    caption: `Panduan langkah demi langkah mengubah akun personal menjadi akun bisnis profesional:
- Mengganti bio yang menjelaskan nilai dan solusi
- Menambahkan tombol kontak langsung
- Menata sorotan / pinned post penting
- Menyusun jadwal tayang teratur`,
    platforms: ['youtube', 'facebook'],
    targetAccountIds: ['acc_yt_1', 'acc_fb_1'],
    scheduledDate: '2026-10-25',
    scheduledTime: '12:00',
    status: 'draft',
    createdAt: '2026-10-23',
  },
];
