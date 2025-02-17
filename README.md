# Base de Datos de Investigación Textil

## Descripción

Este repositorio contiene una base de datos de investigación textil. El propósito de esta base de datos es almacenar y gestionar datos relacionados con diferentes tipos de textiles, sus propiedades e información de investigación relacionada.

## Características

- Base de datos completa de información textil
- Fácil de buscar y recuperar datos
- Soporte para diferentes tipos de textiles y sus propiedades

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/Jonathan-Llopis/Textil_Investigation_DataBase.git
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd Textil_Investigation_DataBase
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

## Uso

1. Inicia la aplicación:
    ```bash
    npm start
    ```

2. Accede a la base de datos a través de la interfaz proporcionada.

## Añadir nuevos campos y telas

### Paso 1: Añadir nuevos campos

1. **Ubica los archivos necesarios**
   - Abre la carpeta llamada `Agregar Telas`.
   - Dentro, encontrarás dos archivos importantes:
     - `Añadir Campos.xlsx`: Aquí solo debes escribir el nombre del campo en MAYÚSCULAS.
     - `Añadir Telas.xlsx`: En este archivo, si estás agregando telas, debes escribir todos los campos en MAYÚSCULAS. Estos campos deben haber sido creados antes.

2. **Abrir el terminal**
   - **En Windows:**
     - **Desde el Explorador de Archivos:**
       - Navega hasta la carpeta en la que quieres abrir el terminal.
       - Haz clic derecho mientras mantienes presionada la tecla Shift.
       - Selecciona "Abrir en Terminal", "Abrir ventana de PowerShell aquí" o "Abrir ventana de comandos aquí" (según la versión de Windows).
     - **Con la barra de direcciones del Explorador:**
       - Abre la carpeta en el Explorador de archivos.
       - Haz clic en la barra de direcciones y escribe `cmd` o `powershell`, luego presiona Enter.
       - Esto abrirá el terminal en la carpeta actual.
   - **En macOS:**
     - **Desde Finder:**
       - Abre la carpeta en Finder.
       - Presiona `Cmd + Shift + G`, escribe `terminal`, y presiona Enter.
       - O haz clic derecho dentro de la carpeta y selecciona `Servicios > Nueva Terminal en la Carpeta` (si tienes activada esta opción en `Preferencias del Sistema > Teclado > Funciones rápidas > Servicios`).

3. **Ejecutar el programa para añadir campos**
   - Ahora necesitamos decirle a la computadora que agregue los nuevos campos. Para esto, utilizaremos un pequeño programa (llamado "script").
   
   **Sigue estos pasos:**
   - En la terminal abierta, escribe lo siguiente y presiona `Enter`:
     ```bash
     ./crear_campos.sh
     ```
   - Se te pedirá que elijas un tipo de campo. Puedes seleccionar uno de la siguiente lista:
     - 1: Aplicaciones
     - 2: Composiciones
     - 3: Conservaciones
     - 4: Estructuras de Ligamento
     - 5: Tipos Estructurales
   - Sigue las instrucciones en pantalla hasta que el proceso termine.

### Paso 2: Añadir nuevas telas

Si necesitas agregar telas en lugar de campos, sigue estos pasos:

1. **Ejecutar el programa para añadir telas**
   - Abre la "Terminal" (siguiendo los pasos según tu sistema operativo).
   - Escribe lo siguiente y presiona `Enter`:
     ```bash
     ./crear_telas.sh
     ```
   - El programa hará el trabajo por ti y enviará la información al servidor.

### Notas importantes
- Asegúrate de que el servidor esté funcionando. Puedes verificarlo escribiendo en tu navegador web:
  ```
  http://localhost:8000
  ```
  Si la página no carga, es posible que el servidor no esté activo.
- Asegúrate de que los archivos `Añadir Campos.xlsx` y `Añadir Telas.xlsx` estén dentro de la carpeta `Agregar Telas` antes de ejecutar los programas.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor, bifurca este repositorio y envía pull requests.

## Licencia

Este proyecto está licenciado bajo la Licencia Pública General de GNU v3.0 - consulta el archivo LICENSE para más detalles.

## Referencias

- [crear_campos.sh](https://github.com/Jonathan-Llopis/Textil_Investigation_DataBase/blob/main/Agregar%20Telas/crear_campos.sh)
- [crear_telas.sh](https://github.com/Jonathan-Llopis/Textil_Investigation_DataBase/blob/main/Agregar%20Telas/crear_telas.sh)
