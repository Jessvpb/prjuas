
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/admin"
  },
  {
    "renderMode": 2,
    "route": "/admin/products"
  },
  {
    "renderMode": 2,
    "route": "/admin/categories"
  },
  {
    "renderMode": 2,
    "route": "/admin/brands"
  }
],
  assets: {
    'index.csr.html': {size: 22824, hash: '3a4b0059899849a746020777067958a4a1d2ee000f67d564a3ca131c7d03bce2', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 23347, hash: '7ddcf01a3c23b6368a0b2e773c0ec6faf3e8533f3e2d6ff3bd97d623287fd599', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 25484, hash: 'e0165d48f167c00ccc022cce5e65461bd8591d945a164d4f7f63628b252e5caf', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'admin/products/index.html': {size: 25484, hash: 'e0165d48f167c00ccc022cce5e65461bd8591d945a164d4f7f63628b252e5caf', text: () => import('./assets-chunks/admin_products_index_html.mjs').then(m => m.default)},
    'admin/categories/index.html': {size: 25484, hash: 'e0165d48f167c00ccc022cce5e65461bd8591d945a164d4f7f63628b252e5caf', text: () => import('./assets-chunks/admin_categories_index_html.mjs').then(m => m.default)},
    'admin/brands/index.html': {size: 25484, hash: 'e0165d48f167c00ccc022cce5e65461bd8591d945a164d4f7f63628b252e5caf', text: () => import('./assets-chunks/admin_brands_index_html.mjs').then(m => m.default)},
    'admin/index.html': {size: 25484, hash: 'e0165d48f167c00ccc022cce5e65461bd8591d945a164d4f7f63628b252e5caf', text: () => import('./assets-chunks/admin_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 25589, hash: 'ab41fd4c2fe39e92e3d423fa6e076b3564537f1b8c725807d4966df4f7815631', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'index.html': {size: 25484, hash: 'e0165d48f167c00ccc022cce5e65461bd8591d945a164d4f7f63628b252e5caf', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
