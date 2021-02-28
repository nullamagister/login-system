import Server from './server/Server';

class App {
    private server: Server;

    constructor(port: number, host: string, db: string) {
        this.server = new Server(port, host, db);
    }

    public start() { this.server.listen(); }

    public stop() { this.server.close(); }
}

const args = process.argv.slice(2)
const port = args[0]? parseInt(args[0]) : 8080
const host = args[1]? args[1] : 'localhost'
const db   = args[2]? args[2] : 'mongodb://127.0.0.1:27017/loginSystem'

const app = new App(port, host, db);
app.start();

