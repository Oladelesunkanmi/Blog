import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-white font-bold text-lg mb-4">TechInsights</h4>
          <p className="text-sm">Your source for technology insights and innovation stories.</p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4">Categories</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Technology</a></li>
            <li><a href="#" className="hover:text-white transition">AI & ML</a></li>
            <li><a href="#" className="hover:text-white transition">Web Development</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4">Follow Us</h5>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
            <li><a href="#" className="hover:text-white transition">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm">
        <p>© 2026 TechInsights. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
