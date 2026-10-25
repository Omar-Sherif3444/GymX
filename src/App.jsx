import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FaDumbbell } from "react-icons/fa6";

function Home() {
  return (
    <main className="min-h-screen bg-base-200 p-8">
      <div className="navbar rounded-box bg-base-100 shadow">
        <Link to="/" className="btn btn-ghost text-xl">
          <FaDumbbell /> GymX
        </Link>
      </div>

      <section className="hero py-20">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-5xl font-bold">Welcome to GymX</h1>
            <p className="py-6">Your fitness journey starts here.</p>
            <button className="btn btn-primary">Get Started</button>
            <div className="mt-4">
              <Link to="/about" className="link link-primary">
                About GymX
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function About() {
  return <h1 className="p-8 text-3xl font-bold">About GymX</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
