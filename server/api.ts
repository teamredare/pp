import { PrismaClient } from '@prisma/client';
import express from 'express'
import cors from 'cors'
import { getSecretWord } from './secretword';
import cookieParser from 'cookie-parser'
import { posterSaveDir, upload } from './upload';
let app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: '*',
    // origin:'http://localhost:3000',
}))


const prisma = new PrismaClient();

app.get('/parties', async (req, res) => {
    let parties = await prisma.post.findMany();
    // parties.lockedout = true;
    res.status(200).send(parties);
    // res.status(403).send({message:'you must enter the secret word'});
})

// app.get('/secretword',(req,res)=>{
//     res.send(getSecretWord())
// })
app.get('/accesstoken',(req,res)=>{
    let attemptedWord = req.query.word as string;
    let realSecretWord = getSecretWord();
    if(attemptedWord.toLowerCase().trim() == realSecretWord) {
        res.status(200).send({token:'yes'})
        // todo maybe return some encryption of their login deets that works with that
    } else {
        res.status(400).send({message:'wrong code'})
        // todo enable ip attempt rate limitting
    }
})
app.post('/posterimage',upload.single('file'), async (req,res)=>{
    console.log('image uploaded, name',req.file.filename)
    res.send({filename:req.file.filename})
})
import fs from 'fs'
import path from 'path'
app.get('/posterimage/:filename',(req,res)=>{
    res.send(fs.readFileSync(posterSaveDir + path.sep + req.params.filename))
})
app.post('/parties', async (req, res) => {
    let body = req.body;
    let session = req.cookies['session'];
    let authorId;
    if (session?.startsWith('guest.')) {
        authorId = session
    } else {
        authorId = 23432 //'... auth here'
    }
    body.authorId = authorId;
    console.log(req.body)

    let hasall = body.title && body.datetime;
    if (!hasall) {
        res.status(400).send('missing required attributes');
        return;
    }

    body.datetime = new Date(body.datetime).toISOString()
    await prisma.post.create({
        data: body
    })

    res.status(200).send('success')
})

app.post('/action', async (req, res) => {
    let action = req.query.action;
    let parentId = req.query.parentId;
    let ip = req.ip;
    let sessionId = req.cookies['sessionId'];
    let userId = sessionId;

    await prisma.action.create({
        data: {
            userId,
            ip,
            action,
            postId: parentId,
        }
    })
})

app.delete('/action', async (req, res) => {
    let action = req.query.action;
    let parentId = req.query.parentId;
    let ip = req.ip;
    let sessionId = req.cookies['sessionId'];
    let userId = sessionId;

    await prisma.action.delete({
        where: {
            action, parentId, userId,
        }
    })
})


app.post('/uploadPoster', async (req, res) => {

})

app.post('/cities', async (req, res) => {

})

app.get('/cities', async (req, res) => {
    let cities = await prisma.city.findMany();
    res.send(cities);
})
app.post('/registerUser', async (req, res) => {
    prisma.user.create({
        data: {
            name: req.body.username,

        }
    })
})
app.post('/login', (req, res) => {
    let deets = req.body;


})




process.on('uncaughtException', (e) => {
    console.error(e);
    console.log('exit prevented')
})
app.listen(4000, () => { console.log('listening port 4000') })