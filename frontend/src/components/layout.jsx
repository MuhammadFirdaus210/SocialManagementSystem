import Header from './Header';
import Navbar from './Navbar';
const Layout = ({ element }) => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header />
      <div className="flex w-full">
        <Navbar show={false} />
        <main className="w-full p-4 overflow-hidden">
          {element}
        </main>
      </div>
    </div>
  );
};
export default Layout;