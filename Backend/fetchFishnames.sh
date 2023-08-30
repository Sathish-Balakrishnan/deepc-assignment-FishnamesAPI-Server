# You need make this an executable - "chmod +x ./test.sh"
# You need to install JSON parser like JQ using "$ curl -L -o /usr/bin/jq.exe https://github.com/stedolan/jq/releases/latest/download/jq-win64.exe"
# You can also download "jq-win64.exe" locally and use that link to install using the Path to Exe file.s

FISH_NAMES_URL="https://github.com/janelleshane/fish-common-names/blob/f17f85b284a129b8f523c0cc25fe6d0eb34fb45b/fish.txt"
FISHNAMES_FILE_ORIGINAL="./database/fish_names_original.txt"
# curl -o "$OUTPUT_FILE" "$FISH_NAMES_URL"

# Function to make the curl request
make_curl_request() {
    # response=$(curl -s -o /dev/null -w "%{http_code}" "$1")
    response=$(curl -s -o $FISHNAMES_FILE_ORIGINAL -w "%{http_code}" "$1")

    if [ "$response" -ge 200 ] && [ "$response" -lt 300 ]; then
        echo "Request successful"
        # cases for different elevels of success
        # Ex: Server Communication Succesfull (like ping), data transfer successfull ?, File Write successfull ?

    else
        echo "Request failed with HTTP status code $response"
    # Write seperate cases for every failed cases
    
    fi
}

# Main script
# url="https://example.com"

# Try block
# make_curl_request "$url"
make_curl_request "$FISH_NAMES_URL"
if [ $? -ne 0 ]; then
    echo "An error occurred during the curl request"
fi

#  jq '.' ./LocalDatabase/fish_names.txt > fishnames_formatted.json

# Check if the file exists before proceeding
while [ ! -f "$FISHNAMES_FILE_ORIGINAL" ]; do
    sleep 1
done


result=$(jq '.payload.blob.rawLines |= map(split("\r") | map(select(. != "") | ascii_upcase ))' $FISHNAMES_FILE_ORIGINAL)
fishnames=$(echo "$result" | jq '.payload.blob.rawLines') 
formatted_json=$(echo "$fishnames" | jq '[.[]] | flatten')
FISHNAMES_EXTRACTED_PREPROCESSED="./database/Fishnames_Extracted_Preprocessed.JSON"
echo "{\"fishnames\": $formatted_json}" > $FISHNAMES_EXTRACTED_PREPROCESSED
















