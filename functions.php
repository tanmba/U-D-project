<?php
add_action('wp_enqueue_script', 'callScript',1);	
function callScript(){
	/** Ajout des CSS **/
	wp_register_style('main',get_stylesheet_directory_uri().'/css/main.css',array(),$version,'all');
	wp_enqueue_style('main');
	/** Ajout des Js **/
	wp_enqueue_script('App',get_stylesheet_directory_uri().'/js/App.js',array(),$version,true);
	wp_enqueue_script('main','in_footer');
}