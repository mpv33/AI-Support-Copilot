import LandingOverview from '../components/LandingOverview'
import PageShell from '../components/PageShell'
import ProductCTA from '../components/ProductCTA'
import ProductHero from '../components/ProductHero'

export default function HomePage() {
  return (
    <PageShell landing>
      <ProductHero />
      <LandingOverview />
      <ProductCTA />
    </PageShell>
  )
}
