const NS='http://www.w3.org/2000/svg';
const stage=document.getElementById('stage');
const beamsLayer=document.getElementById('beamsLayer');
const objectsLayer=document.getElementById('objectsLayer');
const inspectorEmpty=document.getElementById('inspectorEmpty');
const inspectorFields=document.getElementById('inspectorFields');
const selectionHint=document.getElementById('selectionHint');
const previewScene=document.getElementById('previewScene');
const previewLabel=document.getElementById('previewLabel');
const cameraReadout=document.getElementById('cameraReadout');
const focalInput=document.getElementById('focalInput');
const cameraModel=document.getElementById('cameraModel');

const cameras={
  'Sony FX3':{w:35.6,h:23.8},
  'Sony FX6':{w:35.7,h:18.8},
  'Sony a7S III':{w:35.6,h:23.8},
  'Full Frame 3:2':{w:36,h:24},
  'Super 35 / APS-C':{w:23.5,h:15.6}
};

const lightPresets=[
  {group:'Halo · bi-color',name:'amaran Halo 60x',type:'COB',beam:55},
  {group:'Halo · bi-color',name:'amaran Halo 100x',type:'COB',beam:55},
  {group:'Halo · bi-color',name:'amaran Halo 200x',type:'COB',beam:55},
  {group:'Halo · bi-color',name:'amaran Halo 300x',type:'COB',beam:55},
  {group:'Halo · bi-color',name:'amaran Halo 600x',type:'COB',beam:55},
  {group:'Ray · full color',name:'amaran Ray 120c',type:'COB RGB',beam:55},
  {group:'Ray · full color',name:'amaran Ray 360c',type:'COB RGB',beam:55},
  {group:'Ray · full color',name:'amaran Ray 660c',type:'COB RGB',beam:55},
  {group:'Classiques',name:'amaran 150c',type:'COB RGB',beam:55},
  {group:'Classiques',name:'amaran 300c',type:'COB RGB',beam:55},
  {group:'Tubes',name:'amaran T2c',type:'Tube RGB',beam:120},
  {group:'Tubes',name:'amaran T4c',type:'Tube RGB',beam:120}
];

let state={objects:[],selected:null,cameraModel:'Sony FX3',focal:50};
let drag=null;
const SCALE=100; // px par mètre

function uid(prefix){return prefix+'_'+Math.random().toString(36).slice(2,8)}
function rad(d){return d*Math.PI/180}
function deg(r){return r*180/Math.PI}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)/SCALE}
function esc(s){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}

function seed(){
  state.objects=[
    {id:uid('cam'),kind:'camera',name:'Caméra A',x:500,y:505,rot:-90},
    {id:uid('subj'),kind:'subject',name:'Sujet 1',x:500,y:300,rot:90,height:1.75},
    {id:uid('light'),kind:'light',name:'amaran Halo 200x',lightType:'COB',x:285,y:330,rot:-15,beam:55,intensity:60,height:2.0}
  ];
  state.selected=state.objects[2].id;
}

function populateSelects(){
  const groups={}; lightPresets.forEach(p=>(groups[p.group]??=[]).push(p));
  const lightSelect=document.getElementById('lightPreset');
  Object.entries(groups).forEach(([label,items])=>{
    const og=document.createElement('optgroup'); og.label=label;
    items.forEach(p=>{const o=document.createElement('option');o.value=p.name;o.textContent=p.name;og.appendChild(o)});
    lightSelect.appendChild(og);
  });
  Object.keys(cameras).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name;cameraModel.appendChild(o)});
  cameraModel.value=state.cameraModel;
}

function svgEl(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e}

function render(){
  beamsLayer.innerHTML=''; objectsLayer.innerHTML='';
  state.objects.filter(o=>o.kind==='camera').forEach(drawCameraFov);
  state.objects.filter(o=>o.kind==='light').forEach(drawLightBeam);
  state.objects.forEach(drawObject);
  renderInspector(); renderPreview();
}

function drawCameraFov(o){
  const sensor=cameras[state.cameraModel];
  const hfov=2*Math.atan(sensor.w/(2*state.focal));
  const len=460, half=Math.tan(hfov/2)*len;
  const poly=svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'camera-fov',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`});
  beamsLayer.appendChild(poly);
}
function drawLightBeam(o){
  const len=310,half=Math.tan(rad(o.beam/2))*len;
  const poly=svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'beam',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`});
  beamsLayer.appendChild(poly);
}

