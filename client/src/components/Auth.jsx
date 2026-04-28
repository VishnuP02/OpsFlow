import { useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "../supabaseClient";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Logged in successfully.");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast.success(
          "Account created. Check your email if confirmation is required."
        );
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleAuth}>
        <h1>OpsFlow</h1>

        <p>{isLogin ? "Login to your account" : "Create your account"}</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="auth-buttons">
          <button type="submit" disabled={loading}>
            {loading
              ? "Loading..."
              : isLogin
              ? "Login"
              : "Sign Up"}
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;