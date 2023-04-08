export const cities = [
    ['Харків', 'Полтава', 'Одеса'],
    ['Київ', 'Кропивницький', 'Херсон'],
    ['Суми', 'Донецьк','Запоріжжя'],
    ['Маріуполь','Мелітополь', 'Житомир'],
    ['Львів', 'Івано-Франківськ'],
    ['Чернівці', 'Миколаїв'],
    ['Тернопіль', 'Ужгород'],
    ['Дніпро', 'Чернігів'],
];

export const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'UAH',
        label: '₴',
    },
];

export const dateOptions = { 
    day: 'numeric', 
    month: 'short',
    year: 'numeric',  
};

export const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
}

export const priceRegExp = /^\d+(\.\d{1,2})?$/;