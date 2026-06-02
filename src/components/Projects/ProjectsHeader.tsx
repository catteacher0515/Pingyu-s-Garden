interface ProjectsHeaderProps {
  title: string
  subtitle: string
}

export default function ProjectsHeader({ title, subtitle }: ProjectsHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2rem] border border-[#f1e5d2]/12 bg-[#171110] px-6 py-7 shadow-[0_18px_48px_rgba(0,0,0,0.32)] sm:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(215,106,78,0.16),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(244,234,223,0.08),transparent_24%)]" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#d76a4e]/45 to-transparent" />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.36em] text-[#f1e5d2]/52">Digital Garden</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#fff2e4] sm:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f1e5d2]/70">{subtitle}</p>
      </div>
    </header>
  )
}
