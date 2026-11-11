# CuanStack - Pengelola Sosial Media & Vault Password Multi-Akun

Aplikasi pengelola multi-akun sosial media dan *content organizer* yang disederhanakan, cepat, dan realistis dengan gaya desain **Neo-Brutalism Hijau Muda**. 

Dirancang khusus untuk mengelola akun dan jadwal konten di 6 platform utama: **TikTok, Instagram, YouTube, Facebook, Threads, dan X (Twitter)** secara 100% mandiri tanpa kunci fitur pihak ketiga.

---

## ⚡ 3 Fitur Utama

1. **Dashboard Ringkasan (Realistis & Bersih)**
   - Status jumlah akun tersimpan dan total followers gabungan.
   - Antrean konten siap tayang hari ini dengan tombol **1-Klik Salin Caption**.
   - Akses cepat intip username dan password untuk login instan.

2. **Jadwal & Pengelola Konten**
   - Tampilan **Daftar Antrean** dan **Kalender Mingguan**.
   - Pembuat postingan sederhana: Judul, Naskah Caption, Akun Penayang dari Vault, Tanggal & Jam tayang.
   - Status alur kerja: *Draft Ide → Siap Tayang → Terjadwal → Terpublikasi*.
   - Filter cepat berdasarkan platform dan pencarian kata kunci.

3. **Vault Akun & Password Sosmed**
   - Simpan kredensial semua akun: Platform, Nama Akun, Email/Username Login, dan Password.
   - Mode keamanan visual: Password tersembunyi secara default (`••••••••••••`) dengan tombol **Intip Password** dan **Salin Cepat**.
   - Tautan langsung ke halaman login resmi masing-masing platform sosmed.
   - Fitur **Cadangkan (Export JSON / CSV)** dan **Pulihkan (Import JSON)** data mandiri.

---

## 🚀 Panduan Upload ke GitHub & Deploy ke Vercel

### 1. Upload ke GitHub
```bash
# Inisialisasi git dan tambahkan seluruh kode
git init
git add .
git commit -m "feat: cuanstack social organizer dan vault password"

# Hubungkan ke repository GitHub Anda
git branch -M main
git remote add origin https://github.com/USERNAME/cuanstack-social-organizer.git

# Push ke GitHub
git push -u origin main
```

### 2. Deploy ke Vercel (1-Klik)
1. Buka [vercel.com/new](https://vercel.com/new) dan login dengan akun GitHub Anda.
2. Klik tombol **Import** pada repositori `cuanstack-social-organizer`.
3. Klik **Deploy** (tidak memerlukan konfigurasi database cloud berbayar atau environment variable khusus).
4. Selesai! Website langsung aktif di internet.

---

## 💻 Menjalankan Secara Lokal (Development)

Prasyarat: Node.js 20+

```bash
# 1. Install dependensi
npm install

# 2. Jalankan server dev
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Runtime**: Node.js 20+
- **Styling**: Tailwind CSS v4 (Neo-Brutalisme Hijau Muda)
- **Icons**: Lucide React
- **Penyimpanan**: Browser LocalStorage + JSON/CSV Export & Import
