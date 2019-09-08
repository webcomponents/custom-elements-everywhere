import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-elements-everywhere',
  outputTargets: [
    // {
    //   type: 'dist',
    //   esmLoaderPath: '../loader'
    // },
    {
      type: 'experimental-dist-module',
      // externalRuntime: false,
    }
  ]
};
