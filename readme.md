
# Trabalho api Marvel

Aluno: Kaik Dorvalo dos Santos     RA: 22093919-2
Aluno: Matheus Felinto da Silva    RA: 22012684-2

# Saga

Nós escolhemos a Era de Ultron para realizar esse trabalho, armazenando as informações de acordo com os requisitos do trabalho.

# Inicializando o projeto

O arquivo .env foi propositalmente posto no repositório para facilitar a configuração do sistema

1. Clone o repositórrio
2. Entre na pasta do projeto
3. Rode o comando "npm install"
4. Para subir o servidor, digite "npm start"

# Como testar as funcionalidades

Para testar, basta digitar o comando "npm test"

1. Os testes que necessitam acessar a api e salvar no banco de dados não estão fazendo a remoção deles pós o teste.
No entanto, o sistema é capaz de identificar e não salvar dados repetidos nos próximos testes.
2. Os testes unitários estão utilizando dados mockados

Os testes que populam o banco com os dados da api da Marvel podem falhar em situações incomuns. Por se tratar de uma api externa,
diversos motivos podem fazer com que a requisição estoure o limite de timeout do jest e o teste falhe.

# Como fazer o teste de carga

Deve ser inciado o servidor por meio dos clusters para que a performance seja aprimorada. Para iniciar o servidor com cluster,
digite "npm cluster" no terminal. Em seguida, execute os testes de carga com o comando "npm cannon"

# Documentação das rotas da api

A documentação está feita através da ferramenta Swagger. Para acessar a documentação, inicie o servidor com "npm start".
Após isso, abra o navegador e acesse a url "localhost:3000/api-docs"