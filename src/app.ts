import Server from './server/Server';

class App {
    private server: Server;

    constructor(port: number, host: string) { this.server = new Server(port, host); }

    public run() { this.server.start(); }

    public stop() { this.server.run(); }
}

const app = new App(8080, 'localhost');
app.run();

