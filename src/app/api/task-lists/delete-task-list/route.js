import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFilePath = path.join(process.cwd(), 'data', 'task-lists.json');

export async function DELETE(request) {
  try {
    const { taskListId, email } = await request.json();

    if (!taskListId || !email) {
      return NextResponse.json(
        { error: 'Task list ID and email are required' },
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
        {
          error:
            'Task list not found or you do not have permission to delete it',
        },
        { status: 404 }
      );
    }

    taskLists.splice(taskListIndex, 1);

    await fs.writeFile(taskListsFilePath, JSON.stringify(taskLists, null, 2));

    return NextResponse.json(
      { message: 'Task list deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Ошибка при удалении списка задач:', error);
    return NextResponse.json(
      { error: 'Ошибка при удалении списка задач' },
      { status: 500 }
    );
  }
}
