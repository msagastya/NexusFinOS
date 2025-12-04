export interface Connection {
    send: (data: Buffer) => void;
    close: () => void;
    onData: (callback: (data: Buffer) => void) => void;
    onError: (callback: (error: Error) => void) => void;
    onClose: (callback: () => void) => void;
}
export declare function openConnection(host: string, port: number): Promise<Connection>;
