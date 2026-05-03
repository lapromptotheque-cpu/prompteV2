export default function Home() {
  return (
    <main className="container center-flex">
      <div className="glass-card" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <h1>La Promptothèque</h1>
        <p style={{ marginBottom: '2rem' }}>
          L'environnement de test Supabase et l'architecture Next.js modulaire sont configurés. 
          Prêt à développer l'avenir de l'IA.
        </p>
        <button className="btn-primary">
          Ouvrir le Playground
        </button>
      </div>
    </main>
  );
}
