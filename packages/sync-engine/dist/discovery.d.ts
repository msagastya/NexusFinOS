export interface DiscoveredPeer {
    address: string;
    port: number;
    vaultId: string;
    deviceName: string;
}
export declare function startDiscovery(vaultId: string, deviceName: string, onPeerDiscovered: (peer: DiscoveredPeer) => void): () => void;
