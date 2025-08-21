import antfu from "@antfu/eslint-config";

// Custom rule to enforce .layout. or .page. in src/app filenames (excluding _shared folders)
const enforceAppFileNaming = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Files under src/app (excluding _shared folders) must include .layout. or .page. in their filename",
    },
    messages: {
      invalidFilename:
        "Files under src/app (excluding _shared folders) must include .layout. or .page. in their filename. Current filename: {{filename}}",
    },
  },
  create(context) {
    const filename = context.filename;
    const relativePath = context.filename.replace(process.cwd(), "");

    // Check if file is under src/app but not in _shared folder or api folder
    if (
      relativePath.includes("/src/app/") &&
      !relativePath.includes("/_shared/") &&
      !relativePath.includes("/api/")
    ) {
      // Get just the filename without path
      const basename = filename.split("/").pop();

      // Skip special files that don't need to follow the naming convention
      const excludedFiles = ["routes.ts", "__root.tsx"];
      if (excludedFiles.includes(basename)) {
        return {};
      }

      // Skip files that are already .layout. or .page. files
      if (!filename.includes(".layout.") && !filename.includes(".page.")) {
        // Report error for files that don't follow the naming convention
        context.report({
          loc: { line: 1, column: 0 },
          messageId: "invalidFilename",
          data: { filename: basename },
        });
      }
    }

    return {};
  },
};

export default antfu({
  typescript: {
    overrides: {
      "ts/explicit-function-return-type": "off",
      "node/prefer-global/process": "off",
    },
  },
  plugins: {
    custom: {
      rules: {
        "enforce-app-file-naming": enforceAppFileNaming,
      },
    },
  },
  rules: {
    "style/quotes": ["error", "double"],
    "style/semi": ["error", "always"],
    "style/multiline-ternary": "off",
    "style/operator-linebreak": "off",
    "style/jsx-wrap-multilines": "off",
    "style/jsx-one-expression-per-line": "off",
    "style/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: false,
        },
      },
    ],
    "custom/enforce-app-file-naming": "error",
    "perfectionist/sort-imports": [
      "error",
      {
        type: "natural",
        groups: [
          ["side-effect"],
          ["external", "builtin"],
          ["internal"],
          ["parent", "sibling", "index"],
        ],
        order: "asc",
        sortSideEffects: true,
      },
    ],
  },
  ignores: ["src/routeTree.gen.ts", "eslint.config.mjs"],
});
