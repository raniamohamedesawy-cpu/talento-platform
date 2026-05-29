import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useToast } from "./Toast";
import { Logo } from "./Logo";
import * as authApi from "../api/authApi";

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

type Mode = "login" | "register";

export function AuthModal({ onSuccess, onClose }: Props) {
  const { toast } = useToast();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        await authApi.login({ email, password });
        toast("Welcome back!", "success");
      } else {
        await authApi.register({ name, email, password });
        toast("Account created! Welcome to Talento.", "success");
      }
      onSuccess();
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Something went wrong. Please try again.";
      toast(msg, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[var(--navy)] border border-[var(--navy-light)] rounded-2xl p-8 w-full max-w-sm shadow-2xl"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="mb-6 text-center">
          <Logo variant="navbar" className="h-8 w-auto mx-auto mb-4" />
          <h2 id="auth-modal-title" className="text-xl font-semibold text-white">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-white/60 mt-1">
            {mode === "login"
              ? "Sign in to continue to Talento"
              : "Start exchanging skills today"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-white/80 text-sm">
                Full name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                className="bg-[var(--navy-light)] border-[var(--navy-light)] text-white placeholder:text-white/40"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-white/80 text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-[var(--navy-light)] border-[var(--navy-light)] text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-white/80 text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              className="bg-[var(--navy-light)] border-[var(--navy-light)] text-white placeholder:text-white/40"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--primary-foreground)] font-semibold mt-2"
          >
            {loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-white/60 mt-5">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-[var(--primary)] hover:underline font-medium"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
