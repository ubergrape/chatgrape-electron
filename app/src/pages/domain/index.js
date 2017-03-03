import React, {Component, PropTypes} from 'react'
import DocumentTitle from 'react-document-title'
import {
  FormattedMessage,
  defineMessages,
  injectIntl
} from 'react-intl'
import {parse} from 'url'

import styles from './styles'

const {ipcRenderer, remote} = require('electron')
const {domain} = remote.getGlobal('host')
const {domain: grapeDomain} = remote.getGlobal('grapeHost')

const messages = defineMessages({
  title: {
    id: 'chooseDomainTitle',
    defaultMessage: 'Grape: Choose Domain',
    description: "Window title."
  }
})

@injectIntl
export default class Domain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tab: 'grape',
      value: domain === grapeDomain ? '' : domain
    }
  }

  onSelectonPremises = () => {
    this.input.focus()
    this.setState({tab: 'onPremises'})
  }

  onSelectGrape = () => {
    this.setState({tab: 'grape'})
  }

  onSubmit = (e) => {
    e.preventDefault()
    let value = grapeDomain
    if (this.state.tab !== 'grape') {
      // Valid input can be an URL or a domain with optional custom port.
      // We try to parse the input as URL first.
      let parsed = parse(this.state.value)
      // Invalid urls don't have double slashes after the protocol.
      if (!parsed.slashes) {
        // Because of that we strip out any potential leading `:` and `/` character
        // and re parse as url. This is to fix things like `//foo.com`, `://foo.com` and so on.
        parsed = parse(`http://${this.state.value.replace(/^[\:\/]*/g, '')}`)
      }
      // host contains hostname and optionally the port.
      value = parsed.host
    }
    ipcRenderer.send('domainChange', value)
  }

  onRefInput = (ref) => {
    this.input = ref
  }

  onChangeDomain = () => {
    this.setState({value: this.input.value})
  }

  render() {
    const {tab, value} = this.state
    const {intl: {formatMessage}} = this.props

    return (
      <DocumentTitle title={formatMessage(messages.title)}>
        <div className="container">
          <style dangerouslySetInnerHTML={{__html: styles}} />
          <header>
            <img className="logo" src="../images/grape-logo.png" alt="Grape" />
          </header>
          <form className="form" onSubmit={this.onSubmit}>
            <h1 className="title">
              <FormattedMessage
                id="whereToConnectTitle"
                defaultMessage="Where do you want to connect?" />
            </h1>
            <label
              onClick={this.onSelectGrape}
              className={`tab tab_left ${tab === 'grape' ? 'tab_selected' : ''}`}>
              <FormattedMessage
                id="grapeTab"
                defaultMessage="Grape Cloud"
                description="Grape tab title in domain picker." />
            </label>
            <label
              onClick={this.onSelectonPremises}
              className={`tab tab_right ${tab === 'onPremises' ? 'tab_selected' : ''}`}>
              <FormattedMessage
                id="onPremisesTab"
                defaultMessage="On-Premises"
                description="On-Premises tab title in domain picker." />
            </label>
            <div className={`host ${tab === 'onPremises' ? 'host_expanded' : ''}`}>
              <label className="host__label" htmlFor="host">Server Domain</label>
              <input
                className="input"
                id="host"
                placeholder="example.com"
                value={value}
                ref={this.onRefInput}
                onChange={this.onChangeDomain} />
            </div>
            <div className="submit">
              <button className="submit-btn" type="submit">
                <FormattedMessage
                  id="continue"
                  defaultMessage="Continue" />
              </button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    )
  }
}
