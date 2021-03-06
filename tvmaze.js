/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  const response = await axios.get('https://api.tvmaze.com/search/shows', {
    params: { q: query },
  });

  return response.data.map((element) => {
    const { id, name, summary, image } = element.show;
    return {
      id,
      name,
      summary,
      image,
    };
  });
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $('#shows-list');
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <img class="card-img-top" src= ${
               show.image
                 ? show.image.medium
                 : 'https://store-images.s-microsoft.com/image/apps.65316.13510798887490672.6e1ebb25-96c8-4504-b714-1f7cbca3c5ad.f9514a23-1eb8-4916-a18e-99b1a9817d15?mode=scale&q=90&h=300&w=300'
             }> 
             </div>
         </div>
         <div class="text-center">
         <button type="button" class="btn btn-primary btn-episode" data-bs-toggle="modal" data-bs-target="#exampleModal">Episodes</button></div>
       </div>
      `
    );

    $showsList.append($item);
  }
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$('#search-form').on('submit', async function handleSearch(evt) {
  evt.preventDefault();

  let query = $('#search-query').val();
  if (!query) return;

  $('#episodes-area').hide();

  let shows = await searchShows(query);

  populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  const response = await axios.get(
    `https://api.tvmaze.com/shows/${id}/episodes`
  );

  // TODO: return array-of-episode-info, as described in docstring above
  return response.data.map(function (element) {
    const { id, name, season, number } = element;

    return { id, name, season, number };
  });
}

/**
 * @desc populate the provided an array of episodes info
 * @param {Array} episodes
 */
function populateEpisodes(episodes) {
  if (!episodes) return;

  // clean the existing episodes' list
  // $('#episodes-list').empty();

  // clean up the current expisodes
  $('.modal-body').empty();
  // iterate over the episodes array
  // append each item to list
  episodes.forEach(function (episode) {
    const { name, season, number } = episode;
    let episodeList = `<p>${name} (season ${season}, number ${number})</p>`;
    $('.modal-body').append(episodeList);

    // $('#episodes-list').append(episodeList);
  });

  // make the episodes-area visible
  // $('#episodes-area').show();
}

/**
 * added click event with callback function to each episodes button
 */

$('#shows-list').on('click', handleShowEpisodes);

async function handleShowEpisodes(e) {
  // retrieve show id .closest() look into 'Show' class and get the show id from data-show-id attribute
  let showId = $(e.target).closest('.Show').data('show-id');

  // call getEpisodes(id) function and pass id
  const episodes = await getEpisodes(showId);

  // call populate Episodes function and pass episodes array; this array has a list of objects containing episodes' info
  populateEpisodes(episodes);
}
