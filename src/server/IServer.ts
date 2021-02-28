export default interface IServer {
    listen(): void;
    close(): void;
}