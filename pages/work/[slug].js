import ProjectCaseStudy from "../../components/ProjectCaseStudy";
import { getNextProject, getProjectBySlug, projects } from "../../data/projects";

export function getStaticPaths() {
  return {
    paths: projects.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  };
}

export function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { notFound: true };

  return {
    props: {
      project,
      nextProject: getNextProject(project.slug),
    },
  };
}

export default function ProjectPage({ project, nextProject }) {
  return <ProjectCaseStudy project={project} nextProject={nextProject} />;
}
