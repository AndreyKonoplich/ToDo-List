import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const taskListsFilePath = path.join(process.cwd(), 'data', 'task-lists.json');

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const data = await fs.readFile(taskListsFilePath, 'utf-8');
    const taskLists = JSON.parse(data);

    const maxId = taskLists.reduce(
      (max, list) => (list.id > max ? list.id : max),
      0
    );

    const newId = maxId + 1;

    const newTaskList = {
      id: newId,
      title: `Список ${newId}`,
      email,
      tasks: [],
      isDeleted: false,
    };

    taskLists.push(newTaskList);

    await fs.writeFile(taskListsFilePath, JSON.stringify(taskLists, null, 2));

    return NextResponse.json(newTaskList, { status: 201 });
  } catch (error) {
    console.error('Ошибка при добавлении списка задач:', error);
    return NextResponse.json(
      { error: 'Ошибка при добавлении списка задач' },
      { status: 500 }
    );
  }
}
