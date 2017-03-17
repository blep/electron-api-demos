import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as electron from 'electron'
import {BrowserWindow, ipcMain, shell} from 'electron'

ipcMain.on('print-to-pdf', function (event: Electron.IpcMainEvent): void {
  const pdfPath: string = path.join(os.tmpdir(), 'print.pdf')
  const win: Electron.BrowserWindow = BrowserWindow.fromWebContents(event.sender)
  // Use default printing options
  win.webContents.printToPDF({}, function (error: Error, data: Buffer): void {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error: NodeJS.ErrnoException): void {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})
