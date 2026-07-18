// Copy for the custom 404 (SPEC §3.1/§15, P1). Renders under the root
// layout only (no nested route-group chrome — see app/not-found.tsx).

export const notFound = {
  heading: "Page not found",
  body: "The page you were looking for doesn't exist, or has moved. Here's how to find what you need instead.",
  links: [
    { href: "/services", label: "Browse treatments" },
    { href: "/pricing", label: "See treatment costs" },
    { href: "/contact", label: "Contact us" },
  ],
};
