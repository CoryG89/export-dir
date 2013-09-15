export-dir
==========
Node.JS module which allows you to require all of the files in an entire
directory with a single call to `require`.

Usage
------
Simply create an index.js file in the directory you want to export with the
following:

    var exportDir = require('export-dir');
    module.exports = exportDir(__dirname);

When you require the directory containing this `index.js` file it will return 
an object which has properties for each export in the directory.

Rationale
---------
The default behavior of the Node.JS `require` function when you give it a
directory path like `require('./server/routes') is to look for an `index.js`
file in the relative directory `server/routes`. That is, it will load 
`./server/routes/index.js` This is useful, but sometimes you kind of wish
that it imported all of the scripts in that directory instead.

Suppose I have a lot of scripts which define my Express routes in 
`server/routes`. I would prefer that when I do something like

    var routes = require('./server/routes');

It will return a `routes` object with a property for each of my routes like
`routes.home`, `routes.signin`, etc.
