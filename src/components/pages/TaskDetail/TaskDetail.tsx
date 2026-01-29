import { useParams, useNavigate } from 'react-router-dom';
import { useGetTasksDetailQuery } from '@/store/query/taskApi';
import { Button } from 'react-bootstrap';
import './TaskDetail.scss';

export const TaskDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: task, error, isLoading } = useGetTasksDetailQuery(id || '');

  if (!id) return <div>Task ID is missing</div>;
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading task</div>;
  if (!task) return <div>Task not found</div>;

  return (
    <div className="task-detail">
      <Button onClick={() => navigate('/')} className="task-detail__back-btn">
        Back to Tasks
      </Button>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created at: {new Date(task.createdAt).toLocaleDateString()}</p>
    </div>
  );
};
