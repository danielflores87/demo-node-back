import {
  ButtonsCardComponent,
  IButtonsCardComponent,
} from "./buttons-card.component";
import {
  ContentCardComponent,
  IContentCardComponent,
} from "./content-card.component";
import { GridCardComponent, IGridCardComponent } from "./grid-card.component";

interface IPageBaseComponent {
  children?: React.ReactElement | React.ReactElement[];
  className?: string;
}

function PageBaseComponent({
  children,
  className,
}: Readonly<IPageBaseComponent>) {
  return <div className={`${className} p-5`}>{children}</div>;
}

export interface IPageComponent {
  ({ children }: IPageBaseComponent): JSX.Element;
  ContentCard: (props: IContentCardComponent) => JSX.Element;
  GridCard: (props: IGridCardComponent) => JSX.Element;
  ButtonsCard: (props: IButtonsCardComponent) => JSX.Element;
}

export const PageComponent: IPageComponent = Object.assign(PageBaseComponent, {
  ContentCard: ContentCardComponent,
  GridCard: GridCardComponent,
  ButtonsCard: ButtonsCardComponent,
});
