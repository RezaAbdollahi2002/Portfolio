import React from "react";
import ProjectDemoImage from "../../assets/ProjectDemoImage.png";
import WareHouseLogo from "../../assets/WareHouse.png";

const projects = [
  {
    title: "Warehouse",
    href: "https://github.com/RezaAbdollahi2002/Warehouse",
    image: WareHouseLogo,
    imageAlt: "Warehouse project logo",
  },
  {
    title: "ClockIn",
    href: "https://github.com/RezaAbdollahi2002/ClockIn",
    image: ProjectDemoImage,
    imageAlt: "ClockIn project preview",
  },
];

const Projects = () => {
  return (
    <section className="w-full min-h-screen bg-gray-900 bg-opacity-20">
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-amber-400 mb-8 text-center">Projects</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} GitHub Repository`}
              className="group block rounded-lg border border-gray-700 bg-gray-800 p-5 shadow-sm transition
                         hover:-translate-y-1 hover:border-gray-600 hover:shadow-md
                         focus:outline-none focus:ring-2 focus:ring-amber-400/60"
            >
              <h3 className="text-lg font-bold text-amber-400 text-center">
                {p.title}
              </h3>

              <div className="mt-4 flex justify-center">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  className="rounded-md max-h-44 object-contain"
                  loading="lazy"
                />
              </div>

              <p className="mt-4 text-center text-sm text-gray-300">
                View on GitHub →
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
