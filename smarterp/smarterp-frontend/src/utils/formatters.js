import {

    DATE_LOCALE,

    CURRENCY

} from "./constants";

export function formatCurrency(value = 0) {

    return new Intl.NumberFormat(

        DATE_LOCALE,

        {

            style: "currency",

            currency: CURRENCY

        }

    ).format(value);

}

export function formatDate(date) {

    if (!date) {

        return "";

    }

    return new Date(date)

        .toLocaleDateString(

            DATE_LOCALE

        );

}

export function formatDateTime(date) {

    if (!date) {

        return "";

    }

    return new Date(date)

        .toLocaleString(

            DATE_LOCALE

        );

}