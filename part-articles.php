<?php
$post_id = false;
$post_id = 74; // specif ID of blog

$choose_header = get_field("choose_header");
get_template_part( 'parts/overall/overall-header', $choose_header );

$content = get_field("content", $post_id);
$bg_blog_image = get_field("bg_blog_image", $post_id);
$bg_blog_image_animated = get_field("bg_blog_image_animated", $post_id);

$bg_blog_section_image = get_field("bg_blog_section_image", $post_id);

?>
<div class="hyp-page hyp-blog-page position-relative" style="<?php if($bg_blog_section_image){ ?>background-image:url(<?php echo $bg_blog_section_image['url']; ?>);<?php } ?>">

    <img class="circles" src="<?php if($bg_blog_image){ ?><?php echo $bg_blog_image['url']; ?><?php } ?>" alt="<?php echo $bg_blog_image['title']; ?>" draggable="false" (dragstart)="false;">
    <img class="hero animate-spin" src="<?php echo $bg_blog_image_animated['url']; ?>" alt="<?php echo $bg_blog_image_animated['title']; ?>" draggable="false" (dragstart)="false;" />

    <section class="content hyp-fadeIn">
        <div class="container-fluid container-sm">
            <div class="row">
                <div class="col-lg-12">
                    <div class="text-block">
                        <?php if($content){ ?>
                            <?php echo csc($content); ?>
                        <?php } ?>
                        <hr>
                    </div>
                    <div class="search">
                        <a href="/" class="btn-small-gray-icon-left"><span>Back to home</span></a>
                        <form class="d-flex" id="live-search-form">
                        <div class="search-container position-relative">
                            <input class="" placeholder="Search" type="search" name="search" id="search">
                            <span class="icon-close d-flex align-items-center"></span>
                        </div>
                        <button class="icon-search d-flex" type="submit"></button>
                    </form>
                    </div>

                    <section class="blog">
                        <div class="search-results-banner d-none align-items-center flex-wrap">
                            <span class="icon-close"></span><span>Search Results: <span class="keyword"></span></span>
                            <span class="search-keywords"></span>
                            <div class="loader"><img src="<?php echo get_template_directory_uri() . '/assets/images/loader.png' ?>" alt="loader"></div>
                        </div>
                        <div class="posts">
                        <?php
                        $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
                        $all_posts = new WP_Query( array(
                            'post_type' => 'articles',
                            'posts_per_page' => -1,
                            'paged' => $paged,
                            'orderby' => 'date',
                            'order' => 'DESC'
                        ) );
                        while ( $all_posts->have_posts() ) : $all_posts->the_post(); ?>
                            <?php $postid = get_the_ID(); ?>
                            <div class="article">
                                <?php if ( has_post_thumbnail() ) { ?>
                                    <div class="post-thumbnail blog-article__titular" style="background-image:url(<?php echo the_post_thumbnail_url(); ?>);">
                                        <a href="<?php echo get_permalink(); ?>"></a>
                                    </div>
                                <?php }?>

                                <div class="article__info text-block">
                                    <span><?php echo get_the_date("F jS, Y"); ?></span>
                                    <h5><a href="<?php echo get_permalink(); ?>"><?php echo the_title(); ?></a></h5>
                                    <?php if( has_excerpt() ){ ?>
                                        <?php echo the_excerpt(); ?>
                                    <?php } ?>
                                    <a href="<?php echo get_permalink(); ?>" class="btn-small-gray-icon-right">Read Now</a>
                                </div>
                            </div>

                            <?php wp_reset_postdata(); ?>
                        <?php endwhile; ?>
                        </div>
                    </section>
                    <!--                    --><?php //// AJAX load the posts ?>
                    <!--                    --><?php //if ( $all_posts->max_num_pages > 1 ) { ?>
                    <!--                        <script> var this_page = 1; </script>-->
                    <!--                        <div class="btn-loadmore" title="Load More"-->
                    <!--                             data-param-posts='--><?php //echo serialize($all_posts->query_vars); ?><!--'-->
                    <!--                             data-max-pages='--><?php //echo $all_posts->max_num_pages; ?><!--'-->
                    <!--                             data-tpl='posts'>-->
                    <!--                            <a class="btn-big" href="#more">Load More</a>-->
                    <!--                        </div>-->
                    <!--                    --><?php //} ?>

                </div>
            </div>
        </div>
    </section>


</div>
