import { NavLink, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="max-w-7xl mx-auto md:mt-24">
      <nav className="bg-gray-100 p-4 flex gap-4 text-gray-900">
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            isActive
              ? 'bg-red-500 text-white px-4 py-2 rounded'
              : 'px-4 py-2 rounded hover:bg-gray-200'
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/user/orders/list"
          className={({ isActive }) =>
            isActive
              ? 'bg-red-500 text-white px-4 py-2 rounded'
              : 'px-4 py-2 rounded hover:bg-gray-200'
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/user/change-password"
          className={({ isActive }) =>
            isActive
              ? 'bg-red-500 text-white px-4 py-2 rounded'
              : 'px-4 py-2 rounded hover:bg-gray-200'
          }
        >
          Change Password
        </NavLink>
      </nav>
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
