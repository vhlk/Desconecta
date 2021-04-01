# Como rodar (para android):
```
npx react-native run-android
```

## Dependências(Windows):
1. Android sdk e ferramentas
> Instala ai o android studio nmrl pf :) <br>
a. Cria uma variável de ambiente com o nome "ANDROID_HOME" e bota "%LOCALAPPDATA%\Android\Sdk" como chave<br>
b. Adiciona ao PATH "%LOCALAPPDATA%\Android\Sdk\platform-tools"<br>
c. Cria também algum emulador no android studio (pq ai tu já testa sem precisar conectar o cel ao pc)

## Dependências(Linux):
1. Android sdk e ferramentas
> Instala ai o android studio nmrl pf :) <br>
a. Instala o Android Studio, JDK e Node. <br>
b. (Bug do Android Studio) O android studio cria uma pasta "Android" na home (cd ~/), porém algumas vezes não dá permissão suficiente pra o user. Caso seja o caso, é só dar permissão pra si mesmo kkk. Tu pode usar chown (sudo chown username:Android), mas eu usei o setfacl (sudo setfacl -R -m u:username:rwx Android). <br>
c. Cria um emulador no Android Studio (Obs: instala android com versão 10 pra cima) e instala também Intel x86 Atom_64 System Image ou Google APIs Intel x86 Atom System Image (Appearance & Behavior → System Settings → Android SDK → Show Package Details).<br>
d. Coloca as coisas no PATH (tu pode colocar no bashrc ou bash_profile, eu vou usar o bashrc):<br>
> 1. Abre o terminal e abre o arquivo bashrc <br>
> ```
    nano ~/.bashrc
> ```
> 2. Cola isso aqui: <br>
    > ```
    > ANDROID_HOME="$HOME/Android/Sdk"
    > PATH="$PATH:$ANDROID_HOME/emulator"
    > PATH="$PATH:$ANDROID_HOME/tools"
    > PATH="$PATH:$ANDROID_HOME/tools/bin"
    > PATH="$PATH:$ANDROID_HOME/platform-tools"
    > ```
> 3. Salva e fecha.
> 4. Atualiza o bashrc
> ``` source ~/.bashrc ```

#### Erro na hora de rodar?
Tenta isso aqui (na pasta Desconecta/mobile):
```
sudo chmod +x android/gradlew
```

## Npm instal
```
npm install
```
Óbvio que tem que fazer né :P <br>
Inclusive pode ser que precise fazer de vez em quando (caso alguém instale alguma lib nova)