import "./App.css";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import PostItem from "./pages/PostItem";
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import Profile from "./pages/Profile";
import EditItems from "./pages/EditItems";
import AuthProvider from "./context/AuthContext";
import Header from "./componenets/Header";
import { Footer } from "./componenets/Footer";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/post-item" element={<PostItem />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-item/:id" element={<EditItems />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
