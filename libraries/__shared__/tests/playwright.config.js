import fs from 'node:fs'
import {defineConfig, devices} from '@playwright/test';
import * as path from "node:path";

const ports = fs.readdirSync('../../', {withFileTypes: true})
  .filter(d => d.isDirectory() && !d.name.startsWith('__'))
  .reduce((acc, dir, idx) => {
    acc[dir.name] = 8080 + idx;
    return acc;
  }, {})

const workspace = path.basename(process.env.INIT_CWD);

export default defineConfig({
  use: {
    baseURL: `http://localhost:${ports[workspace]}`,
  },
  projects: [
    {
      name: 'chromium',
      use: {...devices['Desktop Chrome']},
    },
    {
      name: 'firefox',
      use: {...devices['Desktop Firefox']},
    },
  ],
  webServer: {
    command: `http-server ../../${workspace}/dist/ -p ${ports[workspace]}`,
    port: process.env.PORT,
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'pipe'
  },
  reporter: [
    ['list'],
    ['html', {
      outputFolder: `../../${workspace}/results/`,
      open: 'never',
      title: workspace
    }],
    ['./reporter.js']
  ]
})