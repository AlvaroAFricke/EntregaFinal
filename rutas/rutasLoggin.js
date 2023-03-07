import express from "express";
import session from 'express-session'
import passport from "passport";
import logger from "../utils/logger.js"
import { Strategy as LocalStrategy } from 'passport-local'
import MongoUsuarios from "../contenedores/ContenedorUsuarios.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()

const baseUsuarios = new MongoUsuarios();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use(session({
    secret: 'sessionSecreta',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

//----Email----//

import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

/**
 * email: pruebacoder97@gmail.com
 * pass: prueba97coder
 */

const MAIL_ADDRESS = process.env.MAIL_ADDRESS
const MAIL_PASS = process.env.MAIL_PASS

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:MAIL_ADDRESS,
        pass:MAIL_PASS
    }
})

async function send(data) {
    const result = await transporter.sendMail({
        from: 'LaVerduleria',
        to: MAIL_ADDRESS,
        subject: 'Nuevo Registro',
        text: 'Gracias por registrarte en LaVerduleria' + JSON.stringify(data)
    });

    console.log(JSON.stringify(result, null, 4));
}

//----Passport-----//

//----Registro-----//
passport.use('register', new LocalStrategy({
    passReqToCallback: true    
}, async (req, username, password, done) => {
    const { direccion } = req.body
    const { edad } = req.body
    const { telefono } = req.body

    console.log(req.body);

    const usuario = await baseUsuarios.getByUsername(username)
    if (usuario) {
        logger.warn("Usuario ya registrado.")
        return done('el usuario ya esta registrado', false)
    }

    const newUser = {
        username,
        password,
        edad,
        telefono,
        direccion
    }

    send(newUser)

    baseUsuarios.save(newUser)
    logger.info("Nuevo usuario registrado.")
    return done(null, newUser)
}))

//----Loggin-----//
passport.use('login', new LocalStrategy(async (username, password, done) => {

    const usuario = await baseUsuarios.getByUsername(username)
    if (!usuario) {
        logger.warn("No existe el usuario.")
        return done(false)
    }

    if (usuario.password != password) {
        logger.warn("Contrasenia incorrecta.")
        return done(false)
    }

    logger.info("Usuario logeado.")
    return done(null, usuario)
}))

passport.serializeUser((user, done) => {
    done(null, user.username)
})

passport.deserializeUser(async (username, done) => {
    const usuario = await baseUsuarios.getByUsername(username)
    done(null, usuario)
})

app.use(passport.initialize())
app.use(passport.session())

//-------Registro------------//

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'sing-up.html'));
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/index' }))

app.get('/failregister', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'fail-sing.html'));
})

//----------------//
// Rutas de login //
//----------------//

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/index')
    }

    res.sendFile(path.join(__dirname, '../views', 'log-in.html'));
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/index' }))

app.get('/faillogin', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'fail-log.html'));
})

//----------------//
// Rutas de datos //
//----------------//

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

//-----------//
// Ruta raiz //
//-----------//

app.get('/index', requireAuthentication, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

//----------------//
// Ruta de logout //
//----------------//

app.get('/logout', (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    })
})

export default app