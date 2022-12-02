# CambioDolarFrontend

Proyecto generado con [Angular CLI](https://github.com/angular/angular-cli) version 15.0.1.

## Ejecutar el proyecto

1. Clonar el repositorio.
2. Ejecutar `npm i`.
3. Ejecutar `ng serve` para levantar el proyecto en el local y ingresar a la siguiente url `http://localhost:4200/`.

## Descripcion

El proyecto sirve para realizar cambios de dinero de dólar a soles y vice versa. La vista principal te permite realizar pruebas de tipos de cambios. Si deseas realizar alguna operación, debes ingresar al "Iniciar operación" para ser redireccionado.

En la vista Home, tendrás 2 minutos para realizar la transacción que desees. Luego de eso serás redireccionado a la vista principal. Puedes seguir usando la calculadora de cambio en esta vista.

### Ejemplo

Para realizar un cambio tomar las siguientes consideraciones.

1. Debes ingresar tu cuenta en el campo indicado. Al ingresar tu cuenta esta se conectara al servicio del banco para validarla. Debes esperar unos segundos. el borde del input debe cambiar a verde para una validacion exitosa. de lo contrario saldrá un mensaje de error. 2. Ingresa el monto a cambiar, nuevamente esperar la validación del banco.

2. Click en botón cambiar.
   Aqui ocurren varios procesos:

   1. Se genera un delay de 10 segundos para iniciar el proceso.

   2. El front se conectara al micro servicio de transaccion, esta puede ser exitosa o fallida (El resultado es aleatorio). De ser fallida, saldra un error y seras redireccionado a la vista principal despues de 5 segundos
   3. Si es exitoso, se llamara al servicio del banco para actualizar las cuentas con el cambio solicitado y saldra un mensaje de exito. y seras redireccionado al
      inicio despues de 5 segundos

#### Nota

El servicio de autenticacion por el lado del front aun no se encuentra operativo. Pero se puede probar desde la siguiente ruta:

`https://1xvsj3adyf.execute-api.sa-east-1.amazonaws.com`

Ver Readme del servicio de auth: `https://github.com/MartinMaengMen/microservicio-autenticacion`
