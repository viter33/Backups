<?php

if(!defined('ABSPATH')){exit;}

/**
 * Theme options cache get
 */
$theme_options = wp_cache_get("theme_options");

/**
 * Custom jquery
 */
function jquery_init() {
	if( !is_admin()){
		wp_deregister_script('jquery');
		wp_deregister_script('jquery-migrate');
	}
}
add_action('init', 'jquery_init');

/**
 * Custom js
 */
function load_personal_resources() {
    $theme_uri = get_template_directory_uri();
    wp_deregister_script( 'jquery' );
    // Speed Optimization Start
    wp_deregister_script( 'ihc-jquery-ui' );
    wp_enqueue_script( 'ihc-jquery-ui', IHC_URL . 'assets/js/jquery-ui.min.js', array('jquery'),  9.9  );
    wp_enqueue_script( 'cookie-script', '//cdn.cookie-script.com/s/e3159e802f7de0aede285efcd352a4f1.js', array('jquery'),  9.9  );
    wp_register_script( 'jquery', get_template_directory_uri().'/assets/js/jquery.min.js');
    wp_enqueue_script( 'jquery' );
    // Speed Optimization Start

    wp_enqueue_script('bootstrap.min',
        get_template_directory_uri() . '/assets/js/bootstrap.js',
        array('jquery')
    );

        wp_enqueue_script('slick',
        get_template_directory_uri() . '/assets/js/plugins/slick.js',
        array('jquery')
    );



    wp_enqueue_script('cookie_js',
        get_template_directory_uri() . '/assets/js/plugins/js.cookie.js',
        array('jquery')
    );

    //No cache
    wp_enqueue_script('critical',
        get_template_directory_uri() . '/assets/js/critical.js?v='.time(), array('jquery'), false
    );

//    wp_enqueue_script('scripts',
//        get_template_directory_uri() . '/assets/js/scripts.js?v='.time(),
//        array('jquery')
//    );
    //No cache
    wp_enqueue_script('scripts',
        get_template_directory_uri() . '/assets/js/scripts.js?v='.time(), array('jquery'), false
    );

//    wp_enqueue_script('old-scripts',
//        get_template_directory_uri() . '/assets/js/old-scripts.js?v='.time(), array('jquery'), false
//    );

    //Add ajax WP front end
    wp_localize_script( 'scripts', 'my_ajax_object', array( 
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'ajax_nonce' => wp_create_nonce( 'nonce' )
		 ) );


    wp_localize_script( 'scripts', 'bloginfo', array(
        'template_url' => get_bloginfo('template_url'),
        'site_url' => get_bloginfo('url'),
        'post_id'   => get_queried_object()
    ));

// 'bloginfo' is now an object and we can define what's available inside of it
// now we can access the template and site urls and the post ID
// we no longer need to worry if any of them were to change

}
add_action('wp_enqueue_scripts', 'load_personal_resources');





/**
 * Clean header inline CSS
 */
function twentyten_remove_recent_comments_style() {
	global $wp_widget_factory;
	remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
}
add_action( 'widgets_init', 'twentyten_remove_recent_comments_style' );

/**
 * Clean inline gallery CSS
 */
add_filter('gallery_style',
	create_function(
		'$css',
		'return preg_replace("#<style type=\'text/css\'>(.*?)</style>#s", "", $css);'
	)
);

/**
 * Hide wp version
 */
remove_action('wp_head', 'wp_generator');

/**
 * Clean other CSS and JS on header
 */
if (!is_admin()) {
	function my_init_method(){
		wp_deregister_script( 'l10n' );
	}
	add_action('init', 'my_init_method');
}
add_action('init', 'remheadlink');
function remheadlink(){
	remove_action('wp_head', 'rsd_link');
	remove_action('wp_head', 'wlwmanifest_link');
}

/**
 * Disable the emoji's
 */
if($theme_options['disable_emoji']){
	function disable_emojis() {
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
		add_filter( 'tiny_mce_plugins', 'disable_emojis_tinymce' );
	}
	add_action( 'init', 'disable_emojis' );

	/**
	 * Filter function used to remove the tinymce emoji plugin.
	 *
	 * @param    array  $plugins
	 * @return   array             Difference betwen the two arrays
	 */
	function disable_emojis_tinymce( $plugins ) {
		if ( is_array( $plugins ) ) {
			return array_diff( $plugins, array( 'wpemoji' ) );
		} else {
			return array();
		}
	}
}

