import { generateNonce, signNonce, verifySignature } from './crypto';
import { openConnection } from './transport';
import { EventEmitter } from 'events';
export var HandshakeState;
(function (HandshakeState) {
    HandshakeState[HandshakeState["DISCOVERING"] = 0] = "DISCOVERING";
    HandshakeState[HandshakeState["CONNECTING"] = 1] = "CONNECTING";
    HandshakeState[HandshakeState["CHALLENGE_SENT"] = 2] = "CHALLENGE_SENT";
    HandshakeState[HandshakeState["SIGNING"] = 3] = "SIGNING";
    HandshakeState[HandshakeState["VERIFYING"] = 4] = "VERIFYING";
    HandshakeState[HandshakeState["SYNC_READY"] = 5] = "SYNC_READY";
    HandshakeState[HandshakeState["FAILED"] = 6] = "FAILED";
})(HandshakeState || (HandshakeState = {}));
// This class will manage the handshake process with a peer.
export class HandshakeProtocol extends EventEmitter {
    ourKeys;
    state;
    connection = null;
    constructor(ourKeys) {
        super();
        this.ourKeys = ourKeys;
        this.state = HandshakeState.DISCOVERING;
        this.emit('stateChange', this.state);
    }
    // Initiated by Device A
    async connectToPeer(peer) {
        this.state = HandshakeState.CONNECTING;
        this.emit('stateChange', this.state);
        try {
            this.connection = await openConnection(peer.address, 12345); // Assuming a fixed port for now
            const challengeNonce = generateNonce();
            this.connection.send(Buffer.from(challengeNonce));
            this.state = HandshakeState.CHALLENGE_SENT;
            this.emit('stateChange', this.state);
            this.connection.onData((data) => {
                // Assume data is the signed nonce
                this.handleChallengeResponse(peer, new Uint8Array(data));
            });
        }
        catch (error) {
            this.state = HandshakeState.FAILED;
            this.emit('stateChange', this.state, error);
        }
    }
    // Executed by Device A upon receiving signed nonce from B
    handleChallengeResponse(peer, signature) {
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
        }
        else {
            this.state = HandshakeState.FAILED;
            this.emit('stateChange', this.state, new Error('Invalid signature'));
            this.connection?.close();
        }
    }
    // Initiated by Device B
    async respondToChallenge(connection) {
        connection.onData((challengeNonceBuffer) => {
            this.state = HandshakeState.SIGNING;
            this.emit('stateChange', this.state);
            const challengeNonce = new Uint8Array(challengeNonceBuffer);
            const signature = signNonce(this.ourKeys.secretKey, challengeNonce);
            connection.send(Buffer.from(signature));
            // Now we wait for Device A to either accept and start sync, or reject and close.
        });
    }
}
