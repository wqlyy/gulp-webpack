import cats from './cat' ;
import {animal} from './animal' ;

$(function(){
  init() ;
});

function init(){
  initClick() ;
}

function initClick(){
  console.log(cats) ;
  var height = $(window).height()- $('.banner').height() - $('.footer').height();
  $('.container').height(height);
}