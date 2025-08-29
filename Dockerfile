# Usa a imagem oficial do Node.js
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Expõe a porta que a aplicação vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
