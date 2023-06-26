import { useState, useEffect, createContext, useContext } from "react";
import styles from "../styles/toast.module.css";
import closeIcon from "../assets/cross.png";
import { ToastContextProps, ToastProps, ToasterProps } from "~/types/toast";

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const Toaster = ({ children, position }: ToasterProps) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const {
      variant = "default",
      message = "",
      duration = 3000,
      render,
      isShow = true,
    } = props;

    setToasts((prevState) => [
      ...prevState,
      {
        variant,
        message,
        duration,
        render,
        isShow,
        position,
      },
    ]);
  };

  const handleToastClose = (e: ToastProps) => {
    setToasts((prevState) =>
      prevState.map((toast) => {
        if (toast === e) {
          return { ...toast, isShow: false };
        }
        return toast;
      })
    );
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    toasts.forEach((toast) => {
      const timer = setTimeout(() => {
        setToasts((prevState) =>
          prevState.map((toast, idx) => {
            if (prevState.length > idx) {
              return { ...toast, isShow: false };
            }
            return toast;
          })
        );
      }, toast.duration || 3000);

      timers.push(timer);
    });
    console.log(toasts);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {toasts.map((toast, idx) =>
        toast.isShow ? (
          <div
            key={idx}
            className={`${styles.toast} ${
              toast.variant ? styles[toast.variant] : ""
            } ${toast.isShow ? styles.active : ""} ${
              toast.position ? styles[toast.position] : ""
            }`}
            style={{
              animationDuration: `${String((toast.duration || 3000) / 1000)}s`,
            }}
          >
            {toast.render ? toast.render() : <div>{toast.message}</div>}
            <span
              className={styles.close}
              onClick={() => handleToastClose(toast)}
            >
              <img src={closeIcon} alt="닫기 버튼" />
            </span>
          </div>
        ) : undefined
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
