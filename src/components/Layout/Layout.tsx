import { Outlet, Link } from 'react-router-dom';
import './Layout.scss';

export const Layout = () => {
  return (
    <div className="container mt-4">
      <header className="app-layout__header">
        <div className="app-layout__container">
          <Link to="/" className="app-layout__logo">
            📋 Task Manager
          </Link>
          <nav className="app-layout__nav">
            <Link to="/" className="app-layout__link">
              All Tasks
            </Link>
            <Link to="/" className="app-layout__link app-layout__link--primary">
              + New Task
            </Link>
          </nav>
        </div>
      </header>
      <main className="app-layout__main">
        <div className="app-layout__container">
          <Outlet />
        </div>
      </main>

      <footer className="app-layout__footer">
        <div className="app-layout__container">
          <p>© 2024 Task Manager | Built with React + RTK Query</p>
        </div>
      </footer>
    </div>
  );
};
