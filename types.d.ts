import {Guid} from 'ts-tooling/src/types/guid';

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

export interface IClient<T> {
    readonly id: Guid;
    readonly metaData: T;
    send(data: string): void;
}

export interface IConnectionContext<K> {
    readonly meta: K;
    destroy(): void;
    sendCaller<T>(type: string, payload: T): void;
    send<T>(type: string, payload: T, filter: (c: IClient<K>) => boolean): void;
}
