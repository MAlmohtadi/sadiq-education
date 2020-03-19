const data = require('./src/data/playlistItems.json')
var fs = require("fs");

// console.log(data);
function generateFile() {
    const transformedData = {};
    for (let [key, value] of Object.entries(data)) {
        // console.log(`${key}: ${value}`);
        transformedData[key] = { items: [] };
        for (let item of value.items) {
            console.log(item.snippet.title)
            let thumbnail = item.snippet.thumbnails.standard && item.snippet.thumbnails.standard.url;
            if (!thumbnail)
                thumbnail = item.snippet.thumbnails.default.url
            transformedData[key].items.push({
                description: item.snippet.title,
                embedUrl: `https://www.youtube.com/embed/${item.snippet.resourceId.videoId}?autoplay=1&showinfo=0`,
                videoId: item.snippet.resourceId.videoId,
                thumbnail,
                original: thumbnail,
            });
        }
    }
    fs.appendFile('./src/data/playlistItemsTransformed.json', JSON.stringify(transformedData), function (err) {
        if (err) throw err;
        console.log('Updated!');
    });
}

generateFile()
// fs.readFile("./src/data/playlist.json", function (err, data) {
//     // console.log(dataTest());
//     const transformedData = {};
//     // const keys = Object.e(data)
//     for (let [key, value] of Object.entries(data)) {
//         console.log(key)
//     }
// });