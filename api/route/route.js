const express = require('express'),
      config = require('../config'),
      app = express(),
      students = require('../controller/StudentController');


app.get('/api/test', students.test);
app.get('/api/list', students.list);
app.get('/api/addStudent/:order_id/:national_id/:name_type/:name/:lastname', students.create);

app.get('/api/search/:name/:lastname',students.searchWithName);
app.get('/api/search/:national_id',students.searchWithID);

app.route('/api/update/:national_id/:goBackTime/:goBackType')
    .get(students.isUserExist)
    .get(students.delete)
    .get(students.update);

app.get('/api/deleteAll',students.deleteAll);

//config api port
app.listen(config.API_PORT, function() {
  console.log('API is listening on '+config.API_PORT+'...')
});

