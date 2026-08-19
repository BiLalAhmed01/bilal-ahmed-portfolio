import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Certifications } from "./Certifications";
import { CERTIFICATIONS } from "@/data/certifications";

describe("Certifications", () => {
  it("shows the first certificate and advances with the Next button", async () => {
    const user = userEvent.setup();
    render(<Certifications />);

    expect(screen.getByText(CERTIFICATIONS[0].title)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next certificate" }));

    expect(await screen.findByText(CERTIFICATIONS[1].title)).toBeInTheDocument();
  });

  it("opens the PDF preview dialog and closes it with the close button", async () => {
    const user = userEvent.setup();
    render(<Certifications />);

    await user.click(screen.getByRole("button", { name: "View PDF" }));
    expect(screen.getByRole("dialog", { name: CERTIFICATIONS[0].title })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close certificate preview" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("closes the PDF preview dialog on Escape", async () => {
    const user = userEvent.setup();
    render(<Certifications />);

    await user.click(screen.getByRole("button", { name: "View PDF" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
