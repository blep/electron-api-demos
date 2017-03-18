import {ipcMain, dialog} from 'electron'

ipcMain.on('save-dialog', function (event: Electron.IpcMainEvent): void {
  const options: Electron.SaveDialogOptions = {
    title: 'Save an Image',
    filters: [
      { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
    ]
  }
  dialog.showSaveDialog(options, function (filename: string): void {
    event.sender.send('saved-file', filename)
  })
})
