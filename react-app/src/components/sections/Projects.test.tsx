import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Projects } from "./Projects";
import { PROJECTS } from "@/data/projects";

describe("Projects", () => {
  it("shows the first project by default and advances with Next", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    const sorted = [...PROJECTS].sort((a, b) => a.priority - b.priority);
    expect(screen.getAllByText(sorted[0].title).length).toBeGreaterThan(0);

    await user.click(screen.getByRole("button", { name: "Next project" }));
    expect(screen.getAllByText(sorted[1].title).length).toBeGreaterThan(0);
  });

  it("resets to the first project when the category filter changes", async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole("button", { name: "Next project" }));
    await user.click(screen.getByRole("button", { name: /^Web/ }));

    const webProjects = PROJECTS.filter((p) => p.categories.includes("Web")).sort(
      (a, b) => a.priority - b.priority
    );
    expect(screen.getAllByText(webProjects[0].title).length).toBeGreaterThan(0);
  });
});
