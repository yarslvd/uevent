const items = [
    {name: 'ВСІ ПОДІЇ', url: '/events'},
    {name: 'ОСОБИСТИЙ КАБІНЕТ', url: '/profile'},
    {name: 'ПРО НАС', url: '/about'},
    {name: 'ОПЛАТА', url: '/payment'},
    {name: 'ПОВЕРНЕННЯ', url: '/refund'},
];

const cities = [
    [{ id: 1, city: 'Харків'}, { id: 2, city: 'Полтава'}, { id: 3, city: 'Одеса'}],
    [{ id: 4, city: 'Київ'}, { id: 5, city: 'Кропивницький'}, { id: 6, city: 'Херсон'}],
    [{ id: 7, city: 'Суми'}, { id: 8, city: 'Донецьк'}, { id: 9, city: 'Запоріжжя'}],
    [{ id: 10, city: 'Маріуполь'}, { id: 11, city: 'Мелітополь'}, { id: 12, city: 'Житомир'}],
    [{ id: 13, city: 'Львів'}, { id: 14, city: 'Івано-Франківськ'}],
    [{ id: 15, city: 'Чернівці'}, { id: 16, city: 'Миколаїв'}],
    [{ id: 17, city: 'Тернопіль'}, { id: 18, city: 'Ужгород'}],
    [{ id: 19, city: 'Дніпро'}, { id: 20, city: 'Чернігів'}],
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
        price: 'Від',
        free: 'Безкоштовно',
    },
    eventPage: {
        lang: 'uk'
    },
    welcome: 'Привіт козаче',
};