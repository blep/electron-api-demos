import {ipcMain, dialog} from 'electron'

ipcMain.on('open-information-dialog', function (event: Electron.IpcMainEvent): void {
  const options: Electron.ShowMessageBoxOptions = {
    type: 'info',
    title: 'Information',
    message: "This is an information dialog. Isn't it nice?",
    buttons: ['Yes', 'No']
  }
  dialog.showMessageBox(options, function (index: number): void {
    event.sender.send('information-dialog-selection', index)
  })
})
