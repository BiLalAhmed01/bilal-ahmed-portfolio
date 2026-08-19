import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Contact } from "./Contact";

async function fillForm(user: ReturnType<typeof userEvent.setup>, form: HTMLElement) {
  await user.type(within(form).getByLabelText("Name"), "Jane Doe");
  await user.type(within(form).getByLabelText("Email"), "jane@example.com");
  await user.type(within(form).getByLabelText("Subject"), "Hello");
  await user.type(within(form).getByLabelText("Message"), "A test message.");
}

describe("Contact", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the form to Formspree and shows the sent confirmation", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });

    const user = userEvent.setup();
    const { container } = render(<Contact />);
    await fillForm(user, container.querySelector("form")!);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Thanks"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://formspree.io/f/xaewlknp");
    expect(JSON.parse(options.body)).toMatchObject({
      name: "Jane Doe",
      email: "jane@example.com",
      subject: "Hello",
      message: "A test message.",
    });
  });

  it("disables the submit button while a submission is in flight, so a second Enter can't fire a duplicate POST", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    let resolveFetch: (value: { ok: boolean; status: number }) => void = () => {};
    fetchMock.mockReturnValueOnce(new Promise((resolve) => (resolveFetch = resolve)));

    const user = userEvent.setup();
    const { container } = render(<Contact />);
    await fillForm(user, container.querySelector("form")!);

    const submitButton = screen.getByRole("button", { name: "Send Message" });
    await user.click(submitButton);

    const sendingButton = screen.getByRole("button", { name: "Sending…" });
    expect(sendingButton).toBeDisabled();

    await user.keyboard("{Enter}");
    expect(fetchMock).toHaveBeenCalledTimes(1);

    resolveFetch({ ok: true, status: 200 });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Thanks"));
  });

  it("shows an error message when Formspree responds with a failure status", async () => {
    const fetchMock = fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce({ ok: false, status: 500 });

    const user = userEvent.setup();
    const { container } = render(<Contact />);
    await fillForm(user, container.querySelector("form")!);
    await user.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong"));
  });
});
