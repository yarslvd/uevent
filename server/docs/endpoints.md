![image.png](image.png)

# Endpoints

## AUTH
___
### POST /api/auth/register

```json
{
  "username": "kevandee",           required
  "password": "12345678qqQ",        required
  "email": "achayka95@gmail.com",   required
  "first_name": "Anton",
  "last_name": "Chaika",
  "birthdate": ""
}
```
___
### POST /api/auth/login

```json
{
  "username": "kevandee",           required
  "password": "12345678",           required
  "email": "achayka95@gmail.com",   required
}
```
___
### POST /api/auth/logout

```json
{}
```
___
### POST /api/auth/refresh

```json
{
  "refresh_token": ""     required
}
```
___
### POST /api/auth/password-reset

```json
{
  "email": ""     required
}
```
___
### POST /api/auth/password-reset/:confirm-token

```json
{
  "password": ""  required
}
```
___
### GET /api/auth/email-confirm/:confirm-token
___


## ORGANIZERS
___
### POST /api/organizers/
```json
{
  "name":  "",    required
  "email": ""     required
}
```
___
### GET /api/organizers?limit=5&page=1&name=organizersName
___
### GET /api/organizers/:id
___
### PATCH /api/organizers/:id
```json
{
  "name":  "",    required
  "email": ""     required
}
```
___
### DELETE /api/organizers/:id
___


## EVENTS
___
### POST /api/events/
```json
{
  "title": "",          all required
  "description": "",
  "price": "",
  "iso_currency": "",
  "address": "",
  "location": "",
  "date": "",
  "publish_date": "",
  "organizer_id": "",
  "ticket_amount": "",
  "visibility": "",
  "poster": ""         not required)
}
```
___
### GET /api/events?limit=5&page=1&organizers=id&date_between[from]=...&date_between[to]=...&price_between[from]=...&price_between[to]=...
___
### GET /api/events/:id

INSERT INTO events (id, poster, title, description, price, iso_currency, address, location, date, publish_date, organizer_id, ticket_amount, visability) VALUES(1, 'https://images.squarespace-cdn.com/content/v1/5c213a383c3a53bf091b1c36/3f825ca8-72ac-4c5d-b485-035b9ddb5364/h.jpeg', 'Harry Styles', 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.', 700, 'USD', 'вулиця Пушкінська, 79/1, Харків, Харківська область, Украина, 61000', 'POINT(-118.4079 33.9434)', '2023-05-19 16:30:00+02', '2023-04-01 16:30:00+02', 1, 600, 'public');

INSERT INTO organizers (id, name, email, user_id) VALUES (1, 'Hello bitch', 'asdsadsad@sddsf.dfd', 13);
___
### PATCH /api/events/
```json
{
  "title": "",          all required
  "description": "",
  "price": "",
  "iso_currency": "",
  "address": "",
  "location": "",
  "date": "",
  "publish_date": "",
  "organizer_id": "",
  "ticket_amount": "",
  "visibility": "",
}
```
___
### DELETE /api/events/:id
___