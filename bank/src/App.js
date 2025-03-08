import React, { useState } from "react";
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 text-center">
      <h1 className="text-2xl font-bold">Welcome to Online Banking</h1>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => navigate("/register")}>
        Register
      </button>
    </div>
  );
};

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    localStorage.setItem("user", JSON.stringify({ name, password, balance: 1000, branch: "ABC Branch" }));
    navigate("/services");
  };

  return (
    <div className="p-5 text-center">
      <h2 className="text-xl font-semibold">Register</h2>
      <input type="text" placeholder="Name" className="block border p-2 m-2" onChange={(e) => setName(e.target.value)} />
      <input type="password" placeholder="Password" className="block border p-2 m-2" onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleRegister}>Submit</button>
    </div>
  );
};

const ServicesPage = () => {
  const navigate = useNavigate();
  return (
    <div className="p-5 text-center">
      <h2 className="text-xl font-semibold">Banking Services</h2>
      <ul className="mt-4">
        <li>Account Management</li>
        <li>Loans</li>
        <li>Investments</li>
        <li>Money Transfer</li>
      </ul>
      <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded" onClick={() => navigate("/transaction")}>
        Proceed to Transactions
      </button>
    </div>
  );
};

const TransactionPage = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");

  const handleTransaction = (type) => {
    if (password !== user.password) {
      alert("Incorrect password");
      return;
    }

    let newBalance = type === "deposit" ? user.balance + parseFloat(amount) : user.balance - parseFloat(amount);
    if (newBalance < 0) {
      alert("Insufficient funds");
      return;
    }
    const updatedUser = { ...user, balance: newBalance };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert(`${type === "deposit" ? "Deposited" : "Withdrawn"} $${amount} successfully! New Balance: $${newBalance}`);
    setAmount("");
    setPassword("");
  };

  return (
    <div className="p-5 text-center">
      <h2 className="text-xl font-semibold">Transaction Page</h2>
      <p>Welcome, {user.name}!</p>
      <p>Balance: ${user.balance}</p>
      <input type="number" placeholder="Enter Amount" className="block border p-2 m-2" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="password" placeholder="Enter Password" className="block border p-2 m-2" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={() => handleTransaction("deposit")}>Deposit</button>
      <button className="mt-4 px-4 py-2 bg-red-500 text-white rounded ml-2" onClick={() => handleTransaction("withdraw")}>Withdraw</button>
    </div>
  );
};

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div className="p-5 text-center">
      <h2 className="text-xl font-semibold">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Branch:</strong> {user.branch}</p>
      <p><strong>Balance:</strong> ${user.balance}</p>
    </div>
  );
};

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <button className="" onClick={handleLogout}>Logout</button>
  );
};

const App = () => {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex justify-around">
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/services">Services</Link>
        <Link to="/transaction">Transaction</Link>
        <Link to="/profile">Profile</Link>
        <LogoutButton />
      </nav>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
