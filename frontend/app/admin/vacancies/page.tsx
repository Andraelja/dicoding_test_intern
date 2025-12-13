"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

const fetchVacancies = async () => {
  const res = await api.get("/vacancies");
  return res.data.data;
};

const deleteVacancy = async (id: number) => {
  await api.delete(`/vacancies/${id}`);
};

export default function AdminVacanciesPage() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-vacancies"],
    queryFn: fetchVacancies,
  });

  const { mutate } = useMutation({
    mutationFn: deleteVacancy,
    onSuccess: () => refetch(),
  });

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <>
    <Navbar />
    <main className="flex min-h-screen bg-gray-50">
      <aside className="w-64 border-r border-secondary bg-white p-6">
        <h2 className="mb-6 text-lg font-bold">Jobs</h2>

        <div className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-medium">
          <span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 4.10526C7 2.94256 7.89543 2 9 2H15C16.1046 2 17 2.94256 17 4.10526V6.21053H20C21.1046 6.21053 22 7.15308 22 8.31579V19.8947C22 21.0574 21.1046 22 20 22H4C2.89543 22 2 21.0574 2 19.8947V8.31579C2 7.15308 2.89543 6.21053 4 6.21053H7V4.10526ZM15 4.10526V6.21053H9V4.10526H15ZM20 8.31579H4V10.4211H20V8.31579ZM20 12.5263H4V19.8947H20V12.5263Z"
                fill="#18181B"
              />
            </svg>
          </span>
          Lowongan Saya
        </div>
      </aside>

      <section className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold">Lowongan Saya</h1>
          <Link
            href="/admin/vacancies/create"
            className="rounded bg-primary px-4 py-2 text-sm text-white"
          >
            + Buat lowongan
          </Link>
        </div>

        <div className="space-y-4">
          {data.map((job: any) => (
            <div
              key={job.id}
              className="flex gap-4 rounded-lg border border-secondary bg-white p-4"
            >
              <div className="h-12 w-12 rounded bg-primary overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Company Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold">{job.title}</h3>
                <p className="mt-1 text-xs text-gray-500">
                  Dibuat: {job.created_at} · Aktif hingga: {job.active_until}
                </p>

                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/admin/vacancies/${job.id}/edit`}
                    className="flex items-center gap-1 rounded border border-secondary px-3 py-1 text-sm"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.8047 2.19526C11.5444 1.93491 11.1223 1.93491 10.8619 2.19526L2.19526 10.8619C2.07024 10.987 2 11.1565 2 11.3333V13.3333C2 13.7015 2.29848 14 2.66667 14H4.66667C4.84348 14 5.01305 13.9298 5.13807 13.8047L13.8047 5.13807C14.0651 4.87772 14.0651 4.45561 13.8047 4.19526L11.8047 2.19526ZM3.33333 12.6667V11.6095L8.66667 6.27614L9.72386 7.33333L4.39052 12.6667H3.33333ZM10.6667 6.39053L12.3905 4.66667L11.3333 3.60948L9.60948 5.33333L10.6667 6.39053Z"
                        fill="#3F3F46"
                      />
                    </svg>
                    Edit
                  </Link>
                  <button
                    onClick={() => mutate(job.id)}
                    className="flex items-center gap-1 rounded bg-red-100 px-3 py-1 text-sm text-red-600"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3333 2.66667C13.3333 3.03486 13.0348 3.33333 12.6666 3.33333H3.33329C2.9651 3.33333 2.66663 3.03486 2.66663 2.66667C2.66663 2.29848 2.9651 2 3.33329 2H12.6666C13.0348 2 13.3333 2.29848 13.3333 2.66667Z"
                        fill="#BE123C"
                      />
                      <path
                        d="M5.99996 6.66667C6.36815 6.66667 6.66663 6.96514 6.66663 7.33333V11.3333C6.66663 11.7015 6.36815 12 5.99996 12C5.63177 12 5.33329 11.7015 5.33329 11.3333V7.33333C5.33329 6.96514 5.63177 6.66667 5.99996 6.66667Z"
                        fill="#BE123C"
                      />
                      <path
                        d="M8.66663 7.33333C8.66663 6.96514 8.36815 6.66667 7.99996 6.66667C7.63177 6.66667 7.33329 6.96514 7.33329 7.33333V11.3333C7.33329 11.7015 7.63177 12 7.99996 12C8.36815 12 8.66663 11.7015 8.66663 11.3333V7.33333Z"
                        fill="#BE123C"
                      />
                      <path
                        d="M10.6666 7.33333C10.6666 6.96514 10.3682 6.66667 9.99996 6.66667C9.63177 6.66667 9.33329 6.96514 9.33329 7.33333V11.3333C9.33329 11.7015 9.63177 12 9.99996 12C10.3682 12 10.6666 11.7015 10.6666 11.3333V7.33333Z"
                        fill="#BE123C"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2.66663 4.66667C2.66663 4.29848 2.9651 4 3.33329 4H12.6666C13.0348 4 13.3333 4.29848 13.3333 4.66667V14C13.3333 14.3682 13.0348 14.6667 12.6666 14.6667H3.33329C2.9651 14.6667 2.66663 14.3682 2.66663 14V4.66667ZM3.99996 5.33333V13.3333H12V5.33333H3.99996Z"
                        fill="#BE123C"
                      />
                    </svg>
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
    </>
  );
}
