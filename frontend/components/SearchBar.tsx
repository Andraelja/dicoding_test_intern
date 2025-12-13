'use client';
import { useState } from 'react';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (q: string) => void;
}) {
  const [q, setQ] = useState('');

  return (
    <div className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Cari lowongan"
        className="w-full rounded-lg border px-3 py-2"
      />
      <button
        onClick={() => onSearch(q)}
        className="rounded-lg bg-black px-4 py-2 text-white"
      >
        Cari
      </button>
    </div>
  );
}
