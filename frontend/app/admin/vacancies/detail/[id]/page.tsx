"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { api } from "@/lib/api";
import { Building2, MapPin, Users } from "lucide-react";

const fetchVacancyDetail = async (id: string) => {
  const res = await api.get(`/vacancies/${id}`);
  return res.data.data;
};

export default function VacancyDetailPage() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["vacancy-detail", id],
    queryFn: () => fetchVacancyDetail(id),
    enabled: !!id,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;
  if (!data) return <p className="p-6">Data tidak ditemukan</p>;

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <section className="lg:col-span-2">
            <div className="mb-8 flex gap-4">
              <div className="h-14 w-14 overflow-hidden rounded bg-gray-100">
                <Image
                  src="/logo_detail.png"
                  alt="Company Logo"
                  width={96}
                  height={96}
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold">{data.title}</h1>
                <span>Sektor Bisnis: Technology</span>
                <div className="mt-1 flex items-center gap-3 text-sm text-gray-600">
                  <span className="inline-flex items-center gap-1">
                    <Building2 size={16} className="text-gray-500" />
                    Dicoding Indonesia
                  </span>

                  <span>·</span>

                  <span className="inline-flex items-center gap-1">
                    <MapPin size={16} className="text-gray-500" />
                    Jakarta
                  </span>

                  <span>·</span>

                  <span className="inline-flex items-center gap-1">
                    <Users size={16} className="text-gray-500" />
                    50–100 Karyawan
                  </span>
                </div>

                <span className="mt-3 inline-block rounded-full border border-blue-300 px-3 py-1 text-xs text-blue-600">
                  {data.job_type}
                </span>
              </div>
            </div>

            <div className="space-y-8 text-sm leading-relaxed">
              <section>
                <div
                  className="
                              prose prose-sm max-w-none
                              [&_h2]:text-lg
                              [&_h2]:font-semibold
                              [&_h2]:mt-6
                              [&_h2]:mb-2
                              [&_p]:mb-3
                              [&_ul]:list-disc
                              [&_ul]:pl-6
                              [&_li]:mb-1
                            "
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </section>
            </div>

            <div className="mt-10 border-t pt-6">
              <h3 className="mb-4 font-semibold">Informasi Tambahan</h3>

              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <p className="text-gray-500">Pengalaman bekerja</p>
                  <p>{data.min_experience}</p>
                </div>

                <div>
                  <p className="text-gray-500">Kandidat yang dibutuhkan</p>
                  <p>{data.quota} kandidat</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-4 text-sm mt-3">
                <div>
                  <p className="text-gray-500">Gaji</p>

                  {!data.is_show_salary ? (
                    <p className="italic text-gray-400">Gaji disembunyikan</p>
                  ) : data.min_salary && data.max_salary ? (
                    <p>
                      Rp {Number(data.min_salary).toLocaleString()} – Rp{" "}
                      {Number(data.max_salary).toLocaleString()}
                    </p>
                  ) : (
                    <p className="text-gray-400">Tidak dicantumkan</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-500">Lokasi</p>
                  <p>{data.location}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
