import Link from "next/link";
import Image from "next/image";

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  link?: string;
}

// Sample projects - these would typically come from a CMS or database
const projects: Project[] = [
  {
    id: "web-interface-guidelines",
    title: "Web Interface Guidelines",
    description: "A collection of best practices for creating effective web interfaces",
    year: "2025",
    link: "https://example.com/guidelines"
  },
  {
    id: "portfolio-website",
    title: "Personal Portfolio",
    description: "A minimalist portfolio website built with Next.js and TailwindCSS",
    year: "2025"
  },
  {
    id: "command-menu",
    title: "⌘K Menu",
    description: "A customizable command menu component for React applications",
    year: "2024",
    link: "https://github.com/example/command-menu"
  },
  {
    id: "ui-playground",
    title: "UI Playground",
    description: "An experimental laboratory for creating and testing user interface components",
    year: "2024"
  },
  {
    id: "digital-journal",
    title: "Digital Journal",
    description: "A minimal journaling application with a focus on privacy and simplicity",
    year: "2024"
  }
];

export const metadata = {
  title: "Projects - My Blog",
  description: "A showcase of my design and development projects",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">Projects</h1>
      
      <div className="space-y-16">
        {projects.map((project) => (
          <div key={project.id} className="group">
            {project.link ? (
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <ProjectCard project={project} />
              </Link>
            ) : (
              <ProjectCard project={project} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col border-t border-gray-100 dark:border-gray-800 pt-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-medium group-hover:underline underline-offset-4">
          {project.title}
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">{project.year}</span>
      </div>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{project.description}</p>
    </div>
  );
} 