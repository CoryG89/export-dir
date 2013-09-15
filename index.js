'use strict';

/** Automatically export all routes in this file's containing directory */
var fs = require('fs');
var path = require('path');

module.exports = function (dirname) {

    var paths = fs.readdirSync(dirname).map(function (item) {
        return path.join(dirname, item);
    });

    var exportPaths = paths.filter(function (item) {
        var stat = fs.statSync(item);
        var ext = path.extname(item);
        var base = path.basename(item, ext);

        var fileExport = stat.isFile() && ext === '.js' && base !== 'index';
        var dirExport = stat.isDirectory() && fs.existsSync(item + '/index.js');

        return fileExport || dirExport;
    });

    var exportObject = { };
    exportPaths.forEach(function (exportPath) {
        /** Attempt to import the module at the export path */
        var anExport;
        try {
            anExport = require(exportPath);
        } catch (error) {
            console.log('Error exporting [%s]\n\n\t[%s]', exportPath, error);
        }

        /** Attempt to add the module to the export object */
        var exportName = path.basename(exportPath, '.js');
        if (anExport) {
            exportObject[exportName] = anExport;
        } else {
            console.log('Error exporting [%s]\n', exportPath);
        }

    });

    return exportObject;
};
