import { initNodeFederation } from '@softarc/native-federation-node';

console.log('Starting SSR for Shell');

(async () => {

  await initNodeFederation({
    remotesOrManifestUrl: {
  'agenda': 'http://localhost:4200/remoteEntry.json',
  'financeiro': 'http://localhost:4200/remoteEntry.json',
  'clientes': 'http://localhost:4200/remoteEntry.json'
},
    relBundlePath: '../browser/',
  });
  
  await import('./bootstrap-server');

})();
