import HeaderMenu from '@/components/headerMenu/HeaderMenu';
import TaskListsWrapper from '@/components/taskListsWrapper/TaskListsWrapper';

import '@/styles/pages/main.scss';

const MainPage = () => {
  const username = 'Иван Иванов';
  const initialTaskLists = [{ id: 1 }, { id: 2 }];

  return (
    <div className="main">
      <HeaderMenu username={username} />
      <div className="content-container">
        <TaskListsWrapper initialTaskLists={initialTaskLists} />
      </div>
    </div>
  );
};

export default MainPage;
