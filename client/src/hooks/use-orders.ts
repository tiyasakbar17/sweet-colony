import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertOrder } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

// POST /api/orders - actually we don't strictly need a backend for WA orders,
// but the requirement said to implement buttons fully.
// We will use this to optionally log orders if needed, or just simulate.
// Since the prompt emphasizes WhatsApp integration as the primary checkout,
// we will prioritize that logic in the component, but here is the hook for backend sync if needed.

export function useCreateOrder() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (order: InsertOrder) => {
      const res = await fetch(api.orders.create.path, {
        method: api.orders.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      
      if (!res.ok) {
        throw new Error("Failed to create order record");
      }
      return res.json();
    },
    onSuccess: () => {
      // Invalidate queries if we had an admin panel list
      // queryClient.invalidateQueries({ queryKey: [api.orders.list.path] });
    },
    onError: (error) => {
      console.error("Failed to log order:", error);
      // We don't block the UI because WhatsApp is the source of truth
    }
  });
}
