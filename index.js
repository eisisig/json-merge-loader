/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Eisi Sig @eisisig
 */

var fs          = require('fs'),
    glob        = require('glob'),
    merge       = require('lodash/object/merge'),
    loaderUtils = require('loader-utils');

module.exports = function ( source, file ) {

	this.cacheable && this.cacheable();

	var newConfig      = {},
	    sourceFilename = loaderUtils.getRemainingRequest(this),
	    query          = loaderUtils.parseQuery(this.query),
	    sourceArr      = sourceFilename.split('/'),
	    parentFolder   = sourceArr.splice(sourceArr.length - 2, 1),
	    originalFile   = glob.sync(query.glob + parentFolder + '/config.json');
	;

	if ( originalFile[0] ) {
		var originalConfig = fs.readFileSync(originalFile[0], "utf8");
		if ( originalConfig ) {
			newConfig = merge(JSON.parse(originalConfig), JSON.parse(source));
		}
	}

	return JSON.stringify(newConfig);
}
