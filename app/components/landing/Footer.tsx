import Link from 'next/link';

const LINKS: Record<string, string[]> = {
  'À propos':    ['Notre mission', 'Blog', 'Changelog', 'Presse', 'Carrières'],
  'Produit':     ['Bibliothèque', 'Dashboard', 'Collections', 'Partage', 'Intégrations'],
  'Ressources':  ['Documentation', 'API', 'Guides IA', 'Templates', 'Webinaires'],
  'Apprendre':   ['Tutoriels', 'Communauté', 'FAQ', 'Support', 'Contact'],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Top grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand col */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-white text-base">
              <span className="text-brand font-black text-xl">#</span>
              La Promptothèque
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              La bibliothèque de prompts IA pensée pour les équipes modernes.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-gray-200 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © 2026 La Promptothèque. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Confidentialité</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">CGU</a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Mentions légales</a>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <span>🌐</span>
              <span>Français</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
