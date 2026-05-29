import GardenMap from '../Garden/GardenMap'

export default function EntryStrip() {
  return (
    <section className="relative z-10 mx-auto mt-8 w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[#f4eadf]/72">
        <p className="font-body text-xs uppercase tracking-[0.34em]">site entry</p>
        <p className="font-body text-xs text-[#f4eadf]/48">四个入口保留在次级层，不和主视觉抢重心</p>
      </div>
      <GardenMap />
    </section>
  )
}
