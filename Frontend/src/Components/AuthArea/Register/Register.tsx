import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthServices";
import "./Register.css";

function Register(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<UserModel>()
    const navigate = useNavigate()

    async function send(user: UserModel) {
        try {
            await authService.register(user);
            alert("Welcome " + user.firstName)
            navigate("/")
        } catch (error: any) {
            alert(error.message)
        }
    }

    return (
        <div className="Register Box">

			<h2>Register</h2>

            <form onSubmit={handleSubmit(send)}>

                <label>First Name:</label>
                <input type="text" {...register("firstName", UserModel.firstNameValidation)} />
                <span className="Err">{formState.errors.firstName?.message}</span>

                <label>Last Name:</label>
                <input type="text" {...register("lastName", UserModel.lastNameValidation)} />
                <span className="Err">{formState.errors.lastName?.message}</span>


                <label>Username:</label>
                <input type="text" {...register("username", UserModel.usernameValidation)} />
                <span className="Err">{formState.errors.username?.message}</span>

                <label>Password:</label>
                <input type="password" {...register("password", UserModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button type="submit">Register</button>

            </form>

        </div>
    );
}

export default Register;
