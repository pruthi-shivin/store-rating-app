import { useEffect, useState } from "react";
import { getStores } from "../services/storeService";
import { submitRating, updateRating } from "../services/ratingService";
import { changePassword } from "../services/authService";

function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [rating, setRating] = useState({});
  const [search, setSearch] = useState("");

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    fetchStores();
    // eslint-disable-next-line
  }, []);

  const fetchStores = async () => {
    try {
      const res = await getStores(search);
      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingChange = (storeId, value) => {
    setRating({
      ...rating,
      [storeId]: value,
    });
  };

  const handleSubmit = async (storeId) => {
    const value = Number(rating[storeId]);

    if (!value) {
      alert("Enter rating");
      return;
    }

    try {
      await submitRating({
        store_id: storeId,
        rating: value,
      });

      alert("Rating submitted");
      fetchStores();
    } catch (error) {
      const msg = error.response?.data?.message || "";

      if (msg.includes("already")) {
        try {
          await updateRating({
            store_id: storeId,
            rating: value,
          });

          alert("Rating updated");
          fetchStores();
        } catch (err) {
          console.log(err);
          alert("Update failed");
        }
      } else {
        console.log(error);
        alert("Error submitting rating");
      }
    }
  };

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

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>

      <h3>Search Stores</h3>
      <input
        placeholder="Search by name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={fetchStores}>Search</button>

      <hr />

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
      <button onClick={handleUpdatePassword}>Update Password</button>

      <h2>User Dashboard</h2>

      {stores.map((store) => (
        <div key={store.id} style={{ marginBottom: "20px" }}>
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p>
            Average Rating: {store.overallRating || "No ratings yet"}
          </p>
          <p>
            Your Rating: {store.userRating || "Not rated yet"}
          </p>

          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rate 1-5"
            onChange={(e) =>
              handleRatingChange(store.id, e.target.value)
            }
          />

          <button onClick={() => handleSubmit(store.id)}>
            Submit Rating
          </button>
        </div>
      ))}
    </div>
  );
}

export default UserDashboard;