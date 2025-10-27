// Federation bootstrap removed to avoid bundling ESM-only sources during local builds.
// Re-enable initFederation() when build tooling is configured to handle ESM from node_modules.
import('./bootstrap').catch(err => console.error(err));
