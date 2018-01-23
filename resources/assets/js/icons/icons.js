var paths = require('./icons.json');

var icons = document.querySelectorAll('[data-icon]');

for (var i = 0; i < icons.length; i++) {

    if (icons[i].dataset.icon in paths) {
        const iconTemplate = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g class="icon icon-${icons[i].dataset.icon}" stroke-linecap="round" fill="currentcolor" stroke-linejoin="round"><path d="${paths[icons[i].dataset.icon]}"></path></g></svg>`;

        icons[i].innerHTML = iconTemplate;        
    }
} 
