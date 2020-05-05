import Server from './classes/server';
import mongoose from 'mongoose';

import cors from 'cors';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

import userRoutes from './routes/usuario';
import postRoutes from './routes/post';

const server = new Server();

// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// FileUpload
server.app.use(fileUpload());//si no sube colocar lo siguiente: server.app.use(fileUpload({useTempFiles: true}));

// Configurar CORS
server.app.use(cors({ origin: true, credentials: true }));

// Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);

// ============================
//  Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
//  Base de datos
// ============================
let urlDB: any;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/fotosgram';
} else {
    urlDB = process.env.MONGO_DB;
}



// Conectar DB
mongoose.connect(urlDB,
{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err)=>{
    if(err) throw err;

    console.log('Base de datos ONLINE');
});


// Levatar express
server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.port}`);
});
