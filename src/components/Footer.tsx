import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full gradient-hero flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">SS</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Super Star Agencies</h3>
                <p className="text-sm opacity-70">FMCG Wholesaler</p>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Authorized distributor of Chheda's premium namkeen and snacks.
              Serving retailers across Maharashtra with quality products.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="tel:+918007835556"
                className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <Phone className="h-4 w-4" />
                +91 80078 35556
              </a>
              <a
                href="mailto:info@superstaragencies.com"
                className="flex items-center gap-3 text-sm opacity-70 hover:opacity-100 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                info@superstaragencies.com
              </a>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>123 Market Area, Mumbai, Maharashtra - 400001</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Order on WhatsApp</h4>
            <p className="text-sm opacity-70 mb-4">
              Add products to cart and send your order directly via WhatsApp.
              Quick and easy ordering!
            </p>
            <a
              href="https://wa.me/918007835556"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full font-semibold hover:bg-accent/90 transition-colors"
            >
              <MessageCircle className="h-5 w-5" />
              Chat with Us
            </a>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center">
          <p className="text-sm opacity-50">
            © {new Date().getFullYear()} Super Star Agencies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
