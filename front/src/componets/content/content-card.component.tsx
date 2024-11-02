import LabelComponent from "../label.component";

export interface IContentCardComponent {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  headOptions?: React.ReactElement | React.ReactElement[];
  icon?: React.ReactElement;
}

export function ContentCardComponent({
  children,
  className,
  style,
  title,
  icon,
  headOptions,
}: Readonly<IContentCardComponent>) {
  return (
    <div
      className={`border border-gray-300 p-5  shadow-inner sm:rounded-lg sm:shadow ${className}`}
      style={style}
    >
      {(title || headOptions) && (
        <div className=" m-4 flex flex-row justify-between ">
          <div className="flex gap-2">
            <span className="text-3xl">{icon}</span>
            <LabelComponent value={title ?? ""} type="Title" />
          </div>

          {headOptions ?? <></>}
        </div>
      )}
      {children}
    </div>
  );
}
