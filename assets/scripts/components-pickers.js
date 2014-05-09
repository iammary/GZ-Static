var ComponentsPickers = function () {

	var handleDatePickers = function () {

		if ( jQuery().datepicker ) {
			$( '.date-picker' ).datepicker( {
				rtl: false,
				autoclose: true
			} );
			$( 'body' ).removeClass( 'modal-open' ); // fix bug when inline picker is used in modal
		}
		$( '.glyphicon-calendar' ).parent().click( function () {
			console.log( $( this ).parent().find( 'input' ) )
			$( this ).parent().find( 'input' ).focus();
		} );
	}

	return {
		//main function to initiate the module
		init: function () {
			handleDatePickers();
		}
	};

}();