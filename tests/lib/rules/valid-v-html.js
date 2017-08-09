/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/valid-v-html')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-v-html', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html="foo"></div></template>'
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div v-html:aaa="foo"></div></template>',
      errors: ["'v-html' directives require no argument."]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html.aaa="foo"></div></template>',
      errors: ["'v-html' directives require no modifier."]
    },
    {
      filename: 'test.vue',
      code: '<template><div v-html></div></template>',
      errors: ["'v-html' directives require that attribute value."]
    }
  ]
})
