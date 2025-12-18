import { ShoppingCart, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              <span>+91 80078 35556</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Mumbai, Maharashtra</span>
            </div>
          </div>
          <span className="font-medium">Wholesale FMCG Supplier</span>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full gradient-hero flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">SS</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground leading-tight">
              Super Star Agencies
            </h1>
            <p className="text-xs text-muted-foreground">
              Chheda's Authorized Distributor
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="relative gap-2 border-primary/20 hover:bg-primary/5"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Cart</span>
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-accent text-accent-foreground text-xs">
              {totalItems}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
