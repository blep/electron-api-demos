import {ipcMain, dialog} from 'electron'

ipcMain.on('open-file-dialog', function (event: Electron.IpcMainEvent): void {
  dialog.showOpenDialog({
    properties: ['openFile', 'openDirectory']
  }, function (files: string[]): void {
    if (files) event.sender.send('selected-directory', files)
  })
})
