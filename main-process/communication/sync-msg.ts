import {ipcMain} from 'electron'

ipcMain.on('synchronous-message', function (event: Electron.IpcMainEvent, arg): void {
  event.returnValue = 'pong'
})
