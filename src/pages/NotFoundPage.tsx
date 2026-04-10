import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4"
      style={{ background: 'linear-gradient(135deg, #e8f5e9 0%, #e0f7fa 100%)' }}
    >
      <div className="text-6xl">🍂</div>
      <h1 className="text-xl font-bold text-gray-600">这片花园还没有种上花</h1>
      <Link to="/" className="text-sm text-green-600 hover:text-green-800 transition-colors">
        ← 回到花园
      </Link>
    </div>
  )
}
