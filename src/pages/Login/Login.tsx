import { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Loader2,
  Brain,
  Sparkles,
  TrendingUp,
  Target,
} from "lucide-react";
import { FaChrome as Chrome, FaGithub as Github } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import authApi from "@/api/authApi";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    // handle login
    try {
      const res = await authApi.login({ email, password });

      const token = res.results.accessToken;

      await login(token);

      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({ password: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Brain className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-semibold">AI Study Manager</h1>
            </div>

            <h2 className="text-4xl font-semibold mb-6">
              Boost your learning with AI
            </h2>

            <p className="text-lg text-white/90 mb-12 leading-relaxed">
              Transform your study routine with intelligent scheduling,
              personalized roadmaps, and AI-powered insights that adapt to your
              learning style.
            </p>

            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">AI-Powered Planning</h3>
                  <p className="text-white/80 text-sm">
                    Smart study schedules that adapt to your progress and
                    learning patterns
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Track Your Progress</h3>
                  <p className="text-white/80 text-sm">
                    Visualize your learning journey with detailed analytics and
                    insights
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Achieve Your Goals</h3>
                  <p className="text-white/80 text-sm">
                    Stay focused and motivated with personalized milestones and
                    achievements
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-card/50 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-semibold mb-2">Welcome back</h2>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`pl-10 h-11 bg-input-background border-border focus:border-primary transition-colors ${
                      errors.email ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`pl-10 h-11 bg-input-background border-border focus:border-primary transition-colors ${
                      errors.password ? "border-destructive" : ""
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all hover:shadow-lg hover:shadow-primary/25"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 border-border hover:bg-accent hover:border-accent-foreground/20 transition-all"
                onClick={() => handleSocialLogin("google")}
              >
                <Chrome className="w-4 h-4 mr-2" />
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 border-border hover:bg-accent hover:border-accent-foreground/20 transition-all"
                onClick={() => handleSocialLogin("github")}
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Don't have an account?{" "}
              </span>
              <Link
                to="/register"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            By continuing, you agree to our{" "}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
