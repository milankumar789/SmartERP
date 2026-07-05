import {

    useCallback,

    useEffect,

    useState

} from "react";

import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import PageHeader from "../../components/common/PageHeader";

import LoadingSpinner from "../../components/common/LoadingSpinner";

import Pagination from "../../components/common/Pagination";

import Modal from "../../components/common/Modal";

import SaleToolbar from "../../components/sales/SaleToolbar";

import SaleTable from "../../components/sales/SaleTable";

import SaleForm from "../../components/sales/SaleForm";

import saleService from "../../services/saleService";

import {

    EMPTY_SALE_PAGE

} from "../../models/Sale";

import "../../styles/sale.css";

export default function SalePage() {

    const [

        salePage,

        setSalePage

    ] = useState(

        EMPTY_SALE_PAGE

    );

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        page,

        setPage

    ] = useState(0);

    const [

        size

    ] = useState(10);

    const [

        showForm,

        setShowForm

    ] = useState(false);

    const loadSales = useCallback(

        async (

            currentPage = page

        ) => {

            try {

                setLoading(true);

                const response =

                    await saleService.getSales(

                        currentPage,

                        size

                    );

                setSalePage(

                    response

                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load sales."

                );

            }

            finally {

                setLoading(false);

            }

        },

        [

            page,

            size

        ]

    );

    useEffect(() => {

        loadSales();

    }, [

        loadSales

    ]);
        async function saveSale(

        sale

    ) {

        try {

            await saleService.createSale(

                sale

            );

            toast.success(

                "Sale created successfully."

            );

            setShowForm(false);

            await loadSales();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to save sale."

            );

        }

    }

    function previousPage() {

        if (

            page === 0

        ) {

            return;

        }

        const next = page - 1;

        setPage(next);

        loadSales(next);

    }

    function nextPage() {

        if (

            page >=

            salePage.totalPages - 1

        ) {

            return;

        }

        const next = page + 1;

        setPage(next);

        loadSales(next);

    }

    useEffect(() => {

        function handleKeyboard(event) {

            if (

                event.altKey &&

                event.key.toLowerCase() === "n"

            ) {

                event.preventDefault();

                setShowForm(true);

            }

            if (

                event.key === "Escape"

            ) {

                setShowForm(false);

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

    if (

        loading

    ) {

        return (

            <MainLayout>

                <LoadingSpinner

                    text="Loading sales..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="sale-page">

                <PageHeader

                    title="Sales"

                    subtitle="Sales Transactions"

                />
                                <SaleToolbar

                    onNewSale={() =>

                        setShowForm(true)

                    }

                />

                <div className="sale-content">

                    <SaleTable

                        sales={

                            salePage.content

                        }

                    />

                </div>

                <div className="sale-footer">

                    <Pagination

                        page={page}

                        totalPages={

                            salePage.totalPages

                        }

                        onPrevious={previousPage}

                        onNext={nextPage}

                    />

                </div>

                <Modal

                    open={showForm}

                    title="New Sale"

                    onClose={() =>

                        setShowForm(false)

                    }

                >

                    <SaleForm

                        onSubmit={saveSale}

                        onCancel={() =>

                            setShowForm(false)

                        }

                    />

                </Modal>

            </div>

        </MainLayout>

    );

}