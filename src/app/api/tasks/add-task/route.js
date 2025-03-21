import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFilePath = path.join(process.cwd(), 'data', 'task-lists.json');

export async function POST(request) {
  try {
    const { taskListId, email, task } = await request.json();

    if (!taskListId || !email || !task) {
      return NextResponse.json(
        { error: 'Task list ID, email, and task are required' },
        { status: 400 }
      );
    }

    const data = await fs.readFile(taskListsFilePath, 'utf-8');
    const taskLists = JSON.parse(data);

    const taskListIndex = taskLists.findIndex(
      (list) => list.id === taskListId && list.email === email
    );

    if (taskListIndex === -1) {
      return NextResponse.json(
        { error: 'Task list not found' },
        { status: 404 }
      );
    }

    taskLists[taskListIndex].tasks.push(task);

    await fs.writeFile(taskListsFilePath, JSON.stringify(taskLists, null, 2));

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Ошибка при добавлении задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка при добавлении задачи' },
      { status: 500 }
    );
  }
}
