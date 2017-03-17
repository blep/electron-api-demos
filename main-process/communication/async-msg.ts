import {ipcMain} from 'electron'

ipcMain.on('asynchronous-message', function (event: Electron.IpcMainEvent, arg): void {
  event.sender.send('asynchronous-reply', 'pong')
})
