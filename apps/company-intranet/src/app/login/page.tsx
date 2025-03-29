import { LoginForm } from "@/components/auth/LoginForm";
import { Building2 } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Geometric Pattern */}
      <div className="hidden lg:block w-1/2 bg-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-8 gap-1">
          {Array.from({ length: 64 }).map((_, i) => {
            const type = Math.floor(Math.random() * 4); // 0: circle, 1: triangle, 2: striped, 3: empty
            const shade = Math.floor(Math.random() * 3); // 0: light, 1: medium, 2: dark
            const shadeClass = [
              'bg-blue-100',
              'bg-blue-300',
              'bg-blue-900',
            ][shade];

            return (
              <div key={i} className="aspect-square relative">
                {type === 0 && (
                  <div className={`absolute inset-1 rounded-full ${shadeClass}`} />
                )}
                {type === 1 && (
                  <div className={`absolute inset-1 ${shadeClass}`} style={{
                    clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)'
                  }} />
                )}
                {type === 2 && (
                  <div className={`absolute inset-1 ${shadeClass}`} style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.2) 5px, rgba(255,255,255,0.2) 10px)`
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-blue-600">
              <Building2 size={32} />
              <h1 className="text-2xl font-bold">CompanyCo.</h1>
            </div>
            <p className="mt-2 text-gray-600">
              Welcome back! Please log in to your account.
            </p>
          </div>

          <LoginForm />

          <div className="text-center text-sm">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 