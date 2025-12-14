"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import JobDescriptionEditor from "@/components/JobDescriptionEditor";
import { api } from "@/lib/api";

type Position = {
  id: number;
  name: string;
};

type FormData = {
  title: string;
  position_id: string;
  job_type: string;
  quota: string;
  active_until: string;
  location: string;
  is_remote: boolean;
  description: string;
  min_salary: number | null;
  max_salary: number | null;
  is_show_salary: boolean;
  min_experience: string;
};

export default function EditVacancyPage() {
  const router = useRouter();
  const params = useParams();
  const vacancyId = params.id as string;

  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<FormData>({
    title: "",
    position_id: "",
    job_type: "",
    quota: "",
    active_until: "",
    location: "",
    is_remote: false,
    description: "",
    min_salary: null,
    max_salary: null,
    is_show_salary: true,
    min_experience: "",
  });

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

  useEffect(() => {
    const loadVacancy = async () => {
      try {
        setLoadingData(true);
        const res = await api.get(`/vacancies/${vacancyId}`);
        const vacancy = res.data.data;

        console.log("Data vacancy:", vacancy);

        let formattedDate = "";
        if (vacancy.active_until) {
          const dateStr = vacancy.active_until;
          const months: { [key: string]: string } = {
            Jan: "01",
            Feb: "02",
            Mar: "03",
            Apr: "04",
            May: "05",
            Jun: "06",
            Jul: "07",
            Aug: "08",
            Sep: "09",
            Oct: "10",
            Nov: "11",
            Dec: "12",
          };

          const parts = dateStr.split(" ");
          if (parts.length === 3) {
            const day = parts[0].padStart(2, "0");
            const month = months[parts[1]];
            const year = parts[2];
            formattedDate = `${year}-${month}-${day}`;
          }
        }

        setFormData({
          title: vacancy.title || "",
          position_id: vacancy.position?.id?.toString() || "",
          job_type: vacancy.job_type || "",
          quota: vacancy.quota?.toString() || "",
          active_until: formattedDate,
          location: vacancy.location || "",
          is_remote: vacancy.is_remote || false,
          description: vacancy.description || "",
          min_salary: vacancy.min_salary || null,
          max_salary: vacancy.max_salary || null,
          is_show_salary: vacancy.is_show_salary ?? true,
          min_experience: vacancy.min_experience || "",
        });

        setLoadingData(false);
      } catch (err: any) {
        console.error("Error loading vacancy:", err);
        setError("Gagal memuat data lowongan");
        setLoadingData(false);
      }
    };

    if (vacancyId) {
      loadVacancy();
    }
  }, [vacancyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        title: formData.title,
        position_id: parseInt(formData.position_id),
        job_type: formData.job_type,
        quota: parseInt(formData.quota),
        active_until: formData.active_until,
        location: formData.location,
        is_remote: formData.is_remote,
        description: formData.description,
        min_salary: formData.min_salary || 0,
        max_salary: formData.max_salary || 0,
        is_show_salary: formData.is_show_salary,
        min_experience: formData.min_experience || null,
      };

      console.log("Payload update:", payload);

      const response = await api.put(`/vacancies/${vacancyId}`, payload);

      console.log("Response:", response.data);

      if (response.data.success) {
        alert(response.data.message);
        router.push("/admin/vacancies");
      }
    } catch (err: any) {
      console.error("Error:", err);
      console.error("Error Response:", err.response?.data);

      if (err.response?.data?.errors) {
        const errorMessages = Object.entries(err.response.data.errors)
          .map(([field, messages]) => {
            return `${field}: ${(messages as string[]).join(", ")}`;
          })
          .join("\n");

        setError(errorMessages);
      } else {
        setError(err.response?.data?.message || "Gagal mengupdate lowongan");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Memuat data...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <p className="text-sm text-blue-400 mb-2">Dicoding Jobs</p>
          <h1 className="text-2xl font-bold">Edit lowongan pekerjaan</h1>
          <p className="mt-2 text-sm text-zinc-300 max-w-xl">
            Update informasi lowongan pekerjaan Anda.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-4xl px-6 py-10">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-red-600 text-xl">⚠️</span>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">
                  Gagal Mengupdate Lowongan
                </h3>
                <pre className="text-sm text-red-700 whitespace-pre-wrap">
                  {error}
                </pre>
              </div>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-lg"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Judul lowongan <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Android Mobile Developer"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Posisi <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.position_id}
              onChange={(e) =>
                setFormData({ ...formData, position_id: e.target.value })
              }
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
              required
            >
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
              {[
                { label: "Full Time", value: "full-time" },
                { label: "Part Time", value: "part-time" },
                { label: "Kontrak", value: "contract" },
                { label: "Intern", value: "intern" },
              ].map((type) => (
                <label key={type.value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="job_type"
                    value={type.value}
                    checked={formData.job_type === type.value}
                    onChange={(e) =>
                      setFormData({ ...formData, job_type: e.target.value })
                    }
                    required
                  />
                  {type.label}
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
              value={formData.quota}
              onChange={(e) =>
                setFormData({ ...formData, quota: e.target.value })
              }
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
              required
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Aktif hingga <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.active_until}
              onChange={(e) =>
                setFormData({ ...formData, active_until: e.target.value })
              }
              className="w-full rounded border border-secondary px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Lokasi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Jakarta"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full rounded border border-secondary px-3 py-2 text-sm mb-2"
              required
            />
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={formData.is_remote}
                onChange={(e) =>
                  setFormData({ ...formData, is_remote: e.target.checked })
                }
              />
              Bisa remote
            </label>
          </div>

          <JobDescriptionEditor
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Rentang gaji per bulan <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                className="rounded border border-secondary px-3 py-2 text-sm"
                placeholder="Minimum"
                value={formData.min_salary ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    min_salary:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                required
              />
              <input
                type="number"
                className="rounded border border-secondary px-3 py-2 text-sm"
                placeholder="Maksimum"
                value={formData.max_salary ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    max_salary:
                      e.target.value === "" ? null : Number(e.target.value),
                  })
                }
                required
              />
            </div>

            <label className="mt-3 flex items-center gap-3 cursor-pointer">
              <div
                onClick={() =>
                  setFormData({
                    ...formData,
                    is_show_salary: !formData.is_show_salary,
                  })
                }
                className={`relative w-10 h-6 rounded-full transition-colors
                  ${formData.is_show_salary ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform
                    ${formData.is_show_salary ? "translate-x-4" : ""}`}
                />
              </div>
              <span className="text-sm text-gray-700">Tampilkan gaji</span>
            </label>
            <p className="text-sm text-gray-500 mt-1">
              Gaji akan ditampilkan di lowongan pekerjaan dan dapat dilihat oleh
              kandidat.
            </p>
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
                  <input
                    type="radio"
                    name="experience"
                    value={exp}
                    checked={formData.min_experience === exp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        min_experience: e.target.value,
                      })
                    }
                  />
                  {exp}
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded bg-primary px-4 py-2 text-sm text-white disabled:bg-gray-400"
            >
              {loading ? "Menyimpan..." : "Update lowongan"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded border px-4 py-2 text-sm"
            >
              Batal
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </>
  );
}
