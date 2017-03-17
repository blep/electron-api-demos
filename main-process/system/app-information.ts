import {app, ipcMain} from 'electron'

ipcMain.on('get-app-path', function (event: Electron.IpcMainEvent): void {
  event.sender.send('got-app-path', app.getAppPath())
})
