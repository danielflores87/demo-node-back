import React from "react";
import { FaSpinner } from "react-icons/fa";

export interface IButtonComponent {
  value: string;
  buttonStyle: "Primary" | "Secondary" | "Tetriary";
  type?: "button" | "submit";
  icon?: React.ReactElement;
  action?: (e?: any) => void;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  form?: string;
  disabled?: boolean;
  loading?: boolean;
}

export function ButtonComponent({
  value,
  buttonStyle,
  type,
  icon,
  className,
  action = () => {},
  id,
  form,
  disabled,
  loading = false,
}: Readonly<IButtonComponent>): React.JSX.Element {
  const additional = className ?? "";
  switch (buttonStyle) {
    case "Primary":
      className =
        "tracking-wide py-3 px-4 inline-flex items-center gap-x-2 text-base  rounded-xl border border-transparent bg-gray-700 text-white hover:bg-gray-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";
      break;
    case "Secondary":
      className =
        "tracking-wide py-3 px-4 inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-600 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";
      break;
    case "Tetriary":
      className =
        "tracking-wide px-4 inline-flex items-center gap-x-2 text-base font-semibold rounded-lg border border-transparent text-blue-600 hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:bg-blue-800/30 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600";
      break;
  }

  return (
    <button
      type={type}
      id={id}
      form={form}
      className={`${className} ${additional}`}
      onClick={
        type !== "submit"
          ? (e) => {
              e.preventDefault();
              action(e);
            }
          : undefined
      }
      disabled={disabled || loading}
    >
      {loading && (
        <span className="text-xl">
          <FaSpinner />
        </span>
      )}
      {!loading && icon && <span className="text-xl">{icon}</span>}
      {value}
    </button>
  );
}
