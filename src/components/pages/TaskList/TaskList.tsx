import { memo } from 'react';
import { useGetTasksQuery } from '@/store/query/taskApi';
import { TaskCard } from './Task/TaskCard';
import './TaskList.scss';

const TaskList = memo(() => {
  const { data, isLoading, isError } = useGetTasksQuery();

  if (isLoading) {
    return <div className="task-list__loading">Loading tasks...</div>;
  }

  if (isError) {
    return (
      <div className="task-list__error">
        Error loading tasks. Please try again.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="task-list__empty">
        <h2>No tasks yet</h2>
      </div>
    );
  }

  return (
    <div className="task-list">
      <div className="task-list__header">
        <h1>My Tasks</h1>
      </div>
      <div className="task-list__grid">
        {data &&
          data.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
      </div>
    </div>
  );
});

TaskList.displayName = 'TaskList';