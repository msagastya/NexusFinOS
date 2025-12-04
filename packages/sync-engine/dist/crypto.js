import nacl from 'tweetnacl';
import 'react-native-get-random-values';
export function generateKeypair() {
    return nacl.sign.keyPair();
}
export function signNonce(secretKey, nonce) {
    return nacl.sign.detached(nonce, secretKey);
}
export function verifySignature(publicKey, nonce, signature) {
    return nacl.sign.detached.verify(nonce, signature, publicKey);
}
/**
 * Generates a cryptographically secure random nonce.
 * @param length The length of the nonce in bytes.
 * @returns A Uint8Array containing the random nonce.
 */
export function generateNonce(length = 32) {
    return nacl.randomBytes(length);
}
