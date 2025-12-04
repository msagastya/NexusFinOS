import { generateNonce, signNonce, verifySignature } from './crypto';
import { openConnection, Connection } from './transport';
import { DiscoveredPeer } from './discovery';
import { EventEmitter } from 'events';

export enum HandshakeState {
  DISCOVERING,
  CONNECTING,
  CHALLENGE_SENT,
  SIGNING,
  VERIFYING,
  SYNC_READY,
  FAILED,
}

// This class will manage the handshake process with a peer.
export class HandshakeProtocol extends EventEmitter {
  private state: HandshakeState;
  private connection: Connection | null = null;

  constructor(
    private ourKeys: { publicKey: Uint8Array; secretKey: Uint8Array }
  ) {
    super();
    this.state = HandshakeState.DISCOVERING;
    this.emit('stateChange', this.state);
  }

  // Initiated by Device A
  async connectToPeer(peer: DiscoveredPeer) {
    this.state = HandshakeState.CONNECTING;
    this.emit('stateChange', this.state);

    try {
      this.connection = await openConnection(peer.address, 12345); // Assuming a fixed port for now
      const challengeNonce = generateNonce();

      this.connection.send(Buffer.from(challengeNonce));
      this.state = HandshakeState.CHALLENGE_SENT;
      this.emit('stateChange', this.state);

      this.connection.onData((data: Buffer) => {
        // Assume data is the signed nonce
        this.handleChallengeResponse(peer, new Uint8Array(data));
      });
    } catch (error) {
      this.state = HandshakeState.FAILED;
      this.emit('stateChange', this.state, error);
    }
  }

  // Executed by Device A upon receiving signed nonce from B
  private handleChallengeResponse(peer: DiscoveredPeer, signature: Uint8Array) {
    this.state = HandshakeState.VERIFYING;
    this.emit('stateChange', this.state);

    // In a real scenario, we'd need the peer's public key.
    // For now, this is a placeholder.
    const peerPublicKey = new Uint8Array(32); // Placeholder

    // We also need the original nonce that was sent.
    const originalNonce = new Uint8Array(32); // Placeholder

    const isValid = verifySignature(peerPublicKey, originalNonce, signature);

    if (isValid) {
      this.state = HandshakeState.SYNC_READY;
      this.emit('stateChange', this.state);
    } else {
      this.state = HandshakeState.FAILED;
      this.emit('stateChange', this.state, new Error('Invalid signature'));
      this.connection?.close();
    }
  }

  // Initiated by Device B
  async respondToChallenge(connection: Connection) {
    connection.onData((challengeNonceBuffer: Buffer) => {
      this.state = HandshakeState.SIGNING;
      this.emit('stateChange', this.state);

      const challengeNonce = new Uint8Array(challengeNonceBuffer);
      const signature = signNonce(this.ourKeys.secretKey, challengeNonce);
      connection.send(Buffer.from(signature));

      // Now we wait for Device A to either accept and start sync, or reject and close.
    });
  }
}
