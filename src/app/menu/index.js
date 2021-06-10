// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserWindow } from 'electron'
import { defineMessages } from 'react-intl'

import state from '../../state'
import store from '../../store'

import quit from './actions/quit.js'
import { getOsType } from '../../utils'
import { isMac, isMas } from '../../constants'
import openAboutWindow from './actions/openAboutWindow'
import showMainWindow from './actions/showMainWindow'
import openSupport from './actions/openSupport'
import openWebsite from './actions/openWebsite'
// eslint-disable-next-line import/no-cycle
import checkForUpdates from './actions/checkForUpdates'
import restartForUpdate from './actions/restartForUpdate'
/* eslint-disable import/no-cycle */
import chooseDomain from './actions/chooseDomain'
import logOut from './actions/logOut'
import openSettings from './actions/openSettings'
/* eslint-enable import/no-cycle */

const messages = defineMessages({
  edit: {
    id: 'menuEdit',
    defaultMessage: 'Edit',
  },
  undo: {
    id: 'menuUndo',
    defaultMessage: 'Undo',
  },
  redo: {
    id: 'menuRedo',
    defaultMessage: 'Redo',
  },
  cut: {
    id: 'menuCut',
    defaultMessage: 'Cut',
  },
  copy: {
    id: 'menuCopy',
    defaultMessage: 'Copy',
  },
  paste: {
    id: 'menuPaste',
    defaultMessage: 'Paste',
  },
  selectAll: {
    id: 'menuSelectAll',
    defaultMessage: 'Select All',
  },
  speech: {
    id: 'menuSpeech',
    defaultMessage: 'Speech',
  },
  startSpeaking: {
    id: 'menuStartSpeaking',
    defaultMessage: 'Start Speaking',
  },
  stopSpeaking: {
    id: 'menuStopSpeaking',
    defaultMessage: 'Stop Speaking',
  },
  view: {
    id: 'menuView',
    defaultMessage: 'View',
  },
  reload: {
    id: 'menuReload',
    defaultMessage: 'Reload',
  },
  toggleFullScreen: {
    id: 'menuToggleFullScreen',
    defaultMessage: 'Toggle Full Screen',
  },
  resetZoom: {
    id: 'menuActualSize',
    defaultMessage: 'Actual Size',
  },
  zoomIn: {
    id: 'menuZoomIn',
    defaultMessage: 'Zoom In',
  },
  zoomOut: {
    id: 'menuZoomOut',
    defaultMessage: 'Zoom Out',
  },
  developer: {
    id: 'menuDeveloper',
    defaultMessage: 'Developer',
  },
  toggleDevTools: {
    id: 'menuToggleDevTools',
    defaultMessage: 'Toggle Developer Tools',
  },
  window: {
    id: 'menuWindow',
    defaultMessage: 'Window',
  },
  close: {
    id: 'menuCloseWindow',
    defaultMessage: 'Close Window',
  },
  minimize: {
    id: 'menuMinimize',
    defaultMessage: 'Minimize',
  },
  zoom: {
    id: 'menuZoom',
    defaultMessage: 'Zoom',
  },
  grape: {
    id: 'menuGrape',
    defaultMessage: 'Grape',
  },
  front: {
    id: 'menuBringAllToFront',
    defaultMessage: 'Bring All to Front',
  },
  help: {
    id: 'menuHelp',
    defaultMessage: 'Help',
  },
  about: {
    id: 'menuAbout',
    defaultMessage: 'About Grape',
  },
  checkForUpdates: {
    id: 'menuCheckForUpdates',
    defaultMessage: 'Check for updates...',
  },
  restartForUpdate: {
    id: 'menuRestartForUpdate',
    defaultMessage: 'Restart to update',
  },
  updateInProgress: {
    id: 'menuUpdateInProgress',
    defaultMessage: 'Update in progress...',
  },
  learnMore: {
    id: 'menuLearnMore',
    defaultMessage: 'Learn More',
  },
  openHelpCenter: {
    id: 'menuOpenHelpCenter',
    defaultMessage: 'Open Help Center',
  },
  application: {
    id: 'menuApplication',
    defaultMessage: 'Application',
  },
  settings: {
    id: 'menuSettings',
    defaultMessage: 'Settings',
  },
  chooseDomain: {
    id: 'menuChooseDomain',
    defaultMessage: 'Choose domain',
  },
  logOut: {
    id: 'menuLogOut',
    defaultMessage: 'Log out',
  },
  quit: {
    id: 'menuQuit',
    defaultMessage: 'Quit',
  },
  services: {
    id: 'menuServices',
    defaultMessage: 'Services',
  },
  hide: {
    id: 'menuHide',
    defaultMessage: 'Hide Grape',
  },
  hideOthers: {
    id: 'menuHideOthers',
    defaultMessage: 'Hide Others',
  },
  unhide: {
    id: 'menuShowAll',
    defaultMessage: 'Show All',
  },
  open: {
    id: 'menuOpen',
    defaultMessage: 'Open',
  },
})

