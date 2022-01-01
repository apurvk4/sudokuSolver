printf "Initialising git repository \n";
git init;
printf "Initialised empty git repository \n";
printf "Initialising empty node project repository \n";
npm init -y;
printf "installing parcel \n";
npm install -D parcel;
printf "parcel installed \n";
printf "installing react \n";
npm i react --save;
printf "react installed \n";
printf "installing react-dom \n";
npm i react-dom --save;
printf "installed react-dom \n";
printf "installing prettier \n";
npm i -D prettier --save;
printf "prettier installed \n";
printf "installing eslint \n";
printf "installing eslint-config-prettier \n";
npm install -D eslint eslint-config-prettier ;
printf "eslint installed \n";
printf "eslint-config-prettier installed \n";
printf "installing eslint \n";
printf "installing @babel/core @babel/preset-react @babel/eslint-parser \n";
npm install -D @babel/core @babel/preset-react @babel/eslint-parser;
printf "@babel/core @babel/preset-react @babel/eslint-parser installed \n";
printf "installing eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks \n ";
npm install -D eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks;
printf "eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks installed \n";
printf "adding .eslintrc.json \n";
echo '{
    "env": {
        "browser": true,
        "commonjs": true,
        "node":true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:react/recommended",
        "plugin:jsx-a11y/recommended",
        "plugin:react-hooks/recommended",
        "prettier"
    ]
    ,
    "parser": "@babel/eslint-parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "requireConfigFile" : "false",
        "babelOptions": { "configFile": "./.babelrc"},
        "shouldFix":true
    },
    "plugins":["react","import","jsx-a11y","react-hooks"],
    "rules": {
        "react/prop-types" : 0,
        "react/react-in-jsx-scope" : 0,
        "jsx-a11y/anchor-is-valid":0,
        "react-hooks/rules-of-hooks": "error", 
        "react-hooks/exhaustive-deps": "warn" 
    },
    "settings": {
        "react" : {
            "version": "detect"
        },
        "import/resolver": {
            "node": {
              "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    }
}' > .eslintrc.json; 
printf "adding .parcelrc \n";
echo '{
  "extends": "@parcel/config-default",
  "transformers": {
    "*.svg": ["@parcel/transformer-svg-react"]
  }
}' > .parcelrc;
printf "adding .babelrc \n";
echo  '{
    "presets": [
        [
            "@babel/preset-react",
            {
                "runtime":"automatic"
            }
        ]
    ]
}
' > .babelrc;
printf "adding .gitignore \n";
echo 'node_modules
.vscode/
.env
dist
.DS_store
coverage/
.cache/' > .gitignore;
printf "adding .prettierrc \n";
echo '{}' > .prettierrc;
printf "adding required scripts to the package.json \n";
echo 'const fs = require("fs");

fs.readFile("package.json", "utf8", (err, data) => {
  if (err) {
    console.log("File read failed:", err);
    return;
  }
  data = JSON.parse(data);
  data.scripts = {};
  data.scripts["predev"] = `prettier --write "src/**/*.{js,jsx}"`;
  data.scripts["dev"] = "parcel src/index.html";
  data.scripts["format"] = `prettier --write "src/**/*.{js,jsx}"`;
  data.scripts["lint"] = `eslint "src/**/*.{js,jsx}" --quiet`;
  data.scripts["build"] =
    "rm -rf dist && NODE_ENV=production parcel build src/index.html --public-url ./";
  fs.writeFile("package.json", JSON.stringify(data), (err) => {
    if (err) console.log("Error writing file:", err);
  });
});' > create.js;

node create.js;

rm -rf create.js;
printf "done \n";