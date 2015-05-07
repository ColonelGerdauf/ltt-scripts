// ==UserScript==
// @name LTT OP Highlighter
// @namespace   http://linustechtips.com/main/user/10813-colonel-mortis/
// @version 1.1.0
// @description Marks the original poster of a thread with "[Original Poster]" to help with reading long threads
// @include /^https?:\/\/(?:[^\.]+\.)?linustechtips\.com\/main\/topic\/.*$/
// @require https://code.jquery.com/jquery-2.1.4.min.js
// @updateURL   https://monkeyguts.com/212.meta.js?c
// @downloadURL https://monkeyguts.com/212.user.js?c
// ==/UserScript==

var $jq = jQuery.noConflict();
var OP = $jq("span[itemprop='creator'] [itemprop='name']").text();
var newDayTheme = $jq(".author_info .author").length > 0;
$jq(".post_block").each(function(){
	if($jq(this).find(".author").text() === OP){
		if(newDayTheme) {
			$jq(this).find(".author_info .author")
				.after($jq("<div>", {class:"lttn-OP"}).text("Original Poster"));
		} else {
			$jq(this).find("h3.row2")
            	.append($jq("<span>", {class:"lttn-OP"}).text("[Original Poster]"));
		}
	}
	});
	
var css = ".lttn-OP {"+
	"color: #DB4105;"+
	"font-size: 1.2em;"+
	"}";

if(!newDayTheme) {
	css = ".lttn-OP {"+
        "color: #DB4105;"+
        "margin-left: 2px;"+
        "}";
}
	
$jq("head").append($jq("<style>", {id:'lttn-user-style-OPHL'})
	.text(css));