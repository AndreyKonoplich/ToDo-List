import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFile = path.join(process.cwd(), 'data', 'task-lists.json');

async function getTaskLists() {
  try {
    const data = await fs.readFile(taskListsFile, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const taskLists = await getTaskLists();
  const userTaskLists = taskLists.filter((list) => list.email === email);
  return NextResponse.json(userTaskLists);
}
