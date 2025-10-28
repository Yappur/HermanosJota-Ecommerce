import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar" aria-label="Menú de administración">
      <div className="admin-sidebar__brand">
        <span className="admin-sidebar__emoji" aria-hidden="true">
          🛠️
        </span>
        <div>
          <p className="admin-sidebar__label">Panel</p>
          <h2 className="admin-sidebar__title">Administración</h2>
        </div>
      </div>

      <nav className="admin-sidebar__nav">
        <NavLink
          to="productos"
          className={({ isActive }) =>
            isActive
              ? "admin-sidebar__link admin-sidebar__link--active"
              : "admin-sidebar__link"
          }
        >
          <span aria-hidden="true">🛋️</span>
          <span>Productos</span>
        </NavLink>

        <NavLink
          to="usuarios"
          className={({ isActive }) =>
            isActive
              ? "admin-sidebar__link admin-sidebar__link--active"
              : "admin-sidebar__link"
          }
        >
          <span aria-hidden="true">👥</span>
          <span>Usuarios</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
