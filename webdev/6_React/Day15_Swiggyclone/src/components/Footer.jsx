const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-14 font-sans">
      {/* Top Section */}
      <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 pb-12">
        
        {/* Logo & Copyright */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
              alt="Swiggy"
              className="w-32"
            />
          </div>
          <p className="text-sm">© 2025 Swiggy Limited</p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Swiggy Corporate</li>
            <li>Careers</li>
            <li>Team</li>
            <li>Swiggy One</li>
            <li>Swiggy Instamart</li>
            <li>Swiggy Dineout</li>
            <li>Minis</li>
            <li>Pyng</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold mb-4">Contact us</h3>
          <ul className="space-y-2 text-sm">
            <li>Help & Support</li>
            <li>Partner With Us</li>
            <li>Ride With Us</li>
          </ul>

          <h3 className="font-semibold mt-6 mb-4">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>Terms & Conditions</li>
            <li>Cookie Policy</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Available In */}
        <div>
          <h3 className="font-semibold mb-4">Available in:</h3>
          <ul className="space-y-2 text-sm">
            <li>Bangalore</li>
            <li>Gurgaon</li>
            <li>Hyderabad</li>
            <li>Delhi</li>
            <li>Mumbai</li>
            <li>Pune</li>
          </ul>

          <select className="mt-4 w-full border rounded-lg px-3 py-2 bg-gray-100">
            <option>685 cities</option>
          </select>
        </div>

        {/* Life at Swiggy */}
        <div>
          <h3 className="font-semibold mb-4">Life at Swiggy</h3>
          <ul className="space-y-2 text-sm">
            <li>Explore With Swiggy</li>
            <li>Swiggy News</li>
            <li>Snackables</li>
          </ul>

          <h3 className="font-semibold mt-6 mb-4">Social Links</h3>
          <div className="flex gap-4 text-xl">
            <i className="fa-brands fa-linkedin"></i>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
            <i className="fa-brands fa-pinterest"></i>
            <i className="fa-brands fa-twitter"></i>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300"></div>

      {/* Bottom App Section */}
      <div className="w-[85%] mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-lg font-semibold text-gray-800">
          For better experience, download the Swiggy app now
        </p>

        <div className="flex gap-4">
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="App Store"
            className="h-12"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
            className="h-12"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
