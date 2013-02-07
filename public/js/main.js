$(function(){
	$('#signin').on("click", function(e){
		if($('#signin-form').queue() != "inprogress"){
			$('#signin-form').fadeToggle();
		}
		
	});
});