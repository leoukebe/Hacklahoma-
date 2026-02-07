"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function requestTrade(itemId: string, ownerId: string) {
    const session = await getSession();
    if (!session || !session.user) {
        redirect("/login");
    }

    const requesterId = session.user.id;

    if (requesterId === ownerId) {
        return { error: "You cannot borrow your own item." };
    }

    try {
        await prisma.trade.create({
            data: {
                itemId,
                ownerId,
                requesterId,
                status: "PENDING",
            },
        });
    } catch (error) {
        console.error("Failed to create trade:", error);
        return { error: "Failed to request trade." };
    }

    revalidatePath(`/item/${itemId}`);
    redirect("/swaps");
}
