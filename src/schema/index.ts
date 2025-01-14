import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string().min(1, "Tu nombre es obligatorio"),
    total: z.number().min(1, "Hay errores en la orden"),
    order: z.array(
        z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            quantity: z.number(),
            subtotal: z.number(),
        })
    ),
});

export const OrderIdSchema = z.object({
    orderId: z
        .string()
        .transform((val) => parseInt(val))
        .refine((val) => val > 0, { message: "Hay errores" }),
});

export const searchProductSchema = z.object({
    search: z.string().trim().min(1, "El nombre es obligatorio"),
});
