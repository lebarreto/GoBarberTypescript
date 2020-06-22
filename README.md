<h3 align="center">GoBarber</h3>

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/lebarreto/GoBarberTypescript?label=last%20modified)
![GitHub issues](https://img.shields.io/github/issues/lebarreto/GoBarberTypescript)
![GitHub pull requests](https://img.shields.io/github/issues-pr/lebarreto/GoBarberTypescript)
![GitHub](https://img.shields.io/github/license/lebarreto/GoBarberTypescript)

</div>

---

<p align="center"> Aplicação de gerenciamento de barbearia.
    <br> 
</p>

## 📝 Índice

- [Sobre](#about)
- [Como configurar o projeto](#getting_started)
- [Executando os testes](#tests)
- [Tecnologias](#built_using)
- [Licença](#license)
- [Autores](#authors)

## 🧐 Sobre <a name = "about"></a>

Aplicação de gerenciamento de barbearia, utilizando NodeJS, Typescript, ReactJS e React Native.
O objetivo da aplicação é permitir que barbeiros possam visualizar sua agenda diariamente e que clientes possam agendar horários com o barbeiro que desejar.

## 🏁 Como configurar o projeto <a name = "getting_started"></a>

Essas instruções servem para que você consiga ter uma cópia do projeto e rodar o mesmo em sua máquina local para motivos de desenvolvimento e testes.

### Pré-requisitos

Para que você consiga executar esse projeto, é necessário que tenha instalado em sua máquina o banco de dados PostgreSQL e MongoDB, com uma tabela chamada <strong>gostack_gobarber</strong>.

### Instalação do backend

Para rodar o backend em sua máquina, siga o seguinte passo a passo:

1. Faça o clone desse repositório.
2. Entre na pasta do backend: `cd backend`.
3. Rode `yarn` para instalar todas as dependências.
4. Preencha o arquivo <strong>.env.example</strong> com as suas variáveis de ambiente.
5. Rode `yarn typeorm migration:run` para executar todas as migrations.
6. Rode `yarn start` para iniciar a api.

### Instalação do frontend

Para rodar o frontend em sua máquina, siga o seguinte passo a passo:

1. Inicie o backend.
2. Entre na pasta do frontend: `cd frontend`.
3. Rode `yarn` para instalar todas as dependências.
4. Rode `yarn start` para abrir o projeto web no browser.

### Instalação do mobile

Para rodar o mobile em sua máquina, siga o seguinte passo a passo:

1. Inicie o backend.
2. Entre na pasta do mobile: `cd mobile`.
3. Rode `yarn` para instalar todas as dependências.
4. Rode `react-native run-ios` para abrir o projeto no emulador do ios.

## 🔧 Executando os testes <a name = "tests"></a>

Para rodar os testes no backend, rode `yarn test`.

## ⛏️ Tecnologias <a name = "built_using"></a>

- [MongoDB](https://www.mongodb.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [ReactJS](https://reactjs.org/)
- [NodeJs](https://nodejs.org/en/)
- [React Native](https://reactnative.dev/)
- [Typescript](https://www.typescriptlang.org/)

## :memo: Licença <a name = "license"></a>

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✍️ Autores <a name = "authors"></a>

- [@lebarreto](https://github.com/lebarreto)
- [@rocketseat](https://github.com/Rocketseat)

Feito com ♥ by Letícia Barreto :wave:
