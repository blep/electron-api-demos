import {app, dialog, globalShortcut} from 'electron'

app.on('ready', function (): void {
  globalShortcut.register('CommandOrControl+Alt+K', function (): void {
    dialog.showMessageBox({
      type: 'info',
      message: 'Success!',
      detail: 'You pressed the registered global shortcut keybinding.',
      buttons: ['OK']
    })
  })
})

app.on('will-quit', function (): void {
  globalShortcut.unregisterAll()
})
