import { initFederation } from '@angular-architects/native-federation';

initFederation({
  'agenda': 'https://master.d38x975wk8l8lt.amplifyapp.com/remoteEntry.json',
  'financeiro': 'https://master.d3a2j644iqswfl.amplifyapp.com/remoteEntry.json',
  'clientes': 'https://master.d15fxxqhaij1k9.amplifyapp.com/remoteEntry.json'
})
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))
  .catch(err => console.error(err));
