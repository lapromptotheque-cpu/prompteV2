import Link from 'next/link';
import { Folder, Bot, LayoutGrid, Tag, Share2, Puzzle, ChevronRight } from 'lucide-react';

const INTEGRATIONS = [
  { icon: Folder,     label: 'Collections' },
  { icon: Bot,        label: 'IA Tools' },
  { icon: LayoutGrid, label: 'Catégories' },
  { icon: Tag,        label: 'Tags' },
  { icon: Share2,     label: 'Partage' },
  { icon: Puzzle,     label: 'Intégrations' },
];

export default function IntegrationSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Donnez vie à vos usages<br />avec la Promptothèque
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
              Connectez vos outils IA préférés et structurez votre bibliothèque de prompts
              pour maximiser l'impact de chaque interaction.
            </p>
            <Link href="/prompts" className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
              En savoir plus sur les intégrations <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: collection card + icons */}
          <div className="space-y-5">
            {/* Collection card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                PROMPTOTHÈQUE COLLECTION
              </p>
              <h3
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Tous vos prompts,<br />une seule collection
              </h3>
              <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                Centralisez des centaines de prompts soigneusement sélectionnés.
                Importez les vôtres, enrichissez-les, partagez-les.
              </p>
              <Link
                href="/prompts"
                className="inline-flex items-center gap-1.5 bg-brand text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
              >
                Accéder à la collection →
              </Link>
            </div>

            {/* Integration icons grid */}
            <div className="grid grid-cols-3 gap-3">
              {INTEGRATIONS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl p-3 hover:border-brand/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-brand" />
                  <span className="text-xs font-medium text-gray-600">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social proof banner */}
        <div className="mt-24 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pour les indépendants<br />comme pour les équipes
          </h2>
          <p className="text-base text-gray-500 max-w-xl mx-auto">
            Des freelances aux grandes équipes produit, la Promptothèque s'adapte
            à votre rythme et à votre façon de travailler.
          </p>
        </div>
      </div>
    </section>
  );
}
