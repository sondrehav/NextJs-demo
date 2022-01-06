import { Controller, FieldPath, Path } from "react-hook-form";
import {
  ControllerProps,
  FieldPathValue,
  FieldValues,
  UnpackNestedValue,
  UseFormStateReturn,
} from "react-hook-form/dist/types";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  cloneElement,
  ComponentProps,
  ComponentType,
  FormEvent,
  HTMLProps,
  ReactElement,
} from "react";
import {
  ControllerFieldState,
  ControllerRenderProps,
} from "react-hook-form/dist/types/controller";

const TransformController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  transform,
  render: WrappedRender,
  ...props
}: Omit<ControllerProps<TFieldValues, TName>, "render"> & {
  transform: {
    input: (
      value: string
    ) => UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
    output: (
      value: string
    ) => UnpackNestedValue<FieldPathValue<TFieldValues, TName>>;
  };
  render: ({
    field,
    fieldState,
    formState,
  }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<TFieldValues>;
  }) => ReactElement<ControllerRenderProps<TFieldValues, TName>>;
}) => (
  <Controller<TFieldValues, TName>
    {...props}
    render={({ field, ...rest }) => {
      const nField: ControllerRenderProps<TFieldValues, TName> = {
        ...field,
        onChange: (event: ChangeEvent<HTMLInputElement>) => {
          event.target.value = transform.output(event.target.value);
          return field.onChange(event);
        },
        value: transform.input(field.value),
      };
      return <WrappedRender {...rest} field={nField} />;
    }}
  />
);

export default TransformController;
