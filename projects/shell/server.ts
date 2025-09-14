import { initNodeFederation } from '@softarc/native-federation-node';

console.log('Starting SSR for Shell');

(async () => {

  await initNodeFederation({
    remotesOrManifestUrl: {
  'agenda': 'https://master.d38x975wk8l8lt.amplifyapp.com/remoteEntry.json',
  'financeiro': 'https://master.d3a2j644iqswfl.amplifyapp.com/remoteEntry.json',
  'clientes': 'https://master.d15fxxqhaij1k9.amplifyapp.com/remoteEntry.json'
},
    relBundlePath: '../browser/',
  });
  
  await import('./bootstrap-server');

})();
