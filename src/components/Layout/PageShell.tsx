import { Link } from 'react-router-dom'

interface PageShellProps {
  title: string
  subtitle: string
  children: React.ReactNode
}

export default function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_34%),radial-gradient(circle_at_80%_20%,rgba(170,205,188,0.12),transparent_22%),linear-gradient(135deg,#111827_0%,#0b1020_48%,#08111a_100%)] px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <span aria-hidden="true">←</span>
          <span>回到花园</span>
        </Link>

        <header className="mt-8">
          <p className="text-xs uppercase tracking-[0.32em] text-white/45">Digital Garden</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/66">{subtitle}</p>
        </header>

        <section className="mt-10">{children}</section>
      </div>
    </main>
  )
}
