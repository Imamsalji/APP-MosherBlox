import { useEffect } from "react";
import "./../../assets/css/Toast.css";

type ToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  show,
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="cyber-toast">
      <div className="cyber-toast-inner">⚡ {message}</div>
    </div>
  );
}
