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

import "../../styles/login.css";

export default function RegisterPage() {

    const navigate = useNavigate();

    const [

        form,

        setForm

    ] = useState({

        fullName: "",

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

            await authService.register(

                form

            );

            toast.success(

                "Registration successful."

            );

            navigate("/login");

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration failed."

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

                        id="fullName"

                        label="Full Name"

                        name="fullName"

                        value={form.fullName}

                        onChange={handleChange}

                        autoFocus

                        required

                    />

                    <Input

                        id="email"

                        label="Email"

                        name="email"

                        type="email"

                        value={form.email}

                        onChange={handleChange}

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

                        Register

                    </Button>

                </form>

                <p>

                    Already have an account?

                    {" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );
}