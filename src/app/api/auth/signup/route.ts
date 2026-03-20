import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return NextResponse.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  // Simulate user creation
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    role: "user" as const,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e14d6f&color=fff`,
  };

  const token = Buffer.from(
    JSON.stringify({ userId: newUser.id, role: newUser.role, exp: Date.now() + 86400000 })
  ).toString("base64");

  return NextResponse.json({ user: newUser, token });
}
