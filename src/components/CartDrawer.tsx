import { useState } from "react";
import { Plus, Minus, Trash2, MessageCircle, User, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { z } from "zod";

const customerSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  address: z.string().trim().min(10, "Address must be at least 10 characters").max(300, "Address must be less than 300 characters"),
});

type CustomerDetails = z.infer<typeof customerSchema>;

const CartDrawer = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalAmount,
  } = useCart();

  const [showForm, setShowForm] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [whatsappText, setWhatsappText] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    mobile: "",
    address: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});

  const handleInputChange = (field: keyof CustomerDetails, value: string) => {
    setCustomerDetails((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear WhatsApp data when user edits the form
    setWhatsappUrl(null);
    setWhatsappText(null);
  };

  const validateForm = (): boolean => {
    const result = customerSchema.safeParse(customerDetails);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CustomerDetails, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof CustomerDetails;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Could not copy. Please copy the link manually.");
    }
  };

  const isPreviewIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

  const generateWhatsAppUrl = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!validateForm()) {
      toast.error("Please fill all details correctly");
      return;
    }

    const phoneNumber = "918007835556";
    
    let message = "🛒 *New Order - Super Star Agencies*\n\n";
    message += "━━━━━━━━━━━━━━━━━━━━━\n";
    message += "*Customer Details:*\n";
    message += `👤 Name: ${customerDetails.name}\n`;
    message += `📱 Mobile: ${customerDetails.mobile}\n`;
    message += `📍 Address: ${customerDetails.address}\n\n`;
    message += "━━━━━━━━━━━━━━━━━━━━━\n";
    message += "*Order Details:*\n\n";

    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n\n`;
    });

    message += "━━━━━━━━━━━━━━━━━━━━━\n";
    message += `*Total Amount: ₹${totalAmount}*\n\n`;
    message += "Please confirm this order.\n";
    message += "Thank you for ordering! 🙏";

    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    setWhatsappUrl(url);
    setWhatsappText(message);
    toast.success("WhatsApp order is ready — open it or copy the link.");
  };

  const handleWhatsAppClick = () => {
    // Note: we can't detect whether the user actually sent the message in WhatsApp,
    // so we keep the cart as-is.
    toast.success("WhatsApp link opened. If you see 'refused to connect', use Copy Link.");
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setShowForm(true);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-background">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="text-xl font-bold text-foreground">
            {showForm ? "Enter Delivery Details" : `Your Cart (${items.length} items)`}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Add products to your cart and send your order via WhatsApp
            </p>
            <Button onClick={() => setIsCartOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : showForm ? (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-5">
              {/* Customer Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Customer Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={customerDetails.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={errors.name ? "border-destructive" : ""}
                  maxLength={100}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Mobile Number */}
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  Mobile Number *
                </Label>
                <Input
                  id="mobile"
                  placeholder="Enter 10-digit mobile number"
                  value={customerDetails.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className={errors.mobile ? "border-destructive" : ""}
                  maxLength={10}
                  type="tel"
                />
                {errors.mobile && (
                  <p className="text-sm text-destructive">{errors.mobile}</p>
                )}
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Delivery Address *
                </Label>
                <Textarea
                  id="address"
                  placeholder="Enter complete delivery address with landmark, city, pincode"
                  value={customerDetails.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className={errors.address ? "border-destructive" : ""}
                  maxLength={300}
                  rows={4}
                />
                {errors.address && (
                  <p className="text-sm text-destructive">{errors.address}</p>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground">Order Summary</h4>
                <div className="text-sm space-y-1">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-muted-foreground">
                      <span>{item.name} × {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              {whatsappUrl ? (
                <>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleWhatsAppClick}
                    className="w-full h-12 text-lg gap-2 bg-accent hover:bg-accent/90 text-accent-foreground inline-flex items-center justify-center rounded-md font-medium transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Open WhatsApp & Send Order
                  </a>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => copyToClipboard(whatsappUrl)}
                  >
                    Copy WhatsApp Link
                  </Button>

                  {whatsappText && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => copyToClipboard(whatsappText)}
                    >
                      Copy Order Message
                    </Button>
                  )}
                  {isPreviewIframe && (
                    <p className="text-xs text-muted-foreground">
                      WhatsApp blocks opening inside the preview frame on desktop. Use “Copy WhatsApp Link” and open it in a new tab (or test on the published site).
                    </p>
                  )}
                </>
              ) : (
                <Button
                  className="w-full h-12 text-lg gap-2 bg-accent hover:bg-accent/90"
                  onClick={generateWhatsAppUrl}
                >
                  <MessageCircle className="h-5 w-5" />
                  Generate WhatsApp Order
                </Button>
              )}

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setShowForm(false);
                  setWhatsappUrl(null);
                  setWhatsappText(null);
                }}
              >
                Back to Cart
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg bg-card border border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm leading-tight truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">{item.unit}</p>
                    <p className="text-primary font-bold mt-1">
                      ₹{item.price * item.quantity}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium text-sm">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium text-foreground">₹{totalAmount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium text-accent">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">₹{totalAmount}</span>
                </div>
              </div>

              <Button
                className="w-full h-12 text-lg gap-2 bg-accent hover:bg-accent/90"
                onClick={handleProceedToCheckout}
              >
                <MessageCircle className="h-5 w-5" />
                Proceed to Order
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
