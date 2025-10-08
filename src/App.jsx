import React, { useState, useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
// NOTE: Ensure these imports point to your actual image files
import Logo from "./assets/images/etrack.png";
import Img2 from "./assets/images/1 Row Houses.jpg"; 

// Import the CSS file
import "./App.css";

// --- Redux Setup ---
const contactSlice = createSlice({
  name: "contact",
  initialState: { submissions: [] },
  reducers: {
    addSubmission: (state, action) => {
      state.submissions.push({
        ...action.payload,
        timestamp: new Date().toLocaleString(),
      });
    },
  },
});

const { addSubmission } = contactSlice.actions;
const store = configureStore({ reducer: { contact: contactSlice.reducer } });

// --- Scroll Reveal Animation Hook ---
function useScrollAnimations() {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const navbar = document.querySelector(".navbar");
    const backToTop = document.getElementById("backToTop");

    const handleScroll = () => {
      const triggerBottom = window.innerHeight * 0.85;

      reveals.forEach((el) => {
        const boxTop = el.getBoundingClientRect().top;
        if (boxTop < triggerBottom) el.classList.add("active");
      });

      // Navbar scroll logic (now targets the fixed navbar)
      if (window.scrollY > 60) navbar?.classList.add("scrolled");
      else navbar?.classList.remove("scrolled");

      // Back to top button logic
      if (window.scrollY > 400) backToTop?.classList.add("show");
      else backToTop?.classList.remove("show");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to check initial positions

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}

// --- Navbar (Enhanced) ---
function Navbar() {
  return (
    // Removed sticky-top since the CSS makes it 'position: fixed'
    <nav className="navbar navbar-expand-lg" style={{ minHeight: "90px" }}>
      <div className="container"> 
        
        {/* Logo Div - Positioned by CSS */}
        <div className="navbar-logo">
          <a href="#home">
            <img
              src={Logo}
              alt="ETrack Logo"
              style={{
                // Reduced logo height/width inline styles to let CSS handle it
                height: "200px",
                width: "auto",
              }}
            />
          </a>
        </div>

        {/* Navbar Links Div - Adjusted for toggler right-alignment */}
        <div className="navbar-menu-wrapper d-flex align-items-center">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navMenu"
            aria-controls="navMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navMenu">
            {/* ms-auto pushes links to the right on large screens */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <a className="nav-link" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#about">About Us</a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle" // Added dropdown-toggle class
                  href="#titleservices"
                  id="titleServicesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Services
                </a>
                <ul className="dropdown-menu" aria-labelledby="titleServicesDropdown">
                  <li><a className="dropdown-item" href="#titleservices">Title services</a></li>
                  <li><a className="dropdown-item" href="#mortgageservices">Mortgage Services</a></li>
                  <li><a className="dropdown-item" href="#roofingservices">Roofing Reports</a></li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#why">Why ETrack</a>
              </li>
              <li className="nav-item">
                <a className="btn btn-outline-light ms-lg-3" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>
  );
}

// --- Hero Section ---
function Home() {
  // NOTE: Using Img2 as a placeholder for the hero background image as per file list
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(10, 25, 49, 0.3), rgba(10, 25, 49, 0.3)), url(${Img2})`
  };
  
  return (
    <header id="home" className="hero-section text-center d-flex align-items-center justify-content-center" style={heroStyle}>
      <div className="container">
        <h1 className="display-4 text-white fw-bold mb-3 animate-fade">
          {/* UPDATED: Format as requested in instruction 1 */}
          Title Search Services Nationwide | Mortgage Loan Processing & Servicing | Roof & Wall Measurement Reports
        </h1>
        <p className="lead text-white-75 fw-light animate-fade-delay">
          Accurate &bull; Affordable &bull; Nationwide Coverage
        </p>
        <a href="#titleservices" className="btn btn-lg btn-light mt-4 px-4 shadow-sm brand-btn">
          Explore Our Services
        </a>
      </div>
    </header>
  );
}

// --- About Section ---
function About() {
  return (
    <section id="about" className="container section-padding reveal">
      <h2 className="display-4 brand-text mb-4 text-center">About ETrack Title Services Inc.</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8 ">
          <p className="lead text-center">
            With <strong>over 20 years of experience</strong> in the Mortgage and Title industry, ETrack Title Services Inc. is established to serve as a true extension of the title company’s operation.
          </p>
          <p>
            We specialize in providing <strong>nationwide title search, abstracting services and mortgage services</strong>, combining deep industry expertise with a commitment to accuracy, compliance, and speed.
          </p>
          <p>
            Our team delivers <strong>reliable, timely title reports</strong> that help our clients close with confidence.
          </p>
          <div className="mt-5 p-4 bg-light rounded shadow-sm text-center">
            <h5 className="brand-text mb-3">Who We Serve</h5>
            <div className="row text-center">
              {["Title Companies & Agents", "Lenders & Mortgage Providers", "Real Estate Attorneys", "Investors & REITs", "Underwriters & Settlement Companies"].map((client, i) => (
                <div key={i} className="col-md-4 col-6 mb-2">
                  <span className="badge bg-primary-light p-2 text-dark">{client}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Title Services ---
function TitleServices() {
  const services = [
    "Current Owner Search – Ownership verification and encumbrance check.",
    "Two-Owner / Full Search – Detailed chain of title and property history.",
    "30/40/60-Year Searches – Extended due diligence for risk management.",
    "Lien & Judgment Search – Identify open mortgages, liens, and judgments.",
    "Tax Search – Verify taxes, delinquencies, and assessments.",
    "Document Retrieval & Recording – Quick access to deeds, mortgages, and public records."
  ];
  const offshore = [
    "Scalable Title Production – From single orders to bulk projects.",
    "Commitment Typing & Data Entry – Fast, accurate document handling.",
    "Quality Review & Verification – Multi-level checks to ensure accuracy.",
    "Cost-Effective Operations – Reduce overhead without sacrificing quality."
  ];
  return (
  
    <section id="titleservices" className="brand-bg text-dark section-padding-lg reveal">
      <div className="container">
        {/* UPDATED: Heading to "Abstracting Services" as requested in instruction 2 */}
        <h2 className="display-4 mb-5 text-center">Title Services</h2>
               <div className="row">
          <div className="col-lg-6">
            <h4 className="fw-bold text-dark mb-3"><i className="bi bi-search me-2"></i> Nationwide Title Search Services</h4>
            <ul className="list-unstyled ">
              {services.map((s, i) => <li key={i}><i className="bi bi-pin-map-fill me-2 text-primary"></i>{s}</li>)}
            </ul>
          </div>
          <div className="col-lg-6">
            <h4 className="fw-bold text-dark mb-3"><i className="bi bi-globe me-2"></i> Offshore Title Support Services</h4>
            <ul className="list-unstyled ">
              {offshore.map((s, i) => <li key={i}><i className="bi bi-gear-fill me-2 text-primary"></i>{s}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>

  );
}


// --- Mortgage Services (Unchanged) ---
function MortgageServices() {
  const categories = [
    { title: "Loan Origination Support", icon: "bi-file-earmark-text", items: ["Application intake", "Document collection", "Disclosure verification"] },
    { title: "Loan Processing", icon: "bi-send-check", items: ["Pre-underwriting checks", "Employment and income verification", "Credit report analysis"] },
    { title: "Underwriting Support", icon: "bi-clipboard2-data", items: ["Income calculation", "Loan eligibility assessment", "Risk analysis"] },
    { title: "Closing & Post-Closing", icon: "bi-check2-square", items: ["Closing packages", "Post-funding audits", "Trailing document tracking"] },
  ];

  return (
    <section id="mortgageservices" className="container section-padding bg-light-section reveal">
      <h2 className="display-4 brand-text mb-5 text-center">End-to-End Mortgage Services</h2>
      <div className="row g-4">
        {categories.map((cat, i) => (
          <div key={i} className="col-lg-3 col-md-6">
            <div className="card h-100 shadow-sm border-0 mortgage-card">
              <div className="card-body">
                <i className={`bi ${cat.icon} display-6 brand-text mb-3`}></i>
                <h5 className="fw-bold">{cat.title}</h5>
                <ul className="list-unstyled small">
                  {cat.items.map((item, index) => (
                    <li key={index}><i className="bi bi-dot brand-text me-1 fs-4"></i>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
        </div>
    </section>
  );
}

// --- Roofing Reports ---
function RoofingReports() {
  const products = ["Residential Roof Sketch", "Commercial Roof Reports", "Elevation Measurement Reports", "Multifamily Roof Sketch Reports"];
  const benefits = ["Save Time & Labor Costs", "Improve Accuracy", "Enhance Safety", "Boost Efficiency"];
  
  // UPDATED: Pricing for instruction 4
  const pricing = [
    "Residential Standard Roof Sketch (ESX Only) – $9.00",
    "Residential Complex Roof Sketch (ESX Only) – $15.00",
    "Residential Standard Roof Sketch (ESX + PDF) – $15.00",
    "Commercial Roof Sketch (ESX Only) – $19.00",
    "Commercial Roof Sketch (ESX + PDF Only) – $19.00",
    "Wall ESX only <3000sf +$ 20.00",
  ];

  return (
    <section id="roofingservices" className="container section-padding reveal">
      <h2 className="display-4 brand-text mb-4 text-center">Aerial Roof Sketch Services</h2>
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="p-4 border rounded h-100 shadow-sm">
            <h5 className="brand-text mb-3"><i className="bi bi-box-seam me-2"></i>Our Products</h5>
            <ul className="list-unstyled why-list-small">
              {products.map((p, i) => <li key={i}><i className="bi bi-check-circle-fill brand-text me-2"></i>{p}</li>)}
            </ul>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="p-4 border rounded h-100 shadow-sm">
            <h5 className="brand-text mb-3"><i className="bi bi-graph-up-arrow me-2"></i>Why Use Aerial Reports?</h5>
            <ul className="list-unstyled why-list-small">
              {benefits.map((b, i) => <li key={i}><i className="bi bi-check-circle-fill brand-text me-2"></i>{b}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {/* UPDATED: Order form structure as requested in instruction 4 */}
      <div className="mt-5 pt-4 border-top">
        <div className="d-flex align-items-center mb-4">
          <h5 className="mb-0 me-3">Need to include an Order form as given below:</h5>
          <select className="form-select w-auto">
            <option value="">ORDER NOW (Dropdown Symbol)</option>
            <option value="place_order">Place Order</option>
          </select>
        </div>
        <h6 className="mb-3">Order Roof Measurements Reports here:-</h6>
        <ul className="list-unstyled p-0 m-0">
          {pricing.map((item, i) => (
            <li key={i} className="mb-2">
              <i className="bi bi-caret-right-fill brand-text me-2"></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// --- Why Choose Us ---
function WhyChoose() {
  const benefits = [
    { 
      iconClass: "bi bi-award-fill",
      title: "Proven Expertise", 
      text: "Decades of experience in title and mortgage services." 
    },
    { 
      iconClass: "bi bi-gear-wide-connected", 
      title: "Tailored Solutions", 
      text: "Flexible and customizable services to fit your business needs." 
    },
    { 
      iconClass: "bi bi-cpu-fill", 
      title: "Advanced Technology", 
      text: "Utilizing RPA, AI and intelligent data tools for efficiency." 
    },
    { 
      iconClass: "bi bi-headset", 
      title: "Exceptional Support", 
      text: "Dedicated transition support and superior customer service." 
    },
  ];

  return (
    <section id="why" className="container section-padding bg-white reveal"> 
      <div className="text-center mb-5">
          <p className="fw-bold mb-1" style={{color: 'red'}}>
              <i className="bi bi-star-fill me-2"></i>We are the preferred choice
          </p>
          <h2 className="display-4 mb-5 text-center" style={{marginTop: '0'}}>
            {/* UPDATED: Company name change as requested in instruction 3 */}
            Why Choose ETrack Title Services?
          </h2>
      </div>
      
      <div className="row align-items-center">
        {/* Left Column: Benefits List */}
        <div className="col-lg-6">
          <div className="list-group list-group-flush">
            {benefits.map((b, i) => (
              <div key={i} className="list-group-item border-0 p-3 bg-transparent">
                <div className="d-flex align-items-center mb-2">
                  <i 
                    className={`${b.iconClass} me-3`} 
                    style={{ 
                      fontSize: '2rem', 
                      color: i % 2 === 0 ? 'var(--brand-sky-accent)' : 'var(--brand-blue-mid)' /* Alternating color */
                    }}
                  ></i> 
                  <h4 className="fw-bold mb-0" style={{color: 'var(--brand-text-color)'}}>{b.title}</h4>
                </div>
                <p className="ms-5 ps-1 text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center">
          <img 
            src={Img2} 
            alt="Business team discussing mortgage and title solutions" 
            className="img-fluid shadow-lg" 
            style={{ 
              borderRadius: '12px', 
              maxWidth: '100%',
              maxHeight: '450px',
              objectFit: 'cover'
            }} 
          />
        </div>
      </div>
    </section>
  );
}

// --- Contact Section (Unchanged) ---
function Contact() {
  const dispatch = useDispatch();
  const submissions = useSelector((s) => s.contact.submissions);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    dispatch(addSubmission(form));
    setForm({ name: "", email: "", service: "", message: "" });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="container section-padding bg-light-section reveal">
      <h2 className="display-4 brand-text mb-4 text-center">Get Started Today</h2>
      <p className="lead text-center mb-5">
        Looking for reliable title search services or mortgage processing? Partner with us for accuracy, speed, and cost efficiency.
      </p>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-lg">
            <h5 className="brand-text text-center mb-4">Inquiry Form</h5>
            {submitted && (
              <div className="alert alert-success" role="alert">
                <i className="bi bi-check-circle-fill me-2"></i>Thank you! Your message has been sent.
              </div>
            )}
            <div className="mb-3"><input type="text" name="name" placeholder="Full Name" className="form-control" value={form.name} onChange={handleChange} required /></div>
            <div className="mb-3"><input type="email" name="email" placeholder="Email Address" className="form-control" value={form.email} onChange={handleChange} required /></div>
            <div className="mb-3">
              <select name="service" className="form-select" value={form.service} onChange={handleChange} required>
                <option value="">-- Type of Service Required --</option>
                <option value="Title Search/Abstracting">Title Search/Abstracting</option>
                <option value="Offshore Title Support">Offshore Title Support</option>
                <option value="Mortgage Processing">Mortgage Processing</option>
                <option value="Roofing Reports">Roofing Reports</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>
            <div className="mb-3"><textarea name="message" placeholder="Your Message" rows="4" className="form-control" value={form.message} onChange={handleChange} required /></div>
            <button type="submit" className="btn brand-btn w-100">Send Inquiry</button>
          </form>

          {submissions.length > 0 && (
            <div className="mt-5 p-3 border-top">
              <h5 className="brand-text">Recent Submissions</h5>
              <ul className="list-group list-group-flush">
                {submissions.slice(0, 5).map((s, i) => (
                  <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                    <div><strong>{s.name}</strong> ({s.email})</div>
                    <small className="text-muted">{s.timestamp}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// --- Footer (Unchanged) ---
function Footer() {
  return (
    <footer className="brand-bg text-white text-center py-4">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} ETrack Title Services Inc. | All Rights Reserved.
        </p>
        <p className="small mt-1 mb-0">Address: 21189 Dana CT., Ashburn, VA 20148 | PH: 703-880-6311 (orderdesk)</p>
      </div>
    </footer>
  );
}

export default function App() {
  useScrollAnimations();

  return (
    <Provider store={store}>
      <Navbar />
      <main>
        {/* Added `reveal` class to the main sections for scroll animation effect */}
        <div className="reveal"><Home /></div>
        <div className="reveal"><About /></div>
        <div className="reveal"><TitleServices /></div>
        <div className="reveal"><MortgageServices /></div>
        <div className="reveal"><RoofingReports /></div>
        <div className="reveal"><WhyChoose /></div>
        <div className="reveal"><Contact /></div>
      </main>
      <Footer />

      <button
        id="backToTop"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        title="Back to Top"
      >
        <i className="bi bi-arrow-up-short fs-3"></i>
      </button>
    </Provider>
  );
}
