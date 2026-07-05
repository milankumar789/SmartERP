import {

    useEffect,

    useState

} from "react";

import Input from "../common/Input";

import Button from "../common/Button";

import {

    EMPTY_CUSTOMER

} from "../../models/Customer";

export default function CustomerForm({

    customer,

    onSubmit,

    onCancel

}) {

    const [

        form,

        setForm

    ] = useState(

        EMPTY_CUSTOMER

    );

    useEffect(() => {

        setForm(

            customer ||

            EMPTY_CUSTOMER

        );

    }, [

        customer

    ]);

    function handleChange(event) {

        setForm({

            ...form,

            [

                event.target.name

            ]: event.target.value

        });

    }

    function submit(event) {

        event.preventDefault();

        onSubmit(form);

    }

    return (

        <form

            onSubmit={submit}

        >

            <Input

                id="name"

                label="Customer Name"

                name="name"

                value={form.name}

                onChange={handleChange}

                required

                autoFocus

            />

            <Input

                id="email"

                label="Email"

                name="email"

                type="email"

                value={form.email}

                onChange={handleChange}

            />

            <Input

                id="phone"

                label="Phone"

                name="phone"

                value={form.phone}

                onChange={handleChange}

                required

            />

            <div className="erp-form-group">

                <label>

                    Address

                </label>

                <textarea

                    className="erp-textarea"

                    name="address"

                    value={form.address}

                    onChange={handleChange}

                />

            </div>

            <div

                className="erp-toolbar"

            >

                <Button

                    type="submit"

                >

                    Save

                </Button>

                <Button

                    variant="secondary"

                    type="button"

                    onClick={onCancel}

                >

                    Cancel

                </Button>

            </div>

        </form>

    );

}