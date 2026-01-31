import { useCreateTaskMutation } from '@/store/query/taskApi';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import type { CreateTaskDto } from '@/types';
import './TaskForm.scss';

export function TaskForm() {
  const navigate = useNavigate();
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const schema = z.object({
    title: z
      .string()
      .min(3, 'Title must be at least 3 characters')
      .max(100, 'Title cannot exceed 100 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description cannot exceed 500 characters'),
    status: z.enum(['todo', 'in-progress', 'done']),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTaskDto>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: 'todo',
    },
  });

  const onSubmit = async (data: CreateTaskDto) => {
    try {
      await createTask(data).unwrap();
      reset();
      navigate('/');
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  return (
    <div className="task-form">
      <div className="task-form__header">
        <h1>Create New Task</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="task-form__form">
        <div className="task-form__field">
          <label htmlFor="title" className="task-form__label">
            Title *
          </label>
          <input
            id="title"
            type="text"
            className={`task-form__input ${errors.title ? 'task-form__input--error' : ''}`}
            placeholder="Enter task title"
            {...register('title')}
          />
          {errors.title && (
            <p className="task-form__error-message">{errors.title.message}</p>
          )}
        </div>

        <div className="task-form__field">
          <label htmlFor="description" className="task-form__label">
            Description *
          </label>
          <textarea
            id="description"
            className={`task-form__textarea ${errors.description ? 'task-form__textarea--error' : ''}`}
            placeholder="Enter task description"
            rows={5}
            {...register('description')}
          />
          {errors.description && (
            <p className="task-form__error-message">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="task-form__field">
          <label htmlFor="status" className="task-form__label">
            Status
          </label>
          <select
            id="status"
            className="task-form__select"
            {...register('status')}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="task-form__actions">
          <button
            type="button"
            className="task-form__btn task-form__btn--cancel"
            onClick={() => navigate('/')} // Navigate back to task list on cancel
          >
            Cancel
          </button>
          <button
            type="submit"
            className="task-form__btn task-form__btn--submit"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
