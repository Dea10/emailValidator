# Email Validator

![image](https://github.com/Dea10/emailValidator/assets/16433973/24da7cee-19b5-45fa-a77e-ad1bbcf4a619)


## How to install in local
Minimum requirements:
- MySQL 8.x.x
- Node 18.x.x

Clone and install

`$ git clone https://github.com/Dea10/emailValidator.git`

`$ cd emailValidator`

`$ npm i`

Create database

`$ mysql email_validator < ./emailValidator.sql -u root -p`

Create `.env` file at project root with following variables:
```
PORT=8080
DB_HOST='localhost'
DB_NAME='email_validator'
DB_USER='root'
DB_PASSWORD=<your_password>
```

Run app

`$ node app.js`

## Available endpoints
base url: http://localhost:8080 || https://emailvalidator-production.up.railway.app

- (GET) /api/users/getUsers
    - email: string
    - phone: string
- (POST) /api/users/registerUser
    - name: string
    - email: string
    - phone: string
- (POST) /api/email/startEmailVerification
    - email: string
- (GET) /api/email/verifyEmail
    - email: string
- (GET) /api/email/getVerified
    - q: boolean

Test it with postman

![Alt text](image.png)

response:
```
{
    "msg": "get users API - controller",
    "rows": [
        {
            "name": "Daniel",
            "email": "daniel@mail.com",
            "phone": "55 1111 1111"
        }
    ]
}
```
![Alt text](image-1.png)
body params
```
{
    "name": "Daniel",
    "email": "daniel@mail.com",
    "phone": "55 1111 1111"
}
```

response:
```
{
    "msg": "post API - controller",
    "newUser": {
        "id": 1,
        "email": "daniel@mail.com",
        "phone": "55 1111 1111"
    },
    "newMail": {
        "id": 1,
        "email": "daniel@mail.com"
    },
    "newPhone": {
        "id": 1,
        "phone": "55 1111 1111"
    }
}
```


by Daniel Espinosa
