import { PrismaClient } from '@prisma/client';
import express from 'express'
import cors from 'cors'
let app = express();
app.use(express.json())
app.use(cors({
    origin: '*',
    // origin:'http://localhost:3000',
}))


const prisma = new PrismaClient();

app.get('/parties', async (req, res) => {
    let parties = await prisma.post.findMany();
    // parties.lockedout = true;
    res.status(403).send(parties);
})

app.post('/parties', async (req, res) => {
    let body = req.body;
    let session = req.cookies['session'];
    let authorId;
    if (session.startsWith('guest.')) {
        authorId = session
    } else {
        authorId = '... auth here'
    }
    body.authorId = authorId;
    console.log(req.body)

    let hasall = body.title && body.datetime;
    if (!hasall) {
        res.status(400).send('missing required attributes');
        return;
    }

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