#!/bin/bash

### Permissão de execução: chmod +x npm-install.sh
### Para executar o script: ./documentation/npm-install.sh

### Este script instala as ferramentas globais necessárias para o desenvolvimento.

echo "Instalando ferramentas globais..."

npm install -g @webos-tools/cli
npm install -g typescript
npm install -g eslint

echo "Tudo instalado com sucesso!"