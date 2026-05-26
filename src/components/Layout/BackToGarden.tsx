import { Link } from 'react-router-dom'

export default function BackToGarden() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-sm text-white/78 backdrop-blur-2xl transition hover:bg-white/14 hover:text-white"
    >
      <span aria-hidden="true">←</span>
      <span>回到花园</span>
    </Link>
  )
}
