import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  schema: 'schema.graphql',
  generates: {
    'src/types/graphql.d.ts': {
      plugins: ['typescript'],
      documents: 'src/gql/**/*.gql',
      config: { maybeValue: 'T' },
    },
    'src/': {
      preset: 'near-operation-file',
      documents: 'src/gql/**/*.gql',
      presetConfig: { baseTypesPath: 'types/graphql.d.ts', extension: '.generated.tsx' },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        preResolveTypes: true,
        useTypeImports: true,
        allowEnumStringTypes: true,
        maybeValue: 'T',
      },
    },
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
  overwrite: true,
  ignoreNoDocuments: true,
};
export default config;