import { Link } from "react-router-dom";

const ForgotPassword = () => {
    return (
        <div className="w-full max-w-md">
            <h2 className="text-3xl font-semibold text-center text-white">
                Reset Password
            </h2>
            <p className="mt-2 text-center text-gray-400 text-sm">
                Enter your email and we'll send you a reset link
            </p>

            <form className="mt-8 space-y-5">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-lg bg-[#0A0F1F] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700 transition"
                >
                    Send Reset Link
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
                Remember your password?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Back to Login
                </Link>
            </p>
        </div>
    );
};

export default ForgotPassword;
