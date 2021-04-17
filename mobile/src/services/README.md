# API (Lembra de rodar o server antes...)
Pode importar o módulo (ApiModule) pq ai tu usa as funções direto, sem se preocupar com as rotas
PS: Como é assíncrono, tu tens que lidar com a promise. Tem vários casos, mas um deles é +- assim:

```
import { GetAllActivities } from "./ApiModule"

// uma variavel qualquer que tu qr atualizar
interface Activity {
    ID: number,
    Title: string,
    Description: string,
    Duration: string,
    LinkNetflix: string,
    ImageLink: string,
    Category_ID: number,
    Activity_ID: number,
    Image: any
}
const [variavel, setVariavel] = useState<Activity[]>([])

useEffect(() => {
    GetAllActivities().then(res => setVariavel(res))
})
```

PS: n deu pra testar hj