# Boas vindas ao repositório do projeto Car Shop!

---

# Habilidades

Neste projeto, eu pude de:

- Trabalhar com os pilares da `Programação Orientada a Objetos`: `Herança`, `Abstração`, `Encapsulamento` e `Polimorfismo`;
- Trabalhar com a utilização de `Composição`;
- Trabalhar com a criação e utilização de `Interfaces`;
- Implementar, em `TypeScript`: `Classes`, `Instâncias`, `Atributos`, `Métodos` e `Objetos`;
- Aplicar os conhecimentos de `MongoDB`, `Typescript` e `POO` para criar uma API com `CRUD`.

---


## O que foi desenvolvido

Para este projeto, eu apliquei os princípios de `POO` para a contrução de uma API com `CRUD` para gerenciar uma concessionária de veículos utilizando o banco de dados `MongoDB`.

---

## Instalação do projeto localmente

Após cada um dos passos, haverá um exemplo do comando a ser digitado para fazer o que está sendo pedido, caso tenha dificuldades, mande mensagem para o meu e-mail _humberto_bonadiman@hotmail.com_.

1. Abra o terminal e realize o clone do projeto:
```javascript
  git clone git@github.com:Humberto-Bonadiman/Car-Shop.git
```

2. Acesse o diretório do projeto e depois utilize o comando **npm install** para instalar todas as dependências necessárias:
```javascript
  cd Car-Shop
  npm install
```

---

## Subir o banco do MongoDB usando Docker

Caso não tenha o MongoDB instalado em sua máquina e deseje usar o Docker, é só seguir os passos a seguir:

 - Baixe a imagem do MongoDB:

```sh
docker pull mongo
```

 - Crie o contêiner do MongoDB:

```sh
docker run --name <nome-do-conteiner> -p 27017:27017 -d mongo
```

 - Confira se o contêiner está rodando:

```sh
docker ps
```

---

# Requisitos do projeto

## Requisitos Obrigatórios

### 01 - Crie a interface `Model` genérica

Crie a interface `Model`, que será usada para fazermos nossa conexão com o banco de dados.
Ela deverá ter, pelo menos, as funções `create()`, `read()`, `readOne()`, `update()` e `delete()`.
Por ser genérica, nossa interface deverá receber um tipo `T` qualquer, e ela deve esperar, em cada função, as seguintes especificações:
 - `create()`: Deve receber um objeto do tipo `T`e retornar uma Promise do tipo `T`.
 - `read()`: Deve retornar uma Promise contendo um array de objetos do tipo `T`.
 - `readOne()`: Deve receber uma string e retornar uma Promise do tipo `T` ou nula.
 - `update()`: Deve receber uma string e um objeto do tipo `T` e retornar uma Promise do tipo `T` ou nula.
 - `delete()`: Deve receber uma string e retornar uma Promise do tipo `T` ou nula.
 - O arquivo deve ficar no diretório `/src/interfaces/` e  ter o nome de `ModelInterface.ts`.
 - A interface deve ser exportada com o nome de `Model` e **não deve** ser exportada de forma padrão.

### 02 - Crie a interface `Vehicle`

Crie a interface `Vehicle`, que será usada para criarmos nossos tipos de carro, moto e caminhão.
Ela deverá ter todos os atributos comuns de todos os veículos que listaremos aqui. São eles:
 - `model`: Marca e/ou modelo do veículo. Deve ser uma string com, pelo menos, 3 caracteres;
 - `year`: Ano de fabricação do veículo. Deve ser maior ou igual a 1900, porém menor ou igual a 2022;
 - `color`: Cor principal do veículo. Deve ser uma string com, pelo menos, 3 caracteres;
 - `status`: Status que define se um veículo pode ou não ser comprado. Deve receber valores booleanos e deve ser opcional;
 - `buyValue`: Valor de compra do veículo. Deve receber apenas números inteiros;
 - O arquivo deve ficar no diretório `/src/interfaces/` e ter o nome de `VehicleInterface.ts`.
 - A interface deve ser exportada com o nome de `Vehicle` e **não deve** ser exportada de forma padrão.

### 03 - Crie a interface `Car` a partir da interface `Vehicle`

Crie a interface `Car`, de modo que ela possua todos os atributos da interface `Vehicle` e, também, os atributos:
 - `doorsQty`: Quantidade de portas de um carro. Deve ser maior ou igual a 2 e menor ou igual a 4;
 - `seatsQty`: Quantidade de assentos disponíveis no carro. Deve ser maior ou igual a 2 e menor ou igual a 7;
 - O arquivo deve ficar no diretório `/src/interfaces/` e  ter o nome de `CarInterface.ts`.
 - A interface deve ser exportada com o nome de `Car` e **não deve** ser exportada de forma padrão.

### 04 - Crie uma rota para o endpoint `/cars` onde seja possível cadastrar um novo carro

Crie uma rota que receba uma requisição `POST` para cadastrar um veículo do tipo carro.

### 05 - Escreva testes para cobrir 15% da camada de model

Escreva testes que cubram, pelo menos, 15% da camada Model. Seus arquivos de teste deverão estar na pasta `src/tests/unit/model`.

### 06 - Escreva testes para cobrir 15% da camada de service

