"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [roleId, setRoleId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      
      if (userData) {
        const user = JSON.parse(userData);
        setRoleId(Number(user.role_id));
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const menu = [
    { name: "Lowongan Kerja", href: "/admin/jobs" },
    { name: "Dashboard", href: "/admin/vacancies", allowedRoles: [1] },
  ];

  const filteredMenu = menu.filter((item) => {
    if (!item.allowedRoles) {
      return true;
    }
    return item.allowedRoles.includes(roleId as number);
  });

  return (
    <header className="border-b border-secondary bg-white">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-5 px-4">
        <div className="flex items-center gap-5">
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
            {isLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : (
              filteredMenu.map((item) => {
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
              })
            )}
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
}