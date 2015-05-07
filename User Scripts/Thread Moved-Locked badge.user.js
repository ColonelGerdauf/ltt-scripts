// ==UserScript==
// @name LTT Thread moved/locked badge
// @namespace   http://linustechtips.com/main/user/10813-colonel-mortis/
// @version 1.1.0
// @description Adds a badge to a thread title (in the thread list) to indicate whether it has been locked or moved, like "answered" is handled currently
// @include /^https?:\/\/linustechtips\.com\/main\/forum\/.*$/
// @updateURL   https://monkeyguts.com/496.meta.js?c
// @downloadURL https://monkeyguts.com/496.user.js?c
// ==/UserScript==


//get all the thread icons in an array
var threads = document.getElementsByClassName("col_f_icon");

//iterate through array and assign icons as required
for (var l = 1; l<threads.length; l++){ //yes, starting on 1 is deliberate
	if(threads[l].children[0]){ //is unread, locked or moved
		var icon = threads[l].children[0];
		switch(icon.attributes.title.value) {
			case 'This topic is locked':
				threads[l].parentElement.getElementsByClassName("col_f_content")[0].insertAdjacentHTML("afterbegin","<span class='ipsBadge ipsBadge_red has_icon'>Locked</span>");
				break;
			case 'Go to first unread post':
				break;
			case 'This topic has been moved':
				threads[l].parentElement.getElementsByClassName("col_f_content")[0].insertAdjacentHTML("afterbegin","<span class='ipsBadge ipsBadge_grey has_icon'>Moved</span>");
				break;
			/*default: //unknown thread type - replace with warning later
				icon.innerHTML = '<b>ERR</b>';
				console.log("Err - "+icon.attributes.title.value);
				break;*/
		}
	} else { //thread is read and can be posted in
		//threads[l].innerHTML = '<img alt="New Replies" src="http://linustechtips.com/main/public/style_images/day_theme_images_new/t_unread.png">';
		//Day theme has nothing here
	}
}