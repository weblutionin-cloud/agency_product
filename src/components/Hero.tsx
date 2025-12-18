import { ArrowDown, Truck, Shield, Clock } from "lucide-react";

const Hero = () => {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary-foreground/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-primary-foreground/5 blur-2xl" />

      <div className="relative container py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center text-primary-foreground">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Your Trusted FMCG
            <span className="block mt-2">Wholesale Partner</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Authorized distributor of Chheda's premium namkeen and snacks.
            Quality products at wholesale prices, delivered to your doorstep.
          </p>

          <button
            onClick={scrollToProducts}
            className="inline-flex items-center gap-2 bg-primary-foreground text-primary px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-elevated animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Browse Products
            <ArrowDown className="h-5 w-5 animate-bounce-soft" />
          </button>
        </div>

        {/* Feature badges */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="flex items-center justify-center gap-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-3">
            <Truck className="h-5 w-5" />
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-3">
            <Shield className="h-5 w-5" />
            <span className="text-sm font-medium">Quality Assured</span>
          </div>
          <div className="flex items-center justify-center gap-2 bg-primary-foreground/10 backdrop-blur rounded-full px-4 py-3">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
