#!/bin/bash

# Define the file path and the endpoint URL
FILE_PATH="Añadir Telas.xlsx"
ENDPOINT_URL="http://localhost:8000/files/create-telas"

# Make the POST request with the file and show the response
curl -i -X POST "$ENDPOINT_URL" -F "file=@$FILE_PATH" -H "Content-Type: multipart/form-data"

# Pause to keep the terminal open
echo
read -p "Presiona [Enter] para continuar..."
