# 🚀 Panduan Deploy HaloCall ke Railway

## Yang kamu butuhkan
- Akun GitHub (gratis) → https://github.com
- Akun Railway (gratis) → https://railway.app

---

## Langkah 1 — Upload ke GitHub

1. Buka https://github.com → klik **"New repository"**
2. Nama repo: `halocall` → klik **"Create repository"**
3. Di halaman repo baru, klik **"uploading an existing file"**
4. Upload seluruh isi folder `halocall` ini (drag & drop semua file + folder)
5. Klik **"Commit changes"**

---

## Langkah 2 — Deploy ke Railway

1. Buka https://railway.app → klik **"Login"** → login dengan GitHub
2. Klik **"New Project"**
3. Pilih **"Deploy from GitHub repo"**
4. Pilih repo `halocall` yang baru kamu buat
5. Railway otomatis mendeteksi Node.js dan mulai deploy
6. Tunggu 1-2 menit sampai status berubah jadi **"Active"**

---

## Langkah 3 — Dapatkan URL publik

1. Klik project di Railway → klik tab **"Settings"**
2. Di bagian **"Networking"**, klik **"Generate Domain"**
3. Kamu akan dapat URL seperti: `halocall-production.up.railway.app`
4. Buka URL itu dari browser → HaloCall siap dipakai! 🎉

---

## Cara pakai

1. Buka URL dari device pertama → klik **"Buat Room Baru"** → masukkan namamu
2. Salin kode 6 huruf yang muncul
3. Bagikan kode ke teman lewat WhatsApp/dll
4. Teman buka URL yang sama → masukkan kode → klik **"Gabung"**
5. Maksimal 4 orang per room

---

## Fitur

- ✅ Video call max 4 orang
- ✅ Share screen (tombol monitor di control bar)
- ✅ Saat share screen, bisa tetap nyalakan/matikan kamera sendiri
- ✅ Mute/unmute mikrofon
- ✅ Kode room 6 karakter, bisa disalin dengan 1 klik
- ✅ Semua koneksi terenkripsi (WebRTC DTLS/SRTP)
- ✅ Server tidak menyimpan video/audio sama sekali

---

## Catatan keamanan

- Video & audio dienkripsi langsung antar browser (WebRTC)
- Server hanya mengatur *siapa terhubung ke siapa* — tidak merekam apapun
- Kode room acak 6 karakter — susah ditebak
- Room otomatis hilang ketika semua orang keluar

---

## Troubleshoot

**Tidak bisa connect antar device?**
→ Coba gunakan koneksi internet berbeda (bukan WiFi yang sama) untuk test
→ WebRTC butuh STUN server — sudah include Google STUN (gratis)

**Kamera/mic tidak muncul?**
→ Pastikan browser mengizinkan akses kamera & mikrofon
→ Gunakan Chrome atau Firefox terbaru

**Railway gratis sampai berapa?**
→ Railway memberikan $5 credit gratis per bulan
→ Untuk pemakaian ringan (teman-teman) cukup gratis selamanya
