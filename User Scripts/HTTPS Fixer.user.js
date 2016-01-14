// ==UserScript==
// @name         LTT HTTPS fixer
// @namespace    82e11f335ebd00f220114d3f419a43b7
// @description  Fixes HTTPS on linustechtips.com by replacing all internal URLs with https equivalents and redirecting to https if required.
// @match        *://*.linustechtips.com/*
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @version      1.1.0
// @updateURL    https://github.com/stormdr1ve/ltt-scripts/raw/release/User%20Scripts/HTTPS%20Fixer.user.js
// @downloadURL  https://github.com/stormdr1ve/ltt-scripts/raw/release/User%20Scripts/HTTPS%20Fixer.user.js
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

var $jq = jQuery.noConflict(),
  mode = GM_getValue("mode", "fix");

function replace (attr, $this, all)
{
  var url = $this.attr(attr);
  if(all || /^http:\/\/(?:[^\.]+\.)?linustechtips\.com/.test(url)===true)
  {
    url = url.replace(/^(http:\/\/)/,"//");
    $this.attr(attr,url);
  }
}

if(mode !== "off")
{
  if (window.location.protocol === "http:" && mode === "force")
  {
    window.location.replace (window.location.href.replace(/^(http:\/\/)/,"https://"));
  }
  if (window.location.protocol === "https:")
  {
    document.addEventListener("DOMContentLoaded", function (){
      $jq("a").each(function(){
        replace("href", $jq(this), false);
      });
      $jq("link").each(function(){
        replace("href", $jq(this), true);
      });
      $jq("[src]").each(function(){
        replace("src", $jq(this), true);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", function (){
  $jq ("#footer_utilities > ul").append($jq("<li>", {id:"lttn-ue-https"})
                                .append($jq("<a>", {id:'lttn-ue-https-config', href:'javascript:void(0)'})
                                .text(["HTTPS Fixer",mode].join(": "))));

  $jq("#lttn-ue-https-config").click(function(event){
    event.preventDefault();
    if(mode === "off")
    {
    	mode = "fix";
    }
    else if (mode === "fix")
    {
    	mode = "force";
    }
    else
    {
    	mode = "off";
    }
    GM_setValue("mode", mode);
    $jq(this).text(["HTTPS Fixer",mode].join(": "));
  });
});
