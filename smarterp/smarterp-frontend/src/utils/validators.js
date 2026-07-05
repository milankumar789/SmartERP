export function isEmpty(value) {

    return value === null ||

        value === undefined ||

        value.toString().trim() === "";

}

export function isEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}

export function isPhone(phone) {

    return /^[0-9]{10}$/

        .test(phone);

}

export function minLength(

    value,

    length

) {

    return value.trim().length >= length;

}

export function maxLength(

    value,

    length

) {

    return value.trim().length <= length;

}