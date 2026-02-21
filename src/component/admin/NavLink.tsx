import React from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link className="nav-link" to={href}>
      {children}
    </Link>
  );
}
