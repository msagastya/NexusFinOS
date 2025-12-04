import TcpSocket from 'react-native-tcp-socket';
export function openConnection(host, port) {
    return new Promise((resolve, reject) => {
        const client = TcpSocket.createConnection({ host, port }, () => {
            const connection = {
                send: (data) => {
                    client.write(data);
                },
                close: () => {
                    client.destroy();
                },
                onData: (callback) => {
                    client.on('data', (data) => {
                        if (data instanceof Buffer) {
                            callback(data);
                        }
                        // Silently ignore string data for now
                    });
                },
                onError: (callback) => {
                    client.on('error', callback);
                },
                onClose: (callback) => {
                    client.on('close', callback);
                },
            };
            resolve(connection);
        });
        client.on('error', (error) => {
            reject(error);
        });
    });
}
