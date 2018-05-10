//This app doesn't follow a11y best practices, and the JS file is incomplete. 
// Complete the getDataFromApi, displaySearchData, and watchSubmit functions. 
// When you're done, this app should allow a user to search for an artist and song 
// title (both should be required), and display the song lyrics. 
// You should make requests to this API: https://lyricsovh.docs.apiary.io/# . 
// Also make any necessary adjustments to make this app accessible.
'use strict';
function getDataFromApi(artist, title) {
  const settings = {
    url: `https://api.lyrics.ovh/v1/${artist}/${title}`,
    success: function(settings) {
      displaySearchData(settings, artist, title);
    },
    error: function(settings) {
      $('.js-search-results').html(`<h1>No restuls found, please try again!</h1><p>Server Status ${settings.status}</p>`);
    }
  };
  $.ajax(settings);
}


function displaySearchData(data, artist, title) {
  console.log(data, artist, title);
  $('.js-search-results').html(`<h1>Lyrics for ${title.charAt(0).toUpperCase()+title.slice(1)}, by ${artist.charAt(0).toUpperCase()+artist.slice(1)}.</h1><p>${data.lyrics}</p>`);
}

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    let artist = $('.js-query-artist').val();
    let title = $('.js-query-title').val();
    getDataFromApi(artist, title);
  });
}

$(document).ready(watchSubmit);