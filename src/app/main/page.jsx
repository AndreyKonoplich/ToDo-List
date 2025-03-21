import HeaderMenu from '@/components/headerMenu/HeaderMenu';
import TaskListsWrapper from '@/components/taskListsWrapper/TaskListsWrapper';

import '@/styles/pages/main.scss';

const MainPage = () => {
  return (
    <div className="main">
      <HeaderMenu />
      <div className="content-container">
        <TaskListsWrapper />
      </div>
    </div>
  );
};

export default MainPage;
