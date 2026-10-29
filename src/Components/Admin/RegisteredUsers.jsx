import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "./RegisteredUsers.css";
const RegistredUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchapi = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        "http://localhost:4000/UserDetails"
      );

      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError("Unable to load registered users. Check whether JSON Server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchapi();
  }, []);

  const getAge = (dob) => {
    if (!dob) return "—";

    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) return "—";

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayNotReached =
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate());

    if (birthdayNotReached) age--;

    return age >= 0 ? age : "—";
  };

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return users;

    return users.filter((user) =>
      [
        user.username,
        user.contact,
        user.email,
        user.place,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(term)
      )
    );
  }, [users, search]);

  return (
    <div className="registered-users-page">
      <div className="registered-users-header">
        <div>
          <p className="registered-users-eyebrow">NAMMACART ADMIN</p>
          <h1>Registered Users</h1>
          <p className="registered-users-subtitle">
            Manage and review your customer registrations.
          </p>
        </div>

        <button
          className="registered-refresh-btn"
          onClick={fetchapi}
          disabled={loading}
        >
          ↻ Refresh
        </button>
      </div>

      <div className="registered-stats">
        <div className="registered-stat-card">
          <div className="registered-stat-icon">👥</div>
          <div>
            <p>Total Registered Users</p>
            <h2>{users.length}</h2>
            <span>All customer accounts</span>
          </div>
        </div>

        <div className="registered-stat-card">
          <div className="registered-stat-icon">🔎</div>
          <div>
            <p>Matching Results</p>
            <h2>{filteredUsers.length}</h2>
            <span>Based on your search</span>
          </div>
        </div>
      </div>

      <div className="registered-users-panel">
        <div className="registered-panel-header">
          <div>
            <h2>Customer Directory</h2>
            <p>View customer registration information.</p>
          </div>

          <div className="registered-search">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search name, email, contact..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search registered users"
            />
          </div>
        </div>

        {loading ? (
          <div className="registered-state">
            <div className="registered-spinner"></div>
            <p>Loading registered users...</p>
          </div>
        ) : error ? (
          <div className="registered-state registered-error">
            <p>{error}</p>
            <button onClick={fetchapi}>Try Again</button>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="registered-state">
            <div className="registered-empty-icon">👤</div>
            <h3>No users found</h3>
            <p>
              {search
                ? "Try another search term."
                : "Registered customers will appear here."}
            </p>
          </div>
        ) : (
          <div className="registered-table-wrapper">
            <table className="registered-users-table">
              <thead>
                <tr>
                  <th>SI. NO.</th>
                  <th>USERNAME</th>
                  <th>CONTACT</th>
                  <th>EMAIL</th>
                  <th>PASSWORD</th>
                  <th>AGE</th>
                  <th>ADDRESS</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id ?? user.email ?? index}>
                    <td>
                      <span className="registered-index">
                        {index + 1}
                      </span>
                    </td>

                    <td>
                      <div className="registered-username">
                        <span className="registered-avatar">
                          {(user.username || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                        <strong>{user.username || "—"}</strong>
                      </div>
                    </td>

                    <td>{user.contact || "—"}</td>
                    <td className="registered-email">
                      {user.email || "—"}
                    </td>

                    <td>
                      <span
                        className="registered-password"
                        title="Password hidden for security"
                      >
                        ••••••••
                      </span>
                    </td>

                    <td>
                      <span className="registered-age">
                        {getAge(user.dob)}
                      </span>
                    </td>

                    <td>{user.place || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && !error && filteredUsers.length > 0 && (
          <div className="registered-panel-footer">
            Showing <strong>{filteredUsers.length}</strong> of{" "}
            <strong>{users.length}</strong> registered users
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistredUsers;
