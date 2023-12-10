# Manual de uso

## Comece provisionando o banco de dados (mongodb) utilizando o docker

docker run --name some-mongo -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=root mongo

O comando acima criará um contêiner com o nome 'some-mongo', fazendo um bind na porta 27017 do contêiner para o host e contará com 2 variáveis de ambiente (username e password) definidas como 'root'

## Configure o environment dentro do back-end para fazer a conexão

- Crie um arquivo .env na raiz do projeto 'backend'
- Em seguida adicione as configuracoes do mongodb utilizando o arquivo .env.exemple como guia
- Ao criar o contêiner criamos o username e password 'root' e nossa URI receberá esses valores. Caso use algum valor diferente, lembre-se de ajustar a URI.

## Configurando o Firebase

- Crie uma conta no firebase
- Ao fazer login, na página inicial, clique em 'Adicionar projeto'
- Insira o nome que preferir e clique em continuar
- Em 'Ativar o Google Analytics neste projeto' deixe desmarcado e clique em 'Criar projeto'
- Aguarde o projeto ser criado e clique em 'Continuar'
- No menu lateral a esquerda, expanda o campo 'Criação' e selecione 'Storage'
- Aguarda abrir a pagina e selecione 'Vamos começar'
- Escolha 'Iniciar no modo de teste' e clique em 'Próxima'
- Escolha o 'Local no Cloud Storage' e clique em 'Concluir'
- Aguarde o Firebase criar o bucket
- Volte a visão geral do seu projeto criado e abaixo da mensagem 'Comece adicionando o Firebase ao seu aplicativo' clique em 'Web', escolha um apelido para o app e clique em 'Registrar App'
- Ao término do registro selecione a opção 'User npm' e copie os dados fornecidos
- Entre na pasta 'frontend/src/environments' e altere o arquivo environment.ts com os dados que foram copiados

## Iniciando a aplicação

- Verifique se possui o nodejs e o angular instalados na máquina
- Certifique-se que tudo foi configurado
- Entre na pasta 'backend' e digite no terminal o comando: 'npm run dev'. Ao iniciar, o back-end estará disponível na URL: http://localhost:3000
- Entre na pasta 'frontend' e digite o comando: 'ng s'. Ao iniciar, o front-end estará disponível na URL: http://localhost:4200