export interface IButtonsCardComponent {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
  style?: React.CSSProperties;
}

export function ButtonsCardComponent({
  children,
  className,
  style,
}: Readonly<IButtonsCardComponent>) {
  return (
    <div
      className={`mt-8 mb-2  flex flex-row justify-end gap-2 ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
