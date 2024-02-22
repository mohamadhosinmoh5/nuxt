

export default function(str = null){
	console.log(str);
	str = str.toString()
	var objRegex = new RegExp( '(-?[۰-۹]+)([۰-۹]{3})' );
 
	while( objRegex.test( str ) ) {
		str = str.replace( objRegex, '$1,$2' );
	}
 
	return str;
}