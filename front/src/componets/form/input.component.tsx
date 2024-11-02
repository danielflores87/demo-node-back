import React from "react";
import LabelComponent from "../label.component";
import { UseFormRegister } from "react-hook-form";
import { getErrorMessage } from "../../helpers/core.functions";


export interface IInputComponent {
  idInput: string;
  typeInput: string;
  register?: UseFormRegister<any>;
  className?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  label?: string | React.JSX.Element;
  classNameLabel?: string;
  errors?: any;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  optionsRegister?: {};
  max?: number;
  min?: number;
}

export function InputComponent({
  idInput,
  typeInput,
  register,
  className,
  placeholder,
  value,
  label,
  classNameLabel,
  errors,
  disabled,
  onChange,
  defaultValue,
  id,
  optionsRegister = {},
  max,
  min,
}: Readonly<IInputComponent>): React.JSX.Element {
  const messageError = getErrorMessage(errors, idInput);

  return (
    <div className={className}>
      <LabelComponent
        type="FormInput"
        htmlFor={idInput}
        className={classNameLabel}
        value={label ?? ""}
      />
      <div>
        <input
          className={` ${messageError ? "border-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"} block w-full rounded-lg border bg-gray-50  p-2.5 text-sm text-gray-900 disabled:opacity-55 `}
          {...(register ? register(idInput, optionsRegister) : {})}
          id={id}
          name={idInput}
          type={typeInput}
          placeholder={placeholder}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          value={value}
          maxLength={max}
          minLength={min}
          max={max}
          min={min}
        />
        {messageError && (
          <div className="text-sm text-red-500">{messageError}</div>
        )}
      </div>
    </div>
  );
}
