const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

app.use('/api', createProxyMiddleware({
  target: 'https://chimeclinic.com',
  changeOrigin: true,
  pathRewrite: {'^/api': ''}
}));

const PORT = 3000;  // Or any other free port
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
