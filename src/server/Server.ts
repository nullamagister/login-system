import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import session from 'express-session';
import System from '../controller/System';
import apiRouter from './routers/Api'
import websiteRouter from './routers/Website';

export default class Server {
    private static system: System = new System();

    private port: number;
    private host: string;
    private app: express.Express;
    private httpServer: http.Server;

    constructor(port: number, host: string) {
        this.port = port;
        this.host = host;
        this.app = express();
        this.httpServer = http.createServer(this.app);
        this.middlewares();
        this.routers();
    }

    public start() {
        this.httpServer.listen(this.port, this.host, () => {
            console.log("Http server is running at: " + this.host + ":" + this.port);
        })
    }

    public run() {
        this.httpServer.close((err) => {
            if (err) { return err }
            console.log('Server is closed');
        })
    }

    public static  getSystem(): System {
        return Server.system;
    }

    private middlewares() {
        // Body Parser
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(bodyParser.json());
        
        // Cookie Parser
        this.app.use(cookieParser());
        
        // Multer
        const upload = multer()
        this.app.use(upload.array('upload'));

        // Session
        const key = this.secretKeyGenerator();
        this.app.use(session({secret: key, resave: true, saveUninitialized: true}));

        // Template Engine
        this.app.set('view engine', 'pug');

        // Views & Static files 
        this.app.set('views', './src/view/frontend/pug')
        this.app.use(express.static('./release/view/frontend', {index: false}));
    }

    private routers() {
        this.app.use('/', websiteRouter);
        this.app.use('/api', apiRouter);
    }

    private secretKeyGenerator(): string {
        const symobols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                          'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
                          'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                          'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '!', '@',
                          '#', '$', '%', '^', '&', '&', '*'];
        
        let secret = "";
        for (let i = 0; i < 28; i++) {
            secret = secret + symobols[this.randomNumber(symobols.length)];
        }

        return secret;
    }

    private randomNumber(maxNumber: number) {
        const maxDigit = 10000;
        return (Math.floor(Math.random() * maxDigit) % maxNumber);
    }
}