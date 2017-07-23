# TUAM

<h3>1. Start mongoDB : </h3>
:: C:\Program Files\MongoDB\Server\3.4\bin\mongod <br/>
(at first time, you may have to create a directory : C:/data/db) <br/><br/>

<h3>2. Create Database :</h3>
    :: C:\Program Files\MongoDB\Server\3.4\bin\mongo<br/>
    :: db tuam<br/>

<h3>3. Start running project while developing :</h3>
    [[ install package ]] <br/>
    :: npm install <br/>
    [[ data data to database ]] <br/>
    :: cd api/model <br/>
    :: node dump.js <br/>
    [[ run ]] <br/>
    :: npm run dev<br/>

<h3>API route</h3>
:: to add student (will close after finish development)<br/>
    > HOSTNAME:PORT/api/addStudent/:order_id/:national_id/:name_type/:name/:lastname<br/>
:: to search student by name<br/>
    > HOSTNAME:PORT/api/search/:name/:lastname<br/>
:: to search student by national id<br/>
    > HOSTNAME:PORT/api/search/:national_id<br/>
:: to insert more information of student<br/>
    > HOSTNAME:PORT/update/:national_id/:goBackTime/:goBackType<br/>
