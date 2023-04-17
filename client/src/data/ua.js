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
    yes: "Так",
    no: "Ні",
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
    buyTicketModal: {
        title: "Замовлення",
        wrong_promo : "Неправильний промокод",
        promo: "Промокод",
        enter_promo: "Уведіть промокод",
        enter_email: "Уведіть пошту",
        apply: "Застосувати",
        applied: "застосовано",
        as_visitor: "Відображати, як відвідувача",
        checkout: "Розрахуватися",
        success_promo: 'Промокод було успішно застосовано!'
    },
    welcome: 'Привіт козаче',
    event : {
        title: 'Назва події',
        location: 'Місце проведення',
        organizer: 'Організатор: {{name}}',
        free: 'Бузкоштовно',
        ticketsLeft: '{{count}} залишилось квитків',
    },
    // Main.jsx
    homepage: {
        popularEvents: {
            title: 'Популярні події',
            moreLink: 'Більше'
        },
        nearestEvents: {
            title: 'Найближчі події',
            moreLink: 'Більше'
        },
        new: {
            title: 'Новинки',
            moreLink: 'Більше'
        }
    },

    // CreateEventPage.jsx
    createEvent: {
        noImage: 'Немає зображення',
        details: {
            title: 'Деталі',
            promocodeLabel: 'Промокод',
            percentageLabel: '%',
            addButtonLabel: 'Додати',
            themeLabel: 'Тема',
            formatLabel: 'Формат',
            visibilityLabel: 'Відвідувачі',
            promocodeList: 'Список промокодів',
            visibleOption: 'Відкритий',
            hiddenOption: 'Прихований'
        },
        eventDetails: {
            aboutEvent: 'Про подію'
        },
        eventPlace: {
            title: 'Місце події',
        },
        previewArtist: {
            heading: 'Прев\'ю виконавця',
            choosePerformer: 'Виберіть виконавця'
        },
        eventInfo: {
            eventName: 'Назва події',
            price: 'Ціна',
            currency: 'Валюта',
            eventDate: 'Дата події',
            eventTime: 'Час події',
            publishDate: 'Дата публікації',
            publishTime: 'Час публікації',
            placeName: 'Назва місця',
            ticketsAmount: 'Кількість квитків',
            saveToDrafts: 'Зберегти в чернетки',
            publish: 'Опублікувати'
        }
    },

    // Profile.jsx

    profile: {
        tabs: {
            home: 'Головна',
            myTickets: 'Мої квитки',
            company: 'Компанія'
        },
        home: {
            favouritesTitle: "Вподобайки",
            subscriptionsTitle: "Підписки",
            unsubscribeButton: "Відписатись"
        },
        ticket: {
            more: 'Детальніше',
            amount: 'Кількість',
            noTickets: "У вас немає квитків ;("
        },
        organization: {
            createNew: 'Створити нову організацію',
            events: 'Ваші події',
            newEvent: 'Створити нову подію',
            edit: 'Редагувати',
            "uploadButton": "Завантажити",
            "nameLabel": "Назва організації",
            "namePlaceholder": "Створити назву",
            "emailLabel": "Email організації",
            "emailPlaceholder": "user@example.com",
            "invalidEmailError": "Будь ласка, введіть коректний email",
            "descriptionLabel": "Опис організації",
            "descriptionPlaceholder": "Інформація про організацію",
            "update": "Редагувати",
            "save": "Зберегти",
            "create": "Створити",
            "heading": "Організацію"
        },
        user: {
            settings: 'Налаштування',
            logout: 'Вийти'
        },
        settings: {
            "upload": "Завантажити",
            "usernameLabel": "Ім'я користувача",
            "updateUsernamePlaceholder": "Оновити ім'я користувача",
            "fullNameLabel": "Повне ім'я",
            "changeFullNamePlaceholder": "Змінити повне ім'я",
            "realNameErrorMessage": "Будь ласка, введіть своє справжнє ім'я",
            emailLabel: 'Електронна пошта',
            emailPatternError: 'Будь ласка, введіть дійсну електронну адресу',
            emailPlaceholder: 'user@example.com',
            newPasswordLabel: 'Новий пароль',
            newPasswordPlaceholder: 'Створіть пароль',
            passwordPatternError: 'Пароль недостатньо міцний',
            repeatPasswordLabel: 'Повторіть новий пароль',
            repeatPasswordPlaceholder: 'Повторіть пароль',
            passwordMatchError: 'Ваші паролі не співпадають',
            save:'Зберегти'
        }
    },

    // OrganizationPage.jsx
    organization: {
        "followBtn": "Стежити",
        "unfollowBtn": "Відписатись",
        "orgEventsTitle": "Події організації"
    },
    
    // EventPage.jsx
    eventPage: {
        eventInfo: {
            title: "Про подію",
        },
        modalWindow: {
            paymentNotFound: "Платіж не знайдено",
            paymentSuccessful: "Успішний платіж",
            closeBtn: "Закрити",
            visitors: "Відвідувачі"
        },
        comments: {
            title: 'Коментарі',
            noComments: 'Поки що немає коментарів',
            placeholder: 'Твій коментар...',
            publish: 'Опубліковати'
        },
        organizerEvents: 'Афіші подій організатора',
        more: 'Інші події',
        eventDetails: {
            free: 'Безкоштовно',
            visitors: 'Підуть',
            moreVisitors: 'більше',
            buy: 'Купити',
            like: 'Лайкнути',
            ticketsLeft: 'квитків залишилось'
        },
    },

    // Filters.jsx
    filters: {
        title: 'Фільтри',
        chooseTheme: 'Оберіть тему',
        chooseFormat: 'Оберіть формат',
        dateInterval: {
            title: 'Інтервал дат',
            fromLabel: 'Від',
            toLabel: 'До',
        },
        priceRange: {
            title: 'Діапазон цін',
            ariaLabel: 'Діапазон цін',
        },
        applyBtn: 'Застосувати',
        clearBtn: 'Очистити',
    },

    // SearchBarFull.jsx
    searchBar: {
        placeholder: "Пошук"
    }
};