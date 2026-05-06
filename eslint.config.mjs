import nextConfig from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      ".next/**",
      ".claude/**",
      "_bmad/**",
      "_bmad-output/**",
      "node_modules/**",
    ],
  },
];

export default eslintConfig;
