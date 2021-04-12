# Projeto Front-end Nasa Test

Projeto desenvolvido para fins de teste.

## Desafio
Criar um sistema que calcule a posição final dos rovers na superfície de Marte.

Os dados de entrada devem ser lidos de um arquivo de texto.

O sistema deve extrair os dados, definir o tamanho do platô, deinir a posição inicial de cada rover, calcular a posição final de cada rover e retornar para o usuário.

### Exemplo de arquivo de entrada
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```

### Resposta esperada
```
1 3 N
5 1 E
```

## Solução

Com o objetivo de ter um sistema mais resiliente, decidi criar o projeto separado em dois microsserviços.

Se for o caso, o back-end pode ser adaptado para ficar hospedado na base de Marte, recebendo as requisições e executando-as. Mas mesmo que não seja o caso, se o objetivo do sistema for apenas calcular a posição final do rovers, o sistema ficará mais robusto por estar dividido em microsserviços.

### Back-end
Responsável por processar os movimentos dos rovers.

Foi desenvolvido em Typescript com Express, usando alguns dos princípios SOLID (todos os que foram possível usar).

### Front-end
Responsável por extrair o conteúdo do arquivo de texto e realizar uma pré-validação.

Foi desenvolvido em ReactJS com Typescript e TDD Jest.

## Evidências do funcionamento do sistema

[Link das evidências do funcionamento do sistema](https://docs.google.com/document/d/1Z2LNncTY2tfDvovWv6B8Cntan6T3Wre1hwQ1qNPGSHU/edit?usp=sharing).

## Para executar o projeto

### 1 - Clone e execute o projeto do Back-end
> Para saber como executar, 
> acesse a [documentação do projeto](https://github.com/PedroCF87/back-nasa-test)

``` git clone https://github.com/PedroCF87/back-nasa-test.git```

### 2 - Clone o projeto do Front-end
``` git clone https://github.com/PedroCF87/front-nasa-test.git```

### 3 - Instale as dependências
``` npm i```

### 4 - Execute o projeto
``` npm run start```

### 5 - Testes do projeto
``` npm run test```
