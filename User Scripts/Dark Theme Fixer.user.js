// ==UserScript==
// @name         LTT Dark Theme Color Fixer
// @namespace    http://linustechtips.com/main/user/10813-colonel-mortis/
// @description  Changes dark colors to white, for use with the dark theme on the linustechtips.com forums
// @match        *://*.linustechtips.com/main/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @version      1.0.1
// @updateURL    https://github.com/stormdr1ve/ltt-scripts/raw/master/User%20Scripts/Dark%20Theme%20Fixer.user.js
// @downloadURL  https://github.com/stormdr1ve/ltt-scripts/raw/master/User%20Scripts/Dark%20Theme%20Fixer.user.js
// @grant        none
// ==/UserScript==

// EDIT: Modified the condition so that it is based on the colour of the post frame instead of the post text colour. It also evaluates 
// the difference of brightness between the post frame and the text or text background.

var $jq = jQuery.noConflict();

var theme3 = $jq(".paper-card").length > 0; //new theme

$jq(".post [style]:not(.bbc_spoiler_content), .signature [style]:not(.bbc_spoiler_content), .entry [style]:not(.bbc_spoiler_content)").each(function(){

    var $this = $jq(this);

    // calculate the brightness of the post frame

    var pfcolour = $this.closest('.post_block').css("background-color");

    if (pfcolour === "rgba(0, 0, 0, 0)" || pfcolour === "transparent")
    {
        pfcolour = $this.closest('.paper-card').css("background-color");
    }

    pfcolour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(pfcolour);
    var back = Math.max(pfcolour[1],pfcolour[2],pfcolour[3]) + Math.min(pfcolour[1],pfcolour[2],pfcolour[3]);
    back /= 5.1; //express as %
    
    if(back < 40)
    {
        var colour = $this.css("color");
        colour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(colour);
        
        var bgcolour = $this.css("background-color");
        bgcolour = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/.exec(bgcolour);
        
        var fore = Math.max(colour[1],colour[2],colour[3]) + Math.min(colour[1],colour[2],colour[3]);
        fore /= 5.1; //express as %
        
        if(colour !== null)
        {
            if (Math.abs(back - fore) < 32) 
            {
                $this.css({color:"inherit"});
                if($this.parents(".post").length > 0 && $this.parents(".post_body").attr("darkThemePostFixed") !== "true")
                { //Is in the main post body
                    if(theme3)
                    {
                        $this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer</span>");
                    }
                    else
                    {
                        $this.parents(".post_body").children(".posted_info").append("&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer");
                    }
                    $this.parents(".post_body").attr("darkThemePostFixed","true");
                }
                else if ($this.parents(".signature").length > 0 && $this.parents(".post_body").attr("darkThemeSigFixed") !== "true")
                { //Is in the signature
                    if(theme3) 
                    {
                        $this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer</span>");
                    }
                    else 
                    {
                        $this.parents(".post_body").children(".posted_info").append("&nbsp&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer");
                    }
                    $this.parents(".post_body").attr("darkThemeSigFixed","true");
                }
            }
        } 
        if (bgcolour !== null) 
        {
            var mid = Math.max(bgcolour[1],bgcolour[2],bgcolour[3]) + Math.min(bgcolour[1],bgcolour[2],bgcolour[3]);
            mid /= 5.1; //express as %
            
            if(Math.abs(fore - mid) < 40) 
            {
                $this.css({"background-color":""});
                if($this.parents(".post").length > 0 && $this.parents(".post_body").attr("darkThemePostFixed") !== "true")
                { //Is in the main post body
                    if(theme3) 
                    {
                        $this.parents(".post_body").children(".cm-post-info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer</span>");
                    }
                    else
                    {
                        $this.parents(".post_body").children(".posted_info").append("&nbsp;&nbsp;|&nbsp;&nbsp;Post colors changed by the Dark Theme Fixer");
                    }
                    $this.parents(".post_body").attr("darkThemePostFixed","true");
                }
                else if ($this.parents(".signature").length > 0 && $this.parents(".post_body").attr("darkThemeSigFixed") !== "true")
                { //Is in the signature
                    if(theme3)
                    {
                        $this.parents(".post_body").children(".posted_info").append("<span class='ipsType_small left desc lighter'>&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer</span>");
                    }
                    else 
                    {
                        $this.parents(".post_body").children(".posted_info").append("&nbsp;&nbsp;|&nbsp;&nbsp;Signature colors changed by the Dark Theme Fixer");
                    }
                    $this.parents(".post_body").attr("darkThemeSigFixed","true");
                }
            }
        }
    }
});

$jq(".entry .ipsType_textblock").css({color:"#CFCFCF"});
