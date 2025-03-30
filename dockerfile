# Etapa 1: Usar a imagem oficial do Node.js
FROM node:22

# Instalar o netcat
RUN apt-get update && apt-get install netcat-openbsd -y \
build-essential \
python3 \
python3-pip

# Etapa 2: Definir o diretório de trabalho
WORKDIR /usr/src/app

# Etapa 3: Copiar o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install

# Etapa 5: Desinstalar o bcrypt e instalar novamente
RUN npm uninstall bcrypt && npm install bcrypt

# Etapa 5: Copiar o restante do código da aplicação
COPY . .

# Etapa 6: Rodar o Prisma Generate
RUN npx prisma generate

# Etapa 7: Expôr a porta que a API irá rodar
EXPOSE 3000

# Etapa 8: Definir o comando para rodar a API
CMD ["npm", "start"]
