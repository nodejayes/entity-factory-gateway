export interface IServerOptions {
    webroot: string;
    actionHandler: any;
    keyfile?: string;
    certfile?: string;
    usehttp2?: boolean;
}

export class Server {
    constructor(options: IServerOptions);
    start(): Promise<void>;
}
