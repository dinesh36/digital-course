const eslintConfig = require("@tattva-design/eslint");

module.exports = [
  {
    // lib/ is the ecom lib (its own repo); out/ is the static export (NEXT_OUTPUT=export npm run build)
    ignores: ["lib/**", "out/**"],
  },
  ...eslintConfig,
];
