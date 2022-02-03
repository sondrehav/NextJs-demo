import classNames from "classnames";
import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  HTMLProps,
  useEffect,
  useState,
} from "react";
import {
  buttonCommon,
  buttonPrimary,
  buttonSecondary,
  inputCommon,
} from "lib/classes";
import Square from "icons/square.svg";
import SquareCheck from "icons/square-check.svg";

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  ComponentProps<"textarea"> & {
    label: string;
    errorMessage?: string;
    showError?: boolean;
  }
>(({ label, errorMessage, showError, ...props }, ref) => {
  return (
    <>
      <label className={"text-xl my-4"} htmlFor={props.id}>
        {label}
      </label>
      <textarea
        {...props}
        className={classNames("font-mono", inputCommon, props.className)}
      />
      {showError && (
        <span className={"font-bold text-sm text-red-500"}>{errorMessage}</span>
      )}
    </>
  );
});
TextArea.displayName = "TextArea";

export const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input"> & {
    label: string;
    errorMessage?: string;
    showError?: boolean;
    wrapperProps?: HTMLProps<HTMLDivElement>;
  }
>(({ label, showError, errorMessage, wrapperProps, ...props }, ref) => {
  return (
    <div
      {...wrapperProps}
      className={classNames(
        "flex flex-col my-2 space-y-2",
        wrapperProps?.className
      )}
    >
      <label htmlFor={props.id}>{label}</label>
      <input {...props} ref={ref} className={classNames(inputCommon)} />
      {showError && (
        <span className={"font-bold text-sm text-red-500"}>{errorMessage}</span>
      )}
    </div>
  );
});
Input.displayName = "Input";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button"> & {
    label?: string;
    variant?: "primary" | "secondary";
    errorMessage?: string;
    showError?: boolean;
  }
>(({ label, showError, errorMessage, variant = "primary", ...props }, ref) => {
  return (
    <>
      <button
        {...props}
        ref={ref}
        className={classNames(
          buttonCommon,
          {
            [buttonPrimary]: variant === "primary",
            [buttonSecondary]: variant === "secondary",
          },
          props.className
        )}
      >
        {label && <span>{label}</span>}
        {props.children}
      </button>
      {showError && (
        <span className={"font-bold text-sm text-red-500"}>{errorMessage}</span>
      )}
    </>
  );
});
Button.displayName = "Input";

export const Checkbox = forwardRef<
  HTMLInputElement,
  Omit<ComponentProps<"input">, "value" | "onChange"> & {
    label?: string;
    value?: boolean;
    onChange?: (value: boolean) => any;
    wrapperProps?: HTMLProps<HTMLDivElement>;
  }
>(({ label, wrapperProps, ...props }, ref) => {
  const [checked, setChecked] = useState<boolean>(props.value ?? false);

  useEffect(() => {
    props.onChange && props.onChange(checked);
  }, [checked]);

  return (
    <div
      {...wrapperProps}
      onClick={() => {
        setChecked(!checked);
      }}
      className={classNames(
        "inline-flex flex space-x-2 items-center cursor-pointer select-none w-max",
        "transition-all text-gray-300 hover:text-current",
        classNames({ "text-gray-600": props.disabled }),
        wrapperProps?.className
      )}
    >
      {props.value ? (
        <SquareCheck width={16} height={16} className={"fill-current"} />
      ) : (
        <Square width={16} height={16} className={"fill-current"} />
      )}
      {label && (
        <label htmlFor={props.id} className={"cursor-pointer"}>
          {label}
        </label>
      )}
      <input
        className={"hidden"}
        {...props}
        value={checked ? "true" : "false"}
        checked={checked}
        onChange={(e) => {
          setChecked(e.target.checked);
        }}
      />
    </div>
  );
});
Checkbox.displayName = "Checkbox";
