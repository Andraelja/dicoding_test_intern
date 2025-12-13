'use client';
import Link from 'next/link';
import { Vacancy } from '@/lib/api';

export default function JobCard({ job }: { job: Vacancy }) {
  return (
    <Link href={`/${job.id}`} className="block rounded-xl border p-4 hover:shadow">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-600">{job.position}</p>
      <div className="mt-2 flex gap-2 text-xs">
        <span className="rounded bg-gray-100 px-2 py-1">
          {job.employment_type}
        </span>
      </div>
    </Link>
  );
}
