export const CONSTANT = {
    ADD: 'TANG',
    SUBTRACT: 'TRU'
};

export const convertStringSeparation = (number) =>
    Number(number).toLocaleString('vi-VN').replace(/,/g, '.');
