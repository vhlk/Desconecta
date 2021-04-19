# Como rodar (por enquanto):
1. Caso seja a 1 vez, dá um npm install
2. npm run test

# Rotas

    "/activity"
    "/activity/:activityId"
    "/activity/category/:categoryId"
    "/apptime/:userId"
    "/apptime/:userId/:whatsapp/:facebook/:instagram/:twitter/:tiktok"
    "/apptime/update/:userId/:whatsapp/:facebook/:instagram/:twitter/:tiktok"
    "/categories"
    "/categories/:categoryId"
    "/favorites"
    "/favorites/:userId/:favoriteId"
    "/goals"
    "/interests/:userId"
    "/interests/:userId/:interestsId"
    "/useractivity/:userId"
    "/useractivity/:userId/:activityId"
    "/users"
    "/users/:name/:email/:password"
    "/users/:email/:password"
    "/usergoal/:userId"
    "/usergoal/:userId/:goalId"

# dicas heroku
Seguir o setup de acordo com esse link: https://devcenter.heroku.com/articles/collab

Faça alguma mudança na rota, ou qualquer coisa que se reflita em algum comportamento novo no backend. Para dar push, utilize o comando: git subtree push --prefix server heroku main, a partir da pasta raiz do repo do Desconecta.

Teste através do link: https://desconecta.herokuapp.com/, e caso dê algum erro, utilize o comando heroku logs --tail para ver o que deu errado.

Boa sorte :')