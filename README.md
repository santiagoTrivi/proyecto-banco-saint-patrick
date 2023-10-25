<p align="center">
  <img src="https://github.com/santiagoTrivi/proyecto-banco-saint-patrick/blob/main/frontend/public/logo.png" width="70" height="70">
</p>
<a href="https://banco-saint-patrick.vercel.app/" target="_blank"><h1 align="center" ><strong>BANCO SAINT PATRICK</strong></h1></a>
<p align="center"><strong>Home banking para transacciones.</strong></p>

<p align="center">
En el home banking vamos a poder ingresar con seguridad por usuario y visualizar 
nuestro saldo. También vamos a poder realizar transacciones a otras tarjetas; todo esto bajo un desarrollo FullStack. <a href="https://banco-saint-patrick.vercel.app/" target="_blank">Visitamos aquí</a>
</p>

## :book: Sobre el proyecto

Este proyecto FullStack permite a los clientes registrados realizar transferencias de dinero de una tarjeta a otra con la máxima seguridad y validaciones para garantizar que no haya pérdidas de dinero durante las transacciones; puedes ver la documentacion swagger <a href="https://proyecto-banco-saint-patrick.vercel.app/swagger" target="_blank">aquí</a>. Aplicando los siguientes conocimientos:

- Autenticación de clientes.
- Control de sesión de clientes.
- Casos de uso transaccionales.
- Validación de entrada y salida de datos

- Paginación de datos

## :dart: Stack de desarrollo

#### Frontend Stack

<p align="left"> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://vitejs.dev/" target="_blank" rel="noreferrer"> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/410px-Vitejs-logo.svg.png?20220412224743" alt="Vite.js" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

#### Backend Stack

<p align="left"> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://nestjs.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nestjs/nestjs-plain.svg" alt="nestjs" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> </p>

#### Otras herramientas

<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://jestjs.io" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/jestjsio/jestjsio-icon.svg" alt="jest" width="40" height="40"/> </a> </p>

### Documentacion Swagger. [Aquí](https://proyecto-banco-saint-patrick.vercel.app/swagger)

## :pencil: Variables de entorno

Para ejecutar este proyecto, necesitaras añadir las siguientes variables de entorno a tu archivo .env

### Backend

`PORT`

`PRODUCTION_DATABASE_URL`

`DEVELOPMENT_DATABASE_URL`

`PRIVATE_KEY`

`REFRESH_KEY`

### Fronted

`VITE_APP_ROOT`

`VITE_APP_API_URL`

## :rocket: Como instalar y ejecutar este proyecto

Clonar el proyecto

```bash
  git clone https://github.com/santiagoTrivi/proyecto-banco-saint-patrick.git
```

Ir al directorio del proyecto

```bash
  cd proyecto-banco-saint-patrick
```

### Usando Docker-compose

Este proyecto cuenta en la configura de las imágenes de Docker a través de DockerFile y Docker-compose. Por lo cual, asegúrese de tener instalado [Docker](https://www.docker.com/products/docker-desktop/) y [Docker compose](https://docs.docker.com/compose/)

Construya la imágenes y ejecute los contenedores

```bash
  docker-compose --env-file .env.ci up
```

Es importante ejecutar los contenedores con `-–env-file .env.ci`; ya que en el archivo `.env.ci` estan las variables de entorno necesarias para `docker-compose.yml`

Para detener los contenedores, ejecute

```bash
  docker-compose down
```

## Configuración de MongoDB | Replica set

Con la incorporación de transacciones ACID en MongoDB 4.0 o superior, se requiere la configuración de ReplicaSet, conecido como [Replication](https://www.mongodb.com/docs/manual/replication/), no en el entorno standalone. Replica set en MongoDB es un grupo de procesos de mongod que mantiene el sismo set de datos. Debido al estilo del proyecto (trasferencias y depósitos de cliente) se implemento las transacciones de MongoDB para evitar los errores.

para la Configuración del contenedor de mongo ejecutado por  
`docker-compose.yml`, Acceda al contenedor

```bash
  docker exec -it mongodb mongo
```

Agrega el replica set

```bash
  config={_id:'dbrs', members:[{_id:0, host:"mongodb:27017"}]};
```

Inicializar el replica set

```bash
  rs.initiate(config);
```

Finalmente, en la parte SECONDARY, coloque `db` y luego `exit` para salir de la connexion del contenedor. Para la indicaciones, [click Aqui](https://www.youtube.com/watch?v=PcUGdyiFyvo&t=316s)

## :construction_worker: Sobre los desarrolladores

- Desarrollador Frontend: [@JPerezC92](https://github.com/JPerezC92)

- Desarrollador Backend: [@santiagoTrivi](https://github.com/santiagoTrivi)
