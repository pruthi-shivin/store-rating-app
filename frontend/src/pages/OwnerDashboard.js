import { useEffect, useState } from "react";
import { getOwnerDashboard } from "../services/ownerService";
import { changePassword } from "../services/authService";


function OwnerDashboard() {
  const [data, setData] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
  oldPassword: "",
  newPassword: "",
});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    try {
      const res = await getOwnerDashboard();
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (!data) return <p>Loading...</p>;

  const handlePasswordChange = (e) => {
  setPasswordForm({
    ...passwordForm,
    [e.target.name]: e.target.value,
  });
};

const handleUpdatePassword = async () => {
  try {
    await changePassword(passwordForm);
    alert("Password updated successfully");

    setPasswordForm({
      oldPassword: "",
      newPassword: "",
    });
  } catch (error) {
    alert(error.response?.data?.message || "Error");
  }
};

  return (
    <div>
        <h3>Change Password</h3>

<input
  type="password"
  name="oldPassword"
  placeholder="Old Password"
  value={passwordForm.oldPassword}
  onChange={handlePasswordChange}
/>
<br />

<input
  type="password"
  name="newPassword"
  placeholder="New Password"
  value={passwordForm.newPassword}
  onChange={handlePasswordChange}
/>
<br />

<button onClick={handleUpdatePassword}>
  Update Password
</button>
      <h2>Owner Dashboard</h2>

      <button onClick={handleLogout}>Logout</button>

      <h3>Store: {data.storeName}</h3>
      <p>Average Rating: {data.averageRating || "No ratings yet"}</p>

      <hr />

      <h3>Users Who Rated</h3>

      {data.usersWhoRated.length === 0 ? (
        <p>No ratings yet</p>
      ) : (
        data.usersWhoRated.map((user) => (
          <div key={user.id}>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Email:</b> {user.email}</p>
            <p><b>Rating:</b> {user.rating}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default OwnerDashboard;