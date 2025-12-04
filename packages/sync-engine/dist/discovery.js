import dgram from 'react-native-udp';
// NOTE: mDNS/zeroconf is complex. This is a simplified UDP broadcast/multicast stub.
// A real implementation would use a library like 'react-native-zeroconf' or similar.
const BROADCAST_PORT = 54321;
const BROADCAST_ADDRESS = '224.0.0.251'; // Standard mDNS multicast address
export function startDiscovery(vaultId, deviceName, onPeerDiscovered) {
    const socket = dgram.createSocket({ type: 'udp4', reusePort: true });
    socket.bind(BROADCAST_PORT, () => {
        socket.addMembership(BROADCAST_ADDRESS);
    });
    socket.on('listening', () => {
        const broadcastMessage = Buffer.from(JSON.stringify({ vaultId, deviceName }));
        // Periodically broadcast our presence
        setInterval(() => {
            socket.send(broadcastMessage, 0, broadcastMessage.length, BROADCAST_PORT, BROADCAST_ADDRESS);
        }, 5000);
    });
    socket.on('message', (msg, rinfo) => {
        try {
            const peerData = JSON.parse(msg.toString());
            if (peerData.vaultId === vaultId && rinfo.address) {
                onPeerDiscovered({
                    address: rinfo.address,
                    port: rinfo.port,
                    vaultId: peerData.vaultId,
                    deviceName: peerData.deviceName,
                });
            }
        }
        catch (e) {
            console.error('Failed to parse discovery message', e);
        }
    });
    return () => {
        socket.close();
    };
}
