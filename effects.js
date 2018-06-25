$(document).ready(function () {
	var w, h, p, jqxhr, videofs, elfs, formclone, ajaxdata, ajaxbutton, result;
	w = $(window).width();
	h = $(window).height();
	if (w < 992) {
		$("header").height(h);
	}
	$(window).on("orientationchange", function (event) {
		if (document.fullscreenElement) {
			elfs = document.fullscreenElement.nodeName;
		} else if (document.webkitFullscreenElement) {
			elfs = document.webkitFullscreenElement.nodeName;
		} else if (document.mozFullScreenElement) {
			elfs = document.mozFullScreenElement.nodeName;
		} else if (document.msFullscreenElement) {
			elfs = document.msFullscreenElement.nodeName;
		} else {
			elfs = null;
		}
		w = $(window).width();
		
		if (elfs != "VIDEO"){
		if( w < 992) {
			h = $(window).height();
			$("main").hide();			
			$("header").height("100vh");
			$("header img").attr("style", "");
		} else{
			$("header").attr("style", "");
		}
		}
	});
	$(".item").click(function () {
		w = $(window).width();
		if (w >= 992) {
			p = $(this).find("p").html();
			if ($("main").css("display") == "none") {
				$("header").animate({
					height: "100px"
				}, "slow", function () {
					$("#description p").html(p);
					$("main").fadeIn();
					$("#description").show();
					$("#form").hide();
					$("#reels").hide();
				});
				$("header img").animate({
					height: "100px"
				}, "slow");
			} else {
				$("main").fadeOut(function () {
					$("#description p").html(p);
					$("main").fadeIn();
					$("#description").show();
					$("#form").hide();
					$("#reels").hide();
				});
			}
		}
	});
	$("#email").click(function () {
		w = $(window).width();
		if (w >= 992) {
			if ($("main").css("display") == "none") {
				$("header").animate({
					height: "100px"
				}, "slow", function () {
					$("main").fadeIn();
					$("#form").html(formclone);
					$("#form").show();
					$("#description").hide();
					$("#reels").hide();
				});
				$("header img").animate({
					height: "100px"
				}, "slow");
			} else {
				$("main").fadeOut(function () {
					$("main").fadeIn();
					$("#form").html(formclone);
					$("#form").show();
					$("#description").hide();
					$("#reels").hide();
				});
			}
		}
	});
	$("header").click(function () {
		w = $(window).width();
		if (w >= 992) {
			if ($("header").css("height") != "100px") {
				$("header").animate({
					height: "100px"
				}, "slow", function () {
					$("main").fadeIn();
					$("#form").hide();
					$("#description").hide();
					$("#reels").show();
				});
				$("header img").animate({
					height: "100px"
				}, "slow");
			} else {
				$("main").fadeOut(function () {
					$("main").fadeIn();
					$("#reels").show();
					$("#description").hide();
					$("#form").hide();
				});
			}
		} else {
			$("main").show();
			$("#reels").show();
			$("#description").hide();
			$("#form").hide();
			$("video").each(function () {
				if (this.requestFullscreen) {
					this.requestFullscreen();
				} else if (this.mozRequestFullScreen) {
					this.mozRequestFullScreen();
				} else if (this.webkitRequestFullscreen) {
					this.webkitRequestFullscreen();
				} else if (this.msRequestFullscreen) {
					this.msRequestFullscreen();
				} else{
					alert("Cannot set video to fullscreen automatically. Your browser is not supported.");
				}
			});
		}
	});
	$(document).on("fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange", function (event) {
		if (document.fullscreenElement) {
			elfs = document.fullscreenElement.nodeName;
		} else if (document.webkitFullscreenElement) {
			elfs = document.webkitFullscreenElement.nodeName;
		} else if (document.mozFullScreenElement) {
			elfs = document.mozFullScreenElement.nodeName;
		} else if (document.msFullscreenElement) {
			elfs = document.msFullscreenElement.nodeName;
		} else {
			elfs = null;
		}
		if (elfs) { /*jika masuk fullscreen*/
			if (elfs == "VIDEO") { /*jika masuk video fullscreen*/
				videofs = true;
			}
		} else { /*jika keluar fullscreen*/
			if (videofs) { /*jika keluar video fullscreen*/
				w = $(window).width();
				if (w < 992) {
					$("main").hide();
					h = $(window).height();
					$("header").height(h);
					$("header img").attr("style", "");
				} else {
					$("header").trigger("click");
				}
				videofs = false;
			}
		}
	});
	$(document).on("fullscreenerror webkitfullscreenerror mozfullscreenerror msfullscreenerror", function (event) {
		alert("Cannot set video to fullscreen automatically. Your browser is not supported.");
	});
	$("#send").click(function () {
		ajaxbutton = $(this);//supaya elemen bisa dipakai dimana2 dan aman dari bug
		ajaxdata = $(this).closest("form").serialize();//ambil data dulu, supaya data bisa dipakai dimana2 dan aman dari bug
		$(this).closest("fieldset").prop( "disabled", true );//dideklarasikan HARUS setelah pengambilan data dari form DAN sebelum ajax method		
		$("#response h2").html("Please wait...<svg width='32px' height='32px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' class='uil-ring'><rect x='0' y='0' width='100' height='100' fill='none' class='bk'></rect><defs><filter id='uil-ring-shadow' x='-100%' y='-100%' width='300%' height='300%'><feOffset result='offOut' in='SourceGraphic' dx='0' dy='0'></feOffset><feGaussianBlur result='blurOut' in='offOut' stdDeviation='0'></feGaussianBlur><feBlend in='SourceGraphic' in2='blurOut' mode='normal'></feBlend></filter></defs><path d='M10,50c0,0,0,0.5,0.1,1.4c0,0.5,0.1,1,0.2,1.7c0,0.3,0.1,0.7,0.1,1.1c0.1,0.4,0.1,0.8,0.2,1.2c0.2,0.8,0.3,1.8,0.5,2.8 c0.3,1,0.6,2.1,0.9,3.2c0.3,1.1,0.9,2.3,1.4,3.5c0.5,1.2,1.2,2.4,1.8,3.7c0.3,0.6,0.8,1.2,1.2,1.9c0.4,0.6,0.8,1.3,1.3,1.9 c1,1.2,1.9,2.6,3.1,3.7c2.2,2.5,5,4.7,7.9,6.7c3,2,6.5,3.4,10.1,4.6c3.6,1.1,7.5,1.5,11.2,1.6c4-0.1,7.7-0.6,11.3-1.6 c3.6-1.2,7-2.6,10-4.6c3-2,5.8-4.2,7.9-6.7c1.2-1.2,2.1-2.5,3.1-3.7c0.5-0.6,0.9-1.3,1.3-1.9c0.4-0.6,0.8-1.3,1.2-1.9 c0.6-1.3,1.3-2.5,1.8-3.7c0.5-1.2,1-2.4,1.4-3.5c0.3-1.1,0.6-2.2,0.9-3.2c0.2-1,0.4-1.9,0.5-2.8c0.1-0.4,0.1-0.8,0.2-1.2 c0-0.4,0.1-0.7,0.1-1.1c0.1-0.7,0.1-1.2,0.2-1.7C90,50.5,90,50,90,50s0,0.5,0,1.4c0,0.5,0,1,0,1.7c0,0.3,0,0.7,0,1.1 c0,0.4-0.1,0.8-0.1,1.2c-0.1,0.9-0.2,1.8-0.4,2.8c-0.2,1-0.5,2.1-0.7,3.3c-0.3,1.2-0.8,2.4-1.2,3.7c-0.2,0.7-0.5,1.3-0.8,1.9 c-0.3,0.7-0.6,1.3-0.9,2c-0.3,0.7-0.7,1.3-1.1,2c-0.4,0.7-0.7,1.4-1.2,2c-1,1.3-1.9,2.7-3.1,4c-2.2,2.7-5,5-8.1,7.1 c-0.8,0.5-1.6,1-2.4,1.5c-0.8,0.5-1.7,0.9-2.6,1.3L66,87.7l-1.4,0.5c-0.9,0.3-1.8,0.7-2.8,1c-3.8,1.1-7.9,1.7-11.8,1.8L47,90.8 c-1,0-2-0.2-3-0.3l-1.5-0.2l-0.7-0.1L41.1,90c-1-0.3-1.9-0.5-2.9-0.7c-0.9-0.3-1.9-0.7-2.8-1L34,87.7l-1.3-0.6 c-0.9-0.4-1.8-0.8-2.6-1.3c-0.8-0.5-1.6-1-2.4-1.5c-3.1-2.1-5.9-4.5-8.1-7.1c-1.2-1.2-2.1-2.7-3.1-4c-0.5-0.6-0.8-1.4-1.2-2 c-0.4-0.7-0.8-1.3-1.1-2c-0.3-0.7-0.6-1.3-0.9-2c-0.3-0.7-0.6-1.3-0.8-1.9c-0.4-1.3-0.9-2.5-1.2-3.7c-0.3-1.2-0.5-2.3-0.7-3.3 c-0.2-1-0.3-2-0.4-2.8c-0.1-0.4-0.1-0.8-0.1-1.2c0-0.4,0-0.7,0-1.1c0-0.7,0-1.2,0-1.7C10,50.5,10,50,10,50z' fill='#b4b197' filter='url(#uil-ring-shadow)'><animateTransform attributeName='transform' type='rotate' from='0 50 50' to='360 50 50' repeatCount='indefinite' dur='1s'></animateTransform></path></svg>");
		$("#response p").html("");
		$("#closelightbox").html("Abort");
		$("#response").fadeIn();
		jqxhr = $.post("contactform.php", ajaxdata)
		.done(function (r) {
			result = JSON.parse(r);
			if(result.status=="done"){				
				$("form").trigger("reset");
			}		
			$("#response h2").html(result.heading);				
			$("#response p").html(result.message);			
		})
		.fail(function (r) {
			$("#response h2").html("Oops!");
			$("#response p").html("Something's wrong.");
			$("#response span, #retry").show();			
		})
		.always(function (r) {
			/* alert("kamu mengirim " + ajaxdata + " dan menerima "+r); */
			$("fieldset").prop( "disabled", false );
			$("#closelightbox").html("Close");
			/* $("#send").html("Send"); */
			/* $("#response").fadeIn(); */
		});		
	});
	$(document).on("click","#closelightbox",function(){//bind atau attach event handler ke elemen baru
		$("#response").fadeOut(function(){
			jqxhr.abort();
			$("#response span, #retry").hide();
			$("#closelightbox").html("Close");
			$("fieldset").prop( "disabled", false );
		});		
	});
	$(document).on("click","#retry",function(){					
						ajaxbutton.trigger("click");
						$("#response span, #retry").hide();								
				});
	formclone = $("#mobile-form form").clone(true);
});