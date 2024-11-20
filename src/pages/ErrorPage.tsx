import { Link } from 'react-router-dom';
import useTheme from '../hooks/useTheme';

function ErrorPage() {
  const [_] = useTheme(); // Access theme hook (value not used here)

  return (
    <section className="h-dvh grid place-items-center bg-default">
      {/* Container for error content */}
      <div className="text-default w-full max-w-sm text-center">
        {/* Sad emoji */}
        <p className="text-6xl mb-5">&#128543;</p>

        {/* Error title */}
        <h1 className="default-text text-2xl text-red-400">Error</h1>

        {/* Error message */}
        <p className="default-text text-lg">It seems you lost.</p>

        {/* Navigation button back to the home page */}
        <button className="mt-4">
          <Link
            to="/"
            className="inline-block default-text text-base bg-blue-500 text-white px-2 py-1 border-default rounded-md"
          >
            Go back to home
          </Link>
        </button>
      </div>
    </section>
  );
}

export default ErrorPage;
