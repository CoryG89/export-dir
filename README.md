export-dir
==========
Node.JS module which allows you to require all of the files in an entire
directory with a single call to `require`.

Rationale
---------
The default behavior of the Node.JS `require` function when you give it a
directory path, for example `require('./mymodules')`, is to look for an
`index.js` file in the relative directory `mymodules`.

That is, it will load `./mymodules/index.js` This is useful, but sometimes
you kind of wish that it imported all of the scripts in that directory instead.

Example
-------
Suppose I have a directory structure like so:

    * app.js        // contains code dependent on mymodules
    -mymodules      // directory
      * first.js    // contains -- module.exports = { name: 'first' }
      * second.js   // contains -- module.exports = { name: 'second' }
      - third       // directory
        * index.js  // contains -- module.exports = { name: 'third' }
      - more        // directory
        * fourth.js // contains -- module.exports = { name: 'fourth' }
        * fifth.js  // contains -- module.exports = { name: 'fifth' }

The default behavior of Node.JS when you call `require` on `mymodules` would be
to only load `index.js`. You could fix this by having `index.js` import all of
its sibling files and directories, but everytime you add or remove a file you
would have to go back update this `index.js`.

Sometimes I would like to be able to call `require` on `mymodules` and have it
return an object such as below with properties for each of the modules it
contains. I don't want to have to update an `index.js` everytime I add or
remove something from `mymodules`.

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
You should include export-dir as a dependency in your `package.json` file, you
may do so by runnning:

    npm install export-dir --save

In order to get an object like that in the example above when requiring a
directory we will still need to add an `index.js` file to it. However, it only
contains 2 lines which do not change and we don't have to update it when we
add or remove things from the directory.

    var exportDir = require('export-dir');
    module.exports = exportDir(__dirname);

In the above example you would need to create an `index.js` file like this in
both the `./mymodules` directory and in `./mymodules/more` in order to get
the exported object shown above.

Note that because export-dir creates an object with properties based on the
file and directory names exported you will not be able to use filenames that
are not valid JavaScript property names. For example `my-module` must become
`myModule` or something similar.

Testing
-------
This project uses the mocha module for testing. This dependencies is only for
development and is not needed for use of export-dir. In order to install the
development dependencies and run the tests using npm please run:

    npm install -d
    npm test

API
-----
export-dir currently consists of a single function which expects a first
argument to be a string which points to the path of the directory containing
modules to be exported. The `path` argument can be input using `__dirname`.

#### exportDir(path, options)

The function may also accept an optional second parameter which is an object
with properties enabling or disabling options. The currently are shown here:

   // index.js -- do not export any json files in the current directory.
   module.exports = exportDir(__dirname, { excludeJSON: true, failHard: true });
Options
-----
#### excludeJSON (default false)
Ignores all files that end in *.json
#### failHard (default false)
Halts went requiring any file fails. This is good for detecting syntax errors.
