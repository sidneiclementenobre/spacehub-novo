# 🏢 SpaceHub - Sistema de Cadastro e Reservas

Aplicação web full-stack desenvolvida para listagem de espaços de coworking, autenticação de usuários e realização de reservas online.

## 🚀 Funcionalidades
- **Listagem de Espaços:** Exibição dinâmica dos imóveis disponíveis com imagens e valores por diária diretamente do banco de dados.
- **Autenticação de Usuários:** Sistema completo de cadastro e login com criptografia de senhas (`bcryptjs`) e controle de sessão via token (`JWT`).
- **Reservas Online:** Agendamento rápido de espaços com validação de datas integrado à API.

## 🛠️ Tecnologias Utilizadas
- **Backend:** Node.js, Express e TypeScript
- **Banco de Dados:** PostgreSQL (hospedado no Supabase)
- **Frontend:** HTML5, CSS3 e JavaScript puro
- **Infraestrutura e Deploy:** GitHub e Railway

## 🧪 Como Testar a Aplicação
1. Acesse o link do site em produção ou rode localmente.
2. Clique em **Cadastrar** no menu superior e crie uma nova conta.
3. Acesse a página de **Login** e entre com o e-mail e a senha cadastrados.
4. Na tela inicial, clique sobre o card do espaço desejado (como o segundo card) e confirme a reserva na janela de diálogo.

## 💻 Como Rodar Localmente
1. Clone este repositório e instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env` na raiz com as variáveis `DATABASE_URL`, `JWT_SECRET` e `PORT`.
3. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
