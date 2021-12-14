import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-elements-everywhere',
  outputTargets: [
    {
      type: 'dist-custom-elements',
    }
  ]
};
