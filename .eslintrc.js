module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "project": "./tsconfig.json"  
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "import"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "rules": {
        '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }],
        'import/order': ['error', {
            "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
            "newlines-between": "always"
        }]
    }
}
