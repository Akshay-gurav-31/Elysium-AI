import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-black py-12">
        <div className="text-center text-light-gray">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <p className="text-lg mb-6">The page you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block bg-navy-blue hover:bg-navy-blue-light text-light-gray px-4 py-2 rounded"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;