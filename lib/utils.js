import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function checkPermissions(userRoles, requiredRoles) {
  return requiredRoles.some((role) => userRoles.includes(role));
}
