export default function(url){
    url = url.replace((new RegExp("\s"),"\\s")).replace('/','-');
    return url;
}