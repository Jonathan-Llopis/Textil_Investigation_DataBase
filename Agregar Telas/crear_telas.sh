#!/bin/bash

# Definir la ruta del archivo Excel y el endpoint correspondiente
EXCEL_FILE_PATH="Añadir Telas.xlsx"
EXCEL_ENDPOINT_URL="http://localhost:8000/telas/create-telas"

# Enviar el archivo Excel y capturar la respuesta HTTP
echo "Subiendo archivo Excel..."
RESPONSE=$(curl -s -o response.txt -w "%{http_code}" -X POST "$EXCEL_ENDPOINT_URL" -F "file=@$EXCEL_FILE_PATH" -H "Content-Type: multipart/form-data")

# Mostrar la respuesta del servidor
cat response.txt
echo -e "\nCódigo de respuesta: $RESPONSE"

# Comprobar si la subida fue exitosa (código HTTP 2xx)
if [[ $RESPONSE =~ ^2[0-9][0-9]$ ]]; then
  echo "Archivo Excel subido correctamente.\n"
else
  echo "Error al subir el archivo Excel. Código HTTP: $RESPONSE"
  echo "No se subirán las imágenes."
  read -p "Presiona [Enter] para continuar..."
exit
fi

# Definir la ruta de la carpeta de imágenes y el endpoint correspondiente
FOLDER_PATH="./Imagenes"
IMAGE_ENDPOINT_URL="http://localhost:8000/files/tela"

# Expresión regular para detectar acentos (tildes y caracteres especiales)
ACCENTS_REGEX="[áéíóúÁÉÍÓÚñÑ]"

# Verificar si hay archivos en la carpeta
if [ -d "$FOLDER_PATH" ] && [ "$(ls -A $FOLDER_PATH)" ]; then
  echo "Subiendo imágenes..."
  for FILE_PATH in "$FOLDER_PATH"/*; do
    FILE_NAME=$(basename "$FILE_PATH")
    
    # Comprobar si el nombre del archivo contiene acentos
    if [[ "$FILE_NAME" =~ $ACCENTS_REGEX ]]; then
      echo "❌ Error: El archivo '$FILE_NAME' contiene acentos en su nombre. No se subirá."
      continue
    fi

    # Subir la imagen si no tiene acentos
    curl -i -X POST "$IMAGE_ENDPOINT_URL" -F "file=@$FILE_PATH" -H "Content-Type: multipart/form-data"
    echo -e "\nSubido: $FILE_PATH"
  done
else
  echo "No hay imágenes en la carpeta '$FOLDER_PATH'."
fi

# Pausa antes de cerrar
echo
read -p "Presiona [Enter] para continuar..."

