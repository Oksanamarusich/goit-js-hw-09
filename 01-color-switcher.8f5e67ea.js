!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),a=document.querySelector("body");t.addEventListener("click",(function(d){n=setInterval((function(){a.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),t.disabled=!0,e.disabled=!1}),1e3)})),e.addEventListener("click",(function(a){clearInterval(n),e.disabled=!0,t.disabled=!1}));var n=null}();
//# sourceMappingURL=01-color-switcher.8f5e67ea.js.map