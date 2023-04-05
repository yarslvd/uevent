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