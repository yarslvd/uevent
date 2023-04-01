CREATE TYPE events_visability_enum AS ENUM ('private', 'public');

-- TODO: add indexes to fields by which filtering will be done

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    birthdate DATE,
    email TEXT NOT NULL,
    confirmed_email BOOLEAN NOT NULL DEFAULT FALSE,
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
    location GEOMETRY(POINT) NOT NULL,
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

CREATE TABLE IF NOT EXISTS tokens (
    token text PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS payments (
    id BIGSERIAL PRIMARY KEY,
    signature text NOT NULL
);

CREATE TABLE IF NOT EXISTS tickets (
    event_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,

    FOREIGN KEY(event_id) REFERENCES events(id) ON DELETE CASCADE ON UPDATE CASCADE.
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);


--
-- WITH nested_comments as (
--     SELECT
--         comments.*
--     FROM comments
--     GROUP BY comments.id
--     order by comments.id
-- ), sub_comments AS (
--     SELECT
--         comments.*,
--         json_agg(questions) as questions
--     FROM section
--              LEFT JOIN questions ON questions.section_id = section.id
--     GROUP BY section.id
--     order by section.id
-- )
-- SELECT row_to_json(sections)
-- FROM forms;
--
-- WITH RECURSIVE nested_comments AS (
--     SELECT id, event_id, user_id, comment, parent_id
--     FROM comments
--     WHERE parent_id IS NULL
--     UNION ALL
--     SELECT c.id, c.event_id, c.user_id, c.comment, c.parent_id
--     FROM comments c
--              INNER JOIN nested_comments nc ON c.parent_id = nc.id
-- )
-- SELECT parent.id, child.* AS children
-- FROM nested_comments parent
--          LEFT JOIN nested_comments child ON child.parent_id = parent.id
-- GROUP BY parent.id;