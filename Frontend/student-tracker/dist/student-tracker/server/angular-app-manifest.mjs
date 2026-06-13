
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "src/app/home/home.ts": [
    "chunk-5SMNIJTE.js",
    "chunk-E5VJRQFM.js",
    "chunk-YFMA4Q6O.js",
    "chunk-GXEXQHWE.js"
  ],
  "src/app/login/login.ts": [
    "chunk-MSCO6FDO.js",
    "chunk-HNFYT3UR.js",
    "chunk-E5VJRQFM.js"
  ],
  "src/app/register/register.ts": [
    "chunk-RMKOA7V7.js",
    "chunk-HNFYT3UR.js",
    "chunk-E5VJRQFM.js"
  ],
  "src/app/about-us/about-us.ts": [
    "chunk-DNDW7F62.js"
  ],
  "src/app/articles/articles.ts": [
    "chunk-QMB4USWN.js",
    "chunk-E5VJRQFM.js"
  ],
  "src/app/add-task/add-task.ts": [
    "chunk-ENQMNVZW.js",
    "chunk-E5VJRQFM.js",
    "chunk-GXEXQHWE.js"
  ],
  "src/app/progress/progress.ts": [
    "chunk-ENPMF34U.js",
    "chunk-YFMA4Q6O.js",
    "chunk-GXEXQHWE.js"
  ]
},
  assets: {
    'index.csr.html': {size: 24717, hash: '4a769869fc2b7ea2e9a7315721abe3c5f6b72e2929494bcc391d9820c175bb4f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17227, hash: '040c348bc3c9c418c355c25b151e1769e00daa6952c4766c6412eee49425ed37', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-OPUTW5UJ.css': {size: 8043, hash: 'i68XcmjPijU', text: () => import('./assets-chunks/styles-OPUTW5UJ_css.mjs').then(m => m.default)}
  },
};
