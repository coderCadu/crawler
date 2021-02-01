# Instruções | Crawler para pegar preços atualizados

## No terminal execute

```sh
    yarn
    # ou
    npm i
    # após instalar as depêndecias inicie o projeto
    yarn start
    # ou
    npm start
```

O arquivo .env_sample carrega os nomes de variáveis de ambiente do projeto, mas não é necessário configurar para rodar em dev

O servidor feito para o crawler se comunica em JSON

## Rota: /buscar

Qualquer outra rota retorna um erro 404

Indico o Insomnia para montar a request

### Exemplo de Request para a rota /buscar

```json
{
    "checkin": "03022021",
    "checkout": "04022021"
}
```

### Exemplo de Response para a rota /buscar

"Desenvolver o projeto do robô que faz a busca dos preços em tempo
real"

```json
[
    {
        "preco": "R$ 896,50"
    },
    {
        "preco": "R$ 986,00"
    },
    {
        "preco": "R$ 1.015,00"
    },
    {
        "preco": "R$ 1.065,50"
    },
    {
        "preco": "R$ 1.100,00"
    }
]
```

Caso o projeto não rode talvez seja necessário instalar essas duas libs no seus ambiente Linux: libnss3-dev e libgbm-dev

sudo apt-get install libnss3-dev
sudo apt-get install libgbm-dev
