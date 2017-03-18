import {ipcMain, dialog} from 'electron'

ipcMain.on('open-error-dialog', function (event: Electron.IpcMainEvent): void {
  dialog.showErrorBox('An Error Message', 'Demonstrating an error message.')
})
