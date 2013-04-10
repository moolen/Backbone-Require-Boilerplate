define([
	"jquery", 
	"backbone",
	"models/model", 
    "datepicker",
	"text!templates/page/booking.html",
    "text!templates/module/termin.html",
    "text!templates/page/booking-compare.html",
    "text!templates/page/booking-finish.html",
    "text!templates/module/arrow-popup.html",
    "text!templates/module/finished-booking.html"
], function($, Backbone, model, datepicker, template, termin, bookingCompare, bookingFinish, arrowpopup, finishedBooking){

        var Booking = Backbone.View.extend({

            el: "body",
            events: {
            	"click .addTermin" : "addTermin",
                "keypress input" : "onInputChange",
                "click input" : "onInputClick",
                "change .termin_change" : "onTerminChange",
                "change #inputStart" : "onInputStartChange",
                "change .googleautocomplete" : "onAutocompleteChange",
                "click .deleteTermin" : "deleteTermin",
                "click #goComparison" : "goComparison",
                "click #goBooking" : "goBooking",
                "click .booking-compare-item .details" : "toggleCompareDetails",
                "click .goFinishBooking" : "goFinishBooking",
                "click #toggleExtended" : "toggleExtendedBookingDetails",
                "click .fontawesome-edit, .modalbg" : "togglePopUp",
                "click body" : "onBodyClick",
                "click .fontawesome-ban-circle": "hoverBanCircle",
                "click #confirmBooking" : "confirmBooking",
                "click .fontawesome-remove" : "closeModal",
                "click .modalbg" : "closeModal",
                "click #goDashboard" : "goDashboard",
                "click .block-wrapper" : "showBookingCompareDetails"
            },
            initialize: function() {
            	console.log("initializing bookingView");
                MyApp.bookings.termincount = 1;
                $("#gobooking").addClass("active");
            	this.render();
                this.initForm();
            },

            render: function() {
                this.template = _.template("<div class='frames'><div class='frame'>" + template + "</div></div>", {});
                $(".app-nav a.gobooking").addClass("active");
                $('body, html').on('click', this.onBodyClick);
                $(".viewport").children().remove();
                $('.viewport').html(this.template);
                $(".viewport-wrapper").show();
                $(".content-box").hide();
                $(".top-nav .left a").removeClass("active");
                $(".arrow-top").attr("class", "arrow-top booking");
                
                return this;
            },

            addTermin: function(e){
            	MyApp.bookings.termincount++;
                var template = _.template(termin, {});
                $(template).appendTo("#form_termine").slideDown({
	                duration: 350,
	                easing: "linear"
                });
                
                this.initForm();
                // demo stuff
                var $new = $("#form_termine").children(".termin_entry:last"),
                	$new_input = $("#form_termine").children(".termin_entry:last").find("input");
                this.adjustSleep();
                $('.sleep input').attr('placeholder', 'Geben Sie einen Standord ein.');
                //$new.css("opacity", ".5");
                //$new_input.attr("disabled", "disabled");
            },

            deleteTermin : function(e){
            	var $termin = $(e.srcElement).parent();
            	$termin.slideUp({ 
                        duration: 350,
                        easing: "linear", 
                        complete: function(e){
                            $termin.remove();
                            MyApp.bookings.termincount--;
                         }, });
                
            },
            
            onInputChange: function(e){
                var code = e.keyCode || e.which; 
                  // deny enter and 
                  if (code  == 13) {       
                    if($(e.currentTarget).hasClass("termin_change")){
	                    this.onTerminChange(e);
                    }
                    if(e.currentTarget.id == 'inputStart'){
                      this.onInputStartChange(e);
                    }     
                    if($(e.currentTarget).hasClass('googleautocomplete')){
	                    this.onAutocompleteChange(e);
                    }
                    e.preventDefault();
                    return false;
                  }
                  // remove error class
                  if( e.currentTarget.value != "" ){
	                  $(e.currentTarget).removeClass("error");
                  }
                $(e.currentTarget).first().css("background-color","#fff");
            },

            onInputClick: function(e) {
              $('input.datepicker').each(function(i, v){
                var index = i;
                if($(e.currentTarget).is($(this))) {
                  // i got the index of shown input now.
                  $('.datepicker.dropdown-menu').each(function(i2, e2){
                    if(index != i2) {
                      // if not index, hide this!
                      //$(this).hide();
                    }
                  });
                }
              });
            },

           onInputStartChange: function(e) {
              setTimeout(function(){
                $('#InputEnd')[0].value = e.currentTarget.value;
              }, 200);
           },
            
           onTerminChange : function(e){
           	if(MyApp.bookings.termincount > 1){
               setTimeout(function(){
                    var value = e.currentTarget.value,
                    	element = $(e.currentTarget).parent().parent().children(".sleep").children("input")[0];
                    element.value = value;
                    $(element).removeClass("error");
               }, 200);
            }
           },

           initAutocomplete: function(){
                    $(".pac-container").remove();
                    var options = {
                      types: ['geocode']
                    };
                    
                    
                    
                    setTimeout(function(){
	                    var input = $(".googleautocomplete").each(function(){
	                        if(this != undefined){
	                             var autocomplete = new google.maps.places.Autocomplete(this, options);
	                        }
	                    });
                    }, 200);
                    
            },

           initForm : function(){
            this.initAutocomplete();
            //$(".datepicker.dropdown-menu").remove();
            var that = this;
            var today = new Date(),
                     todayDay = today.getDate(),
                     todayMonth = today.getMonth() +1,
                     todayYear = today.getFullYear();
                     
             // init placeholder fields
            $("input.set_date_today").attr("placeholder", todayDay+"."+todayMonth+"."+todayYear);
            $(".set_time").attr("placeholder", "Uhrzeit");
            
            // init datepicker
            $(".datepicker").each(function(){
                $(this).datepicker({ format: "dd.mm.yyyy", weekStart: 1,
                changeDate: function(element){
	                element.removeClass("error");
                }, });
            });
            
            // init slider
            $( ".slider-range" ).slider({
                  range: true,
                  min: 0,
                  max: 24,
                  values: [ 8, 16 ],
                  slide: function( event, ui ) {
                    $( this ).siblings(".set_time").val( ui.values[ 0 ] + " - " + ui.values[ 1 ] + " Uhr");
                    // adjust sleep field
                    var $element = this;
                      that.adjustSleep( { element: $element, val : ui.values[1] } );
                    
                  },
                  create: function(event, ui){
                     $( this ).siblings(".set_time").val( "8 - 16 Uhr");
                  },
                });
           },
           
           adjustSleep: function( obj ){
           		var obj = obj || {};
            	if(obj.val >= 20 || MyApp.bookings.termincount > 1 ){
	            	$(obj.element).parent().siblings(".sleep").children("input").removeAttr("disabled").attr("placeholder", "Geben Sie einen Standord ein.");
            	}else{
	            	$(obj.element).parent().siblings(".sleep").children("input").attr("disabled", "disabled").attr("placeholder","");
            	}
            
            if( MyApp.bookings.termincount >= 2 ){
              $('.sleep input').removeAttr('disabled');
            }
            
            
           },
           
           onAutocompleteChange: function(e) {
	           var t = $(e.currentTarget)[0],
	           	   l = $('.sleep input').last()[0];
	           if( t == l ){
	           		setTimeout(function(){
		           		$('#InputEnd')[0].value =  $(e.currentTarget)[0].value;
	           		}, 200);
		           
	           }
           },

           initCompareSlider: function(){
           		$(".slider").each(function(i, e){
	           		var data = $(this).parent().attr("data"),
	           			values = undefined, 
	           			value = undefined,
	           			slider = true,
	           			min, max, range;

	           		switch(data){
		           		case "duration" :
		           			range = "min";
		           			min = 2;
		           			max = 12;
		           			value = max;
		           			break;
		           			
		           		case "stops":
		           			range = "min";
		           			min = 0;
		           			max = 3;
		           			value = max;
		           			break;
		           			
		           		case "price":
		           			range = "min";
		           			min = 120;
		           			max = 356;
		           			value = max;
		           			break;
	           		}
	           		
	           		if( slider ){
		           		$( this ).slider({
				       		range: range,
				       		min: min,
				       		max: max,
				       		values: values,
				       		value : value,
				       		slide: function( e, ui ) {
			                  		$( this ).siblings(".descr").children(".value").html( ui.value);
		                    },
		                    create: function(e, ui){
		                    	data = $(this).parent().attr("data");
			                    if( data == "duration" ){
				                    $( this ).siblings(".descr").children(".value").html( 12 );
			                    }else if(data == "price"){
				                    $( this ).siblings(".descr").children(".value").html( 356 );
			                    }else if(data == "stops"){
				                    $( this ).siblings(".descr").children(".value").html( 3 );
			                    }
		                    },
		                });
	           		}// end if
           		});
           		
           		
	       		
           },
           goComparison: function(e){
           		e.preventDefault();
           		console.log("goComparison clicked");
           		var that = this;
           		if(true){
           		//if(this.validateBookingForm()){
           			Backbone.Events.trigger('moveFrameLeft',  bookingCompare, null, function() { that.initCompareSlider() }  );
           			$(".pac-container").remove();
           			$(".datepicker.dropdown-menu").remove();
           			this.slideWindowTo($(".viewport-wrapper"), 500, 50);
           			
           		}
           },
           
           goFinishBooking: function(e){
	           e.preventDefault();
                $(".arrow-popup").remove();
	           console.log("goFinishClicked");
	           Backbone.Events.trigger('moveFrameLeft',  bookingFinish, null );
	           
           },
           
           goBooking: function(){
           		var frame = $(".frame").html();
           		Backbone.Events.trigger('moveFrameRight', template, null, null );
           		this.initForm();
				
           },
           
           toggleExtendedBookingDetails: function(e){
	           e.preventDefault();
	           if($(".extended-info").is(":visible")){
	           		// is visible
		           $(".extended-info").slideUp(350);
		           $("#toggleExtended").children(".descr").html("erweitert");
		           $("#toggleExtended").children(".pre").attr("class", "pre fontawesome-plus");
	           }else{
	           		// is hidden
		           $(".extended-info").slideDown(350);
		           $("#toggleExtended").children(".descr").html("kompakt");
		           $("#toggleExtended").children(".pre").attr("class", "pre fontawesome-minus");
	           }
	           
           },
           
           toggleCompareDetails: function(e){
	           
	           if($(e.currentTarget).siblings(".slide-content").html() != ""){
		           if($(e.currentTarget).siblings(".slide-content").hasClass("active")){
		           		// slide up!
			           $(e.currentTarget).siblings(".slide-content").slideUp({ 
			           		duration: 250, 
			           		easing: "swing" }
			           	).removeClass("active");
			           $(e.currentTarget).children(".slide-down").removeClass("fontawesome-chevron-up").addClass("fontawesome-chevron-down")
		           }else{
			           // slide down!
			           $(e.currentTarget).siblings(".slide-content").slideDown({ 
			           		duration: 250, 
			           		easing: "swing" }
			           	).addClass("active");
			           $(e.currentTarget).children(".slide-down").addClass("fontawesome-chevron-up").removeClass("fontawesome-chevron-down");
			           this.slideWindowTo($(e.currentTarget).parent().prev(), 500);
		           }
	           }
           },
           
           togglePopUp: function(e){
	           var template = _.template(arrowpopup, {heading: "", content: "Verkehrsmittel bearbeiten"}),
	           		o = this.getOffset($(e.currentTarget)),
	           		c = $(".arrow-popup");
	           		
	           if(c.length > 0){
		           c.fadeOut(200);
		           c.remove();
		       }    
		           $("body").append(template);
		           $(".arrow-popup").css("top", o.top + 20).css("left", o.left - 273).fadeIn(200);
	           
	           
           },
           
           hoverBanCircle: function(e){
	           var template = _.template(arrowpopup, {heading: "", content: "l&ouml;schen!"}),
	           		o = this.getOffset($(e.currentTarget)),
	           		c = $(".arrow-popup");
	           		
	           if(c.length > 0){
		           c.fadeOut(200);
		           c.remove();
		       }    
		           $("body").append(template);
		           $(".arrow-popup").css("top", o.top + 20).css("left", o.left - 273).fadeIn(200);
           },
           
           goDashboard: function(){
	           Backbone.Events.trigger("goDashboard");
           },
           
           openModal: function(HTMLtemplate, VARs){
           		var data = VARs || {};
           		var template = _.template(HTMLtemplate, data);
	           	$("html body").append('<div class="modalbg"></div>');
	           	$(".modalbg").append(template).children().append("<div class='fontawesome-remove'></div>");
	           	$(".modalbg").fadeIn(200);
           },
           
           closeModal: function(e){
	           mbg = $(".modalbg");
	           if(e == "force"){
		            $(".modalbg").fadeOut(200, function(){
			           $(".modalbg").remove();
			           $(".modal-content").remove();
			       });
	           }else if( mbg.length > 0 
		           	&& !$(e.target).hasClass("modal-content") 
		           	&& ( 
		           			$(e.target).parent(".modal-content").length != 0 
		           			&& $(e.target).hasClass("fontawesome-remove") 
		           		)
		           	|| $(e.srcElement).hasClass("modalbg")
	           	){
		           // remove modal and content
		           $(".modalbg").fadeOut(200, function(){
			           $(".modalbg").remove();
			           $(".modal-content").remove();
			       });
	           }
           },
           
           onBodyClick: function(e){
           	if(e.srcElement != undefined){
	           	if(e.srcElement.className != "fontawesome-edit" && e.srcElement.className != "fontawesome-ban-circle"){
	           		$(".arrow-popup").remove();
           		}
           	}
           		
           		
           },
           
           confirmBooking: function(){
	           this.openModal(finishedBooking);
           },
           
           showBookingCompareDetails: function(e){
           		var $target = $(e.currentTarget).siblings(".booking-compare-wrapper");
           		console.log($target);
           		if(!$target.hasClass('shown')){
	           		$target.slideDown(800);
	           		$target.addClass('shown');
           		}else{
	           		$target.slideUp(800);
	           		$target.removeClass('shown');
           		}
           		
           },
           
           slideWindowTo: function($element, time, additionalOffset){
           		var duration = time || 350;
           		var addOffset = -additionalOffset || -25;
           		var offset = this.getOffset($element);
           		
	       		$("html, body").animate({
		       		scrollTop: offset.top + addOffset,
		       	}, duration);
           },
           
           getOffset: function($element){
	           return $element.offset();
           },
           
           close: function(){
                this.closeModal("force");
                $(".datepicker").remove();
                $(".pac-container").remove();
                Backbone.Events.trigger( 'clearView');
                this.$el.off();
                this.unbind();
                this.views = [];
                console.log("booking.close");
            },

        });

        return Booking;

    });