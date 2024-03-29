const path = require('path');
const os = require('os');
const { ipcRenderer } = require('electron');

const form = document.getElementById('image-form');
const slider = document.getElementById('slider');
const img = document.getElementById('img');

// Set default output path in span
document.getElementById('output-path').innerText = path.join(
  os.homedir(),
  'imageshrink'
);

// onSubmit
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const imgPath = img.files[0].path;
  const quality = slider.value;

  ipcRenderer.send('image:minimize', {
    imgPath,
    quality,
  });
});

// onDone
ipcRenderer.on('image:done', () => {
  M.toast({ html: `Image resized to ${slider.value}% quaity` });
});
