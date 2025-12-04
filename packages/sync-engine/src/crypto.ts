import nacl from 'tweetnacl';
import 'react-native-get-random-values';

export function generateKeypair() {
  return nacl.sign.keyPair();
}

export function signNonce(secretKey: Uint8Array, nonce: Uint8Array) {
  return nacl.sign.detached(nonce, secretKey);
}

export function verifySignature(
  publicKey: Uint8Array,
  nonce: Uint8Array,
  signature: Uint8Array
) {
  return nacl.sign.detached.verify(nonce, signature, publicKey);
}

/**
 * Generates a cryptographically secure random nonce.
 * @param length The length of the nonce in bytes.
 * @returns A Uint8Array containing the random nonce.
 */
export function generateNonce(length = 32): Uint8Array {
  return nacl.randomBytes(length);
}
