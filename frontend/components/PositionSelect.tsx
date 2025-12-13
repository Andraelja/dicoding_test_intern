"use client";

import { useEffect, useState } from "react";

type Position = {
  id: number;
  name: string;
};

export default function PositionSelect() {
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPositions = async () => {
      const res = await fetch("/api/positions");
      const data = await res.json();
      setPositions(data);
      setLoading(false);
    };

    fetchPositions();
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Posisi <span className="text-red-500">*</span>
      </label>

      <select
        className="w-full rounded border border-secondary px-3 py-2 text-sm"
        disabled={loading}
        name="position_id"
      >
        <option value="">
          {loading ? "Memuat posisi..." : "Pilih posisi yang dicari"}
        </option>

        {positions.map((pos) => (
          <option key={pos.id} value={pos.id}>
            {pos.name}
          </option>
        ))}
      </select>
    </div>
  );
}
