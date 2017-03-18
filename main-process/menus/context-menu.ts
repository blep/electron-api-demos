import {BrowserWindow, Menu, MenuItem, ipcMain, app} from 'electron'

const menu = new Menu()
menu.append(new MenuItem({ label: 'Hello' }))
menu.append(new MenuItem({ type: 'separator' }))
menu.append(new MenuItem({ label: 'Electron', type: 'checkbox', checked: true }))

app.on('browser-window-created', function (event: Electron.Event, win: Electron.BrowserWindow): void {
  win.webContents.on('context-menu', function (e, params) {
    menu.popup(win, params.x, params.y)
  })
})

ipcMain.on('show-context-menu', function (event: Electron.IpcMainEvent): void {
  const win: Electron.BrowserWindow = BrowserWindow.fromWebContents(event.sender)
  menu.popup(win)
})
