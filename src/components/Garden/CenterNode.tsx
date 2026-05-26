export default function CenterNode() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
      <div className="h-28 w-28 overflow-hidden rounded-full border border-white/30 bg-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
        <img src="/avatar.jpg" alt="花萍雨头像" className="h-full w-full object-cover" />
      </div>
      <div className="mt-4 text-lg font-semibold text-white">花萍雨</div>
      <div className="mt-1 text-xs text-white/60">写作 · 开发 · 记录 · 生长</div>
    </div>
  )
}
