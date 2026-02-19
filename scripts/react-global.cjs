// Polyfill for styled-components CJS bundle which references `React` as a bare
// global instead of using its own require('react') import. Required when running
// sanity CLI commands under Node.js with pnpm's strict module resolution.
globalThis.React = require('react')
