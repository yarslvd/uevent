CREATE TYPE events_visability_enum AS ENUM ('private', 'public');

-- TODO: add indexes to fields by which filtering will be done

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    email TEXT NOT NULL,
    username TEXT NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS organizers (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email TEXT NOT NULL,
    user_id BIGINT NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    comment TEXT NOT NULL,
    parent_id BIGINT 
);

CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    poster TEXT NOT NULL DEFAULT 'set some default poster bitch',
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12,2) NOT NULL,
    iso_currency VARCHAR(3) NOT NULL,
    address TEXT NOT NULL,
    location POINT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    publish_date TIMESTAMP WITH TIME ZONE NOT NULL,
    organizer_id BIGINT NOT NULL,
    ticket_amount INTEGER NOT NULL,
    visability events_visability_enum NOT NULL,
    -- notifications we need to think about notifications

    FOREIGN KEY(organizer_id) REFERENCES organizers(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS promos (
    event_id BIGINT NOT NULL,
    discount NUMERIC(5,2) NOT NULL,
    valid_till TIMESTAMP NOT NULL,
    
    FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE
);