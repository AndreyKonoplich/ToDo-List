import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({ message: 'Вы вышли из системы' }, { status: 200 });
}
