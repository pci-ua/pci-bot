const ProjectPath = require('child_process').execSync('pwd').toString().replace('\n','');

global.require_root = function( RelativePath ) {
	if( RelativePath[0] != '/' ) RelativePath = '/' + RelativePath;
	return require( ProjectPath + RelativePath );
}