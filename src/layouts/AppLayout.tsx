import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" >
      <Navbar />
      < main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
