import {app, dialog} from 'electron'

app.setAsDefaultProtocolClient('electron-api-demos')

app.on('open-url', function (event: Electron.Event, url: string): void {
  dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
})
