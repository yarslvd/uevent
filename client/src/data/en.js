const items = [
    {name: 'ALL EVENTS', url: '/login'},
    {name: 'PERSONAL CABINET', url: '/cabinet'},
    {name: 'ABOUT US', url: '/about'},
    {name: 'PAYMENT', url: '/payment'},
    {name: 'REFUND', url: '/refund'},
];

const cities = [
    ['Kharkiv', 'Poltava', 'Odesa'],
    ['Kyiv', 'Kropyvnytskyi', 'Kherson'],
    ['Sumy', 'Donetsk','Zaporizhya'],
    ['Mariupol','Melitopol', 'Zhytomur'],
    ['Lviv', 'Ivano-Frankivsk'],
    ['Chernivtsi', 'Mykolaiv'],
    ['Ternopil', 'Uzhhorod'],
    ['Dnipro', 'Chernihiv'],
];

//FOOTER
const events = [
    {name: 'Concerts', url: '/'},
    {name: 'Theatres', url: '/'},
    {name: 'For kids', url: '/'},
    {name: 'Standups', url: '/'},
    {name: 'Tours', url: '/'},
];

const services = [
    {name: 'ESupport', url: '/'},
    {name: 'Gift ticket', url: '/'},
    {name: 'Settlement of disputes', url: '/'},
    {name: 'List of canceled and postponed events', url: '/'},
    {name: 'List of cash registers', url: '/'},
    {name: 'Delivery and payment', url: '/'},
];

const about = [
    {name: 'For organizers', url: '/'},
    {name: 'Logo for posters and mass media', url: '/'},
    {name: 'About the company', url: '/'},
    {name: 'Public offer', url: '/'},
];

export const en = {
    menu: {
        items,
        login: 'Sign in'
    },
    modalWindow: {
        cities,
        title: 'Choose a city',
    },
    header: {
        login: 'Sign in'
    },
    footer: {
        events: {
            title: 'Events',
            events
        },
        services: {
            title: 'Services',
            services
        },
        about: {
            title: 'About us',
            about
        },
        contacts: {
            title: 'Contacts'
        }
    },
    wideCard: {
        more: 'More',
        price: 'From'
    },
    welcome: "Welcome to React",
};
