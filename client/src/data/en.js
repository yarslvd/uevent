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
    // Main.jsx
    homepage: {
        popularEvents: {
            title: 'Popular events',
            moreLink: 'More'
        },
        nearestEvents: {
            title: 'Upcoming events',
            moreLink: 'More'
        },
        new: {
            title: 'New events',
            moreLink: 'More'
        }
    },

    // CreateEventPage.jsx
    createEvent: {
        noImage: 'No Image',
        details: {
            title: 'Details',
            promocodeLabel: 'Promocode',
            percentageLabel: '%',
            addButtonLabel: 'Add',
            themeLabel: 'Theme',
            formatLabel: 'Format',
            visibilityLabel: 'Visitors visibility',
            promocodeList: 'Promocode List',
            visibleOption: 'Visible',
            hiddenOption: 'Hidden'
        },
        eventDetails: {
            aboutEvent: 'About Event'
        },
        eventPlace: {
            title: 'Event Place',
        },
        previewArtist: {
            heading: 'Preview Artist',
            choosePerformer: 'Choose Performer'
        },
        eventInfo: {
            eventName: 'Event name',
            price: 'Price',
            currency: 'Currency',
            eventDate: 'Event date',
            eventTime: 'Event time',
            publishDate: 'Publish Date',
            publishTime: 'Publish Time',
            placeName: 'Place Name',
            ticketsAmount: 'Tickets Amount',
            saveToDrafts: 'Save to Drafts',
            publish: 'Publish'
        }
    },
    // Profile.jsx

    profile: {
        tabs: {
            home: 'Home',
            myTickets: 'My tickets',
            company: 'Company'
        },
        home: {
            favouritesTitle: "Favourites",
            subscriptionsTitle: "Subscriptions",
            unsubscribeButton: "Unsubscribe"
        },
        ticket: {
            more: 'More',
            amount: 'Amount',
            noTickets: "You have no tickets ;("
        },
        organization: {
            createNew: 'Create new organization',
            events: 'Your Events',
            newEvent: 'New Event',
            edit: 'Edit',
            "uploadButton": "Upload",
            "nameLabel": "Organization Name",
            "namePlaceholder": "Create name",
            "emailLabel": "Organization Email",
            "emailPlaceholder": "user@example.com",
            "invalidEmailError": "Please, enter a valid email",
            "descriptionLabel": "Description",
            "descriptionPlaceholder": "Information about organization",
            "update": "Update",
            "save": "Save",
            "create": "Create",
            "heading": "Organization"
        },
        user: {
            settings: 'Settings',
            logout: 'Log out'
        },
        settings: {
            "upload": "Upload",
            "usernameLabel": "Username",
            "updateUsernamePlaceholder": "Update username",
            "fullNameLabel": "Full Name",
            "changeFullNamePlaceholder": "Change full name",
            "realNameErrorMessage": "Please, enter your real name",
            emailLabel: 'Email',
            emailPatternError: 'Please enter a valid email',
            emailPlaceholder: 'user@example.com',
            newPasswordLabel: 'New password',
            newPasswordPlaceholder: 'Create password',
            passwordPatternError: 'Password is not strong enough',
            repeatPasswordLabel: 'Repeat new password',
            repeatPasswordPlaceholder: 'Repeat password',
            passwordMatchError: 'Your passwords do not match',
            save:'Save'
        }
    },

    // OrganizationPage.jsx
    organization: {
        "followBtn": "Follow",
        "unfollowBtn": "Unfollow",
        "orgEventsTitle": "Organization Events"
    },

    // EventPage.jsx
    eventPage: {
        eventInfo: {
            title: "About the event",
        },
        modalWindow: {
            paymentNotFound: "Payment has not been found",
            paymentSuccessful: "Successful payment",
            closeBtn: "Close",
            visitors: "Visitors"
        },
        comments: {
            title: 'Comments',
            noComments: 'No comments yet',
            placeholder: 'Your comment...',
            publish: 'Publish'
        },
        organizerEvents: 'Organizer events',
        more: 'Other events',
        eventDetails: {
            free: 'Free',
            visitors: 'Going',
            moreVisitors: 'more',
            buy: 'Buy',
            like: 'Like Event',
            ticketsLeft: 'tickets left'
        },
        language: 'en'
    },
    
    // Filters.jsx
    filters: {
        title: 'Filters',
        chooseTheme: 'Choose Theme',
        chooseFormat: 'Choose Format',
        dateInterval: {
            title: 'Date Interval',
            fromLabel: 'From',
            toLabel: 'To',
        },
        priceRange: {
            title: 'Price Range',
            ariaLabel: 'Price range',
        },
        applyBtn: 'Apply',
        clearBtn: 'Clear',
    },

    // SearchBarFull.jsx
    searchBar: {
        placeholder: "Search"
    },

    comments: {
        deleteComment: 'Delete this comment?'
    }
};
