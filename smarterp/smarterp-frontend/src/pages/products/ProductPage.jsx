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

import ProductToolbar from "../../components/products/ProductToolbar";

import ProductTable from "../../components/products/ProductTable";

import ProductForm from "../../components/products/ProductForm";

import productService from "../../services/productService";

import {

    EMPTY_PRODUCT,

    EMPTY_PRODUCT_PAGE

} from "../../models/Product";

import "../../styles/product.css";

export default function ProductPage() {

    const [

        productPage,

        setProductPage

    ] = useState(

        EMPTY_PRODUCT_PAGE

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

        selectedProduct,

        setSelectedProduct

    ] = useState(

        EMPTY_PRODUCT

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

        productToDeactivate,

        setProductToDeactivate

    ] = useState(null);

    const searchRef = useRef(null);

    const loadProducts = useCallback(

        async (

            currentPage = page,

            searchKeyword = keyword

        ) => {

            try {

                setLoading(true);

                const response =

                    searchKeyword.trim()

                        ? await productService.searchProducts(

                            searchKeyword,

                            currentPage,

                            size

                        )

                        : await productService.getProducts(

                            currentPage,

                            size

                        );

                setProductPage(

                    response

                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load products."

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

        loadProducts();

    }, [

        loadProducts

    ]);
        async function searchProducts() {

        setPage(0);

        await loadProducts(

            0,

            keyword

        );

    }

    function openCreateForm() {

        setSelectedProduct(

            EMPTY_PRODUCT

        );

        setEditMode(false);

        setShowForm(true);

    }

    function openEditForm(product) {

        setSelectedProduct(

            product

        );

        setEditMode(true);

        setShowForm(true);

    }

    function closeForm() {

        setSelectedProduct(

            EMPTY_PRODUCT

        );

        setEditMode(false);

        setShowForm(false);

    }

    async function saveProduct(product) {

        try {

            if (editMode) {

                await productService.updateProduct(

                    product.id,

                    product

                );

                toast.success(

                    "Product updated successfully."

                );

            }

            else {

                await productService.createProduct({

                    name: product.name,

                    categoryId: Number(product.categoryId),

                    supplierId: Number(product.supplierId),

                    purchasePrice: Number(product.purchasePrice),

                    sellingPrice: Number(product.sellingPrice),

                    quantity: Number(product.quantity),

                    minimumStock: Number(product.minimumStock),

                    description: product.description

                });

                toast.success(

                    "Product created successfully."

                );

            }

            closeForm();

            await loadProducts();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to save product."

            );

        }

    }

    function requestDeactivate(product) {

        setProductToDeactivate(

            product

        );

        setConfirmOpen(true);

    }

    async function confirmDeactivate() {

        try {

            await productService.deactivateProduct(

                productToDeactivate.id

            );

            toast.success(

                "Product deactivated."

            );

            setConfirmOpen(false);

            setProductToDeactivate(null);

            await loadProducts();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to deactivate product."

            );

        }

    }

    function previousPage() {

        if (page === 0) {

            return;

        }

        const next = page - 1;

        setPage(next);

        loadProducts(

            next,

            keyword

        );

    }

    function nextPage() {

        if (

            page >=

            productPage.totalPages - 1

        ) {

            return;

        }

        const next = page + 1;

        setPage(next);

        loadProducts(

            next,

            keyword

        );

    }

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

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading products..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="product-page">

                <PageHeader

                    title="Products"

                    subtitle="Manage product inventory"

                />
                                <ProductToolbar

                    keyword={keyword}

                    searchRef={searchRef}

                    onKeywordChange={(event) =>

                        setKeyword(

                            event.target.value

                        )

                    }

                    onSearch={searchProducts}

                    onNewProduct={openCreateForm}

                />

                <div className="product-content">

                    <ProductTable

                        products={

                            productPage.content

                        }

                        onEdit={openEditForm}

                        onDeactivate={requestDeactivate}

                    />

                </div>

                <div className="product-footer">

                    <Pagination

                        page={page}

                        totalPages={

                            productPage.totalPages

                        }

                        onPrevious={previousPage}

                        onNext={nextPage}

                    />

                </div>

                <Modal

                    open={showForm}

                    title={

                        editMode

                            ? "Edit Product"

                            : "New Product"

                    }

                    onClose={closeForm}

                >

                    <ProductForm

                        product={selectedProduct}

                        onSubmit={saveProduct}

                        onCancel={closeForm}

                    />

                </Modal>

                <ConfirmDialog

                    open={confirmOpen}

                    title="Deactivate Product"

                    message={

                        productToDeactivate

                            ? `Deactivate "${productToDeactivate.name}"?`

                            : ""

                    }

                    onConfirm={confirmDeactivate}

                    onCancel={() => {

                        setConfirmOpen(false);

                        setProductToDeactivate(null);

                    }}

                />

            </div>

        </MainLayout>

    );

}