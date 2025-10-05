import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="frost-card p-8 text-center space-y-4 max-w-md glow-ice">
        <h1 className="text-6xl font-heading font-bold text-primary">404</h1>
        <p className="text-xl text-foreground font-heading">Lost in the Winter Storm?</p>
        <p className="text-muted-foreground">This page doesn't exist in the Winter Arc</p>
        <a 
          href="/login" 
          className="inline-block mt-4 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:scale-105 glow-ice"
        >
          Return to Login
        </a>
      </div>
    </div>
  );
};

export default NotFound;
