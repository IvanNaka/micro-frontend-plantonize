// Federation bootstrap removed to avoid bundling ESM-only sources during local builds.
// If you need module federation in dev, re-enable initFederation() after adjusting
// the build tooling to support ESM from node_modules.
import('./bootstrap').catch(err => console.error(err));
