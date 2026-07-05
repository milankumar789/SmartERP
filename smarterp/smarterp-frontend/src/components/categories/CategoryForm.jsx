import {

    useEffect,

    useState

} from "react";

import Input from "../common/Input";

import Button from "../common/Button";

import {

    EMPTY_CATEGORY

} from "../../models/Category";

export default function CategoryForm({

    category,

    onSubmit,

    onCancel

}) {

    const [

        form,

        setForm

    ] = useState(

        EMPTY_CATEGORY

    );

    useEffect(() => {

        setForm(

            category ||

            EMPTY_CATEGORY

        );

    }, [

        category

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

            className="category-form"

            onSubmit={handleSubmit}

        >

            <Input

                id="name"

                label="Category Name"

                name="name"

                value={form.name}

                onChange={handleChange}

                required

                autoFocus

            />

            <div className="erp-form-group">

                <label>

                    Description

                </label>

                <textarea

                    className="erp-textarea"

                    rows={4}

                    name="description"

                    value={form.description}

                    onChange={handleChange}

                />

            </div>

            <div className="category-form-buttons">

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