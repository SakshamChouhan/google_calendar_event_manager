import { ReactNode } from "react";
import clsx from "clsx";

export function Table({ children, className }: { children: ReactNode; className?: string }) {
  return <table className={clsx("w-full border-collapse", className)}>{children}</table>;
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, className }: { children: ReactNode; className?: string }) {
  return <tr className={clsx("border-b", className)}>{children}</tr>;
}

export function TableHead({ children }: { children: ReactNode }) {
  return <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">{children}</th>;
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-4 py-2 text-sm text-gray-600">{children}</td>;
}
