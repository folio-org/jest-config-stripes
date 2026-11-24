import {
  TextEncoder,
  TextDecoder,
} from 'util';

// Polyfills for jspdf
Object.assign(globalThis, { TextEncoder, TextDecoder });
