// ==UserScript==
// @name         LTT OP Highlighter
// @namespace    http://linustechtips.com/main/user/10813-colonel-mortis/
// @version      1.1.1
// @description  Marks the original poster of a thread with "[Original Poster]" to help with reading long threads
// @match        *://linustechtips.com/main/topic/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @updateURL    https://github.com/stormdr1ve/ltt-scripts/raw/release/User%20Scripts/OP%20Highlighter.user.js
// @downloadURL  https://github.com/stormdr1ve/ltt-scripts/raw/release/User%20Scripts/OP%20Highlighter.user.js
// @grant        none
// ==/UserScript==

// EDIT: Colour changes have been made to make them more suitable for the night theme, without breaking the day theme.

var $jq = jQuery.noConflict();
var OP = $jq("span[itemprop='creator'] [itemprop='name']").text();
var newTheme = $jq(".author_info .author").length > 0;
$jq(".post_block").each(function(){
	if($jq(this).find(".author").text() === OP)
	{
		if(newTheme)
        	{
			$jq(this).find(".author_info .author")
				.after($jq("<div>", {class:"lttn-OP"}).text("Original Poster"));
		}
		else
		{
			$jq(this).find("h3.row2")
            	.append($jq("<span>", {class:"lttn-OP"}).text("[Original Poster]"));
		}
	}
	});

var css = ".lttn-OP {"+
	"color: #e64405;"+
	"font-size: 1.2em;"+
	"}";

if(!newTheme)
{
	css = ".lttn-OP {"+
        "color: #0bfa31;"+
        "margin-left: 2px;"+
        "}";
}

$jq("head").append($jq("<style>", {id:'lttn-user-style-OPHL'})
	.text(css));
