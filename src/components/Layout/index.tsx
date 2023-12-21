import { Outlet } from 'react-router-dom';
import Header from '../Header';

type LayoutProps = {
  namePage: string;
  pageIcon: string;
};

function Layout({ namePage, pageIcon }: LayoutProps) {
  return (
    <div>
      <Header namePage={ namePage } pageIcon={ pageIcon } />
      <Outlet />
    </div>
  );
}

export default Layout;
