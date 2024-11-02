import LabelComponent from "../label.component";
import { ChangeEvent } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { getErrorMessage } from "../../helpers/core.functions";

interface Option {
  value: string | number;
  label: string;
}

export interface ISelectComponent {
  idSelect: string;
  register?: UseFormRegister<any>;
  className?: string;
  label?: string;
  classNameLabel?: string;
  errors?: FieldErrors;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  defaultValue?: string | number;
  id?: string;
  optionsRegister?: Record<string, any>;
}

export function SelectComponent({
  idSelect,
  register,
  className,
  label,
  classNameLabel,
  errors,
  disabled,
  onChange,
  options,
  defaultValue = "",
  id,
  optionsRegister = {},
}: ISelectComponent) {
  const messageError = getErrorMessage(errors, idSelect);

  return (
    <div className={className}>
      <LabelComponent
        type="FormInput"
        htmlFor={idSelect}
        className={classNameLabel}
        value={label ?? ""}
      />
      <div>
        <select
          className={`${
            messageError
              ? "border-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          } block w-full rounded-lg border bg-gray-50 p-2.5 text-sm text-gray-900 disabled:opacity-55`}
          {...(register ? register(idSelect, optionsRegister) : {})}
          id={id}
          name={idSelect}
          disabled={disabled}
          onChange={onChange}
          defaultValue={defaultValue}
        >
          <option key={""} value={""}>
            Seleccionar...
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {messageError && (
          <div className="text-sm text-red-500">{messageError}</div>
        )}
      </div>
    </div>
  );
}
