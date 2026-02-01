import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetTasksDetailQuery } from '@/store/query/taskApi';
import { TaskForm } from '../TaskForm/TaskForm';
import { Button } from 'react-bootstrap';
import './TaskDetail.scss';

export const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isEditing, setIsEditing] = useState(false);
  const { data: task, isError, isLoading } = useGetTasksDetailQuery(id || '');

  if (!id) return <div>Task ID is missing</div>;
  if (isLoading) return <div className="task-detail__loading">Loading task...</div>;
  if (isError || !task) {
    return (
      <div className="task-detail__error">
        <h2>Task not found</h2>
        <Button onClick={() => navigate('/')} className="task-detail__back-link">← Back to tasks</Button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <TaskForm
        modeEdit={true}
        taskId={id}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="task-detail">
      <div className="task-detail__header">
        <Button onClick={() => navigate('/')} className="task-detail__back-btn task-detail__back-link">
          Back to Tasks
        </Button>
        <div className="task-detail__actions">
          <Button
            onClick={() => setIsEditing(true)}
            className="task-detail__btn task-detail__btn--edit"
          >
            Edit
          </Button>
        </div>
      </div>
      <div className="task-detail__content">
        <div className="task-detail__title-row">
          <h1 className="task-detail__title">{task.title}</h1>
          <span className={`task-detail__status task-detail__status--${task.status}`}>
            {task.status}
          </span>
        </div>

        <div className="task-detail__section">
          <h3>Description</h3>
          <p>{task.description}</p>
        </div>

        <div className="task-detail__meta">
          <div className="task-detail__meta-item">
            <strong>Created:</strong> {new Date(task.createdAt).toLocaleString()}
          </div>
          <div className="task-detail__meta-item">
            <strong>ID:</strong> {task.id}
          </div>
        </div>
      </div>
    </div>
  );
};
