const items = [
    {name: 'ALL EVENTS', url: '/events'},
    {name: 'PERSONAL CABINET', url: '/profile'},
    {name: 'ABOUT US', url: '/about'},
    {name: 'PAYMENT', url: '/payment'},
    {name: 'REFUND', url: '/refund'},
];

const cities = [
    [{ id: 1, city: 'Kharkiv'}, { id: 2, city: 'Poltava'}, { id: 3, city: 'Odesa'}],
    [{ id: 4, city: 'Kyiv'}, { id: 5, city: 'Kropyvnytskyi'}, { id: 6, city: 'Kherson'}],
    [{ id: 7, city: 'Sumy'}, { id: 8, city: 'Donetsk'}, { id: 9, city: 'Zaporizhya'}],
    [{ id: 10, city: 'Mariupol'}, { id: 11, city: 'Melitopol'}, { id: 12, city: 'Zhytomur'}],
    [{ id: 13, city: 'Lviv'}, { id: 14, city: 'Ivano-Frankivsk'}],
    [{ id: 15, city: 'Chernivtsi'}, { id: 16, city: 'Mykolaiv'}],
    [{ id: 17, city: 'Ternopil'}, { id: 18, city: 'Uzhhorod'}],
    [{ id: 19, city: 'Dnipro'}, { id: 20, city: 'Chernihiv'}],
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
    yes: "Yes",
    no: "No",
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
        price: 'From',
        free: 'Free'
    },
    eventPage: {
        lang: 'en'
    },
    buyTicketModal: {
        title: "Order summary",
        wrong_promo : "Promo-code is invalid",
        promo: "Promo code",
        enter_promo: "Enter promo code",
        enter_email: "Enter email",
        apply: "Apply",
        applied: "applied",
        as_visitor: "Show as visitor",
        checkout: "Checkout",
        success_promo: 'Promo was successfully applied!'
    },
    welcome: "Welcome to React",
    event : {
        title: 'Event title',
        location: 'Location',
        organizer: 'Organizer: {{name}}',
        free: 'Free',
        ticketsLeft: '{{count}} tickets left',
    },
};
