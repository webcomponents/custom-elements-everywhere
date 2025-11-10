import Harness from './Harness.svelte';

import {mount} from 'svelte';

mount(Harness, {
  target: document.querySelector('#harness')
})