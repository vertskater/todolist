(()=>{"use strict";function e(e,t,n,d){let i=document.createElement("div");i.classList.add("project"),i.dataset.index=d,i.textContent=t;let l=document.createElement("em");return l.classList.add("delete"),l.textContent=n,i.appendChild(l),{expandHtml:()=>e.appendChild(i),div:i,isActive:!1}}function t(e,t,n,d){const i=document.createElement("aside");i.classList.add("type-project-name");const l=document.createElement("h2");l.classList.add("overlay-title"),l.textContent=t;const o=document.createElement("input");o.id="project-name",o.type="text";const a=document.createElement("button");a.id="btn-project-name",a.textContent=n;const c=document.createElement("button");return c.id="btn-cancel-project",c.textContent=d,i.appendChild(l),i.appendChild(o),i.appendChild(a),i.appendChild(c),{expandHtml:()=>e.appendChild(i),aside:i,button1:a,button2:c,input:o,h2:l}}let n=[];const d=()=>{for(let e of n)e.isActive=!1},i=(...e)=>{for(let t of e)t.classList.toggle("hidden")},l=(e,t)=>{for(let e of n)e.div.style.backgroundColor="white";e.isActive?t.style.backgroundColor="lightgreen":t.style.backgroundColor="white"},o=()=>{let e=1;for(let t of n)t.div.dataset.index=e,e++},a=((()=>{const o=document.querySelector("#sidebar"),a=document.querySelector("main"),c=document.querySelector("#btn-add-project");let r=document.querySelector(".overlay"),s=new e(o,"Default","X",1);s.isActive=!0,n.push(s),l(s,s.div);let u=new t(a,"Add new project name","Add Project","Cancel");s.expandHtml(),c.addEventListener("click",(()=>{u.expandHtml(),i(u.aside,r)})),u.button2.addEventListener("click",(()=>{i(u.aside,r),u.h2.textContent="Add new Project name",u.input.value=""})),u.button1.addEventListener("click",(()=>{if(""===u.input.value)u.h2.textContent="Please type in a Project name";else{let t=new e(o,u.input.value,"X",n.length+1);n.push(t),t.expandHtml(),d(),t.isActive=!0,u.input.value="",i(u.aside,r),l(t,t.div)}}))})(),document.querySelector("#sidebar"));a.addEventListener("click",(e=>{let t=e.target;for(;null!=t;){if(t.matches(".project")){let e=n[t.dataset.index-1];return d(),e.isActive=!0,console.log(e,e.div),l(e,e.div),void console.log(n)}t=t.parentElement}}),!0),a.addEventListener("click",(e=>{let t=e.target;for(;null!=t;){if(t.matches(".delete"))return n[t.parentElement.dataset.index-1].isActive&&(d(),n[0].isActive=!0,l(n[0],n[0].div)),n.length<=1?void o():(n.splice([t.dataset.index-1],1),o(),void t.parentElement.remove());t=t.parentElement}}),!0)})();