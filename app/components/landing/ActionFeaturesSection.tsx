import Link from 'next/link';

const FEATURES = [
  {
    n: '1',
    title: 'Alignez vos prompts à vos usages',
    description: 'Organisez vos prompts par cas d\'usage, équipe ou outil IA pour une productivité maximale.',
  },
  {
    n: '2',
    title: 'Planifiez vos workflows',
    description: 'Construisez des séquences de prompts pour automatiser vos processus les plus complexes.',
  },
  {
    n: '3',
    title: 'Automatisez les tâches répétitives',
    description: 'Déclenchez vos prompts favoris en un clic et éliminez la friction du quotidien.',
  },
  {
    n: '4',
    title: 'Mettez les prompts en pratique',
    description: 'Testez, itérez et déployez directement depuis votre bibliothèque centralisée.',
  },
  {
    n: '5',
    title: 'Restez en synchronisation',
    description: 'Partagez en temps réel avec votre équipe et gardez tout le monde aligné.',
  },
  {
    n: '6',
    title: 'Apprenez des résultats',
    description: 'Analysez les performances de vos prompts et affinez continuellement votre collection.',
  },
];

function MiniCard({ n }: { n: string }) {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-900 mb-4">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 border-b border-gray-700/30">
        <span className="w-2 h-2 rounded-full bg-gray-600/60" />
        <span className="w-2 h-2 rounded-full bg-gray-600/60" />
        <span className="w-2 h-2 rounded-full bg-gray-600/60" />
      </div>
      <div className="p-3 flex gap-2" style={{ height: 88 }}>
        <div className="w-12 shrink-0 space-y-1">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`h-3 rounded ${i === 0 && parseInt(n) % 3 === 1 ? 'bg-violet-600/50' : 'bg-gray-700'}`} />
          ))}
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 bg-gray-700 rounded-full w-full" />
          <div className="grid grid-cols-2 gap-1">
            <div className="h-8 bg-gray-700/70 rounded" />
            <div className="h-8 bg-gray-700/70 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ActionFeaturesSection() {
  return (
    <section className="bg-features-bg py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xs font-bold text-brand uppercase tracking-widest mb-4">
          DÉCOUVRIR LA PROMPTOTHÈQUE
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Découvrir la Promptothèque<br />pensée pour l'action
        </h2>
        <p className="text-base text-gray-500 mb-14 max-w-xl">
          Tout ce dont vous avez besoin pour tirer le meilleur de vos outils IA au quotidien.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((f) => (
            <div key={f.n} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <MiniCard n={f.n} />
              <p className="text-xs font-bold text-gray-400 mb-2">{f.n}</p>
              <h3
                className="text-sm font-semibold text-gray-900 mb-2 leading-snug"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {f.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">{f.description}</p>
              <Link href="/prompts" className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors">
                Explorer →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
