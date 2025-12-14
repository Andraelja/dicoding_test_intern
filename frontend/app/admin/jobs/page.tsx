"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { api } from "@/lib/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Search, MapPin, Briefcase, Building2 } from "lucide-react";

const fetchVacancies = async () => {
  const res = await api.get("/vacancies");
  return res.data.data;
};

export default function JobsPage() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: fetchVacancies,
  });

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-black to-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <p className="mb-3 text-sm text-blue-400">Dicoding Jobs</p>

          <h1 className="flex items-center gap-4 text-3xl font-semibold leading-snug text-white">
            <span>
              Temukan lowongan yang <br />
              cocok untuk kamu
            </span>

            <Image
              src="/foto.png"
              alt="User"
              width={203}
              height={136}
              className="rounded-full object-cover"
            />
          </h1>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <section className="lg:col-span-3">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-end justify-between">
                <h4 className="text-lg font-semibold">
                  Daftar Pekerjaan Terbaru
                </h4>

                <div className="relative w-72">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Pekerjaan apa yang sedang kamu cari?"
                    className="w-full rounded-lg border border-secondary px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                {data.map((job: any) => (
                  <div
                    key={job.id}
                    className="flex gap-4 rounded-xl border border-secondary p-4 transition hover:shadow-sm"
                  >
                    <div className="h-12 w-12 shrink-0 rounded bg-slate-800 flex items-center justify-center text-white text-xs font-semibold">
                      dicoding
                    </div>

                    <div className="flex w-full justify-between gap-6">
                      <div className="min-w-0">
                        <h3 className="truncate font-semibold text-sm">
                          {job.title}
                        </h3>

                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                          <Building2 size={14} className="shrink-0" />
                          <span>Dicoding Indonesia</span>
                          <span className="text-gray-400">·</span>
                          <span className="capitalize">{job.job_type}</span>
                        </div>

                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Briefcase size={12} />
                            {job.min_experience}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0 text-right text-xs text-gray-500">
                        <p>Dibuat pada {job.created_at}</p>
                        <p className="mt-1">Lamar sebelum {job.active_until}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
