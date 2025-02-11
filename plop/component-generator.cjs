module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Gerador de Componentes React',
    prompts: [
      {
        type: 'rawlist',
        name: 'framework',
        message: 'React ou React Native?',
        choices: ['React', 'React Native'],
        filter(val) {
          return val == 'React Native' ? 'native' : 'react'
        },
      },
      {
        type: 'rawlist',
        name: 'language',
        message: 'Typescript ou Javascript?',
        choices: ['Typescript', 'Javascript'],
        filter(val) {
          return val == 'Typescript' ? 'ts' : 'js'
        },
      },
      {
        type: 'rawlist',
        name: 'styles',
        message: 'Styled-Component ou CSS?',
        choices: ['Styled-Component', 'CSS'],
        filter(val) {
          return val == 'CSS' ? 'css' : 'styled'
        },
      },
      {
        type: 'input',
        name: 'name',
        message: 'Nome do Componente',
      },
    ],
    actions: function (data) {
      const actions = []

      actions.push({
        type: 'add',
        path: `./src/components/{{name}}/index.{{language}}x`,
        templateFile: './plop/{{framework}}/component-index-template.hbs',
      })

      if (data.styles == 'styled') {
        actions.push({
          type: 'add',
          path: `./src/components/{{name}}/{{name}}.{{language}}x`,
          templateFile:
            './plop/{{framework}}/component-name-template-{{language}}.hbs',
        })
        actions.push({
          type: 'add',
          path: `./src/components/{{name}}/{{name}}.styles.{{language}}x`,
          templateFile: './plop/{{framework}}/component-styles-template.hbs',
        })
      } else {
        actions.push({
          type: 'add',
          path: `./src/components/{{name}}/{{name}}.{{language}}x`,
          templateFile:
            './plop/{{framework}}/component-name-template-{{language}}-css.hbs',
        })
        actions.push({
          type: 'add',
          path: `./src/components/{{name}}/{{name}}-styles.css`,
          templateFile:
            './plop/{{framework}}/component-styles-template-css.hbs',
        })
      }

      if (data.language == 'ts') {
        actions.push({
          type: 'add',
          path: `./src/components/{{name}}/{{name}}.types.{{language}}x`,
          templateFile: './plop/{{framework}}/component-types-template.hbs',
        })
      }

      return actions
    },
  })
}
