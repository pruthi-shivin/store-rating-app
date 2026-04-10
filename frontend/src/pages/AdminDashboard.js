import { useEffect, useState } from "react";
import {
  getDashboard,
  getUsers,
  createStore,
  createUser,
  getStores,
} from "../services/adminService";

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const [storeForm, setStoreForm] = useState({
    name: "",
    address: "",
    owner_id: "",
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchStores();
    // eslint-disable-next-line
  }, []);

  const fetchStats = async () => {
    const res = await getDashboard();
    setStats(res.data);
  };

  const fetchUsers = async () => {
    try {
      const res = await getUsers(search, roleFilter);
      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStores = async () => {
  const res = await getStores();
  setStores(res.data);
};

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilter = () => {
    fetchUsers();
  };

  const handleUserChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateUser = async () => {
    try {
      await createUser(userForm);
      alert("User created");
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const handleStoreChange = (e) => {
    setStoreForm({
      ...storeForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateStore = async () => {
    try {
      await createStore({
        ...storeForm,
        owner_id: Number(storeForm.owner_id),
      });

      alert("Store created");

      setStoreForm({
        name: "",
        address: "",
        owner_id: "",
      });

      fetchStats();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <h3>Stats</h3>
      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Stores: {stats.totalStores}</p>
      <p>Total Ratings: {stats.totalRatings}</p>

      <hr />

      <h3>Filter Users</h3>

      <input
        placeholder="Search name/email/address"
        onChange={handleSearch}
      />

      <select onChange={(e) => setRoleFilter(e.target.value)}>
        <option value="">All</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="owner">Owner</option>
      </select>

      <button onClick={handleFilter}>Apply Filter</button>

      <hr />

      <h3>Users</h3>

      {users.map((user) => (
        <div key={user.id}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Address:</b> {user.address}</p>
          <p><b>Role:</b> {user.role}</p>

          {user.role === "owner" && (
            <p>
                <b>Store Rating:</b>{" "}
                {user.owner_rating || "No ratings yet"}
            </p>
            )}

          <hr />
        </div>
      ))}

      <hr />

      <h3>Stores</h3>

        {stores.map((store) => (
        <div key={store.id}>
            <p><b>Name:</b> {store.name}</p>
            <p><b>Address:</b> {store.address}</p>
            <p><b>Rating:</b> {store.rating || "No ratings yet"}</p>
            <hr />
        </div>
        ))}

      <h3>Create User</h3>

      <input name="name" placeholder="Name" onChange={handleUserChange} />
      <br />

      <input name="email" placeholder="Email" onChange={handleUserChange} />
      <br />

      <input name="password" placeholder="Password" onChange={handleUserChange} />
      <br />

      <input name="address" placeholder="Address" onChange={handleUserChange} />
      <br />

      <select name="role" onChange={handleUserChange}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="owner">Owner</option>
      </select>

      <br />
      <button onClick={handleCreateUser}>Create User</button>

      <hr />

      <h3>Create Store</h3>

      <input
        name="name"
        placeholder="Store Name"
        value={storeForm.name}
        onChange={handleStoreChange}
      />
      <br />

      <input
        name="address"
        placeholder="Address"
        value={storeForm.address}
        onChange={handleStoreChange}
      />
      <br />

      <input
        name="owner_id"
        placeholder="Owner ID"
        value={storeForm.owner_id}
        onChange={handleStoreChange}
      />
      <br />

      <button onClick={handleCreateStore}>Create Store</button>
    </div>
  );
}

export default AdminDashboard;