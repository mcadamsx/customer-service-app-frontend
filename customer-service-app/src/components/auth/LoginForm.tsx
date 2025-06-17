import Button from '../common/Button';
import Input from '../common/Inputs';
import  logo  from "../../assets/logo.jpg";



const LoginForm = () => {
    return (
        <div className="w-full max-w-md space-y-6">
            <div className="text-center">
                <div className="flex items-center justify-center  mb-6">
                    <img src={logo} alt="Customer Service" className="h-20" />
                    <h1 className="text-2xl font-semibold text-purple-900">Customer Service</h1>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
                <p className="text-gray-500">Please enter your details</p>
            </div>

            <form className="space-y-4">
                <Input
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                />

                <Input
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />

                <div className="flex justify-between items-center ">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="form-checkbox text-purple-900" />
                        Remember me for 20 days
                    </label>
                    <a href="/reset-password" className="text-sm text-purple-900 hover:underline">Forgot password?</a>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full flex items-center justify-center"
                >
                    <span className="text-white">Sign In</span>
                </Button>

            </form>

            <p className="text-center text-sm text-gray-600">
                Don’t have an account?{' '}
                <a href="/sign-up-admin" className="text-purple-900 hover:underline">Sign Up</a>
            </p>
        </div>
    );
};

export default LoginForm;
