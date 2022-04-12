const http = require('http');
const { getChart } = require('billboard-top-100');

const hostname = '127.0.0.1';
const port = 3000;
let sortedArtistNamesBySongNameLength = null;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(sortedArtistNamesBySongNameLength);
});

server.listen(port, hostname, () => {
  console.log(`Server running on http://${hostname}:${port}/`);
});

getChart('hot-10', '2022-04-06', (err, chart) => {
  if (err) console.log(err);
  topHundredList = chart;
  sortArtistsByTitleLength(chart) 
});


function sortArtistsByTitleLength(chart) {
  let songs = chart['songs']
  let unsortedList = [];
  let sortedArtistNames = [];

  for(var attributename in songs){
    delete songs[attributename]['cover'];
    delete songs[attributename]['position'];
    delete songs[attributename]['rank'];

    unsortedList.push(songs[attributename]);

  }

  let sortedArtistList = unsortedList.sort((a, b) => 
      b.title.length - a.title.length);  

  for(var attributename in sortedArtistList) {
    sortedArtistNames.push('\n' + sortedArtistList[attributename]['artist']);
  }


  sortedArtistNamesBySongNameLength = 'Artists on the Billboard Hot 100 with the longest track names: \n' 
                                         + sortedArtistNames;
}
