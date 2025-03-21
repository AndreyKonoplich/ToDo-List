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

async function saveUsers(users) {
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}

export async function POST(request) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Name, email, and password are required' },
      { status: 400 }
    );
  }

  let users = await getUsers();

  const userExists = users.some((user) => user.email === email);
  if (userExists) {
    return NextResponse.json(
      { error: 'User with this email already exists' },
      { status: 409 }
    );
  }

  const newUser = { id: users.length + 1, name, email, password };
  users.push(newUser);
  await saveUsers(users);

  return NextResponse.json(
    { message: 'User registered successfully', user: newUser },
    { status: 201 }
  );
}
