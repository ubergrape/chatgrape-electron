
import {
  app,
  BrowserWindow
} from 'electron'

import env from './env'
import state from './state'
import close from './close'
import initTray from './initTray'
import handleOffline from './handleOffline'
import setOpenLinksInDefaultBrowser from './setOpenLinksInDefaultBrowser'
import {urls} from './constants'

export default function loadApp(url = state.getUrl()) {
  state.mainWindow.loadURL(urls.loading)
  state.mainWindow.once('close', () => state.mainWindow = null)

  const {webContents} = state.mainWindow
  webContents.once('will-navigate', handleOffline.bind(null, undefined))

  const newMain = new BrowserWindow(Object.assign({}, state.prefs, {show: false}))

  newMain.loadURL(url)
  newMain.webContents.once('did-finish-load', () => {
    let hidden = true

    if (state.mainWindow) {
      state.dontPreventClose = true
      state.mainWindow.close()
      state.dontPreventClose = false
      hidden = false
    }

    if (hidden) {
      app.once('activate', () => newMain.show())
    } else {
      newMain.show()
    }

    state.mainWindow = newMain
    state.mainWindow.on('close', close)
    state.mainWindow.on('hide', () => {
      state.mainWindow.blurWebView()
    })

    if (env.name !== 'production') state.mainWindow.openDevTools()

    initTray()
    setOpenLinksInDefaultBrowser()
  })
}
