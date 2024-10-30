# CineHub - Seu Catálogo Pessoal de Filmes e Séries

CineHub é uma aplicação web que permite aos usuários gerenciar suas listas de filmes e séries assistidos ou desejados, utilizando a API da [The Movie Database (TMDb)](https://www.themoviedb.org/). O projeto inclui funcionalidades de autenticação via Google, adição de filmes à `Watchlist`, marcação de filmes como assistidos (`Watched`), e exibição de detalhes dos filmes/séries.

## Funcionalidades

- **Autenticação**: Autenticação de usuário usando NextAuth com o Google.
- **Watchlist**: Adicione filmes e séries à sua lista de "Quero assistir" (Watchlist).
- **Assistidos**: Marque filmes e séries como assistidos (Watched).
- **Busca por Filmes/Séries**: Realize busca por nome de filmes/séries na base da API TMDb.
- **Detalhes**: Exiba detalhes completos de um filme ou série, como título, descrição, avaliações, pôster, etc.

## Tecnologias Utilizadas

### Frontend
- **Next.js** 14
- **TypeScript**
- **Tailwind CSS**: Estilização responsiva e moderna
- **shadcn/ui**: Sistema de componentes

### Backend
- **Next.js API Routes**
- **Prisma**: ORM para comunicação com o banco de dados
- **PostgreSQL**: Banco de dados relacional

## Estrutura de Funcionalidades

### Autenticação com NextAuth
- A autenticação é configurada para permitir login via conta Google, armazenando os dados dos usuários no banco de dados via `PrismaAdapter`.
- Após o login, o ID do usuário é adicionado à sessão para uso nas requisições de API.

### Gerenciamento de Watchlist e Assistidos
- **Adicionar à Watchlist**: Usuários podem adicionar filmes à sua watchlist usando o botão correspondente. O estado do botão é atualizado automaticamente após a adição.
- **Marcar como Assistido**: Filmes da watchlist podem ser movidos para a lista de assistidos.
- **Deletar da Watchlist**: Usuários podem remover filmes da watchlist.

### Integração com a API TMDb
- A aplicação faz uso da API TMDb para buscar e exibir detalhes de filmes e séries, como título, descrição, pôster, e avaliações.

## Licença

Este projeto é licenciado sob a [Licença MIT](https://choosealicense.com/licenses/mit/)

