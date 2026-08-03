import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "../styles/WorkExperience.css";

export default function WorkExperience() {
    const roles = [
        {
            role: "Business Development Intern - Impetus Research Pvt. Ltd",
            date: "Jan 2025 – March 2025",
            bullets: [
                "Led AI-driven LinkedIn and cold outreach, engaging 50+ prospects/day, boosting inbound leads by 5x.",
                "Optimized operations and report strategy, achieving 2-3x increase in response rates."
            ],
            tools: ["Apollo", "Clay", "Zapier", "Mailchimp"]
        },
        {
            role: "Tech Team and Marketing Associate - E-Cell, BIT Mesra",
            date: "Jan 2025 – Present",
            bullets: [
                "Contributed and building the EDC Website and the Innovate-a-thon website.",
                "Led the outreach and sponsorship teams for IAT Hackathon and E-Summit 2025."
            ],
            tools: ["React", "Vite", "Node.js", "Express", "MongoDB", "Apollo", "MailChimp"]
        },
        {
            role: "SDE Intern — Zulu Club",
            date: "Aug 2025 – Present",
            bullets: [
                "Developing full-stack app using React, Node.js, Express and MongoDB.",
                "Designing front-end using React, JavaScript, Tailwind.",
                "Streamlining ops through Python-based automation and scraping."
            ],
            tools: ["React", "Vite", "Node.js", "Express", "MongoDB", "Python", "Selenium Webdrivers", "SQL"]
        },
    ];

    // Ref for scroll tracking
    const timelineRef = useRef(null);
    const { scrollYProgress } = useScroll({
        container: timelineRef,
        target: timelineRef,
        offset: ["start start", "end end"],
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <div className="xp-timeline-container" ref={timelineRef}>
            {/* Sticky XP Header */}
            <div className="xp-timeline-header">Work Experience</div>

            {/* Scroll-driven vertical line */}
            <motion.div
                className="xp-timeline-line"
                style={{
                    scaleY: scrollYProgress,
                    transformOrigin: "top"
                }}
            />

            {/* Timeline Items */}
            {roles.map((item, idx) => (
                <div key={idx} className="xp-timeline-item">
                    <div className="xp-timeline-dot"></div>
                    <div className="xp-role-card">
                        <div className="xp-role-header">
                            <strong>{item.role}</strong>
                            <span className="xp-role-date">{item.date}</span>
                        </div>
                        <ul className="xp-role-bullets">
                            {item.bullets.map((text, i) => (
                                <li key={i}>{text}</li>
                            ))}
                        </ul>
                        <div className="xp-role-tools">{item.tools.join(" • ")}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

