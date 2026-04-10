import { Link } from 'react-router-dom'

export default function BackToGarden() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 text-sm text-green-600 hover:text-green-800 transition-colors"
    >
      <span>←</span>
      <span>回到花园</span>
    </Link>
  )
}
