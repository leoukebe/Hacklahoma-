"use server";

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Please enter both email and password" };
    }

    // Only check password for "password123" or similar simple logic for MVP
    // In real app, verify hash
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || user.password !== password) {
        return { error: "Invalid email or password" };
    }

    // Create session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const session = await encrypt({ user: { id: user.id, email: user.email, name: user.name }, expires });

    const cookieStore = await cookies();
    cookieStore.set("session", session, { expires, httpOnly: true });

    redirect("/");
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.set("session", "", { expires: new Date(0) });
    redirect("/login");
}
