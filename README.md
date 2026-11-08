# Lamnda · Cotizaciones

Aplicación estática para generar y consultar cotizaciones de servicios y equipos. Esta edición usa empresas, proveedores, enlaces e importes ficticios. Usa HTML, CSS y JavaScript. No requiere compilación, dependencias ni credenciales.

## Ejecutar en local

Con Python 3 instalado, ejecuta desde la raíz del repositorio:

~~~sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory dist
~~~

Abre http://127.0.0.1:8080/ para ver las cotizaciones o http://127.0.0.1:8080/equipos/ para consultar la ficha de compra.

## Personalizar

- [dist/index.html](dist/index.html) contiene las secciones y textos de las cotizaciones.
- [dist/app.js](dist/app.js) contiene las empresas de ejemplo, las horas de servicio y el cálculo de los importes.
- [dist/equipos/catalogo.js](dist/equipos/catalogo.js) contiene los artículos e importes de ejemplo.
- [dist/equipos/](dist/equipos/) contiene la ficha de compra, con vistas de almacenamiento y red y una opción para imprimir o guardar como PDF desde el navegador.

En el ejemplo de un NAS, los discos internos SATA se instalan en espejo. Los discos USB externos son una partida separada para la rotación de copias.

## Licencia

El código está disponible bajo la [licencia MIT](LICENSE).
