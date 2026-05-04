import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900 text-base shrink-0">
          <span className="text-brand font-black text-xl">#</span>
          La Promptothèque
        </Link>

        <div className="flex items-center gap-7 flex-1">
          <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
          <Link href="/prompts" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Bibliothèque</Link>
          <a href="#equipe" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Équipe</a>
          <a href="#tarifs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Tarifs</a>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="text-sm text-gray-700 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Connexion
          </a>
          <Link
            href="/prompts"
            className="text-sm text-white bg-brand px-4 py-2 rounded-lg font-semibold hover:bg-brand-dark transition-colors flex items-center gap-1"
          >
            Commencer gratuitement <span>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
