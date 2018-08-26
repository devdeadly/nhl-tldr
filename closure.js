function princess() {
  var adventures = ['Magical Forrest', 'Rainbow Valley'];

  var unicorn = { /* ... */ },
      dragons = [ /* ... */ ],
      squirrel = "Hello!";

  /* ... */
  return {
          story: function() {
              return adventures[adventures.length - 1];
          }
      };
  }

  var littleGirl = princess();
  
  console.log(littleGirl.story());
