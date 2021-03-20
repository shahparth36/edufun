const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

router.get('/login', async (req, res) => {
    // redirect login registration page
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), async (req, res) => {
    if (req.user.isStudent) 
        return res.send('student signed in successfully');
    return res.send('teacher signed in succssfully');
});

router.get('/student-registration', async (req, res) => {
    // redirect student registration page
});

router.post('/student-registration', async (req, res) => {
    if (req.body.password != req.body.confirmPassword)
        return res.send('password does not match');

    const password = bcrypt.hashSync(req.body.password, 8);
    const newStudent = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: password,
        age: req.body.age,
        gender: req.body.gender,
        contactNo: req.body.contactNo,
        isStudent: true,
        isTeacher: false
    });
    
    await Student.create(newStudent);
    return res.send('created user successfully');
});

router.get('/teacher-registration', async (req, res) => {
    // redirect teacher-registration page
});

router.post('/teacher-registration', async (req, res) => {
    if (req.body.password != req.body.confirmPassword)
        return res.send('password does not match');
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const newTeacher = new Teacher({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        age: req.body.age,
        gender: req.body.gender,
        contactNo: req.body.contactNo,
        isStudent: false,
        isTeacher: true
    });

    await Teacher.create(newTeacher);
    return res.send('created user successfully');
});

module.exports = router;