import React from 'react'
import { render } from 'react-dom'
import { JssProvider } from 'react-jss'
import isolate from 'jss-plugin-isolate'
import global from 'jss-plugin-global'
import extend from 'jss-plugin-extend'
import nested from 'jss-plugin-nested'
import expand from 'jss-plugin-expand'
import camel from 'jss-plugin-camel-case'
import unit from 'jss-plugin-default-unit'
import { create } from 'jss'

import About from './about'
import Domain from './domain'

const pageComponentMap = {
  about: About,
  domain: Domain,
}

const styles = {
  '@global': {
    body: {
      margin: 0,
    },
  },
}

const jss = create()
jss.use(
  isolate({
    reset: [
      'all',
      {
        fontFamily:
          '"proxima-nova", "Helvetica Neue", Arial, Helvetica, sans-serif',
      },
    ],
  }),
  global(),
  extend(),
  nested(),
  camel(),
  unit(),
  expand(),
)

jss.createStyleSheet(styles)

const page = new URL(window.location.href).searchParams.get('page')
const Page = pageComponentMap[page]

render(
  <JssProvider jss={jss}>
    <Page />
  </JssProvider>,
  document.getElementById('grape'),
)
