# Begou
<center>
  <img src="images/logo.png">
</center>

<center>
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
  <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white"/>
  <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white"/>
  <img src="https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=whit"/>
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white"/>
</center>

**Sumário**
## 1. Introdução
Aplicativo que tem como objetivo auxiliar a equipe dos abrigos e Organização Não Governamental (ONGs) a divulgar e arrecadar verba para animais que se encontram em condição de fragilidade.


## 2. Motivação
De acordo com a pesquisa realizada pelo Instituto Pet em 2019, apontou que o Brasil possui cerca de 3,9 milhões de animais que se encontram na Condição de Vulnerabilidade. 

### 3. Objetivos
- Auxiliar ONGs no processo de localização e captura de animais;
- Arrecadação de verbas para as ONGs cadastradas; 
- Facilitar o processo de quem quer ajudar em relação ao abandono dos animais;
- Incentivar a adoção dos animais resgatados;
- Facilitar o processo de quem quer ajudar em relação ao abandono dos animais;

## 4. Configurando o projeto

### 4.1 Depedências globais
- Node v16 (ou superior);
- Docker engine com Docker compose;

### 4.2 Comandos

**`yarn bootstrap`**: configura o schema do banco de dados e o popula com os 
dados pré definido;

**`yarn dev`**: roda a aplicações no modo desenvolvimento;

**`yarn build`**: gera uma build de produção;

**`yarn start`**: roda a build de produção;

**`yarn migration:create <migration-name>`**: Cria uma nova migration;

**`yarn migration:revert`**: Reverte as alterações realizadas pelas migration;

**`yarn migration:run`**: Executa todas as migrations pendentes;`

**`yarn seed`**: Popula o banco de dados com algumas informações padrões.

### 4.3 Usuários pré-cadastrados 
Ao rodar o comando `yarn bootstrap` será criado criado dois usuários, no qual um possui *role* de fundador e pode realizar  operações de cadastrar e editar animais de uma instituição.Segue abaixo as credenciais destes dois usuários:

**Usuário fundador**:
```
Email: founder@email.com 
Senha: 123456
``` 

**Usuário comum**:
```
Email: user@email.com 
Senha: 123456 
``` 