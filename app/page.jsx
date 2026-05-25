import PageShell from '../components/PageShell'
import CoreGenAIConcepts from '../components/CoreGenAIConcepts'
import GenAICoverage from '../components/GenAICoverage'
import HowItWorks from '../components/HowItWorks'
import ProductCapabilities from '../components/ProductCapabilities'
import ProductCTA from '../components/ProductCTA'
import ProductFooter from '../components/ProductFooter'
import ProductHero from '../components/ProductHero'

export default function HomePage() {
  return (
    <PageShell landing>
      <ProductHero />
      <GenAICoverage />
      <CoreGenAIConcepts />
      <ProductCapabilities />
      <HowItWorks />
      <ProductCTA />
      <ProductFooter />
    </PageShell>
  )
}
