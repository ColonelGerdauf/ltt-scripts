// ==UserScript==
// @name         LTT Dark Theme Color Fixer
// @namespace    http://linustechtips.com/main/user/10813-colonel-mortis/
// @description  Changes dark colors to white, for use with the dark theme on the linustechtips.com forums
// @match        *://*.linustechtips.com/main/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @version      1.1.0
// @updateURL    https://github.com/stormdr1ve/ltt-scripts/raw/release/User%20Scripts/Dark%20Theme%20Fixer.user.js
// @downloadURL  https://github.com/stormdr1ve/ltt-scripts/raw/release/User%20Scripts/Dark%20Theme%20Fixer.user.js
// @grant        none
// ==/UserScript==

// EDIT: Modified the condition so that it is based on the colour of the post frame instead of the post text colour. It also evaluates
// the difference of brightness between the post frame and the text or text background.
//Credit to Colonel_Gerdauf - http://linustechtips.com/main/user/87017-colonel-gerdauf/

//The "STW" (seems to work) text readability colour comparison algorithm
//Based on http://colaargh.blogspot.co.uk/2012/02/readable-text-in-colour.html
//a and b are arrays in the form [r, g, b]
//returns a value between 0 and 255 of the effective difference between the two colours
function getReadabilityDiff (a, b) {
  //Raises the brightness to the power of 2.2155, then multiplies it by the following weightings:
  //Weightings: R: 0.22475
  //            G: 0.7195
  //            B: 0.05575
  // values are then scaled by 1/841.685 to give a value between 0 and 255
  // The value is then rounded, and the difference between the values is returned
  return Math.abs(
    Math.round(
      (Math.pow(a[0], 2.2155) * (0.22475 / 841.685)) +
      (Math.pow(a[1], 2.2155) * (0.7195  / 841.685)) +
      (Math.pow(a[2], 2.2155) * (0.05575 / 841.685))
    ) - Math.round(
      (Math.pow(b[0], 2.2155) * (0.22475 / 841.685)) +
      (Math.pow(b[1], 2.2155) * (0.7195  / 841.685)) +
      (Math.pow(b[2], 2.2155) * (0.05575 / 841.685))
    )
  );
}

var $jq = jQuery.noConflict();

var bodyColour = $jq("body").css("background-color");
bodyColour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(bodyColour);
bodyColour.splice(0,1);

if(getReadabilityDiff([0,0,0], bodyColour)) { //In a night theme
  $jq(".post [style]:not(.bbc_spoiler_content), .signature [style]:not(.bbc_spoiler_content), .entry [style]:not(.bbc_spoiler_content)").each(function(){

  	var $this = $jq(this);

  	var colour = $this.css("color");
  	var bgcolour = $this.css("background-color");

  	colour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(colour);
  	bgcolour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(bgcolour);
    if(colour !== null) colour.splice(0, 1); //We only want the r, g and b values
    if(bgcolour !== null) bgcolour.splice(0,1);

  	// calculate the brightness of the post frame
  	var blockColour = $this.closest('.post_block').css("background-color");

  	if (blockColour === "rgba(0, 0, 0, 0)" || blockColour === "transparent")
  	{
  		blockColour = $this.closest('.paper-card').css("background-color");
  	}

  	blockColour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(blockColour);
    blockColour.splice(0,1);
		if(colour !== null) {

			if (getReadabilityDiff(colour, blockColour) < 20) {
				//Reset the text colour
				$this.css({color:""});

				//Add the message to the top of the post
				if($this.parents(".post").length > 0 && $this.parents(".post_body").attr("data-darkThemePostFixed") !== "true") { //Is in the main post body
					$this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer</span>");
					$this.parents(".post_body").attr("data-darkThemePostFixed","true");
				} else if ($this.parents(".signature").length > 0 && $this.parents(".post_body").attr("data-darkThemeSigFixed") !== "true") { //Is in the signature
					$this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer</span>");
					$this.parents(".post_body").attr("data-darkThemeSigFixed","true");
				}
			}
		}
		if (bgcolour !== null)
		{
      //Actually, lets just get rid of all background colour
			//if(getReadabilityDiff(bgcolour, blockColour) > 32) { //Get the difference in colour between the post background and the text background
				$this.css({"background-color":""});
				if($this.parents(".post").length > 0 && $this.parents(".post_body").attr("data-darkThemePostFixed") !== "true") { //Is in the main post body
					$this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer</span>");
					$this.parents(".post_body").attr("data-darkThemePostFixed","true");
				} else if ($this.parents(".signature").length > 0 && $this.parents(".post_body").attr("data-darkThemeSigFixed") !== "true") { //Is in the signature
					$this.parents(".post_body").children(".posted_info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer</span>");
					$this.parents(".post_body").attr("data-darkThemeSigFixed","true");
				}
			//}
  		}
  });

  $jq(".entry .ipsType_textblock").css({color:"#CFCFCF"}); //Blog
}
