import { Connection } from './transport';
import { DiscoveredPeer } from './discovery';
import { EventEmitter } from 'events';
export declare enum HandshakeState {
    DISCOVERING = 0,
    CONNECTING = 1,
    CHALLENGE_SENT = 2,
    SIGNING = 3,
    VERIFYING = 4,
    SYNC_READY = 5,
    FAILED = 6
}
export declare class HandshakeProtocol extends EventEmitter {
    private ourKeys;
    private state;
    private connection;
    constructor(ourKeys: {
        publicKey: Uint8Array;
        secretKey: Uint8Array;
    });
    connectToPeer(peer: DiscoveredPeer): Promise<void>;
    private handleChallengeResponse;
    respondToChallenge(connection: Connection): Promise<void>;
}
