(()=>{"use strict";let e=((e=[])=>({addProjects:t=>e.push(t),showProjects:()=>{for(let t of e)console.log(t)},deleteProjects:()=>{e=[]}}))();function t(...e){for(let t of e)t.classList.toggle("hidden")}const o=(e,t,o,c)=>{let l=document.createElement(t);null!=c&&l.classList.add(c),null!=o&&(l.textContent=o),e.appendChild(l)};(()=>{let c=["div","em"];const l=document.querySelector("#sidebar");let r=(e=>{const o=document.querySelector(".type-project-name"),c=document.querySelector(".overlay"),l=document.querySelector("#btn-cancel-project"),r=document.querySelector("#btn-project-name");return e.addEventListener("click",(()=>{t(o,c)})),l.addEventListener("click",(()=>{t(o,c)})),r})(document.querySelector("#btn-add-project")),n="";r.addEventListener("click",(()=>{e.deleteProjects(),n=(e=>{const o=document.querySelector("#project-name"),c=document.querySelector(".overlay-title"),l=document.querySelector(".type-project-name"),r=document.querySelector(".overlay");if(""!=o.value)return t(l,r),c.textContent="Add new Project name",e=o.value,o.value="",e;c.textContent="Please fill in a project name"})(n),o(l,c[0],n,"project");let r=document.querySelectorAll(".project");for(let t of r)e.addProjects(t),0==t.children.length&&o(t,c[1],"X","delete")}))})(),document.querySelector(".delete").addEventListener("click",(()=>{console.log("hello")}))})();