import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero text-center text-white d-flex align-items-center justify-content-center flex-column">
        <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
          Welcome to Dev Tools Hub
        </h1>
        <p className="lead animate__animated animate__fadeInUp">
          The ultimate playground for developers.
        </p>
        <Link to="/json-formatter" className="btn btn-warning btn-lg mt-3">
          <i className="fas fa-code"></i> Try JSON Formatter
        </Link>
      </section>

      <section className="tools-section py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Tools</h2>
          <div className="row g-4">
            {tools.map((tool, index) => (
              <div key={index} className="col-md-4">
                <div className="card h-100 shadow-sm hover-shadow transition">
                  <div className="card-body text-center">
                    <i className={`fa-2x mb-3 text-primary ${tool.icon}`}></i>
                    <h5 className="card-title">{tool.title}</h5>
                    <p className="card-text">{tool.description}</p>
                    <Link
                      to={tool.link}
                      className="btn btn-outline-primary btn-sm mt-2"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const tools = [
  {
    title: "JSON Formatter",
    description: "Validate & format your JSON with ease.",
    icon: "fas fa-code",
    link: "/json-formatter",
  },
  {
    title: "Base64 Encoder",
    description: "Convert text and files to Base64 format.",
    icon: "fas fa-lock",
    link: "/base64",
  },
  {
    title: "Color Palette Generator",
    description: "Create beautiful, accessible color palettes.",
    icon: "fas fa-palette",
    link: "/colors",
  },
];

export default Home;
