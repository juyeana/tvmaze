xdescribe('TVMaze API Test', function () {
  beforeAll(function () {
    data = [
      {
        id: 1767,
        name: 'The Bletchley Circle',
        summary:
          '<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>',
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/147/369403.jpg',
        },
      },
      {
        id: 37008,
        name: 'The Bletchley Circle: San Francisco',
        summary:
          "<p>Set during the thrilling social change of the mid-1950s, <b>The Bletchley Circle: San Francisco</b> captures the lives of four remarkable women gifted with extraordinary intelligence, breathtaking capacity for pattern recognition, and a genius for decryption.</p><p>Years after secretly serving during WWII as code-breakers tasked with penetrating the Axis Powers' secret communications, they turn their skills to solving murders overlooked by police. In the process they are plunged into fascinating corners of the city, forge powerful relationships, and rediscover their own powers and potential. Our women achieve justice not only for the victims, but also for themselves as they carve out new lives in the wider world.</p>",
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/160/401704.jpg',
        },
      },
    ];
  });

  it('GET /info should return 200 response on searchShows(query)', async function () {
    const url = 'https://api.tvmaze.com/search/shows?q=bletchley';
    const response = await axios.get(url);
    expect(response.status).toBe(200);
  });

  it('Should return data from the TvMaze API on searchShows(query)', async function () {
    const query = 'bletchley';
    const response = await searchShows(query);

    const dataObj = response.map((element) => ({
      id: element.id,
      name: element.name,
      summary: element.summary,
      image: element.image,
    }));

    console.log(dataObj);
    expect(dataObj).toEqual(data);
  });

  describe('Should #search-form work on call back function handleSearch(evt)', function () {
    const query = 'bletchley';
    it('Should have input value', function () {
      $('#search-form').on('click', function handleSearch(evt) {
        return false;
      });
      expect($('#search-query').val()).not.toBeNull();
      expect($('#search-query').val()).toEqual(query);
    });
    it('Should hide #episode-area', function () {
      // expect($('#episodes-area').css('display')).toEqual('none');
    });

    it('Should return search result', async function () {
      let shows = await searchShows(query);
      expect(shows).not.toBeNull();
      expect(shows).toBeInstanceOf(Object);
    });
  });

  describe('Should get episodes from TVMaze API by id on getEpisodes(id)', function () {
    const id = 1767;
    it('Should get statuscode 200', async function () {
      const response = await axios.get(
        `https://api.tvmaze.com/shows/${id}/episodes`
      );
      expect(response.status).toBe(200);
    });
    it('Should return array of objects', async function () {
      const result = await getEpisodes(id);
      expect(result).not.toBeNull();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('Should populate Episodes at the bottom of the page on populateEpisodes(episodes)', function () {
    it('Should not return null', async function (id = 1767) {
      const episodes = await getEpisodes(id);

      expect(episodes).not.toBeNull();
    });
  });

  describe('Button click event test', function(){
    this.spyEvent;
    // beforeEach(async function(){
    //   await handleShowEpisodes(this);
    // })
    it('Should invoke the button #shows-list click event', function(){
      // this.spyEvent = spyOnEvent($('#shows-list'), 'click')
      // $('#show-list').trigger('click');
      // expect('click').toHaveBeenTriggeredOn($('#show-list'));
    })
  })
});


