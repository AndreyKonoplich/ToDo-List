import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFilePath = path.join(process.cwd(), 'data', 'task-lists.json');

export async function DELETE(request) {
  try {
    const { taskListId, email, taskId } = await request.json();

    if (!taskListId || !email || !taskId) {
      return NextResponse.json(
        { error: 'Task list ID, email, and task ID are required' },
        { status: 400 }
      );
    }

    const data = await fs.readFile(taskListsFilePath, 'utf-8');
    const taskLists = JSON.parse(data);

    const taskListIndex = taskLists.findIndex(
      (list) => list.id === parseInt(taskListId) && list.email === email
    );

    if (taskListIndex === -1) {
      return NextResponse.json(
        { error: 'Task list not found' },
        { status: 404 }
      );
    }

    taskLists[taskListIndex].tasks = taskLists[taskListIndex].tasks.filter(
      (task) => task.id !== parseInt(taskId)
    );

    await fs.writeFile(taskListsFilePath, JSON.stringify(taskLists, null, 2));

    return NextResponse.json(
      { message: 'Task deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при удалении задачи:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении задачи' },
      { status: 500 }
    );
  }
}
