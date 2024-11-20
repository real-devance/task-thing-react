type ErrorMessageProps = {
    message?: string; // message to display
}

function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) return null; // Return null if there's no message to display
  return (
    <span className="text-red-500 italic text-xs">{message}</span>
  )
}

export default ErrorMessage;
