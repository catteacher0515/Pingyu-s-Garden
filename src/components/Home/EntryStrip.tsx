import GardenMap from '../Garden/GardenMap'
import notebookDoodle from '../../assets/poster/doodle/notebook-doodle.png'

export default function EntryStrip() {
  return (
    <section className="relative z-10 mx-auto mt-8 w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between gap-4 px-2 text-[#f4eadf]/72">
        <p className="font-body text-xs uppercase tracking-[0.34em]">site entry</p>
      </div>
      <GardenMap />
      <img
        src={notebookDoodle}
        alt="notebook doodle for entry area"
        className="pointer-events-none absolute -right-7 bottom-1 hidden w-28 rotate-[8deg] select-none opacity-90 lg:block xl:-right-16 xl:w-36"
        draggable={false}
      />
    </section>
  )
}
