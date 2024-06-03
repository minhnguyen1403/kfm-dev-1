# FE run instruction

:warning: **Warning:** Cần start BE trươc khi sủ dung các features như Login/Signup.

## Run dev mod bằng npm

1. Install packages: `npm i`
2. Run app: `npm run start`

## Run prod mod trong docker

1. Build image: `docker build -t ex2-fe .`
2. Run container: `docker run -p 4200:80 -d ex2-fe`
