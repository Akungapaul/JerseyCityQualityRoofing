import { describe, it, expect } from "vitest";
import { GALLERY_PROJECTS } from "@/data/gallery-projects";
import { getAllServiceSlugs } from "@/data/services";
import { getAllMunicipalitySlugs } from "@/data/municipalities";

describe("GALLERY_PROJECTS", () => {
  it("exports a non-empty array with at least 6 entries", () => {
    expect(GALLERY_PROJECTS.length).toBeGreaterThanOrEqual(6);
  });

  it("every project has required fields", () => {
    for (const project of GALLERY_PROJECTS) {
      expect(project.id).toBeDefined();
      expect(project.title).toBeDefined();
      expect(project.description).toBeDefined();
      expect(project.serviceSlug).toBeDefined();
      expect(project.citySlug).toBeDefined();
      expect(project.beforeImage).toBeDefined();
      expect(project.afterImage).toBeDefined();
      expect(project.beforeAlt).toBeDefined();
      expect(project.afterAlt).toBeDefined();
      expect(project.completionDate).toBeDefined();
      expect(project.projectDetails).toBeDefined();
      expect(project.projectDetails.length).toBeGreaterThan(0);
    }
  });

  it("every project.serviceSlug matches a valid service", () => {
    const validSlugs = getAllServiceSlugs();
    for (const project of GALLERY_PROJECTS) {
      expect(validSlugs).toContain(project.serviceSlug);
    }
  });

  it("every project.citySlug matches a valid municipality", () => {
    const validSlugs = getAllMunicipalitySlugs();
    for (const project of GALLERY_PROJECTS) {
      expect(validSlugs).toContain(project.citySlug);
    }
  });

  it("every project has descriptive alt text (not filename)", () => {
    for (const project of GALLERY_PROJECTS) {
      // Alt text must be descriptive (> 20 chars)
      expect(project.beforeAlt.length).toBeGreaterThan(20);
      expect(project.afterAlt.length).toBeGreaterThan(20);

      // Alt text must not contain file extensions
      const fileExtensions = [".jpg", ".png", ".webp", ".svg"];
      for (const ext of fileExtensions) {
        expect(project.beforeAlt).not.toContain(ext);
        expect(project.afterAlt).not.toContain(ext);
      }
    }
  });

  it("project IDs are unique", () => {
    const ids = GALLERY_PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("projects span at least 3 different services", () => {
    const uniqueServices = new Set(GALLERY_PROJECTS.map((p) => p.serviceSlug));
    expect(uniqueServices.size).toBeGreaterThanOrEqual(3);
  });

  it("projects span at least 3 different cities", () => {
    const uniqueCities = new Set(GALLERY_PROJECTS.map((p) => p.citySlug));
    expect(uniqueCities.size).toBeGreaterThanOrEqual(3);
  });
});
