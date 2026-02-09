import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation, Link } from "wouter";
import { ChevronLeft, Check, Camera, Send } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useCart } from "@/hooks/use-cart";
import { useCreateOrder } from "@/hooks/use-orders";
import { insertOrderSchema } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Schema for form validation
const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  class: z.string().min(1, "Class is required"),
  whatsapp: z.string().min(9, "Valid WhatsApp number required").regex(/^\+?[\d\s-]+$/, "Invalid phone number"),
  paymentMethod: z.enum(["cash", "transfer"]),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createOrder = useCreateOrder();
  
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      paymentMethod: "cash",
      whatsapp: "",
      name: "",
      class: ""
    }
  });

  const paymentMethod = form.watch("paymentMethod");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProofPreview(url);
    }
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    // 1. Prepare WhatsApp Message
    const orderItemsText = items.map(i => 
      `- ${i.name} (${i.variant})${i.addons.length ? ` w/ ${i.addons.join(', ')}` : ''} x${i.quantity}`
    ).join('\n');
    
    const totalText = total().toLocaleString();
    
    const message = `
*New Order from Sweet Colony!* 🍬

*Name:* ${data.name}
*Class:* ${data.class}
*Payment:* ${data.paymentMethod.toUpperCase()}

*Order Details:*
${orderItemsText}

*Total: Rp ${totalText}*
    `.trim();

    // 2. Log to backend (optional, non-blocking)
    try {
      await createOrder.mutateAsync({
        name: data.name,
        class: data.class,
        whatsapp: data.whatsapp,
        paymentMethod: data.paymentMethod,
        total: total(),
        items: items
      });
    } catch (err) {
      console.warn("Backend log failed, proceeding to WA");
    }

    // 3. Clear Cart & Redirect
    clearCart();
    
    // 4. Open WhatsApp
    const waNumber = "6281284914453"; // Placeholder number
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
    
    setLocation("/success");
  };

  return (
    <div className="app-container flex flex-col bg-gray-50 h-full overflow-y-auto">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-20 flex items-center gap-4">
        <Link href="/cart">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-gray-800">Checkout</h1>
      </header>

      <main className="p-6 pb-24">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* Personal Info Section */}
          <section className="space-y-4">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">1</span>
              Student Details
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  {...form.register("name")}
                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. Budi Santoso"
                />
                {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                  <input 
                    {...form.register("class")}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. XII IPA 2"
                  />
                  {form.formState.errors.class && <p className="text-red-500 text-xs mt-1">{form.formState.errors.class.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input 
                    {...form.register("whatsapp")}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0812..."
                    type="tel"
                  />
                  {form.formState.errors.whatsapp && <p className="text-red-500 text-xs mt-1">{form.formState.errors.whatsapp.message}</p>}
                </div>
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="space-y-4">
             <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-xs">2</span>
              Payment Method
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <label className={`
                cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                ${paymentMethod === 'cash' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}
              `}>
                <input 
                  type="radio" 
                  value="cash" 
                  className="hidden" 
                  {...form.register("paymentMethod")}
                />
                <span className="font-bold">Cash / COD</span>
                <span className="text-xs text-center opacity-70">Pay when receiving</span>
              </label>

              <label className={`
                cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2
                ${paymentMethod === 'transfer' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}
              `}>
                <input 
                  type="radio" 
                  value="transfer" 
                  className="hidden" 
                  {...form.register("paymentMethod")}
                />
                <span className="font-bold">Bank Transfer</span>
                <span className="text-xs text-center opacity-70">BCA / QRIS</span>
              </label>
            </div>

            {/* Transfer Details Conditional */}
            <AnimatePresence>
              {paymentMethod === 'transfer' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl space-y-4 mt-2">
                    <div>
                      <p className="text-sm text-yellow-800 font-semibold mb-1">Transfer Destination:</p>
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-yellow-200">
                        <div>
                          <p className="font-bold text-gray-800">BCA</p>
                          <p className="text-sm text-gray-600">1234567890 (Sweet Colony)</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText("1234567890");
                            toast({ title: "Copied!", duration: 1000 });
                          }}
                          className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded"
                        >
                          Copy
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm text-yellow-800 font-semibold mb-2">Upload Proof</p>
                      <label className="block w-full border-2 border-dashed border-yellow-300 rounded-lg p-4 cursor-pointer hover:bg-yellow-100/50 transition-colors text-center">
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        {proofPreview ? (
                          <div className="relative">
                            <img src={proofPreview} alt="Proof" className="mx-auto h-32 object-contain rounded-md" />
                            <p className="text-xs text-green-600 mt-2 font-bold flex items-center justify-center gap-1">
                              <Check className="w-3 h-3" /> Image Selected
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-2 text-yellow-700">
                            <Camera className="w-8 h-8 opacity-50" />
                            <span className="text-sm font-medium">Tap to upload receipt</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>Send Order via WhatsApp</span>
            <Send className="w-5 h-5" />
          </button>
          
          <p className="text-center text-xs text-gray-400">
            You will be redirected to WhatsApp to finalize your order.
          </p>

        </form>
      </main>
    </div>
  );
}
