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

export async function updateTradeStatus(tradeId: string, newStatus: "APPROVED" | "REJECTED") {
    const session = await getSession();
    if (!session || !session.user) {
        redirect("/login");
    }

    const userId = session.user.id;

    // Verify the user is the owner of the trade (i.e., the one receiving the request)
    const trade = await prisma.trade.findUnique({
        where: { id: tradeId },
    });

    if (!trade) {
        return { error: "Trade not found." };
    }

    if (trade.ownerId !== userId) {
        return { error: "Unauthorized." };
    }

    try {
        await prisma.trade.update({
            where: { id: tradeId },
            data: { status: newStatus },
        });
    } catch (error) {
        console.error("Failed to update trade:", error);
        return { error: "Failed to update trade status." };
    }

    revalidatePath("/swaps");
}
