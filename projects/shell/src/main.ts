// Federation bootstrap removed for local development to avoid bundling ESM-only sources.
// Re-enable with initFederation(...) when your build supports ESM from node_modules.
import('./bootstrap').catch(err => console.error(err));
