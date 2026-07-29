#!/usr/bin/env node
// Dev-server launcher. In the Claude sandbox the repo is a host-mounted
// filesystem where native file-watch events never arrive, so both watchers
// must poll: webpack via watchOptions.pollIntervalMs in next.config.js
// (gated on NEXT_DEV_POLL, set here) and contentlayer's chokidar via
// CHOKIDAR_USEPOLLING. Turbopack is not usable there — its polling mode
// delivers no events on Linux (vercel/next.js#68255) — hence --webpack.
// Everywhere else this runs plain `next dev` (Turbopack, native watching).
import { spawn } from 'node:child_process'

const inSandbox = Boolean(process.env.SANDBOX_VM_ID)

const env = {
  ...process.env,
  INIT_CWD: process.cwd(),
  ...(inSandbox && {
    NEXT_DEV_POLL: '1',
    CHOKIDAR_USEPOLLING: 'true',
    CHOKIDAR_INTERVAL: '500',
  }),
}

const child = spawn(
  'concurrently',
  [
    '-k',
    '-n',
    'next,content',
    '-c',
    'blue,magenta',
    inSandbox ? 'next dev --webpack' : 'next dev',
    'contentlayer2 dev',
  ],
  { stdio: 'inherit', env, shell: process.platform === 'win32' }
)
child.on('exit', (code) => process.exit(code ?? 0))
