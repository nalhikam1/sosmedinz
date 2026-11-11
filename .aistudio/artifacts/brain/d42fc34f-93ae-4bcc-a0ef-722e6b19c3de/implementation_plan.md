# Penyederhanaan CuanStack: Dashboard Konten, Jadwal, & Vault Akun/Password Sosmed

Rencana restrukturisasi menyeluruh untuk mengubah aplikasi menjadi sistem pengelola media sosial yang ramping, realistis, dan fokus pada kebutuhan esensial: **1) Dashboard Ringkasan Konten**, **2) Jadwal & Manajemen Konten**, serta **3) Vault Akun & Password Sosmed** dengan fitur sembunyi/intip (*show/hide*) dan salin cepat (*one-click copy*). Seluruh fitur AI dan fitur sampingan yang tumpang tindih dihapus sepenuhnya.

---

## User Review & Keputusan Terkonfirmasi

> [!IMPORTANT]
> **Keputusan Berdasarkan Jawaban Pengguna:**
> 1. **Penyimpanan Kredensial:** Password dan username akun sosmed disimpan secara terorganisir di vault lokal dengan mode tersembunyi (`••••••••`), dilengkapi tombol intip (*toggle visibility*) dan tombol salin cepat (*one-click copy*).
> 2. **Struktur Navigasi:** Disederhanakan menjadi tepat **3 Menu Utama**:
>    - **Dashboard Ringkasan**: Status akun, jadwal tayang hari ini/terdekat, statistik postingan.
>    - **Jadwal & Konten**: Kalender & antrean postingan per platform (Facebook, Instagram, TikTok, YouTube, Threads, X) tanpa kerumitan format matrix berlebih.
>    - **Vault Akun & Password**: Daftar akun semua sosmed lengkap dengan email/username, password, link langsung ke sosmed, dan status akun.
> 3. **Pembersihan Fitur Tumpang Tindih:** Menghapus fitur AI generator, katalog hook AI, dan kalkulator rate card yang rumit, sehingga aplikasi menjadi cepat, ringan, dan zero bug.

---

## 1. Overview & Core Concept

- **Apa yang Dibangun:** Pengelola sosial media personal & multi-akun yang praktis untuk mencatat kredensial login akun (username & password), menyusun ide konten, serta memantau jadwal publikasi di satu tempat.
- **Target Pengguna:** Konten kreator, pengelola akun media sosial, pemilik bisnis/UMKM yang memiliki banyak akun di TikTok, IG, YouTube, Facebook, Threads, dan X.
- **Nilai Utama:** Kemudahan beralih dan mengelola login banyak akun sosmed tanpa lupa password, serta jadwal konten harian yang mudah dibuat dan diceklis saat sudah diposting.

---

## 2. User Experience & Visual Design

### A. Alur Pengguna (User Flows)
1. **Navigasi Header Ramping:** Top bar hanya memuat Brand Wordmark, 3 menu navigasi (`Ringkasan`, `Jadwal Konten`, `Vault Akun & Password`), dan 1 tombol aksi utama `+ Tambah Konten / Akun`.
2. **Tab 1: Dashboard Ringkasan (Realistis & Bersih)**
   - 4 Kartu KPI Utama: Total Akun Tersimpan, Konten Tayang Hari Ini, Konten Terjadwal Minggu Ini, dan Total Postingan.
   - Daftar **Konten Siap Tayang Hari Ini**: Menampilkan waktu posting, akun target, dan naskah dengan tombol salin cepat.
   - Quick Links ke akun sosmed favorit.
3. **Tab 2: Jadwal & Konten Organizer**
   - Tampilan antrean konten (Draft, Siap Tayang, Terjadwal, Selesai Diposting).
   - Form pembuatan konten sederhana: Judul, Isi Teks/Caption, Platform Target (FB, IG, TikTok, YT, Threads, X), Akun Penayang, Tanggal & Jam.
   - Filter cepat berdasarkan platform atau akun.
4. **Tab 3: Vault Akun & Password Sosmed**
   - Tabel/Kartu Akun Sosmed: Platform (FB, IG, TikTok, YT, Threads, X), Nama Akun, Email/Username, Password (default tersembunyi), Link Profil/Login, dan Catatan.
   - Tombol interaktif: **Intip Password** (mata terbuka/tertutup) dan **Salin Username / Password** instan ke clipboard.
   - Modal tambah/edit akun & password baru secara mandiri.
   - Opsi ekspor/impor data cadangan (JSON) agar data akun tetap aman dan bisa dipindahkan antar browser.

### B. Identitas Visual & Tema
- **Gaya Desain:** Neo-Brutalism Hijau Muda (*Light Green Brutalism*).
- **Palet Warna:**
  - Aksen Utama: Hijau Muda / Mint Segar (`#A3E635` dan `#86EFAC`).
  - Latar Belakang: Off-White Bersih (`#F4F7F2` dan `#FFFFFF`).
  - Garis Batas & Kontras: Border hitam tegas (`border-2 border-black` & `border-[3px] border-black`) dengan bayangan solid (`shadow-[3px_3px_0px_#000]`).
- **Disiplin Desain:** Tidak ada pill badge berantakan, metadata bersih dengan pemisah titik (`·`), angka tabular numerik jelas (`tabular-nums`), dan label tombol lugas (*Salin*, *Lihat*, *Edit*, *Hapus*).

---

## 3. Keputusan Teknis & Eliminasi Fitur

| Fitur Lama | Status | Alasan |
| :--- | :--- | :--- |
| **AI Content Generator** | **Dihapus** | Menghilangkan kompleksitas eksternal & prompt rumit sesuai permintaan pengguna. |
| **Katalog Hook Psikologis** | **Dihapus** | Fitur sampingan yang membuat navigasi penuh dan tumpang tindih. |
| **Kalkulator Rate Card & Proposal** | **Dihapus** | Terlalu spesifik untuk agensi dan membuat dashboard tidak realistis. |
| **Multi-Platform Repurposing Matrix** | **Disederhanakan** | Diganti menjadi form konten universal dengan opsi tag platform yang jelas dan bersih. |
| **Vault Password Sosmed** | **Baru Ditambahkan** | Fitur esensial untuk menyimpan kredensial multi-akun secara rapi dan aman. |

---

## 4. Arsitektur Teknis & Komponen

```
┌───────────────────────────────────────────────────────────────┐
│               Navbar (Ringkasan · Jadwal · Vault)             │
└──────────────────────────────┬────────────────────────────────┘
                               │
       ┌───────────────────────┼────────────────────────┐
       ▼                       ▼                        ▼
┌──────────────┐     ┌───────────────────┐    ┌──────────────────┐
│  Dashboard   │     │  Jadwal & Konten  │    │ Vault Akun & PW  │
│  Ringkasan   │     │  (Filter/Status/  │    │ (Show/Hide PW,   │
│ (KPI & Today)│     │   Tambah Post)    │    │  Copy, Manage)   │
└──────────────┘     └───────────────────┘    └──────────────────┘
       ▲                       ▲                        ▲
       └───────────────────────┴────────────────────────┘
                               │
               ┌───────────────┴───────────────┐
               │    Local Storage Store        │
               │ (Accounts + Credentials +     │
               │  Posts Schedule + Backup)     │
               └───────────────────────────────┘
```

- **Penyimpanan:** Browser LocalStorage yang independen tanpa backend database berbayar, kompatibel 100% untuk deploy instan ke Vercel dan GitHub.
- **Framework:** Next.js 15+ App Router, TypeScript murni, Tailwind CSS v4, Lucide Icons.
