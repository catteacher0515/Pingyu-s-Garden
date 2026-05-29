import { Link } from 'react-router-dom'

const links = [
  { label: 'about', path: '/profile' },
  { label: 'work', path: '/projects' },
  { label: 'journal', path: '/articles' },
  { label: 'tools', path: '/tools' },
]

export default function TopNav() {
  return (
    <header className="relative z-20 px-6 pt-6 lg:px-10 lg:pt-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 text-[#f4eadf]">
        <div className="font-hand text-lg tracking-[0.06em] text-[#ed7b62]">Pingyu&apos;s Garden</div>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-sm text-[#f4eadf]/76 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="transition-colors hover:text-[#fff2e4]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
