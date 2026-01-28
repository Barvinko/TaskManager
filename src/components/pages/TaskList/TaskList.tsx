import { useLazyGetTasksQuery } from '@/store/query/taskApi';
import { Button } from 'react-bootstrap';
import './TaskList.scss';

export const TaskList = () => {
  const [fetchTasks, { isLoading }] = useLazyGetTasksQuery();

  const handleClick = async () => {
    const result = await fetchTasks().unwrap();
    console.log('Fetched Tasks:', result);
  };

  return (
    <>
      <Button onClick={handleClick} disabled={isLoading}>
        Load Tasks
      </Button>
    </>
  );
};
