import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  const {
    values,
    errors,
    serverError,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useLoginForm({
    shouldGetCsrfCookie: true,
    csrfUrl: "/csrf-cookie",
  });

  return (
    <LoginForm
      values={values}
      errors={errors}
      serverError={serverError}
      isSubmitting={isSubmitting}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
