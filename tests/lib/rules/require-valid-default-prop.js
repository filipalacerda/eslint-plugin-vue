/**
 * @fileoverview Enforces props default values to be valid.
 * @author Armano
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const rule = require('../../../lib/rules/require-valid-default-prop')
const RuleTester = require('eslint').RuleTester

const parserOptions = {
  ecmaVersion: 6,
  sourceType: 'module'
}

function errorMessage (type) {
  return [{
    message: `Type of the default value for 'foo' prop must be a ${type}.`,
    type: 'Property',
    line: 5
  }]
}

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester()
ruleTester.run('require-valid-default-prop', rule, {

  valid: [
    {
      filename: 'test.vue',
      code: `export default {
        props: { foo: null }
      }`,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: ['foo']
      }`,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: [Object, Number],
            default: 10
          }
        }
      }`,
      parserOptions
    },
    {
      filename: 'test.vue',
      code: `Vue.component('example', {
        props: {
          foo: null,
          foo: Number,
          foo: [String, Number],
          foo: { type: Number, default: 100 },
          foo: { type: [String, Number], default: '' },
          foo: { type: [String, Number], default: 0 },
          foo: { type: String, default: '' },
          foo: { type: String, default: \`\` },
          foo: { type: Boolean, default: false },
          foo: { type: Object, default: () => { } },
          foo: { type: Array, default () { } },
          foo: { type: String, default () { } },
          foo: { type: Number, default () { } },
          foo: { type: Boolean, default () { } },
          foo: { type: Symbol, default () { } },
          foo: { type: Array, default () { } },
          foo: { type: Symbol, default: Symbol('a') },
          foo: { type: String, default: \`Foo\` }
        }
      })`,
      parserOptions
    }
  ],

  invalid: [
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: [Number, String],
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('number or string')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: [Number, Object],
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('number or function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Number,
            default: ''
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('number')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Number,
            default: false
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('number')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Number,
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('number')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Number,
            default: []
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('number')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: String,
            default: 2
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('string')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: String,
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('string')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: String,
            default: []
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('string')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Boolean,
            default: ''
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('boolean')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Boolean,
            default: 5
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('boolean')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Boolean,
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('boolean')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Boolean,
            default: []
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('boolean')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Object,
            default: ''
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Object,
            default: 55
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Object,
            default: false
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Object,
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Object,
            default: []
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Array,
            default: ''
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Array,
            default: 55
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Array,
            default: false
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Array,
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: Array,
            default: []
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function')
    },
    {
      filename: 'test.vue',
      code: `export default {
        props: {
          foo: {
            type: [Object, Number],
            default: {}
          }
        }
      }`,
      parserOptions,
      errors: errorMessage('function or number')
    }
  ]
})
