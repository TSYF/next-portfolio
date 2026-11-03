import { describe, expect, it } from "vite-plus/test";
import {
  archiveProjects,
  featuredProjects,
  getNextProject,
  getProjectBySlug,
  projects,
} from "./projects";

describe("project case-study data", () => {
  it("features three newer projects and keeps both early projects in the archive", () => {
    expect(featuredProjects.map((project) => project.slug)).toEqual([
      "nestjs-d2-diagrams",
      "c-webserver",
      "go-router",
    ]);
    expect(archiveProjects.map((project) => project.slug)).toEqual(["cursos-alfaweb", "e-library"]);
  });

  it("provides unique routes and complete content for the shared case-study component", () => {
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);

    for (const project of projects) {
      expect(project.title).toBeTruthy();
      expect(project.summary).toBeTruthy();
      expect(project.overview).toBeTruthy();
      expect(project.challenge).toBeTruthy();
      expect(project.architecture).toHaveLength(3);
      expect(project.highlights.length).toBeGreaterThanOrEqual(4);
      expect(project.repo).toMatch(/^https:\/\/github\.com\/TSYF\//);
      expect(["cyan", "orange", "violet"]).toContain(project.tone);
      expect(["diagram", "server", "router", "screenshot"]).toContain(project.visual);
    }
  });

  it("resolves projects and cycles the next-project navigation", () => {
    expect(getProjectBySlug("cursos-alfaweb").title).toBe("Cursos Alfaweb");
    expect(getProjectBySlug("missing-project")).toBeUndefined();
    expect(getNextProject("nestjs-d2-diagrams").slug).toBe("c-webserver");
    expect(getNextProject("e-library").slug).toBe("nestjs-d2-diagrams");
  });
});
