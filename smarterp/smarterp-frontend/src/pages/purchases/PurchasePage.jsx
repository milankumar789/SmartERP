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

import PurchaseToolbar from "../../components/purchases/PurchaseToolbar";

import PurchaseTable from "../../components/purchases/PurchaseTable";

import PurchaseForm from "../../components/purchases/PurchaseForm";

import purchaseService from "../../services/purchaseService";

import {

    EMPTY_PURCHASE_PAGE

} from "../../models/Purchase";

import "../../styles/purchase.css";

export default function PurchasePage() {

    const [

        purchasePage,

        setPurchasePage

    ] = useState(

        EMPTY_PURCHASE_PAGE

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

        keyword,

        setKeyword

    ] = useState("");

    const [

        showForm,

        setShowForm

    ] = useState(false);

    const searchRef = useRef(null);

    const loadPurchases = useCallback(

        async (

            currentPage = page

        ) => {

            try {

                setLoading(true);

                const response =

                    await purchaseService.getPurchases(

                        currentPage,

                        size

                    );

                setPurchasePage(

                    response

                );

            }

            catch (error) {

                toast.error(

                    error.response?.data?.message ||

                    "Unable to load purchases."

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

        loadPurchases();

    }, [

        loadPurchases

    ]);
        async function savePurchase(

        purchase

    ) {

        try {

            await purchaseService.createPurchase(

                purchase

            );

            toast.success(

                "Purchase created successfully."

            );

            setShowForm(false);

            loadPurchases();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Unable to save purchase."

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

        loadPurchases(next);

    }

    function nextPage() {

        if (

            page >=

            purchasePage.totalPages - 1

        ) {

            return;

        }

        const next = page + 1;

        setPage(next);

        loadPurchases(next);

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

                    text="Loading purchases..."

                />

            </MainLayout>

        );

    }

    return (

        <MainLayout>

            <div className="purchase-page">

                <PageHeader

                    title="Purchases"

                    subtitle="Purchase Transactions"

                />
                                <PurchaseToolbar

                    keyword={keyword}

                    searchRef={searchRef}

                    onKeywordChange={(event) =>

                        setKeyword(

                            event.target.value

                        )

                    }

                    onSearch={loadPurchases}

                    onNewPurchase={() =>

                        setShowForm(true)

                    }

                />

                <div className="purchase-content">

                    <PurchaseTable

                        purchases={

                            purchasePage.content

                        }

                    />

                </div>

                <div className="purchase-footer">

                    <Pagination

                        page={page}

                        totalPages={

                            purchasePage.totalPages

                        }

                        onPrevious={previousPage}

                        onNext={nextPage}

                    />

                </div>

                <Modal

                    open={showForm}

                    title="New Purchase"

                    onClose={() =>

                        setShowForm(false)

                    }

                >

                    <PurchaseForm

                        onSubmit={savePurchase}

                        onCancel={() =>

                            setShowForm(false)

                        }

                    />

                </Modal>

            </div>

        </MainLayout>

    );

}