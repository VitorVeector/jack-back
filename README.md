# Jack Project

## Descrição

O Jack Project é uma aplicação Full Stack desenvolvida como um teste técnico para estagiário Full Stack. Ele consiste em uma aplicação To-Do, com uma API para gerenciar tarefas e um front-end para interação do usuário.

## Estrutura do Projeto

- **Frontend**: React com Material-UI
- **Backend**: NestJS com Prisma e SQLite

## Tecnologias

### Frontend

- React
- Material-UI
- Styled Components
- TypeScript
- Axios
- React Router

### Backend

- NestJS
- Prisma
- SQLite
- JWT Authentication

## Instalação

### Frontend

1. Navegue até o diretório do frontend:

    ```bash
    cd jack-front
    ```

2. Instale as dependências:

    ```bash
    yarn install
    ```

3. Inicie o servidor de desenvolvimento:

    ```bash
    yarn start
    ```

   O frontend estará disponível em [http://localhost:3000](http://localhost:3000).

### Backend

1. Navegue até o diretório do backend:

    ```bash
    cd jack-back
    ```

2. Instale as dependências:

    ```bash
    yarn install
    ```

3. Crie o banco de dados e execute as migrações:

    ```bash
    npx prisma migrate dev
    ```

4. Inicie o servidor de desenvolvimento:

    ```bash
    yarn start:dev
    ```

   O backend estará disponível em [http://localhost:8080](http://localhost:8080).