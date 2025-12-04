import TcpSocket from 'react-native-tcp-socket';

// This is a placeholder for a more robust transport layer.
// In a real scenario, this would handle message framing, chunking, and backpressure.

export interface Connection {
  send: (data: Buffer) => void;
  close: () => void;
  onData: (callback: (data: Buffer) => void) => void;
  onError: (callback: (error: Error) => void) => void;
  onClose: (callback: () => void) => void;
}

export function openConnection(
  host: string,
  port: number
): Promise<Connection> {
  return new Promise((resolve, reject) => {
    const client = TcpSocket.createConnection({ host, port }, () => {
      const connection: Connection = {
        send: (data) => {
          client.write(data);
        },
        close: () => {
          client.destroy();
        },
        onData: (callback: (data: Buffer) => void) => {
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
