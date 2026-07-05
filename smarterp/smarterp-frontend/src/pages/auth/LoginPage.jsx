import {

    useState

} from "react";

import {

    Link,

    useNavigate

} from "react-router-dom";

import toast from "react-hot-toast";

import Input from "../../components/common/Input";

import Button from "../../components/common/Button";

import authService from "../../services/authService";

import useAuth from "../../hooks/useAuth";

import "../../styles/login.css";

export default function LoginPage() {

    const navigate = useNavigate();

    const {

        login

    } = useAuth();

    const [

        form,

        setForm

    ] = useState({

        email: "",

        password: ""

    });

    function handleChange(event) {

        setForm({

            ...form,

            [

                event.target.name

            ]: event.target.value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const response = await authService.login(

                form

            );

            login(response);

            toast.success(

                "Login successful."

            );

            navigate("/dashboard");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Invalid credentials."

            );

        }

    }

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h1>

                    SmartERP

                </h1>

                <form

                    onSubmit={handleSubmit}

                >

                    <Input

                        id="email"

                        label="Email"

                        name="email"

                        type="email"

                        value={form.email}

                        onChange={handleChange}

                        autoFocus

                        required

                    />

                    <Input

                        id="password"

                        label="Password"

                        name="password"

                        type="password"

                        value={form.password}

                        onChange={handleChange}

                        required

                    />

                    <Button

                        type="submit"

                    >

                        Login

                    </Button>

                </form>

                <p>

                    New User?

                    {" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}