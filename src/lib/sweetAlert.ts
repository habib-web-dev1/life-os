import Swal from "sweetalert2";

export const showSuccess = (title: string, text?: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    position: "top-end",
    background: "#f0fdf4",
    color: "#166534",
    iconColor: "#22c55e",
  });
};

export const showError = (title: string, text?: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    toast: true,
    position: "top-end",
    background: "#fef2f2",
    color: "#dc2626",
    iconColor: "#ef4444",
  });
};

export const showConfirm = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, Confirm it!",
    cancelButtonText: "Cancel",
    background: "#ffffff",
    color: "#1f2937",
  });
};

export const showLoading = (title: string) => {
  return Swal.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    background: "#ffffff",
    color: "#1f2937",
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
