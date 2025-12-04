import nacl from 'tweetnacl';
import 'react-native-get-random-values';
export declare function generateKeypair(): nacl.SignKeyPair;
export declare function signNonce(secretKey: Uint8Array, nonce: Uint8Array): Uint8Array<ArrayBufferLike>;
export declare function verifySignature(publicKey: Uint8Array, nonce: Uint8Array, signature: Uint8Array): boolean;
/**
 * Generates a cryptographically secure random nonce.
 * @param length The length of the nonce in bytes.
 * @returns A Uint8Array containing the random nonce.
 */
export declare function generateNonce(length?: number): Uint8Array;
