import { useGetTasksQuery } from '@/store/query/taskApi';
import './TaskList.scss';

export const TaskList = () => {
  const {data, isLoading, isError} = useGetTasksQuery();

  const getStatusClass = (status: string) => {
    return `task-list__status task-list__status--${status}`;
  };

  if (isLoading) {
    return <div className="task-list__loading">Loading tasks...</div>;
  }

  if (isError) {
    return <div className="task-list__error">Error loading tasks. Please try again.</div>;
  }

  return (
    <div className="task-list">
      <div className="task-list__header">
        <h1>My Tasks</h1>
      </div>
      <div className="task-list__grid">
        {data && data.map((task) => (
          <div key={task.id} className="task-list__card">
            <div className="task-list__card-header">
              <h3 className="task-list__title">{task.title}</h3>
              <span className={getStatusClass(task.status)}>
                {task.status}
              </span>
            </div>
            
            <p className="task-list__description">{task.description}</p>
            
            <div className="task-list__meta">
              <span className="task-list__date">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
