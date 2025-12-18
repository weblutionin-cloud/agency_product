import { Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const { items, addToCart, updateQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card 
      className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elevated animate-fade-in gradient-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
          {product.category}
        </Badge>
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <span className="text-destructive font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-foreground text-lg leading-tight">
            {product.name}
          </h3>
          {product.nameHindi && (
            <p className="text-sm text-muted-foreground">{product.nameHindi}</p>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="text-xs text-muted-foreground">{product.unit}</p>
          </div>
        </div>

        {cartItem ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="flex-1 text-center font-semibold text-lg">
              {cartItem.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10"
              onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            className="w-full gap-2 bg-primary hover:bg-primary/90"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