function drawObject(o){
  const g=svgEl('g',{class:`object ${state.selected===o.id?'selected':''}`,transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`,'data-id':o.id});
  if(o.kind==='camera'){
    g.appendChild(svgEl('circle',{r:36,class:'selection-ring'}));
    g.appendChild(svgEl('rect',{x:-21,y:-16,width:34,height:32,rx:7,class:'camera-body'}));
    g.appendChild(svgEl('polygon',{points:'13,-10 34,-17 34,17 13,10',class:'camera-lens'}));
    g.appendChild(svgEl('rect',{x:-45,y:-38,width:90,height:76,class:'hit'}));
  }else if(o.kind==='subject'){
    g.appendChild(svgEl('circle',{r:34,class:'selection-ring'}));
    g.appendChild(svgEl('ellipse',{cx:0,cy:0,rx:19,ry:29,class:'subject-body'}));
    g.appendChild(svgEl('circle',{cx:17,cy:0,r:9,class:'subject-head'}));
    g.appendChild(svgEl('rect',{x:-38,y:-38,width:76,height:76,class:'hit'}));
  }else{
    g.appendChild(svgEl('circle',{r:34,class:'selection-ring'}));
    if((o.lightType||'').startsWith('Tube')){
      g.appendChild(svgEl('rect',{x:-10,y:-33,width:20,height:66,rx:9,class:'light-body'}));
      g.appendChild(svgEl('circle',{cx:0,cy:-32,r:6,class:'light-lens'}));
    }else{
      g.appendChild(svgEl('rect',{x:-21,y:-17,width:36,height:34,rx:8,class:'light-body'}));
      g.appendChild(svgEl('polygon',{points:'15,-12 34,-18 34,18 15,12',class:'light-lens'}));
    }
    g.appendChild(svgEl('rect',{x:-42,y:-42,width:84,height:84,class:'hit'}));
  }
  // labels remain readable by counter-rotating
  const label=svgEl('g',{transform:`rotate(${-o.rot}) translate(0 50)`});
  const t=svgEl('text',{class:'object-label','text-anchor':'middle'});t.textContent=o.kind==='light'?o.name:o.name;label.appendChild(t);
  if(o.kind==='light') {const st=svgEl('text',{class:'object-sub','text-anchor':'middle',y:17});st.textContent=`${o.intensity}%`;label.appendChild(st)}
  g.appendChild(label);
  g.addEventListener('pointerdown',startDrag);
  g.addEventListener('click',e=>{e.stopPropagation();selectObject(o.id)});
  objectsLayer.appendChild(g);
}

function pointerToStage(e){
  const pt=stage.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(stage.getScreenCTM().inverse());
}
function startDrag(e){
  e.preventDefault(); e.stopPropagation();
  const id=e.currentTarget.dataset.id;selectObject(id);
  const o=state.objects.find(x=>x.id===id),p=pointerToStage(e);
  drag={id,dx:p.x-o.x,dy:p.y-o.y,pointerId:e.pointerId};
  stage.setPointerCapture?.(e.pointerId);
}
stage.addEventListener('pointermove',e=>{
  if(!drag)return;const o=state.objects.find(x=>x.id===drag.id);if(!o)return;
  const p=pointerToStage(e);o.x=clamp(p.x-drag.dx,35,965);o.y=clamp(p.y-drag.dy,35,585);render();
});
stage.addEventListener('pointerup',()=>drag=null);stage.addEventListener('pointercancel',()=>drag=null);
stage.addEventListener('click',()=>{state.selected=null;render()});

function selectObject(id){state.selected=id;render()}
function selected(){return state.objects.find(o=>o.id===state.selected)}

function renderInspector(){
  const o=selected();
  if(!o){inspectorEmpty.classList.remove('hidden');inspectorFields.classList.add('hidden');selectionHint.textContent='Sélectionne un élément';return}
  inspectorEmpty.classList.add('hidden');inspectorFields.classList.remove('hidden');selectionHint.textContent=o.kind==='camera'?'Caméra':o.kind==='subject'?'Personnage':'Projecteur';
  let html=`<div class="field"><label>Nom</label><input data-k="name" value="${esc(o.name)}"></div>`;
  html+=`<div class="field-grid"><div class="field"><label>Rotation</label><div class="field-inline"><input data-k="rot" type="number" min="-180" max="180" value="${Math.round(o.rot)}"><span class="unit">°</span></div></div>`;
  if(o.kind==='subject') html+=`<div class="field"><label>Taille</label><div class="field-inline"><input data-k="height" type="number" min="1" max="2.2" step="0.01" value="${o.height}"><span class="unit">m</span></div></div>`;
  else if(o.kind==='light') html+=`<div class="field"><label>Hauteur</label><div class="field-inline"><input data-k="height" type="number" min="0" max="5" step="0.1" value="${o.height}"><span class="unit">m</span></div></div>`;
  else html+=`<div class="field"><label>Distance sujet</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
  html+=`</div>`;
  if(o.kind==='light'){
    html+=`<div class="field"><label>Intensité</label><div class="field-inline"><input data-k="intensity" type="range" min="0" max="100" value="${o.intensity}"><span class="unit">${o.intensity}%</span></div></div>`;
    html+=`<div class="field"><label>Ouverture du cône</label><div class="field-inline"><input data-k="beam" type="number" min="10" max="160" value="${o.beam}"><span class="unit">°</span></div></div>`;
    html+=`<div class="field"><label>Distance au sujet le plus proche</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
  }
  html+=`<button class="danger" id="deleteSelected">Supprimer cet élément</button>`;
  inspectorFields.innerHTML=html;
  inspectorFields.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('input',()=>{
    const obj=selected();let val=inp.value;if(['rot','height','intensity','beam'].includes(inp.dataset.k))val=Number(val);obj[inp.dataset.k]=val;render();
  }));
  document.getElementById('deleteSelected').onclick=()=>{state.objects=state.objects.filter(x=>x.id!==o.id);state.selected=null;render()};
}
function nearestSubjectDistance(o){const ss=state.objects.filter(x=>x.kind==='subject');if(!ss.length)return 0;return Math.min(...ss.map(s=>dist(o,s)))}

function activeCamera(){return state.objects.find(o=>o.kind==='camera')||null}
function cameraSpace(cam,obj){
  const dx=(obj.x-cam.x)/SCALE,dy=(obj.y-cam.y)/SCALE;
  const a=-rad(cam.rot); // world -> camera local, x forward
  return {forward:dx*Math.cos(a)-dy*Math.sin(a),side:dx*Math.sin(a)+dy*Math.cos(a)};
}
function shotLabel(subjectPixelHeight,monitorH){
  const r=subjectPixelHeight/monitorH;
  if(r<.42)return 'Plan pied large';
  if(r<.62)return 'Plan pied';
  if(r<.86)return 'Plan américain / taille';
  if(r<1.18)return 'Plan poitrine';
  if(r<1.65)return 'Gros plan';
  return 'Très gros plan';
}
function renderPreview(){
  previewScene.innerHTML='';
  const cam=activeCamera();
  if(!cam){previewLabel.textContent='Ajoute une caméra';cameraReadout.textContent='—';return}
  const sensor=cameras[state.cameraModel];
  const hfov=2*Math.atan(sensor.w/(2*state.focal)),vfov=2*Math.atan(sensor.h/(2*state.focal));
  const monitor=document.getElementById('monitor');const mw=monitor.clientWidth||1000,mh=monitor.clientHeight||562;
  const subjects=state.objects.filter(o=>o.kind==='subject').map(s=>({s,...cameraSpace(cam,s)})).filter(v=>v.forward>.1);
  let visible=0,main=null;
  subjects.forEach(v=>{
    const halfW=v.forward*Math.tan(hfov/2);const xNorm=.5+(v.side/(2*halfW));
    const subjH=v.s.height||1.75;const camH=1.55;
    const frameHeight=2*v.forward*Math.tan(vfov/2);const pixelH=mh*subjH/frameHeight;
    const centerVertical=.5 + ((camH-subjH/2)/frameHeight); // positive means subject center lower in frame
    const div=document.createElement('div');div.className='preview-person'+(state.selected===v.s.id?' selected-person':'');
    div.innerHTML='<div class="p-head"></div><div class="p-torso"></div><div class="p-leg l"></div><div class="p-leg r"></div>';
    div.style.left=`${xNorm*100}%`;div.style.top=`${centerVertical*100}%`;div.style.transform=`translate(-50%,-50%) scale(${pixelH/360})`;
    previewScene.appendChild(div);
    if(xNorm>-.2&&xNorm<1.2){visible++; if(!main||Math.abs(v.side)<Math.abs(main.side)) main={...v,pixelH};}
  });
  if(main){
    const d=main.forward.toFixed(2); const label=shotLabel(main.pixelH,mh);
    previewLabel.textContent=`${label} · sujet à ${d} m`;
    cameraReadout.textContent=`${state.cameraModel} · ${state.focal} mm · ${visible} sujet${visible>1?'s':''} dans la zone`;
  }else{previewLabel.textContent='Aucun sujet devant la caméra';cameraReadout.textContent=`${state.cameraModel} · ${state.focal} mm`;}
}

function addSubject(){const n=state.objects.filter(o=>o.kind==='subject').length+1;const o={id:uid('subj'),kind:'subject',name:`Sujet ${n}`,x:500+40*(n-1),y:300,rot:90,height:1.75};state.objects.push(o);state.selected=o.id;render()}
function addCamera(){const n=state.objects.filter(o=>o.kind==='camera').length+1;const o={id:uid('cam'),kind:'camera',name:`Caméra ${String.fromCharCode(64+n)}`,x:500,y:520,rot:-90};state.objects.push(o);state.selected=o.id;render()}
function addLight(){const name=document.getElementById('lightPreset').value;const p=lightPresets.find(x=>x.name===name);const n=state.objects.filter(o=>o.kind==='light').length;const o={id:uid('light'),kind:'light',name:p.name,lightType:p.type,x:260+(n%4)*65,y:250+(n%3)*70,rot:0,beam:p.beam,intensity:50,height:2};state.objects.push(o);state.selected=o.id;render()}

document.getElementById('addSubjectBtn').onclick=addSubject;document.getElementById('addCameraBtn').onclick=addCamera;document.getElementById('addLightBtn').onclick=addLight;
focalInput.addEventListener('input',()=>{state.focal=clamp(Number(focalInput.value)||50,12,300);render()});cameraModel.addEventListener('change',()=>{state.cameraModel=cameraModel.value;render()});
document.getElementById('saveBtn').onclick=()=>{localStorage.setItem('bos-plan-feu-v01',JSON.stringify(state));flash('Plan sauvé sur cet appareil')};
document.getElementById('resetBtn').onclick=()=>{if(confirm('Réinitialiser le plan ?')){localStorage.removeItem('bos-plan-feu-v01');seed();syncCameraUi();render()}};
function flash(txt){const old=document.getElementById('saveBtn').textContent;document.getElementById('saveBtn').textContent='✓ '+txt;setTimeout(()=>document.getElementById('saveBtn').textContent=old,1200)}

function exportPng(){
  const clone=stage.cloneNode(true);clone.setAttribute('width','1400');clone.setAttribute('height','868');
  const serializer=new XMLSerializer();const source=serializer.serializeToString(clone);
  const blob=new Blob([source],{type:'image/svg+xml;charset=utf-8'});const url=URL.createObjectURL(blob);const img=new Image();
  img.onload=()=>{const c=document.createElement('canvas');c.width=1400;c.height=868;const ctx=c.getContext('2d');ctx.fillStyle='#fbfcfe';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='BOS_Plan_Feu.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/png')};img.src=url;
}
document.getElementById('exportBtn').onclick=exportPng;

function syncCameraUi(){cameraModel.value=state.cameraModel;focalInput.value=state.focal}
function load(){
  try{const saved=JSON.parse(localStorage.getItem('bos-plan-feu-v01'));if(saved&&Array.isArray(saved.objects))state=saved;else seed()}catch{seed()}
  if(!cameras[state.cameraModel])state.cameraModel='Sony FX3'; state.focal=Number(state.focal)||50;
  populateSelects();syncCameraUi();render();
}
window.addEventListener('resize',renderPreview);load();
