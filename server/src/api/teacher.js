const express = require('express')
const router = express.Router()
const passport = require('passport');

const {signUp, login, userPanel, emailVerification, updateProfile, deleteProfile, getAllTeachers} = require('../controllers/teacherController')
const {Register, Login} = require('../middleware/basic')
const auth = require('../middleware/auth')

router.post('/teacher/signup', Register, signUp)
router.post('/teacher/login', Login, login)
router.post('/teacher/details', auth, userPanel)
router.get('/teacher/verify/:token', emailVerification)

router.get('/teacher/all', getAllTeachers)

router.post('/teacher/update',auth, updateProfile)

router.get('/teacher/createGoogle', passport.authenticate('teacher', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/callback', passport.authenticate('teacher', { failureRedirect: '/teacher/login' }), (req, res) => {
    res.redirect('http://localhost:3000/teacher/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})

router.get('/teacher/useGoogle', passport.authenticate('teacher', {  scope: ['profile', 'email'] }))
router.get('/auth/google/teacher/callback', passport.authenticate('teacher', { failureRedirect: '/teacher/signup' }), (req, res) => {
    res.redirect('http://localhost:3000/teacher/dashboard?token=' + req.user.tokens[req.user.tokens.length-1].token)
})


module.exports = router;