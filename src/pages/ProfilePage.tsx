import { Link } from 'react-router-dom'
import AboutHero from '../components/Profile/AboutHero'
import ContactPanel from '../components/Profile/ContactPanel'
import FocusGrid from '../components/Profile/FocusGrid'
import OutputMap from '../components/Profile/OutputMap'
import {
  contactItems,
  focusAreas,
  identityTags,
  outputLinks,
  profileIntro,
} from '../data/profile'

export default function ProfilePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0d0b0b] px-6 py-8 text-[#f4eadf]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(215,106,78,0.12),transparent_24%),radial-gradient(circle_at_12%_22%,rgba(255,255,255,0.06),transparent_18%),linear-gradient(180deg,#161111_0%,#0e0a0a_48%,#090707_100%)]" />
      <div className="pointer-events-none absolute left-0 top-20 hidden h-[72vh] w-16 border-y border-r border-[#efcfbf]/18 bg-[linear-gradient(180deg,rgba(244,234,223,0.08),rgba(215,106,78,0.04))] lg:block" />
      <div className="pointer-events-none absolute right-0 top-28 hidden h-[64vh] w-16 border-y border-l border-[#efcfbf]/18 bg-[linear-gradient(180deg,rgba(244,234,223,0.06),rgba(215,106,78,0.05))] lg:block" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#efcfbf]/22 bg-[#f4eadf]/8 px-4 py-2 text-sm text-[#f4eadf]/78 transition hover:border-[#ed7b62]/58 hover:text-[#fff2e4]"
        >
          <span aria-hidden="true">←</span>
          <span>回到花园</span>
        </Link>

        <div className="mt-10">
          <AboutHero
            eyebrow={profileIntro.eyebrow}
            title={profileIntro.title}
            description={profileIntro.description}
            tags={identityTags}
          />
          <FocusGrid areas={focusAreas} />
          <OutputMap outputs={outputLinks} />
          <ContactPanel contacts={contactItems} />
        </div>
      </div>
    </main>
  )
}
