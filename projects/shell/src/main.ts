import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'agenda': 'http://localhost:4200/remoteEntry.json',
  'financeiro': 'http://localhost:4200/remoteEntry.json',
  'clientes': 'http://localhost:4200/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
