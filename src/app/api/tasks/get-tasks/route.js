import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFilePath = path.join(process.cwd(), 'data', 'task-lists.json');

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const taskListId = searchParams.get('taskListId');
    const email = searchParams.get('email');

    if (!taskListId || !email) {
      return NextResponse.json(
        { error: 'Task list ID and email are required' },
        { status: 400 }
      );
    }

    const data = await fs.readFile(taskListsFilePath, 'utf-8');
    const taskLists = JSON.parse(data);

    const taskList = taskLists.find(
      (list) => list.id === parseInt(taskListId) && list.email === email
    );

    if (!taskList) {
      return NextResponse.json(
        { error: 'Task list not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(taskList.tasks, { status: 200 });
  } catch (error) {
    console.error('Ошибка при получении задач:', error);
    return NextResponse.json(
      { error: 'Ошибка при получении задач' },
      { status: 500 }
    );
  }
}
