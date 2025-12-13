import RegistrationForm from "@/components/RegistrationForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-2 drop-shadow-md">
          Join the Competition
        </h1>
        <p className="text-purple-100 text-lg">
          Fill out the form below to get your admit card instantly.
        </p>
      </div>
      <RegistrationForm />
    </div>
  );
}
