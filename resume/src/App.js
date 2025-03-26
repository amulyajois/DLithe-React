import React, { useState } from "react";
import "./App.css";

const sections = [
  { id: "education", title: "Education", content: "Canara Engineering College (2021 - Present) | CGPA: 9.13\n\nHongirana PU College (2019 - 2021) | 97.16%\n\nSR Bommai Rotary School (2018 - 2019) | 91.8%" },
  { id: "skills", title: "Technical Skills", content: "Java, C, HTML, CSS, JavaScript, React.js, MySQL, Git & GitHub, Data Structures & Algorithms" },
  { id: "projects", title: "Projects", content: "1. Movie Review System: A web-based platform using HTML, PHP, and MySQL to manage movie reviews.\n2. WhatsApp Chat Analyzer: A Python-based web app using Streamlit to analyze chat data.\n3. HireVue: A real-time collaborative coding platform for seamless technical interviews.\n4. Collaborative Quiz and Chat App: A MERN stack application integrating real-time chat and quizzes." },
  { id: "internships", title: "Internships & Certifications", content: "1. C & DS Internship - QSpiders\n2. NPTEL - Design and Analysis of Algorithms\n3. Java Certification - IIT Bombay Spoken Tutorial" },
  { id: "extracurricular", title: "Extracurricular Activities", content: "1. Participated in a 24-hour Hackathon at NMAMIT.\n2. Event Manager at Aakriti Fest, Canara Engineering College.\n3. Committee Member of Gavel Club & Skillsphere Club." }
];

const Section = ({ title, content, isExpanded, onClick }) => (
  <div className={`section ${isExpanded ? "expanded" : "collapsed"}`} onClick={onClick}>
    <h2 className="section-title">{title}</h2>
    {isExpanded && <p className="section-content">{content.split('\n').map((line, index) => <span key={index}>{line}<br/></span>)}</p>}
  </div>
);

const App = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <div className="app-container">
      <header className="header small-header">
        <div className="profile-container">
          <img src="/Profile.jpg" alt="" className="profile-img-large" />
        </div>
        <h1 className="title">Amulya Jois</h1>
        <p className="subtitle">Innovator | Problem Solver | Lifelong Learner</p>
      </header>
      <div className="home-container">
        {sections.map((section) => (
          <Section
            key={section.id}
            title={section.title}
            content={section.content}
            isExpanded={expandedSection === section.id}
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
          />
        ))}
      </div>
      <footer className="footer">&copy; 2025 Amulya Jois | Portfolio</footer>
    </div>
  );
};

export default App;
