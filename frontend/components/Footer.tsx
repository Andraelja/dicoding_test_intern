import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-secondary bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="relative h-8 w-28">
          <Image
            src="/logo2.png"
            alt="Footer"
            fill
            className="object-contain"
          />
        </div>

        <p className="mt-4 max-w-md text-sm text-gray-600 leading-relaxed">
          Dicoding Space <br />
          Jl. Batik Kumeli No.50, Sukaluyu, <br />
          Kec. Cibeunying Kaler, Kota Bandung Jawa Barat 40123
        </p>
      </div>
    </footer>
  );
}
