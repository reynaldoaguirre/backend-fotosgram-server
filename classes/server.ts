import express from 'express';

export default class Server{

    public app: express.Application;
    public port: number = 3000;

    constructor(){
        this.app = express();
    }

    start(callback: any){
        let puerto = process.env.PORT || 3000;
        //this.app.listen(this.port, callback);
        this.app.listen(puerto, callback);
    }    

}