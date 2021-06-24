<?php

/**
 * Plugin Name: Arch Photo Essay
 * Plugin URI:
 * Description: Photo Essay extension for Architect
 * Version: 0.4
 * Author: Sean Smith
 * Author URI: http://despace.design
 */


function arch_photo_essay() {
  echo '

  <div class="pagination"></div>

  <div class="photo-nav">
    <div class="prev-nav"><div></div></div>
    <div class="next-nav"><div></div></div>
  </div>

  <div class="photo-essay-wrap"><p class="photo-essay-caption">Caption</p></div>



  <header id="photo-essay-masthead" class="site-header photo-essay-header" role="banner">

		<div class="arch-nav">

						<div class="gh-logo-wrap"><a target="_blank" class="arch-nav-branding gh-logo" href="http://'. $GLOBALS['ghSite'] .'">'.$GLOBALS['ghLogo'].'</a></div>

            <div class="site-name-wrap"><a class="site-name" href="'. home_url() .'/home/site/'. $GLOBALS['ghSite'] .'">'. get_bloginfo('name') .'</a></div>



		</div> <!-- arch-nav -->
	</header><!-- #masthead -->
  <div class="begin"></div>
  <div class="end"></div>
';
}

add_action('wp_footer', 'arch_photo_essay');


 function arch_photo_essay_styles() {
         /** Enqueue Style Sheets */
         wp_enqueue_style( 'arch-photo-essay-style', plugin_dir_url( __FILE__ ) . '/css/arch-photo-essay.css', array(), '0.1', 'screen' );
 }
 add_action( 'wp_enqueue_scripts', 'arch_photo_essay_styles' );


 function arch_photo_essay_enqueue_script() {
    wp_enqueue_script( 'arch_photo_essay_enqueue_script', plugin_dir_url( __FILE__ ) . 'js/arch-photo-essay.js', false, false, true );
 }
 add_action('wp_enqueue_scripts', 'arch_photo_essay_enqueue_script');


 add_action("wp_footer", "arch_photo_essay_enqueue_script");
