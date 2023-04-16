# Sistema GPJ | 🚀 Back-End
Server do sistema de gestão de processos jurídicos. Desenvolvido em Node JS.

## Como executar
1. Crie um arquivo `.env` no formato abaixo:  
     
   ```
    PORT=8080
    DATABASE_URL="postgresql://user:password@localhost:5432/gpj?schema=public"

    JWT_SECRET=
   ```
2. Rode `npm install` para instalar as dependências
3. Para rodar o banco de dados, basta rodar o container: `docker compose up postgres`
4. Rode a migração no banco `npm run migrate`
5. Para executar: `npm run dev`
