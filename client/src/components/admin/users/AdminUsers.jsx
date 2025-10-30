import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import "./admin-users.css";

const INITIAL_USER_FORM = {
  nombre: "",
  email: "",
  password: "",
  rol: "admin",
};

const apiUrl = (path) => {
  const base = import.meta.env.VITE_API_BASE;
  return base ? `${base}${path}` : path;
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(INITIAL_USER_FORM);
  const [saving, setSaving] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [panelMode, setPanelMode] = useState(null); // null | "create" | "edit"

  const isPanelOpen = panelMode !== null;
  const auth = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Si tu ruta en el servidor es /api/usuarios/obtenerUsuarios, usa esa
      const token = auth?.token;
      const response = await fetch(apiUrl("/api/usuarios/obtenerUsuarios"), {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudieron obtener los usuarios");
      }

      setUsers(Array.isArray(data.usuarios) ? data.usuarios : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openCreatePanel = () => {
    setPanelMode("create");
    setSelectedId(null);
    setFormData(INITIAL_USER_FORM);
  };

  const openEditPanel = (user) => {
    setPanelMode("edit");
    setSelectedId(user.id);
    setFormData({
      nombre: user.nombre || "",
      email: user.email || "",
      password: "",
      rol: user.rol || "admin",
    });
  };

  const closePanel = () => {
    setPanelMode(null);
    setSelectedId(null);
    setFormData(INITIAL_USER_FORM);
    setSaving(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = async (user) => {
    const confirmed = window.confirm(
      `¿Desea eliminar al usuario "${user.nombre}"? Esta acción es irreversible.`
    );
    if (!confirmed) return;

    try {
      const response = await fetch(apiUrl(`/api/usuarios/${user.id}`), {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No se pudo eliminar el usuario");
      }

      setUsers((prev) => prev.filter((item) => item.id !== user.id));
      setFeedback({
        type: "success",
        message: "Usuario eliminado correctamente",
      });

      if (selectedId === user.id) {
        closePanel();
      }
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFeedback(null);

    const payload = {
      nombre: formData.nombre.trim(),
      email: formData.email.trim().toLowerCase(),
      rol: formData.rol,
    };

    if (panelMode !== "edit" || formData.password.trim()) {
      payload.password = formData.password.trim();
    }

    const isEditing = panelMode === "edit";

    try {
      const endpoint = isEditing
        ? apiUrl(`/api/usuarios/${selectedId}`)
        : apiUrl("/api/usuarios/CrearUsuario");
      const method = isEditing ? "PUT" : "POST";

      // Añadir Authorization si existe token en el context
      const token = auth?.token;
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const response = await fetch(endpoint, {
        method,
        headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            `No se pudo ${isEditing ? "actualizar" : "crear"} el usuario`
        );
      }

      if (isEditing) {
        setUsers((prev) =>
          prev.map((item) =>
            item.id === selectedId
              ? { ...item, ...(data.usuario || payload), id: selectedId }
              : item
          )
        );
        setFeedback({
          type: "success",
          message: "Usuario actualizado correctamente",
        });
      } else {
        const createdUser = data.usuario;
        if (createdUser) {
          setUsers((prev) => [createdUser, ...prev]);
        } else {
          await fetchUsers();
        }
        setFeedback({
          type: "success",
          message: "Usuario creado correctamente",
        });
      }

      closePanel();
    } catch (err) {
      setFeedback({ type: "error", message: err.message });
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return users;
    return users.filter((user) => {
      const texto = [user.nombre, user.email, user.rol]
        .filter(Boolean)
        .join(" ");
      return texto.toLowerCase().includes(query);
    });
  }, [users, searchQuery]);

  const formatDate = (value) => {
    if (!value) return "-";
    try {
      return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(value));
    } catch (err) {
      return value;
    }
  };

  return (
    <section className="admin-section">
      <div className="admin-content__header">
        <h1 className="admin-content__title">Gestión de usuarios</h1>
        <p className="admin-content__subtitle">
          Defina administradores con acceso al catálogo.
        </p>
      </div>

      {feedback && (
        <p
          className={
            feedback.type === "error"
              ? "admin-feedback admin-feedback--error"
              : "admin-feedback admin-feedback--success"
          }
        >
          {feedback.message}
        </p>
      )}

      <div className="admin-panel">
        <div className="admin-table-container">
          <div className="admin-table__header">
            <div>
              <h2>Administradores</h2>
              <p className="admin-table__subtitle">
                Usuarios con acceso al área privada del sitio.
              </p>
            </div>
            <div className="admin-table__actions">
              <input
                type="search"
                placeholder="Buscar por nombre o email..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button
                type="button"
                className="btn-secondary"
                onClick={fetchUsers}
                disabled={loading}
              >
                {loading ? "Actualizando..." : "Actualizar"}
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={openCreatePanel}
              >
                Nuevo administrador
              </button>
            </div>
          </div>

          {loading ? (
            <div className="admin-table__empty">
              <p>Cargando usuarios...</p>
            </div>
          ) : error ? (
            <div className="admin-table__empty admin-table__empty--error">
              <p>{error}</p>
              <button
                type="button"
                className="btn-secondary"
                onClick={fetchUsers}
              >
                Reintentar
              </button>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="admin-table__empty">
              <p>No se encontraron administradores con ese criterio.</p>
            </div>
          ) : (
            <div className="admin-table__wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Creado</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.nombre}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge badge--admin">
                          {user.rol === "admin" ? "Administrador" : user.rol}
                        </span>
                      </td>
                      <td>{formatDate(user.createdAt)}</td>
                      <td className="admin-table__actions-cell">
                        <button
                          type="button"
                          className="btn-ghost"
                          onClick={() => openEditPanel(user)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="btn-ghost btn-ghost--danger"
                          onClick={() => handleDelete(user)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {isPanelOpen && (
          <>
            <button
              type="button"
              className="admin-overlay"
              onClick={closePanel}
              aria-label="Cerrar panel"
            ></button>
            <aside className="admin-drawer admin-drawer--open">
              <div className="admin-drawer__header">
                <div>
                  <p className="admin-drawer__eyebrow">
                    {panelMode === "edit" ? "Editar" : "Nuevo"} administrador
                  </p>
                  <h2>
                    {panelMode === "edit"
                      ? "Editar administrador"
                      : "Crear administrador"}
                  </h2>
                </div>
                <button
                  type="button"
                  className="admin-drawer__close"
                  onClick={closePanel}
                  aria-label="Cerrar formulario"
                >
                  &times;
                </button>
              </div>

              <form className="admin-form" onSubmit={handleSubmit}>
                <div className="admin-form__grid">
                  <label className="admin-form__field admin-form__field--full">
                    <span>Nombre completo *</span>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      maxLength={120}
                    />
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>Email *</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                    />
                  </label>

                  <label className="admin-form__field admin-form__field--full">
                    <span>
                      Contraseña {panelMode === "edit" ? "(opcional)" : "*"}
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      minLength={6}
                      placeholder={
                        panelMode === "edit"
                          ? "Dejar vacío para mantener la actual"
                          : ""
                      }
                      autoComplete={
                        panelMode === "edit" ? "new-password" : "off"
                      }
                    />
                  </label>

                  <label className="admin-form__field">
                    <span>Rol</span>
                    <select
                      name="rol"
                      value={formData.rol}
                      onChange={handleChange}
                    >
                      <option value="admin">Administrador</option>
                    </select>
                  </label>
                </div>

                <div className="admin-drawer__actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={closePanel}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={saving}
                  >
                    {saving
                      ? panelMode === "edit"
                        ? "Guardando..."
                        : "Creando..."
                      : panelMode === "edit"
                      ? "Guardar cambios"
                      : "Crear administrador"}
                  </button>
                </div>
              </form>
            </aside>
          </>
        )}
      </div>
    </section>
  );
};

export default AdminUsers;
