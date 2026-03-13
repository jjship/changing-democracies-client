import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BioSidePanel } from "../BioSidePanel";

// Mock Radix UI Themes to simple divs
vi.mock("@radix-ui/themes", () => ({
  Box: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  Flex: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    direction?: string;
  }) => <div className={className}>{children}</div>,
}));

describe("BioSidePanel", () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    personName: "Jane Doe",
    countryName: "Belgium",
    bio: "A researcher focused on democracy.",
  };

  it("renders person name, country, and bio when open", () => {
    render(<BioSidePanel {...defaultProps} />);
    expect(screen.getByText("Jane Doe,")).toBeInTheDocument();
    expect(screen.getByText("Belgium")).toBeInTheDocument();
    expect(
      screen.getByText("A researcher focused on democracy."),
    ).toBeInTheDocument();
  });

  it("shows fallback text when bio is undefined", () => {
    render(<BioSidePanel {...defaultProps} bio={undefined} />);
    expect(screen.getByText("No biography available.")).toBeInTheDocument();
  });

  it("calls onClose on close button click", async () => {
    const onClose = vi.fn();
    render(<BioSidePanel {...defaultProps} onClose={onClose} />);
    const button = screen.getByRole("button");
    await userEvent.click(button);
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("has -translate-x-full class when closed", () => {
    const { container } = render(
      <BioSidePanel {...defaultProps} isOpen={false} />,
    );
    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toContain("-translate-x-full");
  });

  it("has translate-x-0 class when open", () => {
    const { container } = render(<BioSidePanel {...defaultProps} />);
    const panel = container.firstChild as HTMLElement;
    expect(panel.className).toContain("translate-x-0");
  });
});
