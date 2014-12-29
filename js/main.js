$(document).ready(function() {

    var $window      = $(window),
        $body        = $('body'),
        $nav         = $body.find('nav'),
        $nextArrow   = $('#next-arrow'),
        $works       = $('#works'),
        navOffsetTop = $nav.offset().top;

    function start() {

        if ( typeof FastClick === 'function' ) {
            FastClick.attach( document.body );
        }

        $window
            .off( 'scroll' )
            .on(  'scroll', updateNavDocking )

            .off( 'resize' )
            .on(  'resize', onWindowResize );

        $nav
            .off( 'click', 'a' )
            .on( 'click', 'a', preventDefault )

            .off( 'click', 'li' )
            .on( 'click', 'li', function() {

                var navTargetSelector = $(this).data('nav-target')
                    $navTarget        = $(navTargetSelector);

                scrollToElement( $navTarget );
            });

        $nextArrow
            .off( 'click' )
            .on(  'click', function() {

                scrollToElement( $works );
            });
    }

    function preventDefault( e ) {

        if ( e ) { e.preventDefault(); }
    }

    function updateNavDocking() {

        if( navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav') ) {

            $body.addClass('has-docked-nav')
        
        } else if( navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav') ) {
        
            $body.removeClass('has-docked-nav')
        
        }
    }

    function onWindowResize() {

        $body.removeClass('has-docked-nav')
        navOffsetTop = $nav.offset().top
        updateNavDocking();
    }

    function scrollToElement( $element ) {

        if ( typeof $element === 'object' && $element.length ) {
    
            $element.velocity(
                'scroll',
                {
                    duration : 500,
                    easing   : 'ease-out-cubic'
                }
            );
        }
    }

    start();
});