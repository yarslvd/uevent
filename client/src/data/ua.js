const items = [
    {name: 'ВСІ ПОДІЇ', url: '/login'},
    {name: 'ОСОБИСТИЙ КАБІНЕТ', url: '/cabinet'},
    {name: 'ПРО НАС', url: '/about'},
    {name: 'ОПЛАТА', url: '/payment'},
    {name: 'ПОВЕРНЕННЯ', url: '/refund'},
];

const cities = [
    ['Харків', 'Полтава', 'Одеса'],
    ['Київ', 'Кропивницький', 'Херсон'],
    ['Суми', 'Донецьк','Запоріжжя'],
    ['Маріуполь','Мелітополь', 'Житомир'],
    ['Львів', 'Івано-Франківськ'],
    ['Чернівці', 'Миколаїв'],
    ['Тернопіль', 'Ужгород'],
    ['Дніпро', 'Чернігів'],
];

//FOOTER
const events = [
    {name: 'Концерти', url: '/'},
    {name: 'Театри', url: '/'},
    {name: 'Дітям', url: '/'},
    {name: 'Стендапи', url: '/'},
    {name: 'Тури', url: '/'},
];

const services = [
    {name: 'ЄПідтримка', url: '/'},
    {name: 'Подарунковий квиток', url: '/'},
    {name: 'Врегулювання спорів', url: '/'},
    {name: 'Список скасованих та перенесених заходів', url: '/'},
    {name: 'Список кас', url: '/'},
    {name: 'Доставка і оплата', url: '/'},
];

const about = [
    {name: 'Організаторам', url: '/'},
    {name: 'Логотип для афіш та ЗМІ', url: '/'},
    {name: 'Про компанію', url: '/'},
    {name: 'Публічна оферта', url: '/'},
];

export const ua = {
    menu: {
        items,
        login: 'Увійти'
    },
    modalWindow: {
        cities,
        title: 'Оберіть місто',
    },
    header: {
        login: 'Увійти'
    },
    footer: {
        events: {
            title: 'Події',
            events
        },
        services: {
            title: 'Сервіси',
            services
        },
        about: {
            title: 'Про нас',
            about
        },
        contacts: {
            title: 'Контакти'
        }
    },
    wideCard: {
        more: 'Більше',
        price: 'Від'
    },
    welcome: 'Привіт козаче',
};