import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { TaskCard } from './TaskCard';
import { BrowserRouter as Router } from 'react-router-dom';
import type { Task } from '@/types';
import { staticRenderWithStore } from '@/utilities/testing/renderWithStore';
import { tasks } from '@/mocks/mockData';

describe('TaskCard Component', () => {
  const renderWithStore = staticRenderWithStore();

  it('renders task details correctly', () => {
    const task: Task = tasks[0];

    renderWithStore(
      <Router>
        <TaskCard task={task} />
      </Router>
    );

    expect(screen.getByText(task.title)).toBeInTheDocument();
  });
});
