const { app, BrowserWindow } = require('electron')
const log = require('electron-log')
const path = require('path')
let childProcess
function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    log.info(app.getAppPath())
    const { execFile } = require('child_process')
    try {
        log.info("start")
        log.info(process.resourcesPath)
        log.info(path.join(__dirname,'/static/socketio') )
        // childProcess = execFile('/Users/mahao/projects/my-electron-app/static/socketio');
        childProcess = execFile( path.join(__dirname,'/static/socketio') );
        // let childProcess = execFile(process.resourcesPath+'/app/static/socketio');
        // console.log(childProcess)
        // log.info(childProcess)
    } catch (e) {
        log.error("error", e);
    }
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    childProcess.kill()
    app.quit()
    // if (process.platform !== 'darwin') {
    //     childProcess.off()
    //     app.quit()
    // }
})


