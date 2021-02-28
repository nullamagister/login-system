import Server from './server/Server';

class App {
    private server: Server;

    constructor(port: number, host: string, db: string) {
        this.server = new Server(port, host, db);
    }

    public start() { this.server.listen(); }

    public stop() { this.server.close(); }
}

const app = new App(8080, 'localhost', 'mongodb://127.0.0.1:27017/loginSystem');
app.start();

