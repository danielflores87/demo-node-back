import React from "react";

interface ILabelProps {
  value: string | React.JSX.Element;
  type: "Title" | "SubTitle" | "FormInput" | "Regular";
  display?: "Center" | "Left" | "Rigth";
  className?: string;
  htmlFor?: string;
}

function LabelComponent({
  value,
  type,
  display,
  className,
  htmlFor,
}: Readonly<ILabelProps>): React.JSX.Element {
  let classNameLabel = "";
  let clasNameText = "";
  let hasRequiredSymbol: boolean = false;

  if (typeof value == "string" && value.endsWith("*")) {
    hasRequiredSymbol = true;
  }

  switch (display) {
    case "Center":
      clasNameText = "w-full text-center";
      break;

    case "Left":
      clasNameText = "w-full text-left";
      break;

    case "Rigth":
      clasNameText = "w-full text-right";
      break;

    default:
      clasNameText = "w-fit";
      break;
  }

  switch (type) {
    case "Title":
      classNameLabel = "font-bold text-2xl ";
      break;

    case "SubTitle":
      classNameLabel = "font-semibold text-xl";
      break;

    case "FormInput":
      classNameLabel = "font-semibold text-base ";
      break;

    default:
      classNameLabel = "text-base";
      break;
  }

  return (
    <div className={`${className} ${clasNameText} mb-2  tracking-wide`}>
      <label htmlFor={htmlFor} className={classNameLabel}>
        {hasRequiredSymbol ? (
          <>
            {String(value).slice(0, -1)}
            <span className="text-red-500"> *</span>
          </>
        ) : (
          <>{value}</>
        )}
      </label>
    </div>
  );
}

export default React.memo(LabelComponent);
