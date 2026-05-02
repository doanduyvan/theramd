import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";
import { PATHS } from "@/routes/paths";

const initialValues = {
  email: "",
  password: "",
  remember: false,
};

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function useLoginForm(options = {}) {
  const {
    shouldGetCsrfCookie = false,
    csrfUrl = "/csrf-cookie",
    redirectPath = null,
    onSuccess,
  } = options;

  const navigate = useNavigate();
  const location = useLocation();

  const setCredentials = useAuthStore((state) => state.setCredentials);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = useMemo(() => {
    if (redirectPath) return redirectPath;
    return location.state?.from?.pathname || PATHS.HOME || "/";
  }, [location.state, redirectPath]);

  function setFieldValue(name, value) {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target;

    setFieldValue(name, type === "checkbox" ? checked : value);
  }

  function validateForm() {
    const passLength = 3;

    const nextErrors = {};

    if (!values.email.trim()) {
      nextErrors.email = "Vui lòng nhập email.";
    } else if (!validateEmail(values.email.trim())) {
      nextErrors.email = "Email không đúng định dạng.";
    }

    if (!values.password) {
      nextErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (values.password.length < passLength) {
      nextErrors.password = `Mật khẩu phải có ít nhất ${passLength} ký tự.`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;
    if (!validateForm()) return;

    setIsSubmitting(true);
    setServerError("");

    try {
      const result = await authService.login({
        email: values.email.trim(),
        password: values.password,
        remember: values.remember,
      });

      setCredentials({
        user: result.data,
        accessToken: result.data.token,
      });

      if (typeof onSuccess === "function") {
        await onSuccess(result);
      }

      navigate(redirectTo, { replace: true });
    } catch (error) {
      if (error.status == 401) {
        setServerError("Thông tin đăng nhập không chính xác");
        return;
      }

      const message =
        "Lỗi hệ thống!" ||
        error?.response?.data?.message ||
        error?.message ||
        "Đăng nhập thất bại. Vui lòng thử lại.";

      setServerError(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setValues(initialValues);
    setErrors({});
    setServerError("");
    setIsSubmitting(false);
  }

  return {
    values,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  };
}

export default useLoginForm;
