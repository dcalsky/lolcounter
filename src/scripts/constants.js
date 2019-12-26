export const PRODUCTION = !!process.env.PRODUCTION;
export const URL = PRODUCTION ? 'https://yunsu.noddl.me' : 'http://localhost:8000';
export const LOGO = PRODUCTION ? "https://cdn.jsdelivr.net/gh/dcalsky/lolcounter/src/assets/logo.png" : require('../assets/logo.png');