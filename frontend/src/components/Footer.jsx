import { Code, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* Logo & Text */}
          <div className="flex items-center mb-4 sm:mb-0">
            <Code className="h-6 w-6 text-purple-500" />
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              DevFusion
            </span>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Github className="h-4 w-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-4 border-t border-gray-800 pt-4 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2025 DevFusion. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Crafted with 💖 by Dhiman Majumdar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
