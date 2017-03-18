import * as path from 'path'
import {ipcMain, app, Menu, Tray} from 'electron'


let appIcon: Electron.Tray|null = null

ipcMain.on('put-in-tray', function (event) {
  const iconName: string = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
  const iconPath: string = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)
  const contextMenu: Electron.Menu = Menu.buildFromTemplate([{
    label: 'Remove',
    click: function (): void {
      event.sender.send('tray-removed')
    }
  }])
  appIcon.setToolTip('Electron Demo in the tray.')
  appIcon.setContextMenu(contextMenu)
})

ipcMain.on('remove-tray', function (): void {
  appIcon.destroy()
})

app.on('window-all-closed', function (): void {
  if (appIcon) appIcon.destroy()
})
