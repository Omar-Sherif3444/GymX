import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 p-6">
      <Link to="/" className="text-xl font-bold">
        GYM<span className="text-orange-500">X</span>
      </Link>
      <p>© {new Date().getFullYear()} GYMX. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
