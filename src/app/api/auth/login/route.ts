import { NextResponse } from "next/server";
import { users } from "@/data/users";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Demo auth — accept known demo passwords
  const demoPasswords: Record<string, string> = {
    "admin@jamboos.com": "admin123",
    "priya@example.com": "user123",
    "ananya@example.com": "user123",
  };

  const expectedPassword = demoPasswords[email];
  if (!expectedPassword || expectedPassword !== password) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 }
    );
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Return user data (simulated JWT)
  const token = Buffer.from(
    JSON.stringify({ userId: user.id, role: user.role, exp: Date.now() + 86400000 })
  ).toString("base64");

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    },
    token,
  });
}
