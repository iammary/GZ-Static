var App = function () {

		// IE mode
		var isRTL = false;
		var isIE8 = false;
		var isIE9 = false;
		var isIE10 = false;

		var handleInit = function () {

				if ( $( 'body' ).css( 'direction' ) === 'rtl' ) {
						isRTL = true;
				}

				isIE8 = !! navigator.userAgent.match( /MSIE 8.0/ );
				isIE9 = !! navigator.userAgent.match( /MSIE 9.0/ );
				isIE10 = !! navigator.userAgent.match( /MSIE 10.0/ );

				if ( isIE10 ) {
						jQuery( 'html' ).addClass( 'ie10' ); // detect IE10 version
				}
		}

		function handleIEFixes() {
				//fix html5 placeholder attribute for ie7 & ie8
				if ( isIE8 || isIE9 ) { // ie8 & ie9
						// this is html5 placeholder fix for inputs, inputs with placeholder-no-fix class will be skipped(e.g: we need this for password fields)
						jQuery( 'input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)' ).each( function () {

								var input = jQuery( this );

								if ( input.val() == '' && input.attr( "placeholder" ) != '' ) {
										input.addClass( "placeholder" ).val( input.attr( 'placeholder' ) );
								}

								input.focus( function () {
										if ( input.val() == input.attr( 'placeholder' ) ) {
												input.val( '' );
										}
								} );

								input.blur( function () {
										if ( input.val() == '' || input.val() == input.attr( 'placeholder' ) ) {
												input.val( input.attr( 'placeholder' ) );
										}
								} );
						} );
				}
		}

		$( window ).scroll( function () {
				if ( $( window ).scrollTop() > 300 ) {
						$( ".header" ).addClass( "scrolling-fixed" ).removeClass( "no-scrolling-fixed" );
				} else {
						$( ".header" ).removeClass( "scrolling-fixed" ).addClass( "no-scrolling-fixed" );
				};
		} );

		function handleBootstrap() {
				jQuery( '.carousel' ).carousel( {
						interval: 15000,
						pause: 'hover'
				} );
				jQuery( '.tooltips' ).tooltip();
				jQuery( '.popovers' ).popover();
		}

		function handleMisc() {
				jQuery( '.top' ).click( function () {
						jQuery( 'html,body' ).animate( {
								scrollTop: jQuery( 'body' ).offset().top
						}, 'slow' );
				} ); //move to top navigator
		}


		function handleSearch() {
				$( '.search-btn' ).click( function () {
						if ( $( '.search-btn' ).hasClass( 'show-search-icon' ) ) {
								$( '.search-box' ).fadeOut( 300 );
								$( '.search-btn' ).removeClass( 'show-search-icon' );
						} else {
								$( '.search-box' ).fadeIn( 300 );
								$( '.search-btn' ).addClass( 'show-search-icon' );
						}
				} );
		}

		function handleUniform() {
				if ( !jQuery().uniform ) {
						return;
				}
				var test = $( "input[type=checkbox]:not(.toggle), input[type=radio]:not(.toggle, .star)" );
				if ( test.size() > 0 ) {
						test.each( function () {
								if ( $( this ).parents( ".checker" ).size() == 0 ) {
										$( this ).show();
										$( this ).uniform();
								}
						} );
				}
		}

		var handleFancybox = function () {
				if ( !jQuery.fancybox ) {
						return;
				}

				if ( jQuery( ".fancybox-button" ).size() > 0 ) {
						jQuery( ".fancybox-button" ).fancybox( {
								groupAttr: 'data-rel',
								prevEffect: 'none',
								nextEffect: 'none',
								closeBtn: true,
								helpers: {
										title: {
												type: 'inside'
										}
								}
						} );

						$( '.fancybox-video' ).fancybox( {
								type: 'iframe'
						} );
				}
		}

		var handleFixedHeader = function () {

				if ( !window.addEventListener ) {
						window.attachEvent( 'scroll', function ( event ) {
								if ( $( 'body' ).hasClass( "page-header-fixed" ) === false ) {
										return;
								}
								if ( !didScroll ) {
										didScroll = true;
										setTimeout( scrollPage, 250 );
								}
						} );
				} else {
						window.addEventListener( 'scroll', function ( event ) {
								if ( $( 'body' ).hasClass( "page-header-fixed" ) === false ) {
										return;
								}
								if ( !didScroll ) {
										didScroll = true;
										setTimeout( scrollPage, 250 );
								}
						}, false );
				}
				var docElem = document.documentElement,
						header = $( '.navbar-inner' ),
						headerwrap = $( '.front-header' ),
						slider = $( '.slider-main' ),
						didScroll = false,
						changeHeaderOn = 120;

				function scrollPage() {
						var sy = scrollY();
						if ( sy >= changeHeaderOn ) {
								headerwrap.addClass( 'front-header-shrink' );
								header.addClass( 'navbar-inner-shrink' );
								$( '.logoimg' ).attr( 'width', '120px' );
						} else {
								headerwrap.removeClass( 'front-header-shrink' );
								header.removeClass( 'navbar-inner-shrink' );
								$( '.logoimg' ).attr( 'width', '200px' );
						}
						didScroll = false;
				}

				function scrollY() {
						return window.pageYOffset || docElem.scrollTop;
				}

		}

		var handleTheme = function () {

				var panel = $( '.color-panel' );

				// handle theme colors
				var setColor = function ( color ) {
						$( '#style_color' ).attr( "href", "assets/css/themes/" + color + ( isRTL ? '-rtl' : '' ) + ".css" );
						$( '#logoimg' ).attr( "src", "assets/img/logo_" + color + ".png" );
						$( '#rev-hint1' ).attr( "src", "assets/img/sliders/revolution/hint1-" + color + ".png" );
						$( '#rev-hint2' ).attr( "src", "assets/img/sliders/revolution/hint2-" + color + ".png" );
				}

				$( '.icon-color', panel ).click( function () {
						$( '.color-mode' ).show();
						$( '.icon-color-close' ).show();
				} );

				$( '.icon-color-close', panel ).click( function () {
						$( '.color-mode' ).hide();
						$( '.icon-color-close' ).hide();
				} );

				$( 'li', panel ).click( function () {
						var color = $( this ).attr( "data-style" );
						setColor( color );
						$( '.inline li', panel ).removeClass( "current" );
						$( this ).addClass( "current" );
				} );

				$( '.header-option', panel ).change( function () {
						if ( $( '.header-option' ).val() == 'fixed' ) {
								$( "body" ).addClass( "page-header-fixed" );
								$( '.header' ).addClass( "navbar-fixed-top" ).removeClass( "navbar-static-top" );
								App.scrollTop();

						} else if ( $( '.header-option' ).val() == 'default' ) {
								$( "body" ).removeClass( 'page-header-fixed' );
								$( '.header' ).addClass( 'navbar-static-top' ).removeClass( 'navbar-fixed-top' );
								$( '.navbar-inner' ).removeClass( 'navbar-inner-shrink' );
								$( '.front-header' ).removeClass( 'front-header-shrink' );
								App.scrollTop();
						}
				} );

		};

		var customAccordion = function () {
				$( '#summary-details li a' ).click( function ( el ) {
						if ( !$( el.target ).parent().hasClass( 'active' ) ) {
								$( '#summary-details li' ).removeClass( 'active' );
						}
						$( el.target ).parent().toggleClass( 'active' );
				} );
				$( '#accordion1 a.accordion-toggle' ).click( function ( el ) {
						var linkedAccordion = $( $( el )[ 0 ].currentTarget ).attr( 'href' );
						$( '#summary-details li' ).removeClass( 'active' );
						$( '#summary-details li' ).find( '[href=' + linkedAccordion + ']' ).parent().addClass( 'active' );
				} );
		};

		var showHideApplicationForm = function () {
				$( '#apply-now' ).click( function ( event ) {
						$( '#application-form' ).fadeIn( 1000 );
				} );
		};

		var isValidEmailAddress = function ( emailAddress ) {
				var pattern = new RegExp( /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i );
				return pattern.test( emailAddress );
		};

		var inputFocusOut = function ( _this ) {
					var nextParent = $( _this ).closest( '.panel-finder' ).next().find('.panel-collapse').attr('id');
					var nextParentID = '#' + nextParent;
					var parentPanel = $( _this ).closest( '.panel-collapse' );
					var nextPanelID = $( _this ).closest( '.panel-finder' ).next();
					var validated = false;
					var truthy = true;
					$( parentPanel ).find( '[aria-required=' + truthy + ']' ).each( function ( index ) {
							var _this = this;
							if ( $( _this ).val() === '' ) {
								validated = false;
								return false;
							}
							if ( ( $( _this ).attr('type') ) === 'email' ) {
									validated = isValidEmailAddress( $( _this ).val() );
									if ( !validated ) {
										return false;
									}
								} else {
									validated = true;
								}
					} ).promise().done( function() {
							if ( !validated ) {
								$( parentPanel ).parent().removeClass('completed');
								$( parentPanel ).parent().addClass('incomplete panel-warning');
								if ( !($( nextPanelID ).find('.panel-heading').parent().hasClass('completed')) ) {
									$( nextPanelID ).find('.panel-heading').addClass('btn disabled').find('a.accordion-toggle').addClass('btn disabled');
									$( '#summary-details li' ).find( '[href=' + nextParentID + ']' ).addClass('btn disabled');
								}
							} else {
								$( parentPanel ).parent().addClass('completed');
								$( parentPanel ).parent().removeClass('incomplete panel-warning');
								$( nextPanelID ).find('.panel-heading').removeClass('btn disabled').find('a.accordion-toggle').removeClass('btn disabled').click().parent().next().find('input').first().focus();
								$( '#summary-details li' ).find( '[href=' + nextParentID + ']' ).removeClass('btn disabled');

							}
							var completedPanels = $( _this ).closest('#accordion1').find('.panel-finder.completed').length;
							if ( completedPanels < 4 ) {
									$( '.formsubmit' ).addClass( 'disabled' );
								} else {
									$( '.formsubmit' ).removeClass( 'disabled' );
								}
					});
				} ;

		var checkInputFields = function ( enabled ) {
			if ( enabled ) {
				$('input,select').keypress(function(event) { return event.keyCode !== 13; });
				$( '#accordion1 input' ).blur( function () {
					inputFocusOut( this );
				} );
				$( '#accordion1 textarea' ).blur( function () {
					inputFocusOut( this );
				} );
				$( '#accordion1 select' ).focusout( function () {
					inputFocusOut( this );
				} );
			}
		};

		var addCompletedMessage = function () {
			$('.panel-title').append('<span class="completed-text">Missing/Invalid input on required fields.</span>');
		};

		var changePositionState = function () {
			$( '#hear-position' ).change( function () {
				var value = $( this ).val();
				if (  value === 'Referral' ) {
					$( '#referral-name' ).attr( 'type', 'text').show();
					$( '#others-name' ).attr( 'type', 'hidden').hide();
					$( '#referral-name' ).focusout( function () {
						var ref = $( this ).val();
						$( '.position-hear' ).first().val( value + ' by ' + ref );
					} );
				} else if ( value === 'Others' ) {
					$( '#others-name' ).attr( 'type', 'text').show();
					$( '#referral-name' ).attr( 'type', 'hidden').hide();
					$( '#others-name' ).focusout( function () {
						var ref = $( this ).val();
						$( '.position-hear' ).first().val( value + ': ' + ref );
					} );
				} else {
					$( '#others-name' ).hide();
					$( '#referral-name' ).hide();
					$( '#others-name' ).attr( 'type', 'hidden').show();
					$( '#referral-name' ).attr( 'type', 'hidden').hide();
					$( '.position-hear' ).first().val( value );
				}
			} );
		};

		return {
				init: function () {
						handleInit();
						handleBootstrap();
						handleIEFixes();
						handleMisc();
						handleSearch();
						handleTheme(); // handles style customer tool
						handleFancybox();
						handleFixedHeader();
						customAccordion();
						showHideApplicationForm();
						changePositionState();
						addCompletedMessage();
						checkInputFields( true );
				},

				initUniform: function ( els ) {
						if ( els ) {
								jQuery( els ).each( function () {
										if ( $( this ).parents( '.checker' ).size() === 0 ) {
												$( this ).show();
												$( this ).uniform();
										}
								} );
						} else {
								handleUniform();
						}
				},

				// wrapper function to scroll to an element
				scrollTo: function ( el, offeset ) {
						pos = el ? el.offset().top : 0;
						jQuery( 'html,body' ).animate( {
								scrollTop: pos + ( offeset ? offeset : 0 )
						}, 'slow' );
				},

				scrollTop: function () {
						App.scrollTo();
				},

				gridOption1: function () {
						$( function () {
								$( '.grid-v1' ).mixitup();
						} );
				}

		};

		// Handles Bootstrap Accordions.
		var handleAccordions = function () {
				var lastClicked;
				//add scrollable class name if you need scrollable panes
				jQuery( 'body' ).on( 'click', '.accordion.scrollable .accordion-toggle', function () {
						lastClicked = jQuery( this );
				} ); //move to faq section

				jQuery( 'body' ).on( 'show.bs.collapse', '.accordion.scrollable', function () {
						jQuery( 'html,body' ).animate( {
								scrollTop: lastClicked.offset().top - 150
						}, 'slow' );
				} );
		}

		// Handles Bootstrap Tabs.
		var handleTabs = function () {
				// fix content height on tab click
				$( 'body' ).on( 'shown.bs.tab', '.nav.nav-tabs', function () {
						handleSidebarAndContentHeight();
				} );

				//activate tab if tab id provided in the URL
				if ( location.hash ) {
						var tabid = location.hash.substr( 1 );
						$( 'a[href="#' + tabid + '"]' ).click();
				}
		}


}();