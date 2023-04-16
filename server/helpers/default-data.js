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
            password: hashPassword('password'),
            image: 'https://i.imgur.com/0V3xRbK.png'
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
            password: hashPassword('password'),
            image: 'https://i.imgur.com/hfqoNvz.png'
        },
        {
            first_name: 'Alice',
            last_name: 'Johnson',
            birthdate: '1998-12-10',
            email: 'alice.johnson@example.com',
            confirmed_email: true,
            username: 'alicejohnson',
            password: hashPassword('password'),
            image: 'https://i.imgur.com/wbci1oY.png'
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
        {
            name: 'ARTLIVE',
            description: `ARTLIVE is a leading event management company that specializes in planning and organizing music concerts, festivals, and live entertainment events. Our team of experienced professionals works tirelessly to deliver exceptional events that exceed our clients' expectations.
            From the initial planning phase to the execution of the event, our team provides end-to-end solutions to ensure that every aspect of the event is perfectly managed. We take pride in our ability to handle events of all sizes and complexities, and we work closely with our clients to understand their specific requirements and deliver customized solutions. 
            Our services include venue selection, artist management, ticketing, event promotion, sound and lighting production, and event security. We work with a wide range of clients, including music promoters, festival organizers, corporate clients, and individual artists.
            At Concerts Organizing Company, we are committed to providing a seamless and stress-free experience for our clients and their guests. We are dedicated to ensuring that every event we organize is a resounding success and leaves a lasting impression on all those who attend.`,
            email: 'artlive@info.com',
            user_id: 1
        },
        {
            name: 'BestOne',
            description: `Best One is a premier concert organizing company that specializes in creating unforgettable experiences for music lovers. With years of experience in the industry, Best One has a team of passionate p
            From small local events to large international festivals, Best One has the expertise and resources to deliver a wide range of music events to suit any taste. They work closely with their clients to understand their vision and bring it to life with precision planning and flawless execution.
            With their deep industry connections, Best One has access to some of the biggest and most sought-after music artists, ensuring that their events are always top-notch and in high demand. Their attention to detail and commitment to excellence is second to none, making them the go-to choice for anyone looking to host a world-class music event.`,
            email: 'bestie@one.com',
            user_id: 2
        },
        {
            name: 'Jsnn',
            description: `JSNN is a premier events organizer, focused on creating unique and unforgettable experiences for individuals and organizations alike. With a team of seasoned professionals and a passion for creativity, JSNN is dedicated to crafting events that reflect the personality and style of their clients.
            From corporate events to private parties, JSNN offers a wide range of services tailored to meet the needs of their clients. They work closely with each client to understand their vision and bring it to life through careful planning, attention to detail, and innovative design.`,
            email: 'contact@jsnn.com',
            user_id: 3
        },
    ],

    events : [
        {
            title: 'СТЕПАН ГІГА. ЗОЛОТІ ХІТИ',
            description: `<p>
            <strong>Степан Гіга. Золоті хіти у Києві відбудеться завдяки ЗСУ! 1 травня у Жовтневому палаці у Києві відбудеться великий концерт зірки української естради Степана Гіги.</strong>
            <br/><br/>
            <strong>ЧОМУ ВАРТО ПІТИ НА КОНЦЕРТ СТЕПАНА ГІГИ У КИЄВІ?</strong><br/><br/>
            1. Легендарний артист із величезною армією шанувальників. <br/>
            2. Ексклюзивна програма із найкращих хітів співака.<br/>
            3. Нові враження та незабутні спогади від яскравої події.<br/><br/>
            <strong>СТЕПАН ГІГА ІЗ ВЕЛИКИМ КОНЦЕРТОМ У КИЄВІ</strong>
            1 травня запрошуємо вас до Жовтневого палацу на яскравий концерт Народного артиста України, зірки вітчизняної сцени Степана Гіги! Виступ кумира українців відбудеться на численні прохання публіки.
            Обирайте кращі місця у залі та замовляйте квитки вже сьогодні.<br/><br/>

            <strong>УНІКАЛЬНА ПРОГРАМА «ЗОЛОТІ ХІТИ»: НА СЦЕНІ ЖОВТНЕВОГО ПАЛАЦУ – НЕПОВТОРНИЙ СТЕПАН ГІГА</strong><br/>
            Любов до творчості Степана Гіги об’єднує тисячі людей, що є представниками різних поколінь. У репертуарі співака – десятки доленосних композицій, рядки з яких ви зможете разом із улюбленим виконавцем заспівати на концерті у столиці: «Золото Карпат», «Цей сон», «Яворина» та багато інших.
            <br/><strong>Чекаємо на вас!</strong>
            </p>`,
            price: 300.00,
            iso_currency: 'UAH',
            address: 'Heroyiv Nebesnoyi Sotni Alley, 1, Kyiv, Ukraine, 02000',
            location: 'МЦКМ (Жовтневий палац)',
            date: '2023-04-29 12:00:00+03',
            publish_date: '2023-04-01 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 250,
            visibility: 'public',
            spotify_id: '4d3xJkRPmqX0jfvI3pgeXh',
            poster: 'https://i.imgur.com/xrpG2ei.png',
            theme: 'Entertainment',
            format: 'Concerts'
        },
        {
            title: 'DOROFEEVA',
            description: `<p>
            <strong>Концерт DOROFEEVA у Києві відбудеться 28 квітня 2023 року о 19:00 в Osocor Residence.</strong>
            <br/><br/>
            <strong>ЧОМУ ВАРТО ПІТИ НА КОНЦЕРТ DOROFEEVA У КИЄВІ?</strong><br/><br/>
            1. Суперпопулярна українська артистка. <br/>
            2. Нова концертна програма із топових хітів.<br/>
            3. Справжній відпочинок та тепле спілкування з улюбленою співачкою.<br/><br/>
            <strong>КОНЦЕРТ DOROFEEVA У КИЄВІ</strong>
            DOROFEEVA – яскрава зірка сучасного українського шоу-бізнесу, чия творчість об’єднує навколо себе сотні тисяч людей. Концерти співачки сьогодні збирають аншлаги, а квитки розбирають за лічені дні.<br/><br/>

            <strong>ВЕЧІР, СПОВНЕНИЙ «СЕНСІВ», В OSOCOR RESIDENCE</strong><br/>
            28 квітня ви зможете побачити нову неймовірну програму DOROFEEVA, яку артистка вже презентувала у 17 містах України. Це були абсолютні солд-аути в рамках благодійного туру. І тепер ви маєте унікальну нагоду почути «Сенси» наживо. «Думи», «Щоб не було», «вотсап» та інші проникливі та відверті пісні торкнуться ваших сердець. Неможливо пропустити! Під час концерту буде проведений благодійний аукціон для збору коштів на потреби українців. Резиденція Osocor має потужний генератор та надійне укриття. До зустрічі!
            <br/><strong>Чекаємо на вас!</strong>
            </p>`,
            price: 700.00,
            iso_currency: 'UAH',
            address: 'Heroyiv Nebesnoyi Sotni Alley, 1, Kyiv, Ukraine, 02000',
            location: 'Osocor Residence',
            date: '2023-05-15 19:00:00+03',
            publish_date: '2023-04-08 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 140,
            visibility: 'public',
            spotify_id: '7wl1m5vgWkCP3cqYVj2noM',
            poster: 'https://i.imgur.com/RgsqJx4.png',
            theme: 'Entertainment',
            format: 'Concerts'
        },
        {
            title: 'Harry Styles. Love On Tour.',
            description: `<p>
            <strong>Love on Tour is the highly anticipated concert tour by the talented and charismatic Harry Styles. </strong>
            <br/><br/>
            The tour promises to be a celebration of love, music, and unity. Fans can expect an unforgettable experience as Harry takes the stage with his iconic style, electrifying energy, and soulful performances.
            <br/><br/>
            <strong>The concert will feature a mix of Harry's biggest hits</strong><br/>
            As the lights dim and the music starts, fans will be transported to a magical world where they can sing, dance, and let loose. Every song will be infused with Harry's unique style and passion, leaving fans feeling inspired and uplifted.<br/><br/>

            <strong>The show will be a showcase of Harry's incredible talent</strong><br/>
            With his infectious charm and magnetic stage presence, Harry will engage the audience and create a special connection that is sure to be remembered long after the concert is over. Love on Tour is more than just a concert; it is an experience that fans will cherish for a lifetime. This tour promises to bring an unforgettable experience to audiences across the world. Fans will be treated to a one-of-a-kind concert event featuring Harry Styles' signature style and sound. Expect to be blown away by his electrifying performances of his hit songs, including "Watermelon Sugar," "Adore You," and "Golden." Don't miss out on this incredible experience of a lifetime. Get your tickets to the Love on Tour today and be prepared to be swept off your feet by the unstoppable force that is Harry Styles.
            <br/><strong>Waiting for you!</strong>
            </p>`,
            price: 2000.00,
            iso_currency: 'UAH',
            address: "79, Palats Studentiv Khpi, Pushkins'ka St, Kharkiv, Kharkivs'ka oblast, Ukraine, 61000",
            location: "Students' Palace of NTU KHPI",
            date: '2023-06-06 20:00:00+03',
            publish_date: '2023-04-08 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 400,
            visibility: 'public',
            spotify_id: '6KImCVD70vtIoJWnq6nGn3',
            poster: 'https://i.imgur.com/z0Dxi8g.jpg',
            theme: 'Entertainment',
            format: 'Concerts'
        },
        {
            title: 'Don Toliver Tour',
            description: `<p>
            <strong>Don Toliver is taking his electrifying sound on the road with his highly anticipated concert tour.</strong>
            <br/><br/>
            Fans of the Houston rapper can expect a high-energy show that is sure to get the crowd moving. With hits like "No Idea" and "After Party," Don Toliver has become one of the hottest names in hip hop, and his live performances are not to be missed.
            <br/><br/>
            <strong>From the moment the lights go down</strong><br/>
            The excitement will be palpable as Don Toliver takes the stage, backed by a full band and dazzling light show. Fans can expect to hear all their favorite songs, as well as some surprises, as Don Toliver delivers a show that is both intimate and explosive. Get ready to experience the electrifying energy of his live show, where he'll perform his biggest hits and bring the house down with his infectious beats and mesmerizing stage presence. This is a concert you won't want to miss.
            <br/><br/>
            <strong>The show will be a showcase of Harry's incredible talent</strong><br/>
            Don't miss your chance to see this rising star as he brings his unique sound to audiences across the country. Get your tickets now and experience the thrill of Don Toliver live in concert! Join us for an unforgettable night as Don Toliver takes the stage to showcase his incredible talent and leave the audience begging for more. Don't wait, get your tickets now before they sell out!
            <br/><strong>Waiting for you!</strong>
            </p>`,
            price: 1400.00,
            iso_currency: 'UAH',
            address: "Sumska St, 25, Kharkiv, Kharkivs'ka oblast, Ukraine, 61000",
            location: "Kharkiv State Academic Opera and Ballet Theatre",
            date: '2023-06-01 19:00:00+03',
            publish_date: '2023-04-08 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 220,
            visibility: 'public',
            spotify_id: '4Gso3d4CscCijv0lmajZWs',
            poster: 'https://i.imgur.com/dcW6cUR.png',
            theme: 'Entertainment',
            format: 'Concerts'
        },
        {
            title: 'After Hours Till Dawn',
            description: `<p>
            <strong>The Weeknd is back with his highly-anticipated tour, and it's a show you won't want to miss!</strong>
            <br/><br/>
            This spectacular event features an incredible stage setup, breathtaking visual effects, and of course, The Weeknd's signature soulful vocals. The Weeknd's dynamic range and powerful vocals, accompanied by stunning visuals and a state-of-the-art production that will transport you to another dimension. 
            <br/><br/>
            <strong>The show will include all of The Weeknd's biggest hits</strong><br/>
            As well as some new and exclusive material that he's been working on just for this tour. From the electrifying energy of "Can't Feel My Face" to the emotional depth of "Blinding Lights," The Weeknd's performance is sure to leave you speechless. 
            <br/><br/>
            <strong>The Weeknd will keep you on the edge of your seat from start to finish</strong><br/>
            Don't miss out on this once-in-a-lifetime opportunity to experience one of the most talented and unique performers of our time. Get your tickets now and get ready to be blown away by The Weeknd's incredible live show!
            <br/><strong>Waiting for you!</strong>
            </p>`,
            price: 2500.00,
            iso_currency: 'UAH',
            address: "Sobornosti St, 58, Poltava, Poltavs'ka oblast, Ukraine, 36000",
            location: "Palace of leisure 'Lystopad'",
            date: '2023-05-17 18:00:00+03',
            publish_date: '2023-04-08 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 500,
            visibility: 'public',
            spotify_id: '1Xyo4u8uXC1ZmMpatF05PJ',
            poster: 'https://i.imgur.com/7cVVGxf.png',
            theme: 'Entertainment',
            format: 'Concerts'
        },
        {
            title: 'Wine Tasting',
            description: 'Sip and savor some of the best wines from around the world.',
            price: 300.00,
            iso_currency: 'UAH',
            address: "Konstytutsii Square, 2/2, Kharkiv, Kharkivs'ka oblast, Ukraine, 61000",
            location: 'Wine Cellar',
            date: '2023-06-20 14:00:00+03',
            publish_date: '2023-08-01 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 30,
            visibility: 'public',
            spotify_id: null,
            poster: 'https://i.imgur.com/CSWhDAP.png',
            theme: 'Psychology',
            format: 'Fests'
        },
        {
            title: 'Food Festival',
            description: 'Try delicious dishes from local restaurants and food trucks.',
            price: 0.00,
            iso_currency: 'UAH',
            address: 'Brovarskyi Ave, 7, Kyiv, Ukraine, 02000',
            location: 'City Square',
            date: '2023-07-15 12:00:00+03',
            publish_date: '2023-08-30 00:00:00-04',
            organizer_id: 2,
            ticket_amount: 500,
            visibility: 'public',
            spotify_id: null,
            poster: 'https://i.imgur.com/lhkYaF7.png',
            theme: 'Sports',
            format: 'Fests'
        },
        {
            title: 'Art Show',
            description: 'Admire the works of talented artists from all over the world.',
            price: 50.00,
            iso_currency: 'UAH',
            address: "Heroiv ATO St, 118/2к1, Poltava, Poltavs'ka oblast, Ukraine, 36000",
            location: 'Art Gallery',
            date: '2023-10-20 10:00:00+03',
            publish_date: '2023-10-01 00:00:00-04',
            organizer_id: 3,
            ticket_amount: 100,
            visibility: 'public',
            spotify_id: null,
            poster: 'https://i.imgur.com/Y3vXqhn.png',
            theme: 'Science',
            format: 'Workshops'
        },
        {
            title: 'Fashion Show',
            description: 'See the latest styles from top designers on the runway.',
            price: 50.00,
            iso_currency: 'USD',
            address: '1234 Fashion Ave',
            location: 'Convention Center',
            date: '2023-11-15 19:00:00+03',
            publish_date: '2023-11-01 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 200,
            visibility: 'public',
            spotify_id: null,
            poster: 'https://i.imgur.com/nujTUGG.png',
            theme: 'Business',
            format: 'Conferences'
        },
        {
            title: 'Holiday Market',
            description: 'Shop for unique gifts and decorations at this festive market.',
            price: 0.00,
            iso_currency: 'UAH',
            address: "Bohdana Khmel'nyts'koho St, 10а, L'viv, L'vivs'ka oblast, Ukraine, 79000",
            location: 'Town Square',
            date: '2023-12-10 12:00:00+03',
            publish_date: '2023-11-20 00:00:00-04',
            organizer_id: 1,
            ticket_amount: 1000,
            visibility: 'public',
            spotify_id: null,
            poster: 'https://i.imgur.com/zaz89e9.png',
            theme: 'Entertainment',
            format: 'Fests'
        },
        {
            title: 'New Year\'s Eve Party',
            description: 'Ring in the new year with live music, dancing, and a champagne toast.',
            price: 100.00,
            iso_currency: 'USD',
            address: '890 Oak St',
            location: 'Grand Ballroom',
            date: '2023-12-31 21:00:00+03',
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
            date: '2023-08-25 12:00:00+03',
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
            date: '2023-09-15 10:00:00+03',
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
            date: '2023-10-10 08:00:00+03',
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