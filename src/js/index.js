import cats from './cat' ;
import {animal,myname} from './animal' ;

$(function(){
  init() ;
});

function init(){
  initClick() ;
}

function initClick(){
  // console.log(cats) ;
  var height = $(window).height()- $('.banner').height() - $('.footer').height();
  $('.container').height(height);
  // $(".container").click(function(){
  //   $(this).animate({height:"300px"},2000) ;
  // });
  // $('<h1>Cats</h1>').appendTo('body');
  // const ul = $('<ul></ul>').appendTo('body');
  // console.log(myname) ;
  // for (const cat of cats) {
  //   $('<li></li>').text(cat).appendTo(ul);
  //   var cat = new animal(cat) ;
  //   cat.sayhi() ;
  // }
}