const electron = require('electron');

electron.app.on('ready', () => {
	const window = new electron.BrowserWindow({
		width: 800,
		height: 600,
	});
	window.setMenu(null);
	window.loadFile('index.html');
});
