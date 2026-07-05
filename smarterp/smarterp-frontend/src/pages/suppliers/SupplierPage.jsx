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

import Modal from "../../components/common/Modal";

import ConfirmDialog from "../../components/common/ConfirmDialog";

import Pagination from "../../components/common/Pagination";

import SupplierToolbar from "../../components/suppliers/SupplierToolbar";

import SupplierTable from "../../components/suppliers/SupplierTable";

import SupplierForm from "../../components/suppliers/SupplierForm";

import supplierService from "../../services/supplierService";

import {

    EMPTY_SUPPLIER,

    EMPTY_SUPPLIER_PAGE

} from "../../models/Supplier";

import "../../styles/supplier.css";

export default function SupplierPage() {

    const [

        supplierPage,

        setSupplierPage

    ] = useState(

        EMPTY_SUPPLIER_PAGE

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

        selectedSupplier,

        setSelectedSupplier

    ] = useState(

        EMPTY_SUPPLIER

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

        supplierToDeactivate,

        setSupplierToDeactivate

    ] = useState(null);

    const searchRef = useRef(null);

    const loadSuppliers = useCallback(

        async (

            currentPage = page,

            searchKeyword = keyword

        ) => {

            try {

                setLoading(true);

                const response =

                    searchKeyword.trim()

                        ? await supplierService.searchSuppliers(

                            searchKeyword,

                            currentPage,

                            size

                        )

                        : await supplierService.getSuppliers(

                            currentPage,

                            size

                        );

                setSupplierPage(

                    response

                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load suppliers."

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

        loadSuppliers();

    }, [

        loadSuppliers

    ]);

    async function searchSuppliers() {

        setPage(0);

        await loadSuppliers(

            0,

            keyword

        );

    }

    function openCreateForm() {

        setSelectedSupplier(

            EMPTY_SUPPLIER

        );

        setEditMode(false);

        setShowForm(true);

    }

    function openEditForm(supplier) {

        setSelectedSupplier(

            supplier

        );

        setEditMode(true);

        setShowForm(true);

    }

    function closeForm() {

        setShowForm(false);

        setEditMode(false);

        setSelectedSupplier(

            EMPTY_SUPPLIER

        );

    }

    async function saveSupplier(supplier) {

        try {

            if (editMode) {

                await supplierService.updateSupplier(

                    supplier.id,

                    supplier

                );

                toast.success(

                    "Supplier updated successfully."

                );

            }

            else {

                await supplierService.createSupplier({

                    name: supplier.name,

                    email: supplier.email,

                    phone: supplier.phone,

                    address: supplier.address

                });

                toast.success(

                    "Supplier created successfully."

                );

            }

            closeForm();

            loadSuppliers();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Operation failed."

            );

        }

    }

    function requestDeactivate(supplier) {

        setSupplierToDeactivate(

            supplier

        );

        setConfirmOpen(true);

    }

    async function confirmDeactivate() {

        try {

            await supplierService.deactivateSupplier(

                supplierToDeactivate.id

            );

            toast.success(

                "Supplier deactivated."

            );

            setConfirmOpen(false);

            setSupplierToDeactivate(null);

            loadSuppliers();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to deactivate supplier."

            );

        }

    }

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading suppliers..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="supplier-page">

                <PageHeader

                    title="Suppliers"

                    subtitle="Manage supplier records"

                />

                <SupplierToolbar

                    keyword={keyword}

                    searchRef={searchRef}

                    onKeywordChange={(event) =>

                        setKeyword(

                            event.target.value

                        )

                    }

                    onSearch={searchSuppliers}

                    onNewSupplier={openCreateForm}

                />

                <div className="supplier-content">

                    <SupplierTable

                        suppliers={supplierPage.content}

                        onEdit={openEditForm}

                        onDeactivate={requestDeactivate}

                    />

                </div>

                <div className="supplier-footer">

                    <Pagination

                        page={page}

                        totalPages={supplierPage.totalPages}

                        onPrevious={() => {

                            const next = page - 1;

                            setPage(next);

                            loadSuppliers(next);

                        }}

                        onNext={() => {

                            const next = page + 1;

                            setPage(next);

                            loadSuppliers(next);

                        }}

                    />

                </div>

                <Modal

                    open={showForm}

                    title={

                        editMode

                            ? "Edit Supplier"

                            : "New Supplier"

                    }

                    onClose={closeForm}

                >

                    <SupplierForm

                        supplier={selectedSupplier}

                        onSubmit={saveSupplier}

                        onCancel={closeForm}

                    />

                </Modal>

                <ConfirmDialog

                    open={confirmOpen}

                    title="Deactivate Supplier"

                    message={

                        supplierToDeactivate

                            ? `Deactivate "${supplierToDeactivate.name}"?`

                            : ""

                    }

                    onConfirm={confirmDeactivate}

                    onCancel={() => {

                        setConfirmOpen(false);

                        setSupplierToDeactivate(null);

                    }}

                />

            </div>

        </MainLayout>

    );

}