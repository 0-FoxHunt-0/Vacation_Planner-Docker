import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthServices";
import notify from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>()
    const navigate = useNavigate()


    async function send(credentials: CredentialsModel): Promise<void> {
        try {
            await authService.login(credentials);
            notify.success(`Welcome back ${credentials.email}!`);
            navigate("/");
        } catch (error: any) {
            notify.error(error)
        }
    }

    return (
        <div className="Login Box">
			
            <h2>Login</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>Email:</label>
                <input type="text" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button type="submit">Login</button>

            </form>

        </div>
    );
}

export default Login;
