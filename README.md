export-dir
==========
Node.JS module which allows you to require all of the files in an entire
directory with a single call to `require`.

Rationale
---------
The default behavior of the Node.JS `require` function when you give it a
directory path, for example `require('./mymodules')`, is to look for an
`index.js` file in the relative directory `mymodules`. 

Example
-------

That is, it will load `./mymodules/index.js` This is useful, but sometimes
you kind of wish that it imported all of the scripts in that directory instead.

Suppose I have a directory structure like so:

    -mymodules      // directory
      * first.js    // contains -- module.exports = { name: 'first' }
      * second.js   // contains -- module.exports = { name: 'second' }
      - third       // directory
        * index.js  // contains -- module.exports = { name: 'third' }
      - more        // directory
        * fourth.js // contains -- module.exports = { name: }
        * fifth.js

I would like to get the following object back when I call
`require('./mymodules')`:

     {
        first: {
            name: 'first'
        },
        second: {
            name: 'second'
        },
        third: {
            name: 'third'
        },
        more: {
            fourth: {
                name: 'fourth'
            },
            fifth: {
                name: 'fifth'
            }
        }
     }

Usage 
-----

In order to export an entire directory structure like this you need to place
an `index.js` file into the directory containing the following:

    var exportDir = require('export-dir');
    module.exports = exportDir(__dirname);

In the above example you would need to create an `index.js` file like this in
both the `./mymodules` directory and in `./mymodules/more` in order to get
the exported object shown above.
