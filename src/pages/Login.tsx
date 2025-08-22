import MaxWidth from "@/components/MaxWidth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authService } from "@/services/Auth";
import useAuthStore from "@/zustand/authStore";
import { Ring } from "ldrs/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";

interface ILoginData {
  email: string;
  password: string;
};

const Login = () => {

  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit = (data: ILoginData) => {
    setIsFormLoading(true);

    authService
      .loginUser({
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res) {
          login(res.data);
          toast.success("Login successful!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login failed");
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  return (
    <>
      <section className="w-full h-full py-10">
        <MaxWidth className="flex items-center justify-center">
          <div className="w-[400px]">
            <h2 className="text-3xl text-black text-center">Login - One Trip</h2>
            <form className="w-full mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <label htmlFor="email-field">Email</label>
                <Input type="email" required id="email-field" placeholder="your.gmail@example.com" className="py-5"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <label htmlFor="password-field">Password</label>
                <div className="flex gap-3">
                  <Input type={showPassword ? 'text' : "password"} required id="password-field" placeholder="Enter your Password" className="py-5"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <Button variant={'outline'} type="button" onClick={() => setShowPassword(!showPassword)}>
                    {!showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="mt-4" disabled={isFormLoading}>Login {isFormLoading ? <Ring color="white" size={20} stroke={4} /> : ''}</Button>
            </form>
            <p className="mt-4">
              Don't have an account? <Link to={'/auth/signup'} className="text-primary underline">Create Account.</Link>
            </p>
          </div>
        </MaxWidth>
      </section>
    </>
  )
}

export default Login