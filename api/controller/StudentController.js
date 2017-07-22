'use strict';

var config = require('../config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+config.HOSTNAME+'/'+config.DATABASE);
    
var Schema = mongoose.Schema,
    errorHandler = require('./errors.server.controller'),
    _ = require('lodash');

/**
 * Student Schema
 */
var StudentSchema = new Schema({
	order_id: {
		type: Number,
		unique: true ,
		required: 'order_id cannot be blank',
		dropDups: true
	},
	national_id: {
		type: String,
		trim: true,
		required: 'id cannot be blank'
	},
    name_type : {
		type: String,
		trim: true,
		required: 'name cannot be blank'
	},
	name : {
		type: String,
		trim: true,
		required: 'name cannot be blank'
	},
	lastname : {
		type: String,
		trim: true,
		required: 'lastname cannot be blank'
	},
    goBackTime :{
        type: String,
		trim: true
    },
    goBackType :{
        type: String,
		trim: true
    }
});

var Student = mongoose.model('Student', StudentSchema);

/**
 * Test API
 */
exports.test = function(req, res) {
    console.log('Test successfully!')
    res.end('Test successfully!');
};

/**
 * Create a Student
 */
exports.create = function(req, res) {

    var s = {
        "order_id" : req.params.order_id,
        "national_id" : req.params.national_id,
        "name_type" : req.params.name_type,
        "name" : req.params.name,
        "lastname" : req.params.lastname
    };
    
    var student = new Student(s);
    console.log('creating a student..',student.order_id, student.name, student.lastname );
    
    student.save(function(err, stu){
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            console.log('Already added.');
            res.end('added a student order id : ' + stu.order_id);
        }
    });
    
};


/**
 * Update a Account
 */

exports.update = function(req, res) {
    console.log('updating...');
    
    if(!req.student){
        res.json('This student is not found');
    }else{
        var student = req.student; 
        console.log(student);

        var updated_stu = {
            "order_id" : student.order_id,
            "national_id" : student.national_id,
            "name_type" : student.name_type,
            "name" : student.name,
            "lastname" : student.lastname,
            "goBackTime" : req.params.goBackTime,
            "goBackType" : req.params.goBackType
        };

        student = new Student(updated_stu);

        student.save(function(err) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(student);
            }
        });
    }

};

exports.delete = function(req, res, next) {
    var student = req.student;

	student.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('processing for updating..');
            next();
		}
	});
};

exports.deleteAll = function(req, res) {

	Student.remove({},function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			console.log('Deleted all students..');
            res.end('Deleted all students..');
		}
	});
};

/**
 * List of Students
 */
exports.list = function(req, res) {
	Student.find().sort({order_id:1}).exec(function(err, students) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            console.log('All students listed!');
            res.charset = 'utf8';
			res.json(students);
		}
	});
};

exports.searchWithName = function(req, res) {
	Student.findOne({ name: req.params.name, lastname: req.params.lastname }, function (err, doc){
        console.log('searching..');
        res.json(doc);
    });
};

exports.searchWithID = function(req, res) {
	Student.findOne({ national_id: req.params.national_id }, function (err, doc){
        console.log('searching..');
        res.json(doc);
    });
};

exports.isUserExist = function(req, res, next) {
    console.log('searching student to update...');
    console.log(req.params.national_id);
    Student.findOne({'national_id': req.params.national_id}).exec(function(err, student) {
        if (err) return next(err);
        req.student = student;
        next();
    });
};
