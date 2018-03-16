// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    //  beta 3.0.0
        // "vue/html-indent": ["error", 4, {
        //     "attribute": 1,
        //     "closeBracket": 0,
        //     "ignores": []
        // }],
        // don"t require .vue extension when importing
        "import/extensions": ["error", "always", {
          "js": "never",
          "vue": "never"
      }],
      "func-names": 0, // 使用具名函数
      "arrow-body-style": 0, // 箭头函数要求必须有函数体
      "import/extensions": 0, // 扩展名称
      "import/no-unresolved": 0, // 找不到路径
      "import/no-extraneous-dependencies": 0,
      "no-return-assign": 0, // 返回的结果中使用了等于
      // "max-len": 0, // 一行不可过长
      // 限制单行不得超过 230 个字符
      "max-len": ["error", {
          "code": 230,
          "ignoreComments": true,
          "ignoreTrailingComments": true,
          "ignoreUrls": true,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true,
      }],
      "consistent-return": 0, // 检测返回值的类型是否一致
      "jsx-a11y/no-static-element-interactions": 0, // 绑定函数检验
      "jsx-a11y/anchor-has-content": 0,
      "jsx-a11y/href-no-hash": "off",
      "jsx-a11y/anchor-is-valid": ["warn", { aspects: ["invalidHref"] }],
      "comma-dangle": ["error", "never"],
      // warnning
      "no-debugger": process.env.NODE_ENV === "production" ? 2 : 1,
      "no-console": process.env.NODE_ENV === "production" ? 2 : 1,


      "indent": ["error", 4, { "SwitchCase": 1 }], // indent 为4空格
      "quotes": ["error", "double"], // 双引号
      "semi": ["error", "always"], // 结尾分号
      "vars-on-top": 2,//var必须放在作用域顶部

      // 永久关闭
      "no-await-in-loop": 0,  // for循环中可以用await ？
      "jsx-a11y/anchor-is-valid": 0,
      "no-mixed-operators": 0, // 检测混合使用的操作符，为什么要关 ？
      "no-restricted-syntax": 0, // 语法检查不要太严格
      "no-unused-vars": 0, // 回调函数中进程有无用参数，所以这个规则不要打开为好
      "no-else-return": 0, // return之后可以接else
      "no-lonely-if": 0, // 检测 if 作为唯一语句出现在 esls 语句块中，为什么关 ？
      "import/no-dynamic-require": 0, // require不要动态的
      "global-require": 0, // require要在头部
      "radix": 0, // 默认10进制
      "import/prefer-default-export": 0, // 不要限定export几个
      "no-continue": 0, // 允许使用continue
      "linebreak-style": 0,
      "promise/always-return": 0, // promise 必须返回值
      "promise/no-callback-in-promise": 0, // promise中不用调用callback
      "import/no-named-as-default-member": 0,
      // 必须尽快酌情打开
      // "vue/require-v-for-key": 0,
      // "no-shadow": 0,
      // "prefer-arrow-callback": 0,
      // "promise/catch-or-return": 0,
      // "promise/no-nesting": 0,
      // "array-callback-return": 0,
      // "no-extra-semi": 0,
      // "no-empty": 0,
      // "vue/no-parsing-error": 0,
      // "vue/no-invalid-template-root": 0,
      // "import/no-duplicates": 0,
      // "no-var": 0,
      // "one-var": 0,
      // "one-var-declaration-per-line": 0,
      // "no-useless-return": 0,
      // "no-unused-expressions": 0,
      // "dot-notation": 0,
      // "no-tabs": 0,
      // "no-mixed-spaces-and-tabs": 0,
      // "vue/no-invalid-v-model": 0,
      // "vue/no-invalid-v-for": 0,
      // "no-empty-function": 0,
      // "no-use-before-define": 0,
      // "default-case": 0,
      // "object-curly-spacing": 0,

      // 未来会陆续打开
      // "space-before-function-paren": 0, // 函数后要有空格
      // "no-useless-escape": 0, // 禁用字符串中不必要的转移，为什么要关 ？
      // "promise/avoid-new": 0, // 不要使用new Promise
      "class-methods-use-this": 0, // 没用this的方法要改为静态的
      "quote-props": 0, // object的key不用引号
      "import/first": 0, // import要先，逻辑在后
      // "spaced-comment": 0, // 注释中要求头尾空格
      // "object-shorthand": 0, // class 中的方法不要些function
      "arrow-parens": 0, // 箭头函数的参数括号问题
      "guard-for-in": 0, // for in 要对key类型判断
      "import/newline-after-import": 0, // import 最后一个换行
      "no-plusplus": 0, // 暂时允许++
      // "no-return-await": 0, // 暂时允许在async中返回await
      "prefer-template": 0, // 字符串用模版，不要用相加
      "no-param-reassign": 0, // 参数重新赋值
  }
}
