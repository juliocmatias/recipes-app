import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';

type LayoutProps = {
  namePage: string;
  pageIcon: string;
};

function Layout({ namePage, pageIcon }: LayoutProps) {
  const [verifyPage, setVerifyPage] = useState(false);

  useEffect(() => {
    const checksNamePage = () => {
      switch (namePage) {
        case 'Meals':
          setVerifyPage(true);
          break;
        case 'Drinks':
          setVerifyPage(true);
          break;
        case 'Profile':
          setVerifyPage(true);
          break;
        default:
          setVerifyPage(false);
          break;
      }
    };
    checksNamePage();
  }, [namePage]);

  return (
    <div>
      <Header namePage={ namePage } pageIcon={ pageIcon } />
      <Outlet />
      {verifyPage && <Footer />}
    </div>
  );
}

export default Layout;
