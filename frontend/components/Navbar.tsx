"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();

  const menu = [
    { name: "Lowongan Kerja", href: "/jobs" },
    { name: "Dashboard", href: "/admin/vacancies" },
  ];

  return (
    <header className="border-b border-secondary bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-5">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs text-white">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          Jobs
        </Link>

        <nav className="flex gap-6 text-sm mt-2">
          {menu.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative pb-2 ${
                  isActive
                    ? "font-medium text-black after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-black"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
