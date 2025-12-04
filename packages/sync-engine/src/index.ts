import * as Y from 'yjs';
import { HandshakeProtocol } from './protocol';
import { DiscoveredPeer } from './discovery';

// The central Yjs document for our application state.
const ydoc = new Y.Doc();

/**
 * Applies a local change to the Yjs document.
 * This would be called when the user makes a change in the app.
 * (This is a stub)
 */
export function applyLocalChange(change: any) {
  // Example: ydoc.getMap('my-data').set('some-key', change);
  console.log('Applying local change (stub)', change);
}

/**
 * Applies a remote change (from a sync peer) to the Yjs document.
 * (This is a stub)
 */
export function applyRemoteChange(update: Uint8Array) {
  console.log('Applying remote change (stub)');
  Y.applyUpdate(ydoc, update);
}

/**
 * Starts a sync session with a discovered peer.
 * (This is a stub)
 */
export async function startSyncSession(
  peerInfo: DiscoveredPeer,
  ourKeys: { publicKey: Uint8Array; secretKey: Uint8Array }
) {
  console.log(`Starting sync session with ${peerInfo.deviceName}`);
  const handshake = new HandshakeProtocol(ourKeys);

  handshake.on('stateChange', (state, error) => {
    console.log(`Handshake state changed: ${state}`);
    if (error) {
      console.error('Handshake failed:', error);
    }
    if (state === 'SYNC_READY') {
      console.log('Handshake successful, starting Yjs sync (stub)');
      // Here we would set up the Yjs connection provider
    }
  });

  await handshake.connectToPeer(peerInfo);
}

// Export all modules
export * from './crypto';
export * from './discovery';
export * from './protocol';
export * from './transport';
