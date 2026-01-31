import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import type { Task as TaskType } from '@/types';
import { useDeleteTaskMutation } from '@/store/query/taskApi';
import './TaskCard.scss';

export const TaskCard = memo(({ task }: { task: TaskType }) => {
  const navigate = useNavigate();
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();

  const getStatusClass = (status: string) => {
    return `task-cart__status task-cart__status--${status}`;
  };

  return (
    <div className="task-cart">
      <div className="task-cart__card-header">
        <h3 className="task-cart__title">{task.title}</h3>
        <span className={getStatusClass(task.status)}>{task.status}</span>
      </div>

      <p className="task-cart__description">{task.description}</p>

      <div className="task-cart__meta">
        <span className="task-cart__date">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="task-cart__actions">
        <Button
          onClick={() => navigate(`/task/${task.id}`)}
          className="task-cart__btn task-cart__btn--view"
        >
          View
        </Button>
        <Button
          onClick={async () => deleteTask(task.id)}
          className="task-cart__btn task-cart__btn--delete"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';
