import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto h-96 max-w-md rounded-2xl" />}>
      <SignInForm />
    </Suspense>
  );
}
