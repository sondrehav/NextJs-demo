import classNames from "classnames";
import { ComponentProps, forwardRef, HTMLProps } from "react";
import {
  buttonCommon,
  buttonPrimary,
  buttonSecondary,
  inputCommon,
} from "lib/classes";
import Dropzone from "react-dropzone";

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
  }
>(({ label, showError, errorMessage, ...props }, ref) => {
  return (
    <>
      <label className={"text-xl my-4"} htmlFor={props.id}>
        {label}
      </label>
      <input {...props} ref={ref} className={classNames(inputCommon)} />
      {showError && (
        <span className={"font-bold text-sm text-red-500"}>{errorMessage}</span>
      )}
    </>
  );
});
Input.displayName = "Input";

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button"> & {
    label: string;
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
        <span>{label}</span>
      </button>
      {showError && (
        <span className={"font-bold text-sm text-red-500"}>{errorMessage}</span>
      )}
    </>
  );
});
Button.displayName = "Input";
