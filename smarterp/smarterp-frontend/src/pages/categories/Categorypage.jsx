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

import CategoryToolbar from "../../components/categories/CategoryToolbar";

import CategoryTable from "../../components/categories/CategoryTable";

import CategoryForm from "../../components/categories/CategoryForm";

import categoryService from "../../services/categoryService";

import {

    EMPTY_CATEGORY,

    EMPTY_CATEGORY_PAGE

} from "../../models/Category";

import "../../styles/category.css";

export default function CategoryPage() {

    const [

        categoryPage,

        setCategoryPage

    ] = useState(

        EMPTY_CATEGORY_PAGE

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

        selectedCategory,

        setSelectedCategory

    ] = useState(

        EMPTY_CATEGORY

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

        categoryToDeactivate,

        setCategoryToDeactivate

    ] = useState(null);

    const searchRef = useRef(null);

    const loadCategories = useCallback(

        async (

            currentPage = page,

            searchKeyword = keyword

        ) => {

            try {

                setLoading(true);

                const response =

                    searchKeyword.trim()

                        ? await categoryService.searchCategories(

                            searchKeyword,

                            currentPage,

                            size

                        )

                        : await categoryService.getCategories(

                            currentPage,

                            size

                        );

                setCategoryPage(

                    response

                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load categories."

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

        loadCategories();

    }, [

        loadCategories

    ]);

    async function searchCategories() {

        setPage(0);

        await loadCategories(

            0,

            keyword

        );

    }

    function openCreateForm() {

        setSelectedCategory(

            EMPTY_CATEGORY

        );

        setEditMode(false);

        setShowForm(true);

    }

    function openEditForm(category) {

        setSelectedCategory(category);

        setEditMode(true);

        setShowForm(true);

    }

    function closeForm() {

        setSelectedCategory(

            EMPTY_CATEGORY

        );

        setEditMode(false);

        setShowForm(false);

    }

    async function saveCategory(category) {

        try {

            if (editMode) {

                await categoryService.updateCategory(

                    category.id,

                    category

                );

                toast.success(

                    "Category updated successfully."

                );

            }

            else {

                await categoryService.createCategory({

                    name: category.name,

                    description: category.description

                });

                toast.success(

                    "Category created successfully."

                );

            }

            closeForm();

            loadCategories();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Operation failed."

            );

        }

    }

    function requestDeactivate(category) {

        setCategoryToDeactivate(category);

        setConfirmOpen(true);

    }

    async function confirmDeactivate() {

        try {

            await categoryService.deactivateCategory(

                categoryToDeactivate.id

            );

            toast.success(

                "Category deactivated."

            );

            setConfirmOpen(false);

            setCategoryToDeactivate(null);

            loadCategories();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to deactivate category."

            );

        }

    }

    if (loading) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading categories..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="category-page">

                <PageHeader

                    title="Categories"

                    subtitle="Manage product categories"

                />

                <CategoryToolbar

                    keyword={keyword}

                    searchRef={searchRef}

                    onKeywordChange={(event) =>

                        setKeyword(event.target.value)

                    }

                    onSearch={searchCategories}

                    onNewCategory={openCreateForm}

                />

                <div className="category-content">

                    <CategoryTable

                        categories={categoryPage.content}

                        onEdit={openEditForm}

                        onDeactivate={requestDeactivate}

                    />

                </div>

                <div className="category-footer">

                    <Pagination

                        page={page}

                        totalPages={categoryPage.totalPages}

                        onPrevious={() => {

                            const next = page - 1;

                            setPage(next);

                            loadCategories(next);

                        }}

                        onNext={() => {

                            const next = page + 1;

                            setPage(next);

                            loadCategories(next);

                        }}

                    />

                </div>

                <Modal

                    open={showForm}

                    title={

                        editMode

                            ? "Edit Category"

                            : "New Category"

                    }

                    onClose={closeForm}

                >

                    <CategoryForm

                        category={selectedCategory}

                        onSubmit={saveCategory}

                        onCancel={closeForm}

                    />

                </Modal>

                <ConfirmDialog

                    open={confirmOpen}

                    title="Deactivate Category"

                    message={

                        categoryToDeactivate

                            ? `Deactivate "${categoryToDeactivate.name}"?`

                            : ""

                    }

                    onConfirm={confirmDeactivate}

                    onCancel={() => {

                        setConfirmOpen(false);

                        setCategoryToDeactivate(null);

                    }}

                />

            </div>

        </MainLayout>

    );

}