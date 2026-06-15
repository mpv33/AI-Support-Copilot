import { landing } from '../../content/landing'
import { cardBodyClass, cardClass, cardTitleClass, sectionAltClass } from './landingStyles'
import SectionHeader from './SectionHeader'

const { features } = landing

export default function FeaturesSection() {
  return (
    <section id="features" className={sectionAltClass}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader eyebrow={features.eyebrow} title={features.title} />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {features.items.map((item) => (
            <li key={item.title} className={cardClass}>
              <h3 className={cardTitleClass}>{item.title}</h3>
              <p className={cardBodyClass}>{item.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
