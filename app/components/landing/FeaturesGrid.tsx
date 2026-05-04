import Link from 'next/link';

function MiniMockup({ accent = false }: { accent?: boolean }) {
  return (
    <div className={`rounded-lg overflow-hidden border ${accent ? 'border-violet-700/30' : 'border-gray-700/40'} bg-gray-900`}>
      <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-800/80 border-b border-gray-700/30">
        <span className="w-2 h-2 rounded-full bg-gray-600" />
        <span className="w-2 h-2 rounded-full bg-gray-600" />
        <span className="w-2 h-2 rounded-full bg-gray-600" />
      </div>
      <div className="p-3 flex gap-2">
        <div className="w-16 shrink-0 space-y-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-4 rounded ${i === 0 ? 'bg-violet-600/40' : 'bg-gray-700/60'}`} />
          ))}
        </div>
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-700/60 rounded-md w-full" />
          <div className="grid grid-cols-2 gap-1.5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-800 rounded border border-gray-700/30" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  number,
  title,
  description,
  link = '#',
}: {
  number: string;
  title: string;
  description: string;
  link?: string;
}) {
  return (
    <div className="space-y-3">
      <MiniMockup accent={number === '01'} />
      <div>
        <p className="text-xs font-bold text-gray-400 mb-1">{number}</p>
        <h3 className="text-sm font-semibold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          {title}
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed mb-2">{description}</p>
        <Link href={link} className="text-xs font-semibold text-brand hover:text-brand-dark transition-colors">
          Voir toutes les fonctionnalités →
        </Link>
      </div>
    </div>
  );
}

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-14">
          <p className="text-xs font-bold text-brand uppercase tracking-widest mb-3">
            ORGANISER ET RETROUVER
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight max-w-xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            L'endroit où vos meilleurs prompts prennent forme
          </h2>
        </div>

        {/* Row 1: Big mockup left + text right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12 items-start">
          {/* Big mockup */}
          <div className="lg:col-span-3 rounded-xl overflow-hidden border border-gray-200 shadow-lg bg-gray-900">
            <div className="flex items-center gap-1.5 px-4 py-3 bg-gray-800 border-b border-gray-700/50">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />
            </div>
            <div className="flex" style={{ height: 240 }}>
              <div className="w-40 border-r border-gray-700/50 p-3 space-y-1">
                {['📚 Tous', '⭐ Favoris', '🗂️ Collections', '🔗 Partagés'].map((item, i) => (
                  <div
                    key={i}
                    className={`text-xs px-2 py-1.5 rounded ${i === 0 ? 'bg-violet-600/20 text-violet-300' : 'text-gray-400'}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex-1 p-4 space-y-3">
                <div className="bg-gray-800 rounded-lg px-3 py-2 text-xs text-gray-500 flex items-center gap-2">
                  <span>🔍</span> Rechercher...
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {['Email client', 'Analyse', 'Code', 'Brief'].map((t) => (
                    <div key={t} className="bg-gray-800 rounded-lg p-2.5 border border-gray-700/30">
                      <div className="text-xs text-gray-300 font-medium mb-1.5">{t}</div>
                      <div className="space-y-1">
                        <div className="h-1.5 bg-gray-600 rounded-full" />
                        <div className="h-1.5 bg-gray-600 rounded-full w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text right */}
          <div className="lg:col-span-2 space-y-4 pt-4">
            <h3
              className="text-xl font-bold text-gray-900"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Recherche rapide
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Retrouvez instantanément n'importe quel prompt grâce à la recherche sémantique.
              Plus besoin de fouiller dans vos notes ou Slack.
            </p>
            <Link href="/prompts" className="inline-block text-sm font-semibold text-brand hover:text-brand-dark transition-colors">
              Voir toutes les fonctionnalités →
            </Link>
          </div>
        </div>

        {/* Row 2: 3 mini feature columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <FeatureRow
            number="01"
            title="Organiser vos prompts"
            description="Classez vos prompts par catégorie, outil IA ou cas d'usage pour retrouver l'essentiel en un instant."
          />
          <FeatureRow
            number="02"
            title="Restez synchronisé"
            description="Vos prompts se mettent à jour en temps réel sur tous vos appareils et pour toute votre équipe."
          />
          <FeatureRow
            number="03"
            title="Partagez facilement"
            description="Partagez vos meilleures créations avec votre équipe ou la communauté en quelques clics."
          />
        </div>
      </div>
    </section>
  );
}
