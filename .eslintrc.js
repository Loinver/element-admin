module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': 0,
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error', {
        'devDependencies': true,
        'optionalDependencies': false,
        'peerDependencies': false
      }
    ],
    'space-before-function-paren':0,
    'operator-linebreak':0,
    'object-shorthand': 0, // 强制对象字面量缩写语法
    'object-curly-spacing': 0, // 对象开始必须空格
    'space-before-blocks': 0, // 代码块开始必须空格
    'no-unused-vars': [2, {
      // 允许声明未使用变量
      'vars': 'local',
      // 参数不检查
      'args': 'none'
    }],
    'no-tabs': 0,
    'no-else-return': 0,
    'dot-notation':0,
    'implicit-arrow-linebreak': 0,
    'linebreak-style': 0,
    'arrow-parens': 0,
    'import/no-unresolved': 0, // 使用alias
    // parseInt 等函数都有一个基数根，一般是简写了的，默认为10进制   parseInt的第二个参数有四种:2、8、10、16，分别对应二进制、八进制、十进制、十六进制；
    'indent': [0, 2, {
      'SwitchCase': 1
    }], //
    'comma-dangle': 0, // 对象末key必须带,逗号  禁止掉
    'prefer-template': 'off', // ESLint总是推荐用ES6的Template String来拼接字符串，而不能用+号
    'semi': [0], // 关闭语句强制分号结尾
    'no-plusplus': 0, // 禁止使用++，--
    'no-control-regex': 0, // 禁止在正则表达式中使用控制字符
    'no-useless-escape': 0, // 禁用不必要的转义字符
    'no-trailing-spaces': 0, // 一行结束后面不要有空格
    'quotes': 0, // 引号类型 `` "" ''
    'no-extend-native': 0, // 禁止扩展native对象
    'no-prototype-builtins': 0,
    'consistent-return': 0,
    'block-scoped-var': 0,
    'one-var-declaration-per-line': 0,
    'no-multi-assign': 0,
    'import/no-dynamic-require': 0,
    'no-sparse-arrays': 0,
    'prefer-rest-params': 0,
    'strict': 0,
    'no-extra-semi': 0,
    'no-new': 0,
    'no-void': 0,
    'no-proto': 0,
    'prefer-spread': 0,
    'no-lone-blocks': 0,
    'wrap-iife': 0,
    'no-continue': 0,
    'import/prefer-default-export': 0,
    'global-require': 0,
    'vue/no-template-key': 0,
    'no-cond-assign': 0,
    'eqeqeq': 0,
    'prefer-arrow-callback': 0, // 要求使用箭头函数作为回调
    'no-underscore-dangle': 0, // 禁止标识符中有悬空下划线_bar
    'func-names': 0, // 函数表达式必须有名字
    'no-bitwise': 0, // 禁止使用按位预算符
    'no-loop-func': 0, // 不要在循环中生成函数
    'no-unused-expressions': 0, // 禁止无用的表达式
    'no-redeclare': 0, // 禁止重复声明变量
    'no-shadow': 0, // 外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'radix': 0, // parseInt必须指定第二个参数
    'max-len': 0, // 字符串最大长度
    'no-lonely-if': 0, // 禁止else语句内只有if语句
    'no-mixed-operators': 0,
    'no-undef': 0, // 不能有未定义的变量
    'no-case-declarations': 0,
    'one-var': 0, // 连续声明
    'no-restricted-syntax': 0, // 遍历对象
    'no-restricted-globals': 0, // 可以使用isNaN
    'function-paren-newline': 0, // 方法前后{}
    'prefer-destructuring': 0, // 优先使用对象结构
    'no-restricted-properties': 0,
    'no-caller': 0,
    'no-nested-ternary': 0, // 禁止使用嵌套的三目运算
    'no-sequences': 0, // 禁止使用逗号运算符
    'no-var': 0, // 禁用var，用let和const代替
    'vars-on-top': 0, // var必须放在作用域顶部
    'quote-props': 0, // 对象字面量中的属性名是否强制双引号
    'prefer-const': 0, // 首选const
    'space-unary-ops': 0, // 一元运算符的前/后要不要加空格
    'no-use-before-define': 0, // 未定义前不能使用
    'object-curly-newline': 0,

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
