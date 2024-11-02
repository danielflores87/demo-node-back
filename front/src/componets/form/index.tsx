import React from "react";
import { IInputComponent, InputComponent } from "./input.component";
import { ButtonComponent, IButtonComponent } from "../button.component";
import { ISelectComponent, SelectComponent } from "./select.componet";

interface IFormBaseComponent {
  id?: string;
  onSubmit?: () => void;
  className?: string;
  children: React.JSX.Element | React.JSX.Element[];
}

function FormBaseComponent(
  props: Readonly<IFormBaseComponent>
): React.JSX.Element {
  return (
    <form className={props.className} id={props.id} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
}

export interface IFormComponent {
  (props: IFormBaseComponent): JSX.Element;
  Input: (props: IInputComponent) => JSX.Element;
  Select: (props: ISelectComponent) => JSX.Element;
  Button: (props: IButtonComponent) => JSX.Element;
}

export const FormComponent: IFormComponent = Object.assign(FormBaseComponent, {
  Input: InputComponent,
  Select: SelectComponent,
  Button: ButtonComponent,
});
