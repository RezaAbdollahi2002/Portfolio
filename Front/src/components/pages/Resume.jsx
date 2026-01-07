import  { useEffect, useState, useMemo } from "react";
import { FaGithub, FaDownload } from "react-icons/fa";
import axios from "axios";

const Resume = () => {
  const [email] = useState("apa6323@psu.edu");
  const [resumePath, setResumePath] = useState("");
  const [loadingResume, setLoadingResume] = useState(true);

  useEffect(() => {
    const getResume = async () => {
      setLoadingResume(true);
      try {
        const res = await axios.get(`/api/developer/get/resume/${encodeURIComponent(email)}`);

        // supports: "path/to/file.pdf" OR { path: "..." }
        const path = typeof res.data === "string" ? res.data : res.data?.path ?? "";
        setResumePath(path);
      } catch (err) {
        console.error("Failed to fetch resume path:", err);
        setResumePath("");
      } finally {
        setLoadingResume(false);
      }
    };

    getResume();
  }, [email]);

  const downloadHref = useMemo(() => {
    if (!resumePath) return "";
    // If your backend already returns something like "uploads/resume.pdf",
    // this becomes "/api/uploads/resume.pdf"
    return `/api/${resumePath}`;
  }, [resumePath]);

  return (
    <div className="mx-auto min-h-screen pb-6">
      <div className="mx-auto h-full max-w-[1200px]">
        {/* Title + Download */}
        <div className="flex items-center justify-center gap-x-3">
          <h1 className="pt-6 text-center text-3xl font-bold text-yellow-500">
            Resume
          </h1>

          <a
            href={downloadHref || "#"}
            onClick={(e) => {
              if (!downloadHref) e.preventDefault();
            }}
            className={`mt-6 inline-flex items-center ${
              downloadHref ? "opacity-100" : "opacity-40 cursor-not-allowed"
            }`}
            aria-label="Download resume"
            title={loadingResume ? "Loading..." : downloadHref ? "Download" : "Unavailable"}
          >
            <FaDownload className="h-7 w-7 text-white" />
          </a>
        </div>

        <hr className="my-4 shadow-2xl" />

        {/* Resume Content */}
        <div className="mx-auto bg-white px-4 py-6 text-sm text-gray-800 shadow-xl md:text-base">
          {/* Header */}
          <header className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Reza Abdollahi</h2>
            <p className="mt-1">apa6323@psu.edu | Erie, PA | (814) 844-2498</p>
          </header>

          <hr className="my-4" />

          {/* Education */}
          <section>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Education</h3>

            <div className="flex justify-between">
              <span className="font-semibold">Penn State Erie, The Behrend College</span>
              <span>May 2027</span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">
                B.S. in Software Engineering | Schreyer Honors College
              </span>
              <span>GPA: 3.99</span>
            </div>
          </section>

          <hr className="my-4" />

          {/* Projects */}
          <section>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Projects</h3>

            {/* Warehouse */}
            <div className="mb-5">
              <div className="flex items-center gap-2 font-semibold">
                <span>Warehouse Web Application</span>
              </div>

              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Built a <span className="font-semibold">full-stack application</span> with
                  React (Vite), Tailwind CSS, and FastAPI, delivering a responsive UI and
                  REST API backend.
                </li>
                <li>
                  Implemented <span className="font-semibold">secure authentication</span>{" "}
                  with JWT tokens, route protection, and Axios interceptors for automatic
                  authorization and session-expiry handling.
                </li>
                <li>
                  Created an <span className="font-semibold">AI-powered documentation module</span>{" "}
                  for generating, storing, and downloading user documents (resumes/cover letters),
                  including file upload and static file serving.
                </li>
                <li>
                  Maintained backend endpoints and database models using{" "}
                  <span className="font-semibold">SQLAlchemy</span>, focusing on clean architecture
                  and reusable services.
                </li>
              </ul>
            </div>

            {/* ClockIn */}
            <div>
              <div className="flex items-center gap-2 font-semibold">
                <span>ClockIn Web Application (Ongoing)</span>
                <a
                  href="https://github.com/RezaAbdollahi2002/ClockIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ClockIn GitHub Repository"
                >
                  <FaGithub className="h-4 w-4 text-purple-600 hover:text-purple-400" />
                </a>
              </div>

              <ul className="mt-2 list-disc space-y-1 pl-6">
                <li>
                  Designed and implemented a{" "}
                  <span className="font-semibold">full-stack scheduling platform</span>{" "}
                  using React, Tailwind CSS, and FastAPI.
                </li>
                <li>
                  Built <span className="font-semibold">authentication</span>, scheduling
                  features, and a messaging system to support user communication.
                </li>
                <li>
                  Developed and maintained <span className="font-semibold">RESTful APIs</span>{" "}
                  applying clean architecture principles.
                </li>
                <li>
                  Expanding the app with <span className="font-semibold">auto-generation of shifts</span>{" "}
                  (inspired by Homebase, with added automation to streamline scheduling).
                </li>
              </ul>
            </div>
          </section>

          <hr className="my-4" />

          {/* Research Experience */}
          <section>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Research Experience</h3>

            <div className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>Undergraduate Research Assistant – Computer Vision & Deep Learning</span>
                <span>Spring 2024</span>
              </div>
              <ul className="list-disc pl-6">
                <li>
                  Researched CNN models with a focus on <span className="font-semibold">YOLO</span>{" "}
                  architectures for real-time object detection.
                </li>
                <li>
                  Studied seminal models such as <span className="font-semibold">AlexNet</span>{" "}
                  to analyze convolutional design trade-offs and performance.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>Undergraduate Research Assistant – Natural Language Processing</span>
                <span>Summer 2024</span>
              </div>
              <ul className="list-disc pl-6">
                <li>
                  Scraped and curated a custom university dataset for fine-tuning{" "}
                  <span className="font-semibold">T5-based</span> and{" "}
                  <span className="font-semibold">Llama-3.1-8B</span> models.
                </li>
                <li>
                  Created a <span className="font-semibold">QA-specific dataset</span> for
                  fine-tuning BERT-style models.
                </li>
                <li>
                  Developed a model-selection framework comparing{" "}
                  <span className="font-semibold">speed, accuracy, and resource requirements</span>.
                </li>
              </ul>
            </div>

            <div className="mb-4">
              <div className="flex justify-between font-semibold">
                <span>Undergraduate Research Assistant – Genomic Data Analysis</span>
                <span>Summer 2025</span>
              </div>
              <ul className="list-disc pl-6">
                <li>
                  Collected and processed GPL570 genomic data for unsupervised learning tasks
                  with <span className="font-semibold">170K+ samples</span> and{" "}
                  <span className="font-semibold">54K+ gene probes</span>.
                </li>
                <li>
                  Designed and trained a <span className="font-semibold">sparse autoencoder</span>{" "}
                  identifying the top 5% of probes, reducing dimensionality by 95% without
                  performance loss.
                </li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between font-semibold">
                <span>Undergraduate Research Assistant – Indirect Feedback Alignment</span>
                <span>Summer 2025</span>
              </div>
              <ul className="list-disc pl-6">
                <li>
                  Implemented indirect feedback alignment experiments in{" "}
                  <span className="font-semibold">Python using PyTorch</span>, building training
                  pipelines for model updates, logging, and reproducible runs.
                </li>
                <li>
                  Developed and evaluated neural-network prototypes in PyTorch, running controlled
                  experiments and analyzing performance to validate alignment behavior.
                </li>
              </ul>
            </div>
          </section>

          <hr className="my-4" />

          {/* Work Experience */}
          <section>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Work Experience</h3>

            <ul className="space-y-1">
              <li className="flex justify-between">
                <span className="font-semibold">Tutor – Math, Science & Programming</span>
                <span>Spring 2024 – Present</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Lifeguard | YMCA</span>
                <span>Summer 2024 – Present</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Front Desk | LRC, Penn State Behrend</span>
                <span>Fall 2024 – Present</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Physics Teaching Assistant</span>
                <span>Fall 2025 – Present</span>
              </li>
              <li className="flex justify-between">
                <span className="font-semibold">Digital Circuits Lab & Grading Assistant</span>
                <span>Fall 2025 – Present</span>
              </li>
            </ul>
          </section>

          <hr className="my-4" />

          {/* Technical Skills */}
          <section>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Technical Skills</h3>

            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="font-semibold">Programming Languages:</span> C++, C, Python,
                Java, JavaScript, HTML, CSS, VHDL, SQL, R
              </li>
              <li>
                <span className="font-semibold">Frameworks & Libraries:</span> PyTorch, TensorFlow,
                Scikit-learn, React, FastAPI, Tailwind CSS
              </li>
              <li>
                <span className="font-semibold">Tools & Technologies:</span> NumPy, Pandas,
                Matplotlib, Seaborn, Git, VS Code, IntelliJ
              </li>
              <li>
                <span className="font-semibold">Domains:</span> Machine Learning, Deep Learning,
                NLP, Full-Stack Development
              </li>
              <li>
                <span className="font-semibold">Languages:</span> English (Fluent), Persian (Fluent)
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resume;
