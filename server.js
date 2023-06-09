  const express = require('express')
  const bodyParser = require('body-parser')
  const bcrypt = require('bcrypt')
  const cors = require('cors')
  const knex = require('knex')

  const register = require('./controllers/register')
  const signin = require('./controllers/signin')
  const profile = require('./controllers/profile')
  const image = require('./controllers/image')
  const leaderboard = require('./controllers/leaderboard')


  const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
  })

  const app = express()


  app.use(bodyParser.json())
  app.use(cors())
  
  app.get('/', (req, res) => {
    res.send(db.users)
  })


  app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
  
  app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt)})

  app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)}
  )
  app.put('/image', (req, res) => {image.handleImage(req, res, db)})
  
  app.get('/leaderboard', (req, res) => {leaderboard.handleLeaderboardGet(req, res, db)})

  app.listen(3000, ()=> {
    console.log('app is running on port 3000')
  })


 