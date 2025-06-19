import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, User, Plus, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BiHome } from "react-icons/bi";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Scroll Header
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowHeader(true); // scrolling up
      } else {
        setShowHeader(false); // scrolling down
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Top Desktop Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="items-center space-x-2 hidden md:flex">
              <div className="bg-green-900 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
                R
              </div>
              <span className="text-2xl font-bold text-gray-900">ResellIt</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {user ? (
                <>
                  <Link
                    to="/post-item"
                    className="flex items-center gap-2 py-1 px-3 rounded text-white bg-green-900 hover:bg-green-700 transition-colors">
                    <Plus className="h-4 w-4" />
                    <span>Post Item</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors capitalize">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                    <span>{user.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors">
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" className="btn-primary">
                    Sign Up
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>
      {/* Mobile Bottom Navigation */}

      <nav
        className={` fixed bottom-0 left-0 right-0 bg-white flex justify-around items-center h-14 border-t border-green-300 shadow-md transition-transform duration-300 z-50 ${
          showHeader ? "translate-y-0" : "translate-y-full"
        } sm:hidden`}>
        {user ? (
          <>
            <Link to="/" className="flex flex-col items-center text-green-900">
              <BiHome className="h-6 w-6" />
              <span className="text-xs">Post</span>
            </Link>
            <Link
              to="/post-item"
              className="flex flex-col items-center text-green-900">
              <Plus className="h-6 w-6" />
              <span className="text-xs">Post</span>
            </Link>
            <Link
              to="/profile"
              className="flex flex-col items-center text-gray-700">
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <User className="h-6 w-6" />
              )}
              <span className="text-xs">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center text-gray-700">
              <LogOut className="h-6 w-6" />
              <span className="text-xs">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="flex flex-col items-center text-gray-700">
              <User className="h-6 w-6" />
              <span className="text-xs">Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex flex-col items-center text-green-700">
              <Plus className="h-6 w-6" />
              <span className="text-xs">Sign Up</span>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}

export default Header;

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ShoppingBag, User, Plus, LogOut } from "lucide-react";
// import { useAuth } from "../context/AuthContext";

// function Header() {
//   const { user, logout } = useAuth();

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="bg-white shadow-lg border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="bg-green-900 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
//               R
//             </div>
//             {/* <ShoppingBag className="h-8 w-8 text-blue-600" /> */}
//             <span className="text-2xl font-bold text-gray-900">ResellIt</span>
//           </Link>

//           <nav className="flex items-center space-x-6">
//             {user ? (
//               <>
//                 <Link
//                   to="/post-item"
//                   className="flex items-center gap-2 py-1 px-3 rounded text-white bg-green-900  hover:bg-green-700 transition-colors ">
//                   <Plus className="h-4 w-4 " />
//                   <span>Post Item</span>
//                 </Link>
//                 <Link
//                   to="/profile"
//                   className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors capitalize">
//                   {user.profileImage ? (
//                     <img
//                       src={user.profileImage}
//                       alt={user.name}
//                       className="h-7 w-7 rounded-full object-cover"
//                     />
//                   ) : (
//                     <User className="h-5 w-5" />
//                   )}
//                   <span>{user.name}</span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors">
//                   <LogOut className="h-5 w-5" />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/login"
//                   className="text-gray-700 hover:text-green-600 font-medium transition-colors">
//                   Login
//                 </Link>
//                 <Link to="/signup" className="btn-primary">
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </nav>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;