/**
 * Disable Json from head
 */
if($theme_options['disable_wpjsonhead']){
	remove_action( 'wp_head', 'rest_output_link_wp_head', 10 );
	remove_action( 'wp_head', 'wp_oembed_add_discovery_links', 10 );
}

/**
 * Disable embeds from head
 */
if($theme_options['disable_embedshead']){
	function disable_embeds_init() {
		// Remove the REST API endpoint.
		remove_action('rest_api_init', 'wp_oembed_register_route');
		// Turn off oEmbed auto discovery.
		// Don't filter oEmbed results.
		remove_filter('oembed_dataparse', 'wp_filter_oembed_result', 10);
		// Remove oEmbed discovery links.
		remove_action('wp_head', 'wp_oembed_add_discovery_links');
		// Remove oEmbed-specific JavaScript from the front-end and back-end.
		remove_action('wp_head', 'wp_oembed_add_host_js');
	}
	add_action('init', 'disable_embeds_init', 9999);
}

/**
 * Header + footer
 */
function frontend_custom_header()
{
	$theme_options = wp_cache_get("theme_options");
	if ($theme_options['frontend_custom_header'] != false) {
		echo $theme_options['frontend_custom_header'] . "\n";
	}
}
add_filter('wp_head', 'frontend_custom_header');

function frontend_custom_footer()
{
	$theme_options = wp_cache_get("theme_options");
	if ($theme_options['frontend_custom_footer'] != false) {
		echo $theme_options['frontend_custom_footer'] . "\n";
	}
}
add_action('wp_footer', 'frontend_custom_footer',99);

/**
 * Remove dns-prefetch
 */
remove_action( 'wp_head', 'wp_resource_hints', 2 );

/**
 * Hex and percents to rgba
 */
function hexAndOpacity2rgba($hex, $opacity) {
	$hex = str_replace("#", "", $hex);
	if(strlen($hex) == 3) {
		$r = hexdec(substr($hex,0,1).substr($hex,0,1));
		$g = hexdec(substr($hex,1,1).substr($hex,1,1));
		$b = hexdec(substr($hex,2,1).substr($hex,2,1));
	} else {
		$r = hexdec(substr($hex,0,2));
		$g = hexdec(substr($hex,2,2));
		$b = hexdec(substr($hex,4,2));
	}
	$opacity = $opacity / 100;
	if($opacity && $hex){
		return "rgba(".$r.", ".$g.", ".$b.", ".$opacity.")";
	}
}

/**
 * Custom shortcodes
 */
function csc($var){
	$var = str_replace("[br]","<br/>",$var);
	$var = str_replace("[b]","<b>",$var);
	$var = str_replace("[/b]","</b>",$var);
	$var = str_replace("[year]",date("Y"),$var);
	$var = str_replace("[small]","<sup>",$var);
	$var = str_replace("[/small]","</sup>",$var);
	$var = str_replace("[red]","<span class='redText'>",$var);
	$var = str_replace("[/red]","</span>",$var);
	return $var;
}

/**
 * Custom print_r function
 */
function pr($var){
	echo '<pre style="text-align:left;padding:20px; background-color:grey;">';
	echo "<textarea style='display: block; width: 100%;height: 100px;overflow: hidden;' onclick='$(this).select()'>";
	print_r($var);
	echo "</textarea>";
	echo  '</pre>';
}

/**
 * Remove SEO tags from nav menu
 */
function echoFixedNavMenu($wp_nav_menu){
	$wp_nav_menu_arr = array_filter(explode("\n",$wp_nav_menu));
	$wp_nav_menu_new_arr = array();
	foreach($wp_nav_menu_arr as $line){
		if (strpos($line, 'current-menu-item') !== false) {
			array_push($wp_nav_menu_new_arr, $line);
		} else {
			$line = str_replace("<H1>","",$line);
			$line = str_replace("<H2>","",$line);
			$line = str_replace("<H3>","",$line);
			$line = str_replace("<H4>","",$line);
			$line = str_replace("<H5>","",$line);
			$line = str_replace("<H6>","",$line);
			$line = str_replace("<P>","",$line);
			$line = str_replace("</H1>","",$line);
			$line = str_replace("</H2>","",$line);
			$line = str_replace("</H3>","",$line);
			$line = str_replace("</H4>","",$line);
			$line = str_replace("</H5>","",$line);
			$line = str_replace("</H6>","",$line);
			$line = str_replace("</P>","",$line);
			$line = str_replace("<h1>","",$line);
			$line = str_replace("<h2>","",$line);
			$line = str_replace("<h3>","",$line);
			$line = str_replace("<h4>","",$line);
			$line = str_replace("<h5>","",$line);
			$line = str_replace("<h6>","",$line);
			$line = str_replace("<p>","",$line);
			$line = str_replace("</h1>","",$line);
			$line = str_replace("</h2>","",$line);
			$line = str_replace("</h3>","",$line);
			$line = str_replace("</h4>","",$line);
			$line = str_replace("</h5>","",$line);
			$line = str_replace("</h6>","",$line);
			$line = str_replace("</p>","",$line);
			array_push($wp_nav_menu_new_arr, $line);
		}
	}
	echo implode("\n",$wp_nav_menu_new_arr);
}


