import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Super Star Agencies - Wholesale FMCG & Chheda's Namkeen Supplier</title>
        <meta
          name="description"
          content="Super Star Agencies - Your trusted wholesale supplier of Chheda's namkeen, snacks & FMCG products in Mumbai. Order via WhatsApp for quick delivery."
        />
        <meta
          name="keywords"
          content="wholesale namkeen, Chheda's distributor, FMCG wholesale, Mumbai snacks supplier, bulk namkeen order"
        />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />
          <ProductGrid />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  );
};

export default Index;
