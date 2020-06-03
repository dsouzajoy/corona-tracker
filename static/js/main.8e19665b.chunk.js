(this["webpackJsonpcorona-tracker"]=this["webpackJsonpcorona-tracker"]||[]).push([[0],{19:function(e,a,t){e.exports=t(36)},24:function(e,a,t){},25:function(e,a,t){},26:function(e,a,t){},29:function(e,a,t){},30:function(e,a,t){},31:function(e,a,t){},32:function(e,a,t){},36:function(e,a,t){"use strict";t.r(a);var n=t(0),c=t.n(n),r=t(15),s=t.n(r),l=(t(24),t(25),t(8)),o=(t(26),t(16));t(29);var i=function(e){var a=e.title,t=e.value;return e.delta,c.a.createElement("div",{className:"Confirmed"===a?"card card-blue":"Active"===a?"card card-red":"Recovered"===a?"card card-green":"Deceased"===a&&"card card-grey"},"Confirmed"===a?c.a.createElement("i",{className:"fas fa-virus fa-4x"}):"Active"===a?c.a.createElement("i",{className:"fas fa-viruses fa-4x"}):"Recovered"===a?c.a.createElement("i",{className:"fas fa-shield-virus fa-4x"}):"Deceased"===a&&c.a.createElement("i",{className:"fas fa-skull-crossbones fa-4x"}),c.a.createElement("div",{className:"card-info"},c.a.createElement("h3",null,a),c.a.createElement("p",null,t)))};t(30);var m=function(e){var a=e.colHeaders,t=e.data;return c.a.createElement("table",{className:"table"},c.a.createElement("thead",null,c.a.createElement("tr",null,a.map((function(e,a){return c.a.createElement("th",{key:a},e)})))),c.a.createElement("tbody",null,t.map((function(e,a){return c.a.createElement("tr",{key:a},c.a.createElement("td",null,"IN-UT"===e.state?"Uttarakhand":"IN-AN"===e.state?"Andaman and Nicobar":"Orissa"===e.state?"Odisha":e.state),c.a.createElement("td",null,e.confirmed.toLocaleString("en-IN")),c.a.createElement("td",null,e.active.toLocaleString("en-IN")),c.a.createElement("td",null,e.deaths.toLocaleString("en-IN")),c.a.createElement("td",null,e.recovered.toLocaleString("en-IN")))}))))};var d=function(){var e=Object(n.useState)([["State","Cases","Display"]]),a=Object(l.a)(e,2),t=a[0],r=a[1],s=Object(n.useState)({}),d=Object(l.a)(s,2),u=d[0],f=d[1],v=Object(n.useState)([]),E=Object(l.a)(v,2),h=E[0],N=E[1],p=Object(n.useState)(!0),g=Object(l.a)(p,2),b=g[0],w=g[1];return Object(n.useEffect)((function(){w(!0);var e=[["State","Active Cases"]];fetch("https://stats-corona.herokuapp.com/all",{mode:"cors",headers:{"Content-Type":"application/json"}}).then((function(e){return e.json()})).then((function(a){f(a[0]),N(a[1].state_data),a[1].state_data.forEach((function(a){"Odisha"===a.state?a.state="Orissa":"Uttarakhand"===a.state?a.state="IN-UT":"Andaman and Nicobar"===a.state&&(a.state="IN-AN"),e.push([a.state,a.active])})),r(e),w(!1)}))}),[]),c.a.createElement("div",{className:"home"},b?c.a.createElement("span",{className:"loader"},"Loading..."):c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:"chart-container"},c.a.createElement("h3",{className:"chart-heading"},"State wise active cases"),c.a.createElement(o.a,{loader:c.a.createElement("span",null,"Loading..."),width:window.innerWidth<600?window.innerWidth:600,chartType:"GeoChart",data:t,rootProps:{"data-testid":"1"},var:!0,options:{enableRegionInteractivity:!0,domain:"IN",region:"IN",displayMode:"regions",resolution:"provinces",colorAxis:{colors:["#fff","#ffac7f","#ff7a33","#ff5900","#cc4700"]},backgroundColor:"transparent",datalessRegionColor:"#123456",defaultColor:"#ccc"}}),c.a.createElement("span",{className:"text-sorry"},c.a.createElement("i",{className:"fas fa-heart-broken"}),"\xa0we regret the discrepancies in visualizing certain states/union territories we are working on his issue  "),c.a.createElement("span",{className:"text-info"},c.a.createElement("i",{className:"fa fa-info-circle"}),"\xa0Click on a state to see its active cases.")),c.a.createElement("div",{className:"cards-container"},c.a.createElement(i,{title:"Confirmed",value:u.confirmed_cases.toLocaleString("en-IN")}),c.a.createElement(i,{title:"Active",value:u.active_cases.toLocaleString("en-IN")}),c.a.createElement(i,{title:"Recovered",value:u.recovered_cases.toLocaleString("en-IN")}),c.a.createElement(i,{title:"Deceased",value:u.death_cases.toLocaleString("en-IN")})),c.a.createElement("span",{className:"text-table-info"},c.a.createElement("i",{className:"fa fa-info-circle"}),"\xa0Scroll on the table too see all details"),c.a.createElement("div",{className:"table-container"},c.a.createElement(m,{colHeaders:["State","Confirmed","Active","Deaths","Recovered"],data:h}))))};t(31);var u=function(){return c.a.createElement("div",{className:"news"},"News")};t(32);var f=function(){return c.a.createElement("div",{className:"footer"},c.a.createElement("div",{className:"authors"},"Made with ",c.a.createElement("i",{className:"fas fa-heart"})," by Joy Dsouza, Praneeth R K and Niranjan Malya."),c.a.createElement("div",{className:"copyrights"},"\xa9 ",(new Date).getFullYear()," All Rights Reserved."))},v=t(1);var E=function(){return c.a.createElement("div",{className:"App"},c.a.createElement(v.c,null,c.a.createElement(v.a,{exact:!0,path:"/",component:d}),c.a.createElement(v.a,{path:"/news",component:u})),c.a.createElement(f,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var h=t(10);s.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(h.a,{basename:"/corona-tracker"},c.a.createElement(E,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[19,1,2]]]);
//# sourceMappingURL=main.8e19665b.chunk.js.map