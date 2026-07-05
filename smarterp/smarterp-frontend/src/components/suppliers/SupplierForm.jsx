import {

    useEffect,

    useState

} from "react";

import Input from "../common/Input";

import Button from "../common/Button";

import {

    EMPTY_SUPPLIER

} from "../../models/Supplier";

export default function SupplierForm({

    supplier,

    onSubmit,

    onCancel

}) {

    const [

        form,

        setForm

    ] = useState(

        EMPTY_SUPPLIER

    );

    useEffect(() => {

        setForm(

            supplier ||

            EMPTY_SUPPLIER

        );

    }, [

        supplier

    ]);

    function handleChange(event) {

        setForm({

            ...form,

            [

                event.target.name

            ]: event.target.value

        });

    }

    function handleSubmit(event) {

        event.preventDefault();

        onSubmit(form);

    }

    return (

        <form

            className="supplier-form"

            onSubmit={handleSubmit}

        >

            <Input

                id="name"

                label="Supplier Name"

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

                    rows={4}

                />

            </div>

            <div className="supplier-form-buttons">

                <Button

                    type="submit"

                >

                    Save

                </Button>

                <Button

                    type="button"

                    variant="secondary"

                    onClick={onCancel}

                >

                    Cancel

                </Button>

            </div>

        </form>

    );

}