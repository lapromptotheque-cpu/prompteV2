import Link from 'next/link';

const AI_PARTNERS = ['Gpendo', 'Anthropic', 'MISTRAL AI', 'Meta'];

const MOCK_CARDS = [
  { title: 'Email de relance', tag: 'Claude', dot: 'bg-orange-400' },
  { title: 'Analyse données', tag: 'ChatGPT', dot: 'bg-green-400' },
  { title: 'Code review', tag: 'Mistral', dot: 'bg-orange-500' },
  { title: 'Brief créatif', tag: 'Claude', dot: 'bg-orange-400' },
];

export default function Hero() {
  return (
    <section className="bg-white pt-32 pb-16 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
            style={{ fontFamily: 'var(--font-display)', WebkitTextFillColor: 'initial', background: 'none' }}>
          La bibliothèque de prompts ultime<br />
          <span>pour vos équipes</span>
        </h1>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
           style={{ color: '#6B7280' }}>
          Centralisez, organisez et déployez vos meilleurs prompts IA.<br />
          Boostez la productivité de toute votre organisation.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16 flex-wrap">
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-brand-dark transition-colors shadow-sm"
          >
            Commencer gratuitement <span>→</span>
          </Link>
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 text-gray-700 px-6 py-3 rounded-lg border border-gray-200 font-medium text-sm hover:bg-gray-50 transition-colors"
          >
            Voir la bibliothèque
          </Link>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative mx-auto max-w-4xl">
          {/* Glow */}
          <div className="absolute -inset-4 bg-gradient-to-b from-violet-100/60 to-transparent rounded-2xl blur-xl -z-10" />

          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-3 px-5 py-3 bg-gray-900 border-b border-gray-700/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="bg-gray-800 rounded-md px-8 py-0.5 text-xs text-gray-400">
                  promptotheque.app
                </span>
              </div>
            </div>

            {/* App body */}
            <div className="flex bg-gray-950" style={{ height: 320 }}>
              {/* Sidebar */}
              <div className="w-52 border-r border-gray-800 flex flex-col py-4 shrink-0">
                <div className="px-4 mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Bibliothèque
                  </span>
                </div>
                {[
                  { icon: '📚', label: 'Tous les prompts', active: true },
                  { icon: '⭐', label: 'Mes favoris', active: false },
                  { icon: '🗂️', label: 'Collections', active: false },
                  { icon: '🔗', label: 'Partagés', active: false },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center gap-2.5 px-4 py-2 mx-2 rounded-lg text-xs cursor-pointer ${
                      item.active
                        ? 'bg-violet-600/20 text-violet-300'
                        : 'text-gray-400 hover:bg-gray-800'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-4 flex flex-col gap-3">
                {/* Search bar */}
                <div className="flex items-center gap-2 bg-gray-800 border border-gray-700/50 rounded-lg px-3 py-2">
                  <svg className="w-3.5 h-3.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span className="text-xs text-gray-500">Rechercher un prompt...</span>
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-2 gap-2.5 flex-1">
                  {MOCK_CARDS.map((card, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/60 border border-gray-700/40 rounded-lg p-3 flex flex-col gap-2"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${card.dot}`} />
                        <span className="text-xs text-gray-500 font-medium">{card.tag}</span>
                      </div>
                      <div className="text-xs text-gray-300 font-medium">{card.title}</div>
                      <div className="space-y-1 mt-1">
                        <div className="h-1.5 bg-gray-700 rounded-full w-full" />
                        <div className="h-1.5 bg-gray-700 rounded-full w-4/5" />
                        <div className="h-1.5 bg-gray-700 rounded-full w-3/5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Partners row */}
        <div className="mt-12 flex flex-col items-center gap-5">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Compatible avec</p>
          <div className="flex items-center gap-8 flex-wrap justify-center">
            {AI_PARTNERS.map((name) => (
              <span key={name} className="text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors cursor-default">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
