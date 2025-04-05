
import LoginForm from "@/components/auth/LoginForm";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Login = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen-minus-header flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to continue your mental health journey
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
