# At this point tsickle needs absolute paths in tsconfig.json.
PWD=$(pwd | sed "s/\//\\\\\//g")
sed "s/{{ROOT_DIR}}/$PWD/g" tsconfig.tpl.json > tsconfig.b0rked.json

# Remove those pesky "dirname/.." parts in the paths that tsickle/tsc don't like.
sed "s/[^/]*\/\.\.\///g" tsconfig.b0rked.json > tsconfig.json
rm tsconfig.b0rked.json

npx tsickle
