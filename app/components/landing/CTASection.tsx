import Link from 'next/link';
import { LayoutGrid } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="bg-cta py-24 overflow-hidden relative">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: text */}
          <div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-8"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Peu importe vos usages,<br />
              la Promptothèque vous aide<br />
              à les structurer
            </h2>
            <Link
              href="/prompts"
              className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-gray-900 px-6 py-3 rounded-lg font-bold text-sm transition-colors shadow-lg"
            >
              Commencer gratuitement <span>→</span>
            </Link>
          </div>

          {/* Right: decorative card illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-56 h-56">
              {/* Background card */}
              <div className="absolute inset-4 top-8 bg-blue-400/20 rounded-2xl rotate-6 border border-blue-300/20" />
              {/* Main card */}
              <div className="absolute inset-0 top-4 bg-blue-500/30 rounded-2xl border border-blue-300/30 backdrop-blur-sm flex items-center justify-center">
                <LayoutGrid className="w-16 h-16 text-blue-200/60" />
              </div>
              {/* Front card */}
              <div className="absolute inset-6 bottom-2 bg-white/10 rounded-xl border border-white/20 p-3 flex flex-col gap-1.5">
                <div className="h-2 bg-white/30 rounded-full w-3/4" />
                <div className="h-2 bg-white/20 rounded-full w-full" />
                <div className="h-2 bg-white/20 rounded-full w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