Escreva testes que cubram, pelo menos, 15% da camada Service. Seus arquivos de teste deverão estar na pasta `src/tests/unit/services`.

### 07 - Escreva testes para cobrir 15% da camada de controller

Escreva testes que cubram, pelo menos, 15% da camada Controller. Seus arquivos de teste deverão estar na pasta `src/tests/unit/controllers`.

### 08 - Crie uma rota para o endpoint `/cars` onde seja possível listar todos os carros registrados

Crie uma rota que receba uma requisição `GET` para receber todos os veículos do tipo carro registrados no banco de dados. Será verificado que:
 - É possível listar os carros com sucesso;
 - Retorna uma lista vazia se não houver carros;

### 09 - Crie uma rota para o endpoint `/cars/id` onde seja possível listar um único carro através do seu id

Crie uma rota que receba uma requisição `GET` para receber determinado veículo do tipo carro que possua o `id` passado como parâmetro na rota.

### 10 - Escreva testes para cobrir 30% da camada de model

Escreva testes que cubram, pelo menos, 30% da camada Model. Seus arquivos de teste deverão estar na pasta `src/tests/unit/model`.

### 11 - Escreva testes para cobrir 30% da camada de service

Escreva testes que cubram, pelo menos, 30% da camada Service. Seus arquivos de teste deverão estar na pasta `src/tests/unit/services`.

### 12 - Escreva testes para cobrir 30% da camada de controller

Escreva testes que cubram, pelo menos, 30% da camada Controller. Seus arquivos de teste deverão estar na pasta `src/tests/unit/controllers`.

### 13 - Crie uma rota para o endpoint `/cars/id`, onde é possível atualizar o registro de um carro através do seu id

Crie uma rota que receba uma requisição `PUT` para atualizar determinado veículo do tipo carro que possua o `id` passado como parâmetro na rota.

### 14 - Escreva testes para cobrir 60% da camada de model

Escreva testes que cubram, pelo menos, 60% da camada Model. Seus arquivos de teste deverão estar na pasta `src/tests/unit/model`.

### 15 - Escreva testes para cobrir 60% da camada de service

Escreva testes que cubram, pelo menos, 60% da camada Service. Seus arquivos de teste deverão estar na pasta `src/tests/unit/services`.

### 16 - Escreva testes para cobrir 60% da camada de controller

Escreva testes que cubram, pelo menos, 60% da camada Controller. Seus arquivos de teste deverão estar na pasta `src/tests/unit/controllers`.

### 17 - Crie uma rota para o endpoint `/cars/id` para excluir os registros de um carro

Crie uma rota que receba uma requisição `DELETE` para excluirr determinado veículo do tipo carro que possua o `id` passado como parâmetro na rota.

## Requisitos Bônus

### 18 - Crie a interface `Motorcycle` a partir da interface `Vehicle`

Crie a interface `Motorcycle`, de modo que ela possua todos os atributos da interface `Vehicle` e, também, os atributos:
 - `category`: Categoria da moto. Deve poder ser **apenas** `Street`, `Custom` ou `Trail`;
 - `engineCapacity`: A capacidade do motor. Deve ser um valor inteiro positivo menor ou igual a 2500;
 - O arquivo deve ficar no diretório `/src/interfaces/` e  ter o nome de `MotorcycleInterface.ts`.
 - A interface deve ser exportada com o nome de `Motorcycle` e **não deve** ser exportada de forma padrão.

### 19 - Crie uma rota para o endpoint `/motorcycles` onde seja possível cadastrar uma nova moto

Crie uma rota que receba uma requisição `POST` para cadastrar um veículo do tipo moto.

### 20 - Crie uma rota para o endpoint `/motorcycles` onde seja possível listar todas as motos registradas

Crie uma rota que receba uma requisição `GET` para receber todos os veículos do tipo moto registrados no banco de dados.

### 21 - Crie uma rota para o endpoint `/motorcycles/id` onde seja possível listar uma única moto através do seu id

Crie uma rota que receba uma requisição `GET` para receber determinado veículo do tipo moto que possua o `id` passado como parâmetro na rota.

### 22 - Crie uma rota para o endpoint `/motorcycles/id`, onde é possível atualizar o registro de uma moto através do seu id

Crie uma rota que receba uma requisição `PUT` para atualizar determinado veículo do tipo moto que possua o `id` passado como parâmetro na rota.

### 23 - Crie uma rota para o endpoint `/motorcycles/id` para excluir os registros de uma moto

Crie uma rota que receba uma requisição `DELETE` para excluirr determinado veículo do tipo moto que possua o `id` passado como parâmetro na rota.

### 24 - Escreva testes para cobrir 90% da camada de model

Escreva testes que cubram 90% da camada Model. Seus arquivos de teste deverão estar na pasta `src/tests/unit/models`.

### 25 - Escreva testes para cobrir 90% da camada de service

Escreva testes que cubram 90% da camada Service. Seus arquivos de teste deverão estar na pasta `src/tests/unit/services`.

### 26 - Escreva testes para cobrir 90% da camada de controller

Escreva testes que cubram 90% da camada Controller. Seus arquivos de teste deverão estar na pasta `src/tests/unit/controllers`.
