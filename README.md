# planetExpress
planetExpress is a form backend, API and email service for HTML forms.

# Installation
```
npm install
```

# Before running
You must to set the next environment variables:
| Environment variable | Description |
| :---------: | :---------: |
| SENDGRID_API_KEY | Sendgrid api key. You can get your api key [here](https://sendgrid.com/). |
| EMAIL_FROM | Email with which you want to send the notification. |
| EMAIL_TO | Email where you want to receive de the notification. |
| REDIRECT_URL | URL to redirect the user after submitting the form. |
| WEBSITE | URL of the site where the form is located. |
| USER_NAME | Your name. |

# Run
```
node .
```
or
```
nodemon .
```

# Example
## Input

```
curl -X POST \
  http://localhost:3002/sendForm \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 6989d461-feea-42f2-a2c0-4a7af3441563' \
  -H 'cache-control: no-cache' \
  -d '{
    "name" : "Elon Musk",
    "email" : "elon@tesla.com",
    "message" : "Hey, do you want to buy a car?"
}'
```

## Output
