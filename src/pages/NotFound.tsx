import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-main font-bold text-primary tracking-widest">404</h1>
        <p className="text-xl font-main text-muted-foreground">Oops! The page you're looking for doesn't exist.</p>
        <a
          href="/"
          className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-full font-main text-base tracking-wide transition-all hover:brightness-110"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
