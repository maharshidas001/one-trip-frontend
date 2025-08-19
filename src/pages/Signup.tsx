import MaxWidth from "@/components/MaxWidth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/Auth";
import { Ring } from "ldrs/react";
import 'ldrs/react/Ring.css';
import useAuthStore from "@/zustand/authStore";
import { useForm } from "react-hook-form";

interface ISignupData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = () => {
  const { login, isAuthenticated } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [isAuthCheckLoading, setIsAuthCheckLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAuthStatus() {
      try {
        const res = await authService.getAuthStatus();
        if (res && res.data) {
          login(res.data);
        }
      } finally {
        setIsAuthCheckLoading(false); // Auth check is done
      }
    };

    getAuthStatus();
  }, [login, navigate]);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupData>();

  const onSubmit = (data: ISignupData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsFormLoading(true);

    authService
      .createUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        if (res) {
          login(res.data);
          toast.success("Signup successful!");
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Signup failed");
      })
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  if (isAuthCheckLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Ring color='black' size={20} />
    </div>
  };

  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  };

  return (
    <>
      <section className="w-full h-full py-10">
        <MaxWidth className="flex items-center justify-center">
          <div className="w-[400px]">
            <h2 className="text-3xl text-black text-center">Signup - One Trip</h2>
            <form className="w-full mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>

              <div className="grid gap-2">
                <label htmlFor="name-field">Name</label>
                <Input type="text" required id="name-field" placeholder="John Doe" className="py-5"
                  {...register("fullName", { required: 'Full Name is required.' })}
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

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

              <div className="mt-3 grid gap-2">
                <label htmlFor="password-field">Password</label>
                <div className="flex items-center gap-3">
                  <Input type={!showPassword ? 'password' : 'text'} required id="password-field" placeholder="Enter your Password" className="py-5"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <Button type="button" variant={'outline'} className="h-full" onClick={() => setShowPassword(!showPassword)}>
                    {!showPassword ? <Eye /> : <EyeClosed />}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="mt-3 grid gap-2">
                <label htmlFor="confirm_password-field">Confirm Password</label>
                <Input type="password" required id="confirm_password-field" placeholder="Re-Enter your Password" className="py-5"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="mt-4" disabled={isFormLoading}>Create Account {isFormLoading ? <Ring color="white" size={20} stroke={4} /> : ''}</Button>
            </form>
            <p className="mt-4">
              Already have an account? <Link to={'/auth/login'} className="text-primary underline">Login</Link>
            </p>
          </div>
        </MaxWidth>
      </section>
    </>
  )
}

export default Signup