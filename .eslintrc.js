module.exports = {
    // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    "root": true,
    "extends": [
        "eslint-config-airbnb"
    ],
    // 对Babel解析器的包装使其与 ESLint 兼容。
    "parser": "babel-eslint",
    "parserOptions": {
        // 代码是 ECMAScript 模块
        "sourceType": "module",
        "ecmaVersion": 6
    },
    "env": {
        // 预定义的全局变量，这里是浏览器环境
        "browser": true,
        "es6": true
    },
    "plugins": [
        "html",
        "import"
    ],
    "rules": {
        "indent": "off",
        // 禁止分号结尾
        "semi": [
            "warn",
            "never"
        ],
        "eqeqeq": "error",
        // 拖尾逗号
        "comma-dangle": ["error", "never"],
        "no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "error"
                ]
            }
        ],
        "no-tabs": "off",
        "no-plusplus": "off",
        // "import/no-extraneous-dependencies": "off",
        // "import/no-unresolved": "off",
        // 'import/extensions': ['error', 'always', {
        //     'js': 'never',
        //     'vue': 'never'
        // }],
        "no-duplicate-imports": 1
    }
};