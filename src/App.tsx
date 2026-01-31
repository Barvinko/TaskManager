import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout/Layout';
import { TaskList } from '@/components/pages/TaskList/TaskList';
import { TaskDetail } from '@/components/pages/TaskDetail/TaskDetail';
import { TaskForm } from '@/components/pages/TaskForm/TaskForm';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TaskList />} />
        <Route path="task/:id" element={<TaskDetail />} />
        <Route path="task/new" element={<TaskForm modeEdit={false} />} />
      </Route>
    </Routes>
  );
}

export default App;
