import Layout from "@/components/layout/layout";
import Project from "@/components/sections/project/default";
import CTA from "../components/sections/cta/default";
import FAQ from "../components/sections/faq/default";
import Footer from "../components/sections/footer/default";
import Hero from "../components/sections/hero/default";
import Items from "../components/sections/items/default";
import Logos from "../components/sections/logos/default";
import Pricing from "../components/sections/pricing/default";
import Stats from "../components/sections/stats/default";
import Testimonials from "@/components/sections/testimonials/default";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Logos />
      <Items />
      <Project />
      <Testimonials />
      <Stats />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </Layout>
  );
}
