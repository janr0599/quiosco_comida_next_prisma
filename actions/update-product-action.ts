"use server";
import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";

export async function updateProductAction(data: unknown, id: number) {
    console.log(data, id);
}
