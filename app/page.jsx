import LandingLearn from '../components/LandingLearn'
import LandingOverview from '../components/LandingOverview'
import PageShell from '../components/PageShell'
import ProductCTA from '../components/ProductCTA'
import ProductFooter from '../components/ProductFooter'
import ProductHero from '../components/ProductHero'

export default function HomePage() {
  return (
    <PageShell landing>
      <ProductHero />
      <LandingOverview />
      <LandingLearn />
      <ProductCTA />
      <ProductFooter />
    </PageShell>
  )
}
