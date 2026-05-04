export default function Loading() {
  return (
    <main className="container">
      <div className="prompts-header">
        <div className="skeleton" style={{ height: '3rem', width: '280px', borderRadius: '8px' }} />
        <div className="skeleton" style={{ height: '1rem', width: '120px', borderRadius: '4px' }} />
        <div className="skeleton" style={{ height: '2.5rem', width: '480px', borderRadius: '8px' }} />
      </div>
      <div className="prompts-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: '180px', borderRadius: '16px' }} />
        ))}
      </div>
    </main>
  )
}
