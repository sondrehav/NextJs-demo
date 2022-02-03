import { createPortal } from "react-dom";
import React, { cloneElement, ReactElement, useEffect, useRef } from "react";
import classNames from "classnames";

const Modal = ({
  onBgClick,
  visible,
  children,
}: {
  onBgClick?: (event: MouseEvent) => void;
  visible: boolean;
  children: ReactElement;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!visible) return;
    const onClick = (ev: MouseEvent) => {
      if (containerRef.current?.contains(ev.target as Node)) {
        ev.stopPropagation();
        return;
      }
      onBgClick && onBgClick(ev);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [visible]);

  if (typeof document === "undefined")
    throw new Error("This component can only be dynamically imported!");
  // if (!ref.current) return null;

  return createPortal(
    <div
      className={classNames(
        "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 opacity-0 transition-opacity",
        "backdrop-filter backdrop-blur",
        { "opacity-100": visible }
      )}
      style={{ pointerEvents: visible ? "visible" : "none" }}
    >
      <div
        className={classNames(
          "relative h-full transform transition-transform z-50",
          visible ? "translate-y-0" : "translate-y-16"
        )}
      >
        {cloneElement(children, { ref: containerRef })}
      </div>
    </div>,
    document.getElementById("portal-output")!
  );
};

export default Modal;
