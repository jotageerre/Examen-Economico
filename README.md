
## Examen - Economic
 
Se desea visualizar qué restaurantes son económicos en el listado de restaurantes del propietario y que aparezca una etiqueta € similar a la mostrada en la captura (en brandSuccess, abajo y a la derecha) cuando un restaurante sea económico, y dos símbolos de euro €€ cuando el restaurante no lo sea (en brandPrimary, abajo y a la derecha).

Para ello, cuando se da de alta un producto de un restaurante se deberá computar el precio medio de los productos del resto de restaurantes y compararlo con el precio medio de los productos del restaurante actual, incluyendo el producto recién creado.

Se considerará económico a aquellos restaurantes cuyo precio medio de productos sea inferior al precio medio del resto en el momento de la creación del producto.

Nota1: Para hacer un filtrado de productos cuyo restaurante sea distinto del restaurante actual puede usar el operador not equal (Sequelize.Op.ne)
Nota2: Para computar el valor medio de una columna, deberá usar la función Sequelize.fn ('AVG', Sequelize.col('columnName')).

Para mayor claridad, puede observar el uso de estos operadores en el siguiente ejemplo donde se computa la media de los costes de envío de los pedidos que no se corresponden con el usuario currentUserId:

## Introducción

Este repositorio incluye el backend completo (carpeta `DeliverUS-Backend`) y el frontend de `owner` (carpeta `DeliverUS-Frontend-Owner`). Servirá como base para realizar el examen de laboratorio de la asignatura.

## Preparación del entorno

### a) Windows

* Abra un terminal y ejecute el comando `npm run install:all:win`.

### b) Linux/MacOS

* Abra un terminal y ejecute el comando `npm run install:all:bash`.

## Ejecución

### Backend

* Para **rehacer las migraciones y seeders**, abra un terminal y ejecute el comando

    ```Bash
    npm run migrate:backend
    ```

* Para **ejecutarlo**, abra un terminal y ejecute el comando

    ```Bash
    npm run start:backend
    ```

### Frontend

* Para **ejecutar la aplicación frontend de `owner`**, abra un nuevo terminal y ejecute el comando

    ```Bash
    npm run start:frontend:owner
    ```

## Depuración

* Para **depurar el backend**, asegúrese de que **NO** existe una instancia en ejecución, pulse en el botón `Run and Debug` de la barra lateral, seleccione `Debug Backend` en la lista desplegable, y pulse el botón de *Play*.

* Para **depurar el frontend**, asegúrese de que **EXISTE** una instancia en ejecución del frontend que desee depurar, pulse en el botón `Run and Debug` de la barra lateral, seleccione `Debug Frontend` en la lista desplegable, y pulse el botón de *Play*.

## Test

* Para comprobar el correcto funcionamiento de backend puede ejecutar el conjunto de tests incluido a tal efecto. Para ello ejecute el siguiente comando:

    ```Bash
    npm run test:backend
    ```
**Advertencia: Los tests no pueden ser modificados.**
