"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import JobDescriptionEditor from "@/components/JobDescriptionEditor";
import { api } from "@/lib/api";

type Position = {
  id: number;
  name: string;
};

export default function CreateVacancyPage() {
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const loadPositions = async () => {
      try {
        const res = await api.get("/positions");
        setPositions(res.data.data);
      } catch (err) {
        console.error("Gagal ambil posisi:", err);
      }
    };

    loadPositions();
  }, []);

  return (
    <>
      <Navbar />

      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-sm text-blue-400 mb-2">Dicoding Jobs</p>
          <h1 className="text-2xl font-bold">Buat lowongan pekerjaan</h1>
          <p className="mt-2 text-sm text-zinc-300 max-w-xl">
            Dicoding Jobs menghubungkan industri dengan talenta yang tepat. Buat
            lowongan dan temukan kandidat terbaik.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <form className="space-y-6 bg-white p-8 rounded-lg">
          <div>
            <label className="block text-sm font-medium mb-1">
              Judul lowongan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Android Mobile Developer"
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Posisi <span className="text-red-500">*</span>
            </label>
            <select className="w-full rounded border border-secondary px-3 py-2 text-sm">
              <option value="">Pilih posisi yang dicari</option>
              {positions.map((pos) => (
                <option key={pos.id} value={pos.id}>
                  {pos.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Tipe pekerjaan <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 text-sm">
              {["Full Time", "Part Time", "Kontrak"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input type="radio" name="job_type" />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Kandidat yang dibutuhkan <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              placeholder="Masukkan jumlah kandidat"
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Aktif hingga <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" /> Bisa remote
              </label>
            </div>
          </div>

          <JobDescriptionEditor />

          <div>
            <label className="block text-sm font-medium mb-2">
              Rentang gaji per bulan <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Minimum"
                className="rounded border border-secondary px-3 py-2 text-sm"
              />
              <input
                type="number"
                placeholder="Maksimum"
                className="rounded border border-secondary px-3 py-2 text-sm"
              />
            </div>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="checkbox" /> Aktifkan gaji tersembunyi
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum pengalaman bekerja
            </label>
            <div className="space-y-2 text-sm">
              {[
                "Kurang dari 1 tahun",
                "1–3 tahun",
                "4–5 tahun",
                "6–10 tahun",
                "Lebih dari 10 tahun",
              ].map((exp) => (
                <label key={exp} className="flex items-center gap-2">
                  <input type="radio" name="experience" />
                  {exp}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="rounded bg-primary px-4 py-2 text-sm text-white"
            >
              Buat lowongan
            </button>
            <button type="button" className="rounded border px-4 py-2 text-sm">
              Batal
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
