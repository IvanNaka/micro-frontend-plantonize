import { initNodeFederation } from '@softarc/native-federation-node';
import { environment } from './src/environments/environment';

console.log('Starting SSR for Shell');

(async () => {

  const remotes = {
    'agenda': `${environment.microfrontends.agenda.url}remoteEntry.json`,
    'financeiro': `${environment.microfrontends.financeiro.url}remoteEntry.json`
  };

  await initNodeFederation({
    remotesOrManifestUrl: remotes,
    relBundlePath: '../browser/',
  });
  
  await import('./bootstrap-server');

})();
