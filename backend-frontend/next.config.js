module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'https://brasileirao2023.vercel.app/api' // production api
  }
}
