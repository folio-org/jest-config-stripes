import {
  TextEncoder,
  TextDecoder,
} from 'util';

// Polyfills for jspdf
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
