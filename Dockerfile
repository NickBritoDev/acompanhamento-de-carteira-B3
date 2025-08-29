# Usa a imagem oficial do Node.js (Debian slim para mais compatibilidade)
FROM node:20-slim

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 5420

# Comando para iniciar a aplicação
CMD ["node", "./src/server.js"]
