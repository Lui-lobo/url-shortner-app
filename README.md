# URL Shortener API

Uma API para encurtamento de URLs, permitindo que usuários gerem links curtos a partir de URLs longas. Usuários autenticados podem gerenciar seus links encurtados, acompanhar estatísticas de acessos e realizar operações como edição e exclusão lógica dos registros.

---

## 📋 Índice

- [🔧 Recursos](#recursos)
- [👷 Arquitetura e Diagramas](#arquitetura-e-diagramas)
- [🖥️ Como rodar o projeto](#como-rodar-o-projeto)
- [🧪 Como rodar os testes](#como-rodar-os-testes)
- [📄 Documentacação da Api](#documentacao)
- [🧭 Endpoints](#endpoints)

---

## 🔧 Recursos

A URL Shortener API fornece uma série de funcionalidades para o gerenciamento de URLs encurtadas, garantindo segurança e rastreabilidade. Abaixo estão os principais recursos oferecidos:

### 🏷️ Encurtamento de URLs
- Permite a criação de URLs curtas a partir de links longos.
- Qualquer usuário pode encurtar uma URL, mas usuários autenticados terão suas URLs vinculadas às suas contas.

### 🔍 Redirecionamento e Contagem de Cliques
- Sempre que uma URL encurtada for acessada, a API redireciona o usuário para a URL original.
- O número de acessos de cada URL é registrado para estatísticas.

### 👤 Autenticação e Gestão de Usuários
- Registro e login de usuários.
- URLs criadas por usuários autenticados são associadas às suas contas.
- Apenas o proprietário de uma URL pode editá-la ou excluí-la.

### 📋 Gerenciamento de URLs
- Listagem de URLs encurtadas associadas ao usuário autenticado.
- Atualização de uma URL encurtada.
- Exclusão lógica de URLs (soft delete), garantindo que não possam mais ser acessadas.

### 📊 Estatísticas
- Exibição da quantidade de cliques em cada URL encurtada.

### 🔒 Segurança
- Validação de autenticação para operações restritas.
- Proteção contra duplicação de URLs dentro da conta do usuário.

## 👷 Arquitetura e Diagramas

Abaixo estão os diagramas ilustrando o fluxo da aplicação e sua arquitetura.

Estrutura do banco de dados <br>
O diagrama abaixo apresenta um modelo relacional da estrutura do banco de dados gerados via migrations.

![Estrutura do banco](docs/diagrama_url_shortner_app.svg)

Fluxograma da aplicação <br>
O diagrama abaixo apresenta um fluxo de utilidade da Api REST da aplicação.

![Fluxograma da aplicacao](docs/url_shortener_app.svg)

## 🖥️ Como rodar o projeto

### Como rodar o projeto com Docker Compose 🐋

1️. Clone o repositório:
```sh
git clone https://github.com/Lui-lobo/url-shortner-app.git
url-shortner-app
```

2. Instalação dos pacotes necessários
```sh
npm install
```

3. Executando o docker
```sh
docker compose up -d
```

4. Caso todos os passos acima tenham sido executados corretamente, o servidor estará sendo executado localmente em: ```http://localhost:3000```

### Como rodar o projeto localmente ⌨
Nota: Para rodar o projeto localmente é necessário que todas as depedências do projeto sejam instaladas, sendo elas:
- O banco de dados postgres (Versões 15 para cima)
- O NodeJs (Versões 18 para cima)

1️. Clone o repositório:
```sh
git clone https://github.com/Lui-lobo/url-shortner-app.git
url-shortner-app
```

2. Instalação dos pacotes necessários
```sh
npm install
```

3. Configurar as suas variaveis de ambiente para o uso local
Crie um arquivo .env na raiz do projeto (dentro da pasta url-shortener-app) e configure as informações de ambiente como no exemplo abaixo:
```sh
DATABASE_URL="postgresql://postgres:1234@localhost:5432/urlShortnerDatabase?schema=public"
JWT_SECRET="mysecretkey"
JWT_EXPIRES_IN=3600s
BASE_URL=http://localhost
```
Nota: A chave de criptografia está no .env devido ser uma aplicação local. (Está pratica nunca deve acontecer em servidores que sejam distribuidos para clientes, funcionarios ou empresas no geral.)

4. Execute as migrações para gerar as tabelas no banco de dados
```sh
npx prisma migrate dev
```
Nota: Para o prisma poder gerar as migrações é necessário que o banco esteja localmente criado. Caso ele não exista, por favor crie o banco ```urlShortnerDatabase``` localmente em seu postgres para rodar as migrações.

5. Inicie o servidor de desenvolvimento com o seguinte comando:
```sh
npm run start:dev
```

6. Caso todos os passos acima tenham sido executados corretamente, o servidor estará sendo executado localmente em: ```http://localhost:3000```

## 🧪 Como rodar os testes
Para executar os testes unitários, apenas é necessário rodar o seguinte comando em seu terminal:

```sh
npm run test
```

---

## 📄 Documentacação da Api
A documentação da API url-shortener-app é gerada automaticamente com Swagger, permitindo que os usuários explorem e testem os endpoints de forma interativa.

📌 Como acessar a documentação?
Ao rodar a aplicação basta acessar a url:
```sh
http://localhost:3000/api#/
```
Nestá rota você encontrará a documentação de todas as apis do projeto!

---

## 🧭 Endpoints
### Autenticação
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **POST**  | `/auth/login`            | Realiza a autenticação de um usuário no sistema    |
| **POST**  | `/auth/register`            | Registra um usuário no sistema    |

### Encurtamento e gerenciamento de URLs
| Método  | URL                     | Descrição                        |
|---------|-------------------------|----------------------------------|
| **POST**  | `/shortenedUrls`            | Encurta uma url para usuários autenticados e não autenticados  |
| **PUT**  | `/shortenedUrls`            | Atualiza uma url encurtada   |
| **DELETE**  | `/shortenedUrls?shortenedUrlId=idDaUrlEncurtada`            | Realiza a exclusão lógica de uma url encurtada no sistema   |
| **GET**  | `/shortenedUrls/list`            | Lista todas as urls encurtadas de um usuário   |
| **GET**  | `/shortenedUrls/registerAccess?shortenedUrl=http://localhost/aan0`            | Registra um acesso em uma url encurtada e retorna a url original para o usuário   |
