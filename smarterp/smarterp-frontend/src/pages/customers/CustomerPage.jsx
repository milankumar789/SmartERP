import {

    useCallback,

    useEffect,

    useRef,

    useState

} from "react";

import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import Pagination from "../../components/common/Pagination";

import Modal from "../../components/common/Modal";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import CustomerToolbar from "../../components/customers/CustomerToolbar";

import CustomerTable from "../../components/customers/CustomerTable";

import CustomerForm from "../../components/customers/CustomerForm";

import customerService from "../../services/customerService";

import {

    EMPTY_CUSTOMER,

    EMPTY_CUSTOMER_PAGE

} from "../../models/Customer";

import "../../styles/customer.css";

export default function CustomerPage() {

    const [

        customerPage,

        setCustomerPage

    ] = useState(

        EMPTY_CUSTOMER_PAGE

    );

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        keyword,

        setKeyword

    ] = useState("");

    const [

        page,

        setPage

    ] = useState(0);

    const [

        size

    ] = useState(10);

    const [

        editMode,

        setEditMode

    ] = useState(false);

    const [

        selectedCustomer,

        setSelectedCustomer

    ] = useState(

        EMPTY_CUSTOMER

    );

    const [

        showForm,

        setShowForm

    ] = useState(false);

    const [

        confirmOpen,

        setConfirmOpen

    ] = useState(false);

    const [

        customerToDeactivate,

        setCustomerToDeactivate

    ] = useState(null);

    const searchRef = useRef(null);

    const loadCustomers = useCallback(

        async (

            currentPage = page,

            searchKeyword = keyword

        ) => {

            try {

                setLoading(true);

                let response;

                if (

                    searchKeyword.trim()

                ) {

                    response =

                        await customerService.searchCustomers(

                            searchKeyword,

                            currentPage,

                            size

                        );

                }

                else {

                    response =

                        await customerService.getCustomers(

                            currentPage,

                            size

                        );

                }

                setCustomerPage(

                    response

                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load customers."

                );

            }

            finally {

                setLoading(false);

            }

        },

        [

            keyword,

            page,

            size

        ]

    );

    useEffect(() => {

        loadCustomers();

    }, [

        loadCustomers

    ]);
        useEffect(() => {

        function handleKeyboard(event) {

            if (

                event.ctrlKey &&

                event.key.toLowerCase() === "f"

            ) {

                event.preventDefault();

                searchRef.current?.focus();

            }

            if (

                event.altKey &&

                event.key.toLowerCase() === "n"

            ) {

                event.preventDefault();

                openCreateForm();

            }

            if (

                event.key === "Escape"

            ) {

                closeForm();

                setConfirmOpen(false);

            }

        }

        window.addEventListener(

            "keydown",

            handleKeyboard

        );

        return () =>

            window.removeEventListener(

                "keydown",

                handleKeyboard

            );

    }, []);

    async function searchCustomers() {

        setPage(0);

        await loadCustomers(

            0,

            keyword

        );

    }

    function openCreateForm() {

        setSelectedCustomer(

            EMPTY_CUSTOMER

        );

        setEditMode(false);

        setShowForm(true);

    }

    function openEditForm(customer) {

        setSelectedCustomer(

            customer

        );

        setEditMode(true);

        setShowForm(true);

    }

    function closeForm() {

        setShowForm(false);

        setSelectedCustomer(

            EMPTY_CUSTOMER

        );

        setEditMode(false);

    }

    async function saveCustomer(customer) {

        try {

            if (editMode) {

                await customerService.updateCustomer(

                    customer.id,

                    customer

                );

                toast.success(

                    "Customer updated successfully."

                );

            }

            else {

                await customerService.createCustomer({

                    name: customer.name,

                    email: customer.email,

                    phone: customer.phone,

                    address: customer.address

                });

                toast.success(

                    "Customer created successfully."

                );

            }

            closeForm();

            await loadCustomers();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Operation failed."

            );

        }

    }

    function requestDeactivate(customer) {

        setCustomerToDeactivate(

            customer

        );

        setConfirmOpen(true);

    }

    async function confirmDeactivate() {

        try {

            await customerService.deactivateCustomer(

                customerToDeactivate.id

            );

            toast.success(

                "Customer deactivated."

            );

            setConfirmOpen(false);

            setCustomerToDeactivate(null);

            await loadCustomers();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to deactivate customer."

            );

        }

    }

    function previousPage() {

        if (page === 0) {

            return;

        }

        const nextPage = page - 1;

        setPage(nextPage);

        loadCustomers(

            nextPage,

            keyword

        );

    }

    function nextPage() {

        if (

            page >=

            customerPage.totalPages - 1

        ) {

            return;

        }

        const next = page + 1;

        setPage(next);

        loadCustomers(

            next,

            keyword

        );

    }

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading customers..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="customer-page">

                <PageHeader

                    title="Customers"

                    subtitle="Manage customer information"

                />
                                <CustomerToolbar

                    keyword={keyword}

                    searchRef={searchRef}

                    onKeywordChange={(event) =>

                        setKeyword(

                            event.target.value

                        )

                    }

                    onSearch={searchCustomers}

                    onNewCustomer={openCreateForm}

                />

                <div className="customer-content">

                    <CustomerTable

                        customers={

                            customerPage.content

                        }

                        onEdit={openEditForm}

                        onDeactivate={requestDeactivate}

                    />

                </div>

                <div className="customer-footer">

                    <Pagination

                        page={page}

                        totalPages={

                            customerPage.totalPages

                        }

                        onPrevious={previousPage}

                        onNext={nextPage}

                    />

                </div>

                <Modal

                    open={showForm}

                    title={

                        editMode

                            ? "Edit Customer"

                            : "New Customer"

                    }

                    onClose={closeForm}

                >

                    <CustomerForm

                        customer={selectedCustomer}

                        onSubmit={saveCustomer}

                        onCancel={closeForm}

                    />

                </Modal>

                <ConfirmDialog

                    open={confirmOpen}

                    title="Deactivate Customer"

                    message={

                        customerToDeactivate

                            ? `Deactivate "${customerToDeactivate.name}"?`

                            : ""

                    }

                    onConfirm={confirmDeactivate}

                    onCancel={() => {

                        setConfirmOpen(false);

                        setCustomerToDeactivate(null);

                    }}

                />

            </div>

        </MainLayout>

    );

}