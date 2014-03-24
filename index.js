'use strict';

/** Automatically export all routes in this file's containing directory */
var fs = require('fs');
var path = require('path');

module.exports = function (dirname, options) {
    var exportObject = { };

    var paths = fs.readdirSync(dirname).map(function (item) {
        return path.join(dirname, item);
    });

    /** Filter out all unwanted paths, for example index.js files */
    var exportPaths = paths.filter(function (item) {
        var stat = fs.statSync(item);
        var ext = path.extname(item);
        var base = path.basename(item, ext);

        var isExtValid = ext === '.js' || ext === '.json';
        var fileExport = stat.isFile() && isExtValid && base !== 'index';
        var dirExport = stat.isDirectory() && fs.existsSync(item + '/index.js');

        if (options && options.excludeJSON && ext === '.json')
            return false;

        return fileExport || dirExport;
    });

    exportPaths.forEach(function (exportPath) {
        /** Attempt to import the module at the export path */
        var anExport;
        try {
            anExport = require(exportPath);
        } catch (error) {
            console.log('Error exporting [%s]\n\n\t[%s]', exportPath, error);
      	    if(options.failHard)
      	        throw error;
        }

        /** Attempt to add the module to the export object */
        var ext = path.extname(exportPath);
        var base = path.basename(exportPath, ext);

        if (anExport) {
            exportObject[base] = anExport;
        } else {
            console.log('Error exporting [%s]\n', exportPath);
        }

    });

    return exportObject;
};
