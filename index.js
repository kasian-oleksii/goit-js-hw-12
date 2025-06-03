import{a as p,S as b,i as n}from"./assets/vendor-DxEWe7lX.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function i(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=i(e);fetch(e.href,s)}})();const L="50384858-0b7fb3bc045111b4da7b5b4d8",v="https://pixabay.com/api/";async function u(r,t=1){const i={key:L,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};try{return(await p.get(v,{params:i})).data}catch{throw new Error("Error fetching images")}}let m;function f(r){const t=document.getElementById("gallery"),i=r.map(o=>`
        <li class="gallery-item">
          <a href="${o.largeImageURL}">
            <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
          </a>
          <div class="info">
            <div class="info-item">
              <b>Likes</b>${o.likes}
            </div>
            <div class="info-item">
              <b>Views</b>${o.views}
            </div>
            <div class="info-item">
              <b>Comments</b>${o.comments}
            </div>
            <div class="info-item">
              <b>Downloads</b>${o.downloads}
            </div>
          </div>
        </li>
      `).join("");t.insertAdjacentHTML("beforeend",i),m?m.refresh():m=new b(".gallery a")}function E(){const r=document.getElementById("gallery");r.innerHTML=""}function y(){document.getElementById("loader").classList.remove("hidden")}function g(){document.getElementById("loader").classList.add("hidden")}function w(){document.getElementById("load-more").classList.remove("hidden")}function h(){document.getElementById("load-more").classList.add("hidden")}const B=document.getElementById("search-form"),I=document.getElementById("load-more");let l="",a=1,c=0;B.addEventListener("submit",async r=>{if(r.preventDefault(),l=r.target.elements.searchQuery.value.trim(),!l){n.warning({title:"Warning",message:"Please enter a search query"});return}a=1,E(),h(),y();try{const t=await u(l,a);if(c=t.totalHits,t.hits.length===0){n.info({title:"Info",message:"No images found. Please try another query."});return}f(t.hits),n.success({title:"Success",message:`Hooray! We found ${c} images.`}),c>15&&w()}catch{n.error({title:"Error",message:"Failed to fetch images. Please try again later."})}finally{g()}});I.addEventListener("click",async()=>{a+=1,y();try{const r=await u(l,a);f(r.hits);const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),a*15>=c&&(h(),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results."}))}catch{n.error({title:"Error",message:"Failed to fetch more images. Please try again later."})}finally{g()}});
//# sourceMappingURL=index.js.map
