const {hashPassword} = require("../utils/bcrypt");

const data = {
    users : [
        {
            first_name: 'John',
            last_name: 'Doe',
            birthdate: '1990-01-01',
            email: 'john.doe@example.com',
            confirmed_email: true,
            username: 'johndoe',
            password: hashPassword('password')
        },
        {
            first_name: 'Jane',
            last_name: 'Doe',
            birthdate: '1992-05-15',
            email: 'jane.doe@example.com',
            confirmed_email: true,
            username: 'janedoe',
            password: hashPassword('password')
        },
        {
            first_name: 'Bob',
            last_name: 'Smith',
            birthdate: '1985-03-25',
            email: 'bob.smith@example.com',
            confirmed_email: true,
            username: 'bobsmith',
            password: hashPassword('password')
        },
        {
            first_name: 'Alice',
            last_name: 'Johnson',
            birthdate: '1998-12-10',
            email: 'alice.johnson@example.com',
            confirmed_email: true,
            username: 'alicejohnson',
            password: hashPassword('password')
        },
        {
            first_name: 'Tom',
            last_name: 'Brown',
            birthdate: '1978-08-21',
            email: 'tom.brown@example.com',
            confirmed_email: true,
            username: 'tombrown',
            password: hashPassword('password')
        },
    ],
    organizers : [
        {name: 'Organizer 1', description: 'Organizer 1 description', email: 'organizer1@example.com', user_id: 1},
        {name: 'Organizer 2', description: 'Organizer 2 description', email: 'organizer2@example.com', user_id: 2},
        {name: 'Organizer 5', description: 'Organizer 5 description', email: 'organizer5@example.com', user_id: 3},
    ],
    events : [
        {
            title: 'Concert in the Park',
            description: 'Come enjoy an evening of live music in the park!',
            price: 10.00,
            iso_currency: 'USD',
            address: '123 Main St',
            location: 'Central Park',
            date: '2023-04-15 19:00:00-04',
            publish_date: '2023-04-01 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 100,
            visibility: 'public',
            spotify_id: '1234567890'
        },
        {
            title: 'Charity Gala',
            description: 'Support a good cause while enjoying an elegant evening.',
            price: 75.00,
            iso_currency: 'USD',
            address: '456 Elm St',
            location: 'Grand Ballroom',
            date: '2023-05-01 18:00:00-04',
            publish_date: '2023-04-15 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 50,
            visibility: 'private',
            spotify_id: '0987654321'
        },
        {
            title: 'Comedy Night',
            description: 'Laugh the night away with some of the funniest comedians around!',
            price: 20.00,
            iso_currency: 'USD',
            address: '789 Maple St',
            location: 'The Comedy Club',
            date: '2023-06-10 20:00:00-04',
            publish_date: '2023-05-25 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 75,
            visibility: 'public',
            spotify_id: '2468013579'
        },
        {
            title: 'Movie Night',
            description: 'Bring your lawn chairs and blankets for an outdoor movie under the stars.',
            price: 0.00,
            iso_currency: 'USD',
            address: '321 Oak St',
            location: 'Town Square',
            date: '2023-07-05 21:00:00-04',
            publish_date: '2023-06-20 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 200,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Wine Tasting',
            description: 'Sip and savor some of the best wines from around the world.',
            price: 50.00,
            iso_currency: 'USD',
            address: '987 Vine St',
            location: 'Wine Cellar',
            date: '2023-08-20 14:00:00-04',
            publish_date: '2023-08-01 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 30,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Food Festival',
            description: 'Try delicious dishes from local restaurants and food trucks.',
            price: 0.00,
            iso_currency: 'USD',
            address: '456 Main St',
            location: 'City Square',
            date: '2023-09-15 12:00:00-04',
            publish_date: '2023-08-30 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 500,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Art Show',
            description: 'Admire the works of talented artists from all over the world.',
            price: 5.00,
            iso_currency: 'USD',
            address: '789 Broadway',
            location: 'Art Gallery',
            date: '2023-10-20 10:00:00-04',
            publish_date: '2023-10-01 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 100,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Fashion Show',
            description: 'See the latest styles from top designers on the runway.',
            price: 50.00,
            iso_currency: 'USD',
            address: '1234 Fashion Ave',
            location: 'Convention Center',
            date: '2023-11-15 19:00:00-04',
            publish_date: '2023-11-01 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 200,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Holiday Market',
            description: 'Shop for unique gifts and decorations at this festive market.',
            price: 0.00,
            iso_currency: 'USD',
            address: '567 Pine St',
            location: 'Town Square',
            date: '2023-12-10 12:00:00-04',
            publish_date: '2023-11-20 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 1000,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'New Year\'s Eve Party',
            description: 'Ring in the new year with live music, dancing, and a champagne toast.',
            price: 100.00,
            iso_currency: 'USD',
            address: '890 Oak St',
            location: 'Grand Ballroom',
            date: '2023-12-31 21:00:00-04',
            publish_date: '2023-12-15 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 150,
            visibility: 'private',
            spotify_id: '1357902468'
        },
        {
            title: 'Summer Music Festival',
            description: 'A weekend of music, food, and fun in the sun!',
            price: 35.00,
            iso_currency: 'USD',
            address: '789 Oak St',
            location: 'Fairgrounds',
            date: '2023-08-25 12:00:00-04',
            publish_date: '2023-07-15 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 500,
            visibility: 'public',
            spotify_id: '1357924680'
        },
        {
            title: 'Art Exhibition',
            description: 'View and purchase artwork from local and national artists.',
            price: 0.00,
            iso_currency: 'USD',
            address: '456 Elm St',
            location: 'Art Gallery',
            date: '2023-09-15 10:00:00-04',
            publish_date: '2023-08-25 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 1000,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Fitness Challenge',
            description: 'Compete in a series of fitness challenges for a chance to win prizes!',
            price: 25.00,
            iso_currency: 'USD',
            address: '123 Main St',
            location: 'Fitness Center',
            date: '2023-10-10 08:00:00-04',
            publish_date: '2023-09-25 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 50,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'Holiday Market',
            description: 'Shop for unique gifts and holiday decorations from local vendors.',
            price: 0.00,
            iso_currency: 'USD',
            address: '321 Oak St',
            location: 'Town Square',
            date: '2023-11-25 12:00:00-04',
            publish_date: '2023-11-01 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 500,
            visibility: 'public',
            spotify_id: null
        },
        {
            title: 'New Year\'s Eve Bash',
            description: 'Ring in the new year with a night of music, dancing, and champagne!',
            price: 50.00,
            iso_currency: 'USD',
            address: '789 Maple St',
            location: 'Ballroom',
            date: '2023-12-31 21:00:00-04',
            publish_date: '2023-12-01 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 100,
            visibility: 'public',
            spotify_id: '3692581470'
        },
    ],
    comments : [
        {
            event_id: 1,
            user_id: 1,
            comment: "Great concert, had a lot of fun!",
            parent_id: null
        },
        {
            event_id: 1,
            user_id: 2,
            comment: "I loved the atmosphere, would definitely attend again.",
            parent_id: null
        },
        {
            event_id: 2,
            user_id: 3,
            comment: "It was an amazing experience. I'm glad I attended.",
            parent_id: null
        },
        {
            event_id: 2,
            user_id: 4,
            comment: "I had a great time and it was for a good cause. Thanks for organizing!",
            parent_id: null
        },
        {
            event_id: 3,
            user_id: 5,
            comment: "I laughed so hard! Great comedians and awesome venue.",
            parent_id: null
        },
        {
            event_id: 3,
            user_id: 1,
            comment: "I loved the variety of comedians, had a great time.",
            parent_id: null
        },
        {
            event_id: 3,
            user_id: 2,
            comment: "The drinks were a bit expensive, but the show made it worth it.",
            parent_id: null
        },
        {
            event_id: 3,
            user_id: 3,
            comment: "I was disappointed that the show started late, but the comedians were hilarious.",
            parent_id: null
        },
        {
            event_id: 4,
            user_id: 4,
            comment: "Such a fun night! Thanks for organizing.",
            parent_id: null
        },
        {
            event_id: 7,
            user_id: 5,
            comment: "I loved the movie choice and the atmosphere. Great event.",
            parent_id: null
        },
        {
            event_id: 8,
            user_id: 1,
            comment: "The wine tasting was fantastic. Thanks for a great experience.",
            parent_id: null
        },
        {
            event_id: 5,
            user_id: 2,
            comment: "I wish there were more food options, but the wine was excellent.",
            parent_id: null
        },
        {
            event_id: 12,
            user_id: 3,
            comment: "I had a great time, but the price was a bit steep for me.",
            parent_id: null
        },
        {
            event_id: 5,
            user_id: 4,
            comment: "I loved learning about the different wines and regions. Great event.",
            parent_id: null
        },
        {
            event_id: 9,
            user_id: 5,
            comment: "The location was a bit hard to find, but the wine was definitely worth it.",
            parent_id: null
        },
        {
            event_id: 12,
            user_id: 1,
            comment: 'Great concert! I had a blast.',
            parent_id: null
        },
        {
            event_id: 1,
            user_id: 2,
            comment: 'Agreed, the music was awesome!',
            parent_id: 1
        },
        {
            event_id: 1,
            user_id: 3,
            comment: 'I wish I could have been there. Hopefully next time!',
            parent_id: null
        },
        {
            event_id: 2,
            user_id: 4,
            comment: 'What a wonderful event for a great cause.',
            parent_id: null
        },
        {
            event_id: 2,
            user_id: 5,
            comment: 'I couldn\'t agree more. So happy to support!',
            parent_id: 4
        },
        {
            event_id: 3,
            user_id: 3,
            comment: 'I can\'t wait to laugh until my stomach hurts!',
            parent_id: null
        },
        {
            event_id: 3,
            user_id: 1,
            comment: 'Same here! This is going to be a blast.',
            parent_id: 6
        },
        {
            event_id: 4,
            user_id: 2,
            comment: 'Looking forward to this movie night under the stars!',
            parent_id: null
        },
        {
            event_id: 4,
            user_id: 4,
            comment: 'Me too! It\'s the perfect way to spend a summer evening.',
            parent_id: 8
        },
        {
            event_id: 13,
            user_id: 5,
            comment: 'I love a good wine tasting. Can\'t wait for this event!',
            parent_id: null
        },
        {
            event_id: 5,
            user_id: 1,
            comment: 'Same here! I\'m excited to try some new wines.',
            parent_id: 10
        },
        {
            event_id: 5,
            user_id: 2,
            comment: 'Me too! It\'s going to be a great day.',
            parent_id: 10
        },
        {
            event_id: 14,
            user_id: 3,
            comment: 'I don\'t drink wine, but I\'m sure it will be a great event.',
            parent_id: null
        },
        {
            event_id: 5,
            user_id: 4,
            comment: 'I\'m not a big fan of wine, but I\'m sure I can find something I like.',
            parent_id: 10
        },
        {
            event_id: 5,
            user_id: 5,
            comment: 'The best part of wine tasting is discovering new favorites!',
            parent_id: 10
        }
    ],
    promos : [
        {
            event_id: 1,
            text: 'PROMO10',
            discount: 10.00,
            valid_till: '2023-04-30 23:59:59-04'
        },
        {
            event_id: 1,
            text: 'SPRING25',
            discount: 25.00,
            valid_till: '2023-05-15 23:59:59-04'
        },
        {
            event_id: 2,
            text: 'GALA25',
            discount: 25.00,
            valid_till: '2023-04-30 23:59:59-04'
        },
        {
            event_id: 2,
            text: 'EARLYBIRD',
            discount: 15.00,
            valid_till: '2023-04-20 23:59:59-04'
        },
        {
            event_id: 3,
            text: 'COMEDY20',
            discount: 20.00,
            valid_till: '2023-06-01 23:59:59-04'
        },
        {
            event_id: 3,
            text: 'LAUGH30',
            discount: 30.00,
            valid_till: '2023-06-15 23:59:59-04'
        },
        {
            event_id: 4,
            text: 'MOVIE50',
            discount: 50.00,
            valid_till: '2023-07-31 23:59:59-04'
        },
        {
            event_id: 4,
            text: 'FREEMOVIE',
            discount: 100.00,
            valid_till: '2023-07-05 23:59:59-04'
        },
        {
            event_id: 5,
            text: 'WINETIME',
            discount: 10.00,
            valid_till: '2023-08-01 23:59:59-04'
        },
        {
            event_id: 5,
            text: 'SUMMER20',
            discount: 20.00,
            valid_till: '2023-08-31 23:59:59-04'
        },
        {
            event_id: 6,
            text: 'MUSIC10',
            discount: 10.00,
            valid_till: '2023-09-30 23:59:59-04'
        },
        {
            event_id: 6,
            text: 'SOUNDOFF',
            discount: 15.00,
            valid_till: '2023-10-15 23:59:59-04'
        },
        {
            event_id: 7,
            text: 'OUTDOOR10',
            discount: 10.00,
            valid_till: '2023-11-30 23:59:59-04'
        },
        {
            event_id: 7,
            text: 'FALLMOV20',
            discount: 20.00,
            valid_till: '2023-12-15 23:59:59-04'
        },
        {
            event_id: 8,
            text: 'HOLIDAY',
            discount: 25.00,
            valid_till: '2023-12-31 23:59:59-04'
        },
        {
            event_id: 11,
            text: 'PROMO11',
            discount: 10.00,
            valid_till: '2023-08-01 00:00:00-04'
        },
        {
            event_id: 12,
            text: 'PROMO12',
            discount: 5.00,
            valid_till: '2023-08-15 00:00:00-04'
        },
        {
            event_id: 13,
            text: 'PROMO13',
            discount: 15.00,
            valid_till: '2023-09-01 00:00:00-04'
        },
        {
            event_id: 14,
            text: 'PROMO14',
            discount: 20.00,
            valid_till: '2023-09-15 00:00:00-04'
        },
        {
            event_id: 15,
            text: 'PROMO15',
            discount: 25.00,
            valid_till: '2023-10-01 00:00:00-04'
        }
    ],
    tickets : [
        {
            event_id: 1,
            user_id: 1,
            can_show: true
        },
        {
            event_id: 1,
            user_id: 2,
            can_show: true
        },
        {
            event_id: 1,
            user_id: 3,
            can_show: false
        },
        {
            event_id: 1,
            user_id: 4,
            can_show: true
        },
        {
            event_id: 1,
            user_id: 5,
            can_show: false
        },
        {
            event_id: 2,
            user_id: 1,
            can_show: true
        },
        {
            event_id: 2,
            user_id: 2,
            can_show: true
        },
        {
            event_id: 2,
            user_id: 3,
            can_show: true
        },
        {
            event_id: 3,
            user_id: 4,
            can_show: true
        },
        {
            event_id: 3,
            user_id: 5,
            can_show: false
        },
        {
            event_id: 3,
            user_id: 1,
            can_show: true
        },
        {
            event_id: 4,
            user_id: 2,
            can_show: false
        },
        {
            event_id: 4,
            user_id: 3,
            can_show: true
        },
        {
            event_id: 5,
            user_id: 4,
            can_show: false
        },
        {
            event_id: 5,
            user_id: 5,
            can_show: true
        },
        // tickets for event 8
        {event_id: 8, user_id: 1, can_show: true},
        {event_id: 8, user_id: 2, can_show: true},
        {event_id: 8, user_id: 3, can_show: false},
        {event_id: 8, user_id: 4, can_show: false},
        {event_id: 8, user_id: 5, can_show: true},
        // tickets for event 9
        {event_id: 9, user_id: 1, can_show: true},
        {event_id: 9, user_id: 2, can_show: false},
        {event_id: 9, user_id: 3, can_show: true},
        {event_id: 9, user_id: 4, can_show: true},
        {event_id: 9, user_id: 5, can_show: false},
        // tickets for event 10
        {event_id: 10, user_id: 1, can_show: true},
        {event_id: 10, user_id: 2, can_show: true},
        {event_id: 10, user_id: 3, can_show: false},
        {event_id: 10, user_id: 4, can_show: true},
        {event_id: 10, user_id: 5, can_show: true},
        // tickets for event 11
        {event_id: 11, user_id: 1, can_show: false},
        {event_id: 11, user_id: 2, can_show: true},
        {event_id: 11, user_id: 3, can_show: false},
        {event_id: 11, user_id: 4, can_show: false},
        {event_id: 11, user_id: 5, can_show: true},
        // tickets for event 12
        {event_id: 12, user_id: 1, can_show: true},
        {event_id: 12, user_id: 2, can_show: false},
        {event_id: 12, user_id: 3, can_show: true},
        {event_id: 12, user_id: 4, can_show: false},
        {event_id: 12, user_id: 5, can_show: true},
        // tickets for event 13
        {event_id: 13, user_id: 1, can_show: false},
        {event_id: 13, user_id: 2, can_show: true},
        {event_id: 13, user_id: 3, can_show: true},
        {event_id: 13, user_id: 4, can_show: true},
        {event_id: 13, user_id: 5, can_show: true},
        // tickets for event 14
        {event_id: 14, user_id: 1, can_show: true},
        {event_id: 14, user_id: 2, can_show: true},
        {event_id: 14, user_id: 3, can_show: true},
        {event_id: 14, user_id: 4, can_show: false},
        {event_id: 14, user_id: 5, can_show: false},
    ],
    subscriptions : [
        {organizer_id: 1, user_id: 1},
        {organizer_id: 1, user_id: 2},
        {organizer_id: 1, user_id: 3},
        {organizer_id: 2, user_id: 2},
        {organizer_id: 2, user_id: 3},
        {organizer_id: 2, user_id: 4},
        {organizer_id: 3, user_id: 1},
        {organizer_id: 3, user_id: 5},
        {organizer_id: 3, user_id: 4}
    ],
    favorites : [
        {event_id: 1, user_id: 1},
        {event_id: 3, user_id: 1},
        {event_id: 5, user_id: 1},
        {event_id: 7, user_id: 1},
        {event_id: 9, user_id: 1},
        {event_id: 11, user_id: 1},
        {event_id: 13, user_id: 1},
        {event_id: 15, user_id: 1},
        {event_id: 2, user_id: 2},
        {event_id: 4, user_id: 2},
        {event_id: 6, user_id: 2},
        {event_id: 8, user_id: 2},
        {event_id: 10, user_id: 2},
        {event_id: 12, user_id: 3},
        {event_id: 14, user_id: 4},
        {event_id: 15, user_id: 5},
        {
            event_id: 2,
            user_id: 1
        },
        {
            event_id: 5,
            user_id: 1
        },
        {
            event_id: 10,
            user_id: 1
        },
        {
            event_id: 3,
            user_id: 2
        },
        {
            event_id: 7,
            user_id: 2
        },
        {
            event_id: 12,
            user_id: 2
        },
        {
            event_id: 1,
            user_id: 3
        },
        {
            event_id: 8,
            user_id: 3
        },
        {
            event_id: 13,
            user_id: 3
        },
        {
            event_id: 4,
            user_id: 4
        },
        {
            event_id: 6,
            user_id: 4
        },
        {
            event_id: 9,
            user_id: 4
        },
        {
            event_id: 11,
            user_id: 5
        },
        {
            event_id: 14,
            user_id: 5
        },
        {
            event_id: 15,
            user_id: 5
        }
    ],
}

async function setDefaultData(database) {
    for (const table in data) {
        const arr = data[table];
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            let instance = addData(database[table], obj)
            if (instance == null) {
                console.log("error while setting default data")
                return
            }
        }
    }
}

async function addData(model, data) {
    try {
        const { password, ...whereData } = data;
        const [instance, isCreated] = await model.findOrCreate({
            where: {
                ...whereData
            },
            defaults: {
                ...data
            }
        });

        return instance
    }catch (err) {
        console.log(err);
        return null
    }

}
module.exports = {
    setDefaultData
}