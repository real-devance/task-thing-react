import UserForm from './UserForm';

function LoginCard() {
  return (
    // Container for the login card
    <div className="bg-default w-72 xs:w-96 border-default rounded-md px-2 py-4">
      {/* Title for the login card */}
      <h1 className="text-default text-lg text-center mb-4">Get Started</h1>

      {/* Render the UserForm component */}
      <UserForm />
    </div>
  );
}

export default LoginCard;
