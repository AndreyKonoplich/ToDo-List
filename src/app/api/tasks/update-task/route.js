import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFilePath = path.join(process.cwd(), 'data', 'task-lists.json');

export async function PUT(request) {
  try {
    const { taskListId, email, updatedTask } = await request.json();

    if (!taskListId || !email || !updatedTask) {
      return NextResponse.json(
        { error: 'Task list ID, email, and updated task are required' },
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

    const taskIndex = taskLists[taskListIndex].tasks.findIndex(
      (task) => task.id === updatedTask.id
    );

    if (taskIndex === -1) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }

    taskLists[taskListIndex].tasks[taskIndex] = updatedTask;

    await fs.writeFile(taskListsFilePath, JSON.stringify(taskLists, null, 2));

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Ошибка при обновлении задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка при обновлении задачи' },
      { status: 500 }
    );
  }
}
