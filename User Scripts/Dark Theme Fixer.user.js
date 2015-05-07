// ==UserScript==
// @name LTT Dark Theme Color Fixer
// @namespace   http://linustechtips.com/main/user/10813-colonel-mortis/
// @description Changes dark colors to white, for use with the dark theme on the linustechtips.com forums
// @include /^https?:\/\/(?:[^\.]+\.)?linustechtips\.com\/main\/(?:topic|blogs|blog)\/?.*$/
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @version 1.0.0
// @updateURL   https://github.com/stormdr1ve/ltt-scripts/raw/master/User%20Scripts/Dark%20Theme%20Fixer.user.js
// @downloadURL https://github.com/stormdr1ve/ltt-scripts/raw/master/User%20Scripts/Dark%20Theme%20Fixer.user.js
// @grant none
// ==/UserScript==

var $jq = jQuery.noConflict();

var theme3 = $jq(".paper-card").length > 0; //new day theme

$jq(".post [style]:not(.bbc_spoiler_content), .signature [style]:not(.bbc_spoiler_content), .entry [style]:not(.bbc_spoiler_content)").each(function(){
	var $this = $jq(this);
	var colour = $this.css("color"), bgcolour = $this.css("background-color");
	colour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(colour);
	bgcolour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(bgcolour);
	if(colour !== null) {
		var l = Math.max(colour[1],colour[2],colour[3]) + Math.min(colour[1],colour[2],colour[3]);
		l /= 5.1; //express as %
		if (l<40) {
			$this.css({color:"inherit"});
			if($this.parents(".post").length > 0 && $this.parents(".post_body").attr("darkThemePostFixed") !== "true"){ //Is in the main post body
				if(theme3) $this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer</span>");
				else $this.parents(".post_body").children(".posted_info").append("&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer");
				$this.parents(".post_body").attr("darkThemePostFixed","true");
			}
			else if ($this.parents(".signature").length > 0 && $this.parents(".post_body").attr("darkThemeSigFixed") !== "true"){ //Is in the signature
				if(theme3) $this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer</span>");
				else $this.parents(".post_body").children(".posted_info").append("&nbsp&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer");
				$this.parents(".post_body").attr("darkThemeSigFixed","true");
			}
		}
	} if (bgcolour !== null) {
		var l = Math.max(bgcolour[1],bgcolour[2],bgcolour[3]) + Math.min(bgcolour[1],bgcolour[2],bgcolour[3]);
		l /= 5.1; //express as %
		if(l>60) {
			$this.css({"background-color":""});
			if($this.parents(".post").length > 0 && $this.parents(".post_body").attr("darkThemePostFixed") !== "true"){ //Is in the main post body
				if(theme3) $this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer</span>");
				else $this.parents(".post_body").children(".posted_info").append("&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer");
				$this.parents(".post_body").attr("darkThemePostFixed","true");
			}
			else if ($this.parents(".signature").length > 0 && $this.parents(".post_body").attr("darkThemeSigFixed") !== "true"){ //Is in the signature
				if(theme3) $this.parents(".post_body").children(".posted_info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer</span>");
				else $this.parents(".post_body").children(".posted_info").append("&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer");
				$this.parents(".post_body").attr("darkThemeSigFixed","true");
			}
		}
	}
});

$jq(".entry .ipsType_textblock").css({color:"#CFCFCF"});