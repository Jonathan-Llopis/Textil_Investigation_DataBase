#!/bin/bash

# Define the file path
FILE_PATH="Añadir Campos.xlsx"

# List all available types
echo "Tipos disponibles:"
echo "1: Aplicaciones"
echo "2: Composiciones"
echo "3: Conservaciones"
echo "4: Estructuras de Ligamento"
echo "5: Tipos Estructurales"

# Ask for the type parameter
read -p "Introduce el valor del parámetro 'type': " TYPE

# Confirm the type parameter
case $TYPE in
  1) TYPE_NAME="Aplicaciones" ;;
  2) TYPE_NAME="Composiciones" ;;
  3) TYPE_NAME="Conservaciones" ;;
  4) TYPE_NAME="Estructuras de Ligamento" ;;
  5) TYPE_NAME="Tipos Estructurales" ;;
  *) echo "Tipo inválido"; exit 1 ;;
esac

read -p "Has seleccionado '$TYPE_NAME'. ¿Es correcto? (s/n): " CONFIRMATION
if [[ $CONFIRMATION != "s" ]]; then
  echo "Operación cancelada."
  exit 1
fi

# Define the endpoint URL
ENDPOINT_URL="http://localhost:8000/telas/create-entity/$TYPE"

# Make the POST request with the file and show the response
curl -i -X POST "$ENDPOINT_URL" -F "file=@$FILE_PATH" -H "Content-Type: multipart/form-data"

# Print a new line and pause to keep the terminal open
echo
read -p "Presiona [Enter] para continuar..."
