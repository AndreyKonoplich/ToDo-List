import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const usersFile = path.join(process.cwd(), 'data', 'users.json');

async function getUsers() {
  try {
    const data = await fs.readFile(usersFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function POST(request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  }

  const users = await getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json(
      { error: 'Invalid email or password' },
      { status: 401 }
    );
  }

  return NextResponse.json(
    { message: 'Login successful', user },
    { status: 200 }
  );
}
