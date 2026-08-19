import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Nav } from "./Nav";

describe("Nav", () => {
  it("opens the mobile menu and shows all section links", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "About" }).length).toBeGreaterThan(0);
  });

  it("marks the closed mobile menu inert so its links aren't keyboard-focusable", () => {
    render(<Nav />);
    const closedLinks = screen.getAllByRole("link", { name: "About", hidden: true });
    const mobileOnlyLink = closedLinks.find((el) => el.closest("[aria-hidden='true']"));
    expect(mobileOnlyLink?.closest("[inert]")).not.toBeNull();
  });

  it("closes the mobile menu when a link is clicked", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    const mobileLinks = screen.getAllByRole("link", { name: "Contact" });
    await user.click(mobileLinks[mobileLinks.length - 1]);

    expect(screen.getByRole("button", { name: "Open menu" })).toBeInTheDocument();
  });
});
