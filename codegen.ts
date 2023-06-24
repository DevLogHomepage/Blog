
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "./.next/graphql/schema.graphql",
  generates: {
    "src/resolvers-types.ts": {
      plugins: [
        "typescript","typescript-resolvers"
      ]
    }
  }
};

export default config;
