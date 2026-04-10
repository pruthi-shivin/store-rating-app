import { useState } from "react";
import { signupUser, loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await signupUser(form);
        alert("Signup successful. Please login.");
        setIsSignup(false);
      } else {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        const role = res.data.user.role;

        if (role === "admin") navigate("/admin");
        else if (role === "owner") navigate("/owner");
        else navigate("/user");
      }
    } catch (error) {
      const msg = error.response?.data?.message;

      if (msg?.includes("exists")) {
        alert("Email already registered. Please login.");
        setIsSignup(false); 
      } else {
        alert(msg || "Error");
      }
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      {isSignup && (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <br />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <br />
        </>
      )}

      <input name="email" placeholder="Email" onChange={handleChange} />
      <br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br />

      <button onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <p>
        {isSignup ? "Already have an account?" : "New user?"}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
}

export default AuthPage;