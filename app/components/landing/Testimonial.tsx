export default function Testimonial() {
  return (
    <section className="bg-gray-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: large decorative circle */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-400/20" />
              {/* Inner filled */}
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-500 opacity-80" />
              {/* Center avatar placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-pink-300/30 border-2 border-pink-400/40" />
              </div>
              {/* Decorative dots */}
              <div className="absolute top-4 right-8 w-3 h-3 rounded-full bg-pink-400/60" />
              <div className="absolute bottom-8 left-4 w-2 h-2 rounded-full bg-fuchsia-400/60" />
            </div>
          </div>

          {/* Right: quote */}
          <div className="space-y-6">
            <blockquote>
              <p className="text-xl sm:text-2xl font-medium text-white leading-relaxed">
                &ldquo;La Promptothèque nous fait gagner un temps énorme. Nous pouvons capitaliser
                sur nos meilleurs prompts, les retrouver plus vite et éviter de repartir de zéro
                à chaque besoin.&rdquo;
              </p>
            </blockquote>

            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Nom du client
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-fuchsia-600 opacity-70" />
                <div>
                  <p className="text-sm font-semibold text-white">Sarah M.</p>
                  <p className="text-xs text-gray-500">Par <span className="text-gray-400">Sarah M.</span> · Responsable produit</p>
                </div>
              </div>
            </div>

            <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1">
              Voir plus de retours utilisateurs →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