/*Default featured image*/
function autoset_featured() {

    //Random id image for thumbnail
    $media_array = array(
//        '3684',
        '5783',
    );
    $media = $media_array[array_rand($media_array)];

    global $post;
    $already_has_thumb = has_post_thumbnail($post->ID);
    if (!$already_has_thumb)  {
        set_post_thumbnail($post->ID, $media);
    }
}

add_action('the_post', 'autoset_featured');
add_action('save_post', 'autoset_featured');
add_action('draft_to_publish', 'autoset_featured');
add_action('new_to_publish', 'autoset_featured');
add_action('pending_to_publish', 'autoset_featured');
add_action('future_to_publish', 'autoset_featured');


//Likes function

// Register the new route
add_action( 'rest_api_init', function () {

    register_rest_route( 'example/v2', '/likes/(?P<id>\d+)', array(
        'methods' => array('GET','POST'),
        'callback' => 'example__like',
    ) );

});

function example__like( WP_REST_Request $request ) {
    // Custom field slug
    $field_name = 'likes_number';
    // Get the current like number for the post
    $current_likes = get_field($field_name, $request['id']);
    // Add 1 to the existing number
    $updated_likes = $current_likes + 1;
    // Update the field with a new value on this post
    $likes = update_field($field_name, $updated_likes, $request['id']);

    return $likes;
}


/*Security Users Data*/
add_filter( 'rest_endpoints', function( $endpoints ){
    if ( isset( $endpoints['/wp/v2/users'] ) ) {
        unset( $endpoints['/wp/v2/users'] );
    }
    if ( isset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] ) ) {
        unset( $endpoints['/wp/v2/users/(?P<id>[\d]+)'] );
    }
    return $endpoints;
});


/*Change password protect form*/
add_filter( 'the_password_form', 'wporg_password_form' );
function wporg_password_form() {
    global $post;
    $label = 'pwbox-' . ( empty( $post->ID ) ? rand() : $post->ID );
    $output = '<form action="' . esc_url( site_url( 'wp-login.php?action=postpass', 'login_post' ) ) . '" class="post-password-form" method="post">
    <label class="pass-label" for="' . $label . '">' . esc_html__( 'Enter password', 'hypcccycl' ) . ' </label>
    <input name="post_password" id="' . $label . '" class="post-password" type="password" placeholder="Password" /><input type="submit" name="Submit" class="button" value="' . esc_attr__( 'ViEW FULL PORTFOLIO', 'hypcccycl' ) . '" />
    </form>';
    return $output;
}


// Изменить адрес электронной почты по умолчанию
function bnfw_change_email_address ( $email ) {
    return "disrupt@hypcccycl.com" ;
}
add_filter ( 'wp_mail_from' , 'bnfw_change_email_address' ) ;
// Изменить имя электронной почты "От" по умолчанию
function bnfw_change_email_from ( $from_name ) {
    return "hypcccycl.com" ;
}
add_filter ( 'wp_mail_from_name' , 'bnfw_change_email_from' ) ;


/*Check user role*/
function check_user_role($roles, $user_id = null) {
    if ($user_id) $user = get_userdata($user_id);
    else $user = wp_get_current_user();
    if (empty($user)) return false;
    foreach ($user->roles as $role) {
        if (in_array($role, $roles)) {
            return true;
        }
    }
    return false;
}

/*Add new user role*/
function xx__update_custom_roles() {
    if ( get_option( 'custom_roles_version' ) < 1 ) {
        add_role( 'approved', 'Approved', array( 'read' => true, 'level_0' => true ) );
        update_option( 'custom_roles_version', 1 );
    }
}
add_action( 'init', 'xx__update_custom_roles' );