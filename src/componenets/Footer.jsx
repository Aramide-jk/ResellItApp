import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 myGradient rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">ResellIt</span>
            </div>
            <p className="text-gray-400 mb-4">
              The student marketplace for buying and selling used items within
              university communities. Built with React.js and modern web
              technologies.
            </p>
            <p className="text-sm text-gray-500">
              Developed by Aramide Jamiu Kolawole • Sell it. Buy it. Reuse it.
              ResellIt!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-white transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Safety Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Info */}
          <div>
            <h3 className="font-semibold mb-4">Developer</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="hover:text-white transition-colors">
                  Aramide Jamiu Kolawole
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Front-End Developer
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors">
                  Junior DevOps Engineer
                </span>
              </li>
              <li>
                <span className="text-sm">
                  Built with React.js & Tailwind CSS
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 ResellIt. All rights reserved. Developed by Aramide
            Jamiu Kolawole with React.js & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