export const getMenuTemplate = () => {
  // eslint-disable-next-line global-require
  const { formatMessage } = require('../../i18n')
  const menu = [
    {
      label: formatMessage(messages.view),
      submenu: [
        // Replacing "Force reload" with "Reload" to don't confuse a user with two reload button
        // https://jira.ubergrape.com/browse/GRAPE-17534
        {
          label: formatMessage(messages.reload),
          accelerator: 'CmdOrCtrl+R',
          role: 'forcereload',
        },
        { type: 'separator' },
        {
          label: formatMessage(messages.toggleFullScreen),
          role: 'togglefullscreen',
        },
        { type: 'separator' },
        {
          label: formatMessage(messages.resetZoom),
          role: 'resetzoom',
        },
        {
          label: formatMessage(messages.zoomIn),
          role: 'zoomin',
        },
        {
          label: formatMessage(messages.zoomOut),
          role: 'zoomout',
        },
        { type: 'separator' },
        {
          label: formatMessage(messages.developer),
          submenu: [
            {
              label: formatMessage(messages.toggleDevTools),
              click: () => {
                BrowserWindow.getFocusedWindow().webContents.toggleDevTools()
              },
            },
          ],
        },
      ],
    },
  ]

  if (!isMac) {
    menu.unshift(
      {
        label: formatMessage(messages.application),
        submenu: [
          {
            label: formatMessage(messages.settings),
            click: openSettings,
            visible: state.isChatOpened,
          },
          {
            label: formatMessage(messages.chooseDomain),
            click: chooseDomain,
          },
          {
            label: formatMessage(messages.logOut),
            click: logOut,
            visible: state.isChatOpened,
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.quit),
            accelerator: 'Ctrl+Q',
            click: quit,
          },
        ],
      },
      {
        label: formatMessage(messages.edit),
        submenu: [
          {
            label: formatMessage(messages.undo),
            role: 'undo',
          },
          {
            label: formatMessage(messages.redo),
            role: 'redo',
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.cut),
            role: 'cut',
          },
          {
            label: formatMessage(messages.copy),
            role: 'copy',
          },
          {
            label: formatMessage(messages.paste),
            role: 'paste',
          },
          {
            label: formatMessage(messages.selectAll),
            role: 'selectall',
          },
        ],
      },
    )

    menu.push({
      role: 'help',
      label: formatMessage(messages.help),
      submenu: [
        {
          label: formatMessage(messages.about),
          click: openAboutWindow,
        },
        {
          label: (() => {
            if (state.isUpdateDownloading) {
              return formatMessage(messages.updateInProgress)
            }

            if (state.isUpdateDownloaded) {
              return formatMessage(messages.restartForUpdate)
            }

            return formatMessage(messages.checkForUpdates)
          })(),
          click: (() => {
            if (state.isUpdateDownloading) {
              return null
            }

            if (state.isUpdateDownloaded) {
              return restartForUpdate
            }

            return checkForUpdates
          })(),
          enabled: !state.isUpdateDownloading,
          visible: getOsType !== 'linux' && store.get('autoUpdateEnabled'),
        },
        { type: 'separator' },
        {
          label: formatMessage(messages.learnMore),
          click: openWebsite,
        },
        {
          label: formatMessage(messages.openHelpCenter),
          click: openSupport,
        },
      ],
    })
  }

  if (isMac) {
    menu.unshift(
      {
        label: formatMessage(messages.application),
        submenu: [
          {
            label: formatMessage(messages.about),
            click: openAboutWindow,
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.settings),
            click: openSettings,
            visible: state.isChatOpened,
            enabled: state.isChatOpened,
            accelerator: 'Cmd+,'
          },
          {
            label: (() => {
              if (state.isUpdateDownloading) {
                return formatMessage(messages.updateInProgress)
              }

              if (state.isUpdateDownloaded) {
                return formatMessage(messages.restartForUpdate)
              }

              return formatMessage(messages.checkForUpdates)
            })(),
            click: (() => {
              if (state.isUpdateDownloading) {
                return null
              }

              if (state.isUpdateDownloaded) {
                return restartForUpdate
              }

              return checkForUpdates
            })(),
            enabled: !state.isUpdateDownloading,
            visible: !isMas && store.get('autoUpdateEnabled'),
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.chooseDomain),
            click: chooseDomain,
          },
          {
            label: formatMessage(messages.logOut),
            click: logOut,
            visible: state.isChatOpened,
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.services),
            role: 'services',
          },
          {
            label: formatMessage(messages.hide),
            role: 'hide',
          },
          {
            label: formatMessage(messages.hideOthers),
            role: 'hideothers',
          },
          {
            label: formatMessage(messages.unhide),
            role: 'unhide',
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.quit),
            accelerator: 'Cmd+Q',
            click: quit,
          },
        ],
      },
      {
        label: formatMessage(messages.edit),
        submenu: [
          {
            label: formatMessage(messages.undo),
            role: 'undo',
          },
          {
            label: formatMessage(messages.redo),
            role: 'redo',
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.cut),
            role: 'cut',
          },
          {
            label: formatMessage(messages.copy),
            role: 'copy',
          },
          {
            label: formatMessage(messages.paste),
            role: 'paste',
          },
          {
            label: formatMessage(messages.selectAll),
            role: 'selectall',
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.speech),
            submenu: [
              {
                label: formatMessage(messages.startSpeaking),
                role: 'startspeaking',
              },
              {
                label: formatMessage(messages.stopSpeaking),
                role: 'stopspeaking',
              },
            ],
          },
        ],
      },
    )

    menu.push(
      {
        role: 'window',
        label: formatMessage(messages.window),
        submenu: [
          {
            label: formatMessage(messages.close),
            role: 'close',
          },
          {
            label: formatMessage(messages.minimize),
            role: 'minimize',
          },
          {
            label: formatMessage(messages.zoom),
            visible: isMac,
            role: 'zoom',
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.grape),
            click: showMainWindow,
            accelerator: 'CmdOrCtrl+O',
          },
          { type: 'separator' },
          {
            label: formatMessage(messages.front),
            role: 'front',
          },
        ],
      },
      {
        role: 'help',
        label: formatMessage(messages.help),
        submenu: [
          {
            label: formatMessage(messages.learnMore),
            click: openWebsite,
          },
          {
            label: formatMessage(messages.openHelpCenter),
            click: openSupport,
          },
        ],
      },
    )
  }

  return menu
}

export const getTrayTemplate = () => {
  // eslint-disable-next-line global-require
  const { formatMessage } = require('../../i18n')
  return [
    { label: formatMessage(messages.open), click: showMainWindow },
    { label: formatMessage(messages.quit), click: quit },
  ]
}
