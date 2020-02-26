// 通过 require electron 来控制程序
const { app, BrowserWindow, Menu } = require('electron')

// app加载完毕
app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 660,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // 加载 html 页面
  mainWindow.loadFile('./dist/demo/index.html')

  // 打开控制台
  // mainWindow.webContents.openDevTools()

  // 隐藏顶部菜单
  Menu.setApplicationMenu(null)
})

// macOS 的一些设置
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
