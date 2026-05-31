import GardenMap from '../Garden/GardenMap'
import paperDoodle from '../../assets/poster/doodle/paper-doodle.png'

export default function EntryStrip() {
  return (
    <section className="relative z-10 mx-auto mt-8 w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[#f4eadf]/72">
        <p className="font-body text-xs uppercase tracking-[0.34em]">site entry</p>
      </div>
      <GardenMap />
      <img
        src={paperDoodle}
        alt="entry area doodle"
        className="pointer-events-none absolute -right-7 bottom-2 hidden w-32 rotate-[9deg] select-none opacity-88 lg:block xl:-right-16 xl:w-40"
        draggable={false}
      />
    </section>
  )
}
