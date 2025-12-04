import { DiscoveredPeer } from './discovery';
/**
 * Applies a local change to the Yjs document.
 * This would be called when the user makes a change in the app.
 * (This is a stub)
 */
export declare function applyLocalChange(change: any): void;
/**
 * Applies a remote change (from a sync peer) to the Yjs document.
 * (This is a stub)
 */
export declare function applyRemoteChange(update: Uint8Array): void;
/**
 * Starts a sync session with a discovered peer.
 * (This is a stub)
 */
export declare function startSyncSession(peerInfo: DiscoveredPeer, ourKeys: {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
}): Promise<void>;
export * from './crypto';
export * from './discovery';
export * from './protocol';
export * from './transport';
