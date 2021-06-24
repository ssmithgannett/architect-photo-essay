//define globals
var images = new Array();
var captions = new Array();
var captionToggle = false;
var imageToggle = true;
var nextClick = true;
var prevClick = false;
firstClick = true;
//add class to page to pull in styles
jQuery('#page').addClass('photo-essay');



//store all full-width images src in images array
jQuery('.card__image').each(function(){
  images.push(jQuery(this).attr('src'));

});
//store all captions in the captions Array
jQuery('.fullwidth_caption').each(function(){
  var captionHtml = jQuery(this).html();
  var openB = captionHtml.replace(/\~/g, '<strong class="bold-caption">');
  var closeB = openB.replace(/\^/g, '</strong>')
  jQuery(this).html(closeB);
  captions.push(closeB);
});


//Only set up JS slider when on tablet/desktop
if (jQuery( window ).width() > 600) {

  //create start button
  jQuery('.hero_content').append('<div class="start-button"><p>Start</p></div>');

  //hide final slide
  jQuery('.end').css('display', 'none');

  //hide first slide
  jQuery('.begin').css('display', 'none');

  //add first-image class to first full-width image
  jQuery('.fullwidth_image').first().addClass('first-image');

  //Pull final slide text from last paragraph on Arch page
  var endText = jQuery('.intro-outro').last().html();
  //pull first slide text from first paragraph on Arch page
  var beginText = jQuery('.intro-outro').first().html();

  //Create final slide and add restart button
  jQuery('.end').append('<p>'+endText+'</p><div class="restart-button">Restart</div>');
  //Create first slide and continue Button
  jQuery('.begin').append('<p>'+beginText+'</p><div class="continue-button">Continue</div>');

  //set event for start button
  jQuery('.start-button').on('click', function() {
    jQuery('.hero').css('display', 'none');
    jQuery('.begin').css('display', 'flex');
  });
  //set event for restart button
  jQuery('.restart-button').on('click', function() {
    jQuery('.end').css('display', 'none');
    jQuery('.begin').css('display', 'flex');
  });
//set even for continue Button
jQuery('.continue-button').on('click', function() {
    jQuery('.begin').css('display', 'none');
})
  //Hide all but first full-width image.
  jQuery('.fullwidth_image').each(function() {

    if (jQuery(this).hasClass('first-image')) {
      jQuery(this).css('display','block');
    }
    else {
      jQuery(this).css('display','none');
    }
  });

  //hide images to make room for div-backgrounds below
  jQuery('.card__image').css('display','none');
  //build pagination
  var totalPages = images.length;
  var pageIconWidth = 100/totalPages;
  for (var i = 0; i < images.length; i++) {
    var pageNumber = i;
    jQuery('.pagination').append('<div class="page-icon '+pageNumber+'" style="width:'+pageIconWidth+'%"></div>');
  }
  //set first image to background
  jQuery('.first-image div').css('background-image','url("'+images[0]+'")');
  //color in first icon
  jQuery('.page-icon.0').css('opacity','1');

  //define j to keep track of image iteration, set caption text to first caption, hide caption on load
  var j = 0;

  //set first caption text
  jQuery('.photo-essay-caption').html(captions[0]);
  //hide first caption
  jQuery('.photo-essay-wrap').css('display', 'none');

  // next image
  jQuery('.next-nav').on('click', function(){
    if (firstClick == true) {
      firstClick = false;
      jQuery('.photo-essay-wrap').css('display', 'flex');
    }
    if (captionToggle == true) {// close caption and move to next image
      if (j < images.length && j != images.length-1) {//iterate up
        jQuery('.first-image div').css('background-image','url("'+images[j+1]+'")');
        jQuery('.photo-essay-caption').html(captions[j+1]);
        jQuery('.page-icon.'+(j+1)).css('opacity','1');
        j++;
        captionToggle = false;
        jQuery('.photo-essay-wrap').css('display', 'none');
      }
      else if (j == images.length-1) {//back to 0
        jQuery('.end').css('display','flex');
        jQuery('.first-image div').css('background-image','url("'+images[0]+'")');
        jQuery('.photo-essay-caption').html(captions[0]);
        jQuery('.page-icon').css('opacity','.2');
        jQuery('.page-icon.0').css('opacity','1');
        j=0;
        captionToggle = false;
        jQuery('.photo-essay-wrap').css('display', 'none');
      }
    }
    else {//stay on image and toggle caption on
      captionToggle = true;
      jQuery('.photo-essay-wrap').css('display', 'flex');
    }
    if (prevClick == true) {
      prevClick = false;
    }
    nextClick = true;


    });
    //previous image
    jQuery('.prev-nav').on('click', function(){
      if (captionToggle == true && nextClick == true) {//caption on, so only toggle off (do not change image)
        captionToggle = false;
        jQuery('.photo-essay-wrap').css('display', 'none');
      }
      else if (captionToggle == false && nextClick == true) {//most recent click was right and the caption is off, so iterate back one image and turn on it's caption
        if (j > 0) {//iterate down
          jQuery('.first-image div').css('background-image','url("'+images[j-1]+'")');
          jQuery('.photo-essay-caption').html(captions[j-1]);
          jQuery('.page-icon.'+j).css('opacity', '.2');
          j=j-1;
          captionToggle = true;
          jQuery('.photo-essay-wrap').css('display', 'flex');
        }
        else if (j == 0) {//to end
          jQuery('.first-image div').css('background-image','url("'+images[images.length-1]+'")');
          jQuery('.photo-essay-caption').html(captions[captions.length-1]);
          jQuery('.page-icon').css('opacity','1');
          j=images.length-1;
          captionToggle = true;
          jQuery('.photo-essay-wrap').css('display', 'flex');
        }
      }
      else if (prevClick == true && captionToggle == false) {//most recent click was left and the caption is off, so iterate back one image and turn on it's caption
        if (j > 0) {//iterate down
          jQuery('.first-image div').css('background-image','url("'+images[j-1]+'")');
          jQuery('.photo-essay-caption').html(captions[j-1]);
          jQuery('.page-icon.'+j).css('opacity', '.2');
          j=j-1;
          captionToggle = true;
          jQuery('.photo-essay-wrap').css('display', 'flex');
        }
        else if (j == 0) {//to end
          jQuery('.first-image div').css('background-image','url("'+images[images.length-1]+'")');
          jQuery('.photo-essay-caption').html(captions[captions.length-1]);
          jQuery('.page-icon').css('opacity','1');
          j=images.length-1;
          captionToggle = true;
          jQuery('.photo-essay-wrap').css('display', 'flex');
        }
      }
      else if (prevClick == true && captionToggle == true){// recent click was left and the caption is on, so just toggle caption off
        captionToggle = false;
        jQuery('.photo-essay-wrap').css('display', 'none');
    }
    if (nextClick == true) {
      nextClick = false;
    }
    prevClick = true;
    });
}
