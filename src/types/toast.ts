import { ReactNode } from "react";

type ToastVariant = "default" | "success";

export interface ToastProps {
  variant?: ToastVariant;
  message?: string;
  duration?: number;
  render?: () => React.ReactNode;
  isShow?: boolean;
  position?: string;
}

export interface ToastContextProps {
  toast: (props: ToastProps) => void;
}

type ToasterPositionVariables =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToasterProps {
  children: ReactNode;
  position: ToasterPositionVariables;
}
