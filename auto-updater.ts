import {app} from 'electron'
import {autoUpdater} from 'electron'
import * as ChildProcess from 'child_process'
import {Menu} from 'electron'
import * as path from 'path'

var state = 'checking'

exports.initialize = function () : void {
  if (process.mas) return

  autoUpdater.on('checking-for-update', function () {
    state = 'checking'
    exports.updateMenu()
  })

  autoUpdater.on('update-available', function () {
    state = 'checking'
    exports.updateMenu()
  })

  autoUpdater.on('update-downloaded', function () {
    state = 'installed'
    exports.updateMenu()
  })

  autoUpdater.on('update-not-available', function () {
    state = 'no-update'
    exports.updateMenu()
  })

  autoUpdater.on('error', function () {
    state = 'no-update'
    exports.updateMenu()
  })

  autoUpdater.setFeedURL(`https://electron-api-demos.githubapp.com/updates?version=${app.getVersion()}`)
  autoUpdater.checkForUpdates()
}

exports.updateMenu = function () {
  if (process.mas) return

  var menu : Electron.Menu = Menu.getApplicationMenu()
  if (!menu) return

  menu.items.forEach(function (item) {
    if (item.submenu) {
      const submenu: Electron.Menu = <Electron.Menu>item.submenu;
      submenu.items.forEach(function (item: Electron.MenuItem) {
        switch ((<any>item).key) {
          case 'checkForUpdate':
            item.visible = state === 'no-update'
            break
          case 'checkingForUpdate':
            item.visible = state === 'checking'
            break
          case 'restartToUpdate':
            item.visible = state === 'installed'
            break
        }
      })
    }
  })
}

exports.createShortcut = function (callback) {
  spawnUpdate([
    '--createShortcut',
    path.basename(process.execPath),
    '--shortcut-locations',
    'StartMenu'
  ], callback)
}

exports.removeShortcut = function (callback) {
  spawnUpdate([
    '--removeShortcut',
    path.basename(process.execPath)
  ], callback)
}

function spawnUpdate (args, callback): void {
  var updateExe: string = path.resolve(path.dirname(process.execPath), '..', 'Update.exe')
  var stdout: string = ''
  var spawned : ChildProcess.ChildProcess|null = null

  try {
    spawned = ChildProcess.spawn(updateExe, args)
  } catch (error) {
    if (error && error.stdout == null) error.stdout = stdout
    process.nextTick(function () { callback(error) })
    return
  }

  var error = null

  spawned.stdout.on('data', function (data: string) { stdout += data })

  spawned.on('error', function (processError) {
    if (!error) error = processError
  })

  spawned.on('close', function (code, signal) {
    if (!error && code !== 0) {
      error = new Error('Command failed: ' + code + ' ' + signal)
    }
    if (error && error.code == null) error.code = code
    if (error && error.stdout == null) error.stdout = stdout
    callback(error)
  })
}
