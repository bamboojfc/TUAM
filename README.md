# TUAM

<h1>Start mongoDB : </h1>
:: mongod <br/>
(at first time, you may have to create a directory : C:/data/db) <br/><br/>

Running mongodb command :
- Create Database
> mongo
> db tuam

Start running project :
> npm install (first time only)
> npm start

Start running project while developing :
> npm run dev

API route
:: to add student (will close after finish development)
    > HOSTNAME:PORT/api/addStudent/:order_id/:national_id/:name_type/:name/:lastname
:: to search student by name
    > HOSTNAME:PORT/api/search/:name/:lastname
:: to search student by national id
    > HOSTNAME:PORT/api/search/:national_id
:: to insert more information of student
    > HOSTNAME:PORT/update/:national_id/:goBackTime/:goBackType
