// babel.config.js
// export default {
//     presets: [
//       ["@babel/preset-env", { targets: { node: "current" } }],
//       ["@babel/preset-react"]
//     ]
//   };

// babel.config.cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-transform-runtime', // Optional: Ensure async/await works
  ],
};