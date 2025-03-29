import Link from 'next/link';

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="font-bold text-xl">
        MediLab
      </Link>
      <nav className="flex items-center gap-6">
        <Link href="/" className="text-sm font-medium hover:text-primary">
          Home
        </Link>
        <Link href="/services" className="text-sm font-medium hover:text-primary">
          Services
        </Link>
        <Link href="/about" className="text-sm font-medium hover:text-primary">
          About
        </Link>
      </nav>
    </div>
  );
} 