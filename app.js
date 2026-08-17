const APP_VERSION='V1.38';
const NS='http://www.w3.org/2000/svg';
const stage=document.getElementById('stage');
const beamsLayer=document.getElementById('beamsLayer');
const objectsLayer=document.getElementById('objectsLayer');
const inspector=document.getElementById('inspector');
const inspectorBody=document.getElementById('inspectorBody');
const toggleInspectorBtn=document.getElementById('toggleInspectorBtn');
const inspectorToggleLabel=document.getElementById('inspectorToggleLabel');
const inspectorEmpty=document.getElementById('inspectorEmpty');
const inspectorFields=document.getElementById('inspectorFields');
const selectionHint=document.getElementById('selectionHint');
const changeFixtureHeader=document.getElementById('changeFixtureHeader');
const cameraReadout=document.getElementById('cameraReadout');
const cameraMonitors=document.getElementById('cameraMonitors');
const previewTabs=document.getElementById('previewTabs');
const addDialog=document.getElementById('addDialog');
const addKinds=document.getElementById('addKinds');
const lightChooser=document.getElementById('lightChooser');
const simpleChooser=document.getElementById('simpleChooser');
const dialogTitle=document.getElementById('dialogTitle');
const brandChoices=document.getElementById('brandChoices');
const familyChoices=document.getElementById('familyChoices');
const modelChoices=document.getElementById('modelChoices');
const favoriteChoices=document.getElementById('favoriteChoices');
const catalogCount=document.getElementById('catalogCount');
const simpleGrid=document.getElementById('simpleGrid');
const simpleLabel=document.getElementById('simpleLabel');
const toggleSnapBtn=document.getElementById('toggleSnapBtn');
const labelsModeSelect=document.getElementById('labelsModeSelect');
const toggleBeamsBtn=document.getElementById('toggleBeamsBtn');
const gridOpacityRange=document.getElementById('gridOpacityRange');
const gridOpacityValue=document.getElementById('gridOpacityValue');
const planLengthRange=document.getElementById('planLengthRange');
const planLengthValue=document.getElementById('planLengthValue');
const currentPlanBadge=document.getElementById('currentPlanBadge');
const libraryDialog=document.getElementById('libraryDialog');
const planNameInput=document.getElementById('planNameInput');
const topPlanNameInput=document.getElementById('topPlanNameInput');
const folderSelect=document.getElementById('folderSelect');
const planLibraryList=document.getElementById('planLibraryList');
const shareProjectBtn=document.getElementById('shareProjectBtn');
const importProjectBtn=document.getElementById('importProjectBtn');
const exportMenuBtn=document.getElementById('exportMenuBtn');
const exportPopover=document.getElementById('exportPopover');
const exportBtn=document.getElementById('exportBtn');
const importProjectInput=document.getElementById('importProjectInput');
const stageWrap=document.getElementById('stageWrap');
const zoomReadout=document.getElementById('zoomReadout');

const cameras={
  'Sony FX3':{w:35.6,h:23.8},
  'Sony FX6':{w:35.7,h:18.8},
  'Sony a7S III':{w:35.6,h:23.8},
  'Full Frame 3:2':{w:36,h:24},
  'Super 35 / APS-C':{w:23.5,h:15.6}
};

const lightCatalog=[
  // AMARAN — Halo
  {brand:'Amaran',family:'Halo',name:'amaran Halo 60x',short:'H60x',form:'halo',beam:55},
  {brand:'Amaran',family:'Halo',name:'amaran Halo 100x',short:'H100',form:'halo',beam:55},
  {brand:'Amaran',family:'Halo',name:'amaran Halo 200x',short:'H200',form:'halo',beam:55},
  {brand:'Amaran',family:'Halo',name:'amaran Halo 300x',short:'H300',form:'halo',beam:55},
  {brand:'Amaran',family:'Halo',name:'amaran Halo 600x',short:'H600',form:'halo',beam:55},
  // AMARAN — Ray
  {brand:'Amaran',family:'Ray',name:'amaran Ray 60c',short:'R60c',form:'ray',beam:70},
  {brand:'Amaran',family:'Ray',name:'amaran Ray 120c',short:'R120',form:'ray',beam:55},
  {brand:'Amaran',family:'Ray',name:'amaran Ray 360c',short:'R360',form:'ray',beam:55},
  {brand:'Amaran',family:'Ray',name:'amaran Ray 660c',short:'R660',form:'ray',beam:55},
  // AMARAN — COB S
  {brand:'Amaran',family:'COB S',name:'amaran COB 60d S',short:'60dS',form:'cob',beam:55},
  {brand:'Amaran',family:'COB S',name:'amaran COB 60x S',short:'60xS',form:'cob',beam:55},
  {brand:'Amaran',family:'COB S',name:'amaran 100d S',short:'100d',form:'cob',beam:55},
  {brand:'Amaran',family:'COB S',name:'amaran 100x S',short:'100x',form:'cob',beam:55},
  {brand:'Amaran',family:'COB S',name:'amaran 200d S',short:'200d',form:'cob',beam:55},
  {brand:'Amaran',family:'COB S',name:'amaran 200x S',short:'200x',form:'cob',beam:55},
  // AMARAN — COB couleur
  {brand:'Amaran',family:'COB couleur',name:'amaran 150c',short:'150c',form:'cob-color',beam:55},
  {brand:'Amaran',family:'COB couleur',name:'amaran 300c',short:'300c',form:'cob-color',beam:55},
  // AMARAN — Panels
  {brand:'Amaran',family:'Panels',name:'amaran Pano 60c',short:'P60c',form:'panel',beam:120,aspect:1.55},
  {brand:'Amaran',family:'Panels',name:'amaran Pano 120c',short:'P120',form:'panel',beam:120,aspect:1.65},
  {brand:'Amaran',family:'Panels',name:'amaran P60c',short:'P60c',form:'panel',beam:120,aspect:1.35},
  {brand:'Amaran',family:'Panels',name:'amaran P60x',short:'P60x',form:'panel',beam:120,aspect:1.35},
  {brand:'Amaran',family:'Panels',name:'amaran Verge',short:'VERGE',form:'panel-wide',beam:120,aspect:2.1},
  {brand:'Amaran',family:'Panels',name:'amaran Verge Max',short:'V MAX',form:'panel-wide',beam:120,aspect:2.4},
  // AMARAN — Pocket
  {brand:'Amaran',family:'Pocket',name:'amaran Ace 25c',short:'A25c',form:'pocket',beam:120},
  {brand:'Amaran',family:'Pocket',name:'amaran Ace 25x',short:'A25x',form:'pocket',beam:120},
  {brand:'Amaran',family:'Pocket',name:'amaran Go',short:'GO',form:'pocket-round',beam:120},
  // AMARAN — Tubes
  {brand:'Amaran',family:'Tubes',name:'amaran T2c',short:'T2c',form:'tube',beam:180,length:55},
  {brand:'Amaran',family:'Tubes',name:'amaran T4c',short:'T4c',form:'tube',beam:180,length:78},
  {brand:'Amaran',family:'Pixel Tubes',name:'amaran PT1c',short:'PT1',form:'pixel-bar',beam:180,length:38},
  {brand:'Amaran',family:'Pixel Tubes',name:'amaran PT2c',short:'PT2',form:'pixel-bar',beam:180,length:56},
  {brand:'Amaran',family:'Pixel Tubes',name:'amaran PT4c',short:'PT4',form:'pixel-bar',beam:180,length:80},
  // AMARAN — Flex
  {brand:'Amaran',family:'Flex',name:'amaran F21c',short:'F21c',form:'mat',beam:180,aspect:2},
  {brand:'Amaran',family:'Flex',name:'amaran F21x',short:'F21x',form:'mat',beam:180,aspect:2},
  {brand:'Amaran',family:'Flex',name:'amaran F22c',short:'F22c',form:'mat',beam:180,aspect:1},
  {brand:'Amaran',family:'Flex',name:'amaran F22x',short:'F22x',form:'mat',beam:180,aspect:1},
  {brand:'Amaran',family:'Pixel',name:'amaran SM5c',short:'SM5c',form:'strip',beam:180,length:76},

  // APUTURE — STORM
  {brand:'Aputure',family:'STORM',name:'Aputure STORM 80c',short:'80c',form:'storm',beam:55},
  {brand:'Aputure',family:'STORM',name:'Aputure STORM 400x',short:'400x',form:'storm',beam:55},
  {brand:'Aputure',family:'STORM',name:'Aputure STORM 700x',short:'700x',form:'storm',beam:55},
  {brand:'Aputure',family:'STORM',name:'Aputure STORM 1000c',short:'1000c',form:'storm-color',beam:55},
  {brand:'Aputure',family:'STORM',name:'Aputure STORM 1200x',short:'1200x',form:'storm',beam:55},
  {brand:'Aputure',family:'STORM',name:'Aputure STORM XT52',short:'XT52',form:'storm-heavy',beam:45},
  {brand:'Aputure',family:'STORM',name:'Aputure STORM CS32',short:'CS32',form:'storm-heavy',beam:45},
  // APUTURE — Electro Storm
  {brand:'Aputure',family:'Electro Storm',name:'Aputure Electro Storm XT26',short:'XT26',form:'storm-heavy',beam:45},
  {brand:'Aputure',family:'Electro Storm',name:'Aputure Electro Storm CS15',short:'CS15',form:'storm-heavy-color',beam:45},
  // APUTURE — Light Storm
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 60d',short:'60d',form:'ls-small',beam:45},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 60x',short:'60x',form:'ls-small',beam:45},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 300d II',short:'300d',form:'ls',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 300x',short:'300x',form:'ls',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 600d',short:'600d',form:'ls',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 600d Pro',short:'600dP',form:'ls',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 600x Pro',short:'600xP',form:'ls',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 600c Pro',short:'600cP',form:'ls-color',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 600c Pro II',short:'600cII',form:'ls-color',beam:55},
  {brand:'Aputure',family:'Light Storm',name:'Aputure LS 1200d Pro',short:'1200d',form:'ls-heavy',beam:55},
  // APUTURE — NOVA
  {brand:'Aputure',family:'NOVA',name:'Aputure NOVA II 1x1',short:'N II 1',form:'nova',beam:120,aspect:1},
  {brand:'Aputure',family:'NOVA',name:'Aputure NOVA II 2x1',short:'N II 2',form:'nova',beam:120,aspect:2},
  {brand:'Aputure',family:'NOVA',name:'Aputure NOVA 9° 2x1',short:'N 9°',form:'nova-narrow',beam:9,aspect:2},
  {brand:'Aputure',family:'NOVA',name:'Aputure Nova P300c',short:'P300',form:'nova',beam:120,aspect:1.4},
  {brand:'Aputure',family:'NOVA',name:'Aputure Nova P600c',short:'P600',form:'nova',beam:120,aspect:2},
  // APUTURE — INFINIMAT
  {brand:'Aputure',family:'INFINIMAT',name:'Aputure INFINIMAT 1x2',short:'IM1×2',form:'mat',beam:180,aspect:2},
  {brand:'Aputure',family:'INFINIMAT',name:'Aputure INFINIMAT 1x4',short:'IM1×4',form:'mat',beam:180,aspect:3.2},
  {brand:'Aputure',family:'INFINIMAT',name:'Aputure INFINIMAT 2x4',short:'IM2×4',form:'mat',beam:180,aspect:2},
  {brand:'Aputure',family:'INFINIMAT',name:'Aputure INFINIMAT 4x4',short:'IM4×4',form:'mat',beam:180,aspect:1},
  {brand:'Aputure',family:'INFINIMAT',name:'Aputure INFINIMAT 8x8',short:'IM8×8',form:'mat',beam:180,aspect:1},
  {brand:'Aputure',family:'INFINIMAT',name:'Aputure INFINIMAT 20x20',short:'IM20',form:'mat',beam:180,aspect:1},
  // APUTURE — INFINIBAR
  {brand:'Aputure',family:'INFINIBAR',name:'Aputure INFINIBAR PB3',short:'PB3',form:'pixel-bar',beam:180,length:38},
  {brand:'Aputure',family:'INFINIBAR',name:'Aputure INFINIBAR PB6',short:'PB6',form:'pixel-bar',beam:180,length:57},
  {brand:'Aputure',family:'INFINIBAR',name:'Aputure INFINIBAR PB12',short:'PB12',form:'pixel-bar',beam:180,length:82},
  // APUTURE — Mini / Practical
  {brand:'Aputure',family:'Mini',name:'Aputure MT Pro',short:'MT',form:'pixel-bar',beam:180,length:40},
  {brand:'Aputure',family:'Mini',name:'Aputure MC Pro',short:'MCP',form:'pocket',beam:120},
  {brand:'Aputure',family:'Mini',name:'Aputure MC',short:'MC',form:'pocket',beam:120},
  {brand:'Aputure',family:'Practical',name:'Aputure Accent B7c',short:'B7c',form:'bulb',beam:180}
];

// Objets grip et décor disponibles dans Ajouter un élément.
const accessoryCatalog=[
  {type:'diffusion',name:'Cadre de diffusion',short:'DIFF',width:2,height:2},
  {type:'borniol',name:'Borniol',short:'BOR',width:3,height:1.2},
  {type:'negative',name:'Negative fill',short:'NEG',width:1.2,height:2},
  {type:'reflector',name:'Réflecteur',short:'REF',width:1.2,height:2}
];
const decorCatalog=[
  {type:'wall',name:'Mur',short:'MUR',width:3,height:.15},
  {type:'door',name:'Porte',short:'PORTE',width:.9,height:.1},
  {type:'window',name:'Fenêtre',short:'FEN',width:1.5,height:.1},
  {type:'table',name:'Table',short:'TABLE',width:1.6,height:.8}
];

const CURRENT_KEY='bos-plan-feu-v06-current';
const FAVORITES_KEY='bos-plan-feu-favorite-lights-v01';
const LIB_KEY='bos-plan-feu-library-v06';
let state={objects:[],selected:null,activePreviewCamera:null,cameraModel:'Sony FX3',focal:50,snap:.25,labelsMode:'full',beamsVisible:true,gridOpacity:.5,planLength:10,planId:null,planName:'Plan 01',folderId:'folder_general',planOptionsOpen:true};
let library={folders:[{id:'folder_general',name:'Plans'}],plans:[]};
let drag=null;

// Navigation du plan : le canevas reste toujours ajusté au téléphone au chargement,
// puis peut être déplacé et zoomé sans modifier les coordonnées réelles du plan.
const STAGE_RATIO=.62, BASE_STAGE_W=1000, MAX_VIEW_ZOOM=4;
function stageW(){return Math.max(400,Math.round((Number(state.planLength)||10)*SCALE))}
function stageH(){return Math.round(stageW()*STAGE_RATIO)}
let stageViewport={x:0,y:0,w:BASE_STAGE_W,h:Math.round(BASE_STAGE_W*STAGE_RATIO)};
const activeTouchPointers=new Map();
let panGesture=null, pinchGesture=null;
function clampViewport(v){
  const fullW=stageW(),fullH=stageH();
  const minW=fullW/MAX_VIEW_ZOOM;
  const w=clamp(Number(v.w)||fullW,minW,fullW),h=w*fullH/fullW;
  const x=clamp(Number(v.x)||0,0,fullW-w),y=clamp(Number(v.y)||0,0,fullH-h);
  return {x,y,w,h};
}
function updateStageGeometry(){
  const w=stageW(),h=stageH();
  const bg=stage.querySelector('.stage-bg'); if(bg){bg.setAttribute('width',String(w));bg.setAttribute('height',String(h))}
  const gridRect=stage.querySelector('rect[fill="url(#grid)"]'); if(gridRect){gridRect.setAttribute('width',String(w));gridRect.setAttribute('height',String(h))}
}
function setPlanLength(length,{keepViewport=true}={}){
  const prevW=stageW(),prevH=stageH();
  state.planLength=clamp(Number(length)||10,4,30);
  const nextW=stageW(),nextH=stageH();
  if(keepViewport){
    stageViewport={x:stageViewport.x/prevW*nextW,y:stageViewport.y/prevH*nextH,w:stageViewport.w/prevW*nextW,h:stageViewport.h/prevH*nextH};
  }else stageViewport={x:0,y:0,w:nextW,h:nextH};
  updateStageGeometry();
  applyStageViewport();
  scheduleAutosave();
}
function applyStageViewport(){
  stageViewport=clampViewport(stageViewport);
  stage.setAttribute('viewBox',`${stageViewport.x} ${stageViewport.y} ${stageViewport.w} ${stageViewport.h}`);
  if(zoomReadout)zoomReadout.textContent=`${Math.round(stageW()/stageViewport.w*100)} %`;
}
function resetStageViewport(){stageViewport={x:0,y:0,w:stageW(),h:stageH()};applyStageViewport()}
function stagePointFromClient(clientX,clientY){
  const r=stage.getBoundingClientRect();
  if(!r.width||!r.height)return {x:stageViewport.x,y:stageViewport.y};
  return {x:stageViewport.x+(clientX-r.left)/r.width*stageViewport.w,y:stageViewport.y+(clientY-r.top)/r.height*stageViewport.h};
}
function viewportFromPinch(start,midX,midY,distance){
  const ratio=Math.max(.01,distance/start.distance);
  const fullW=stageW(),fullH=stageH();
  const newW=clamp(start.viewport.w/ratio,fullW/MAX_VIEW_ZOOM,fullW),newH=newW*fullH/fullW;
  const r=stage.getBoundingClientRect(),rx=clamp((midX-r.left)/Math.max(1,r.width),0,1),ry=clamp((midY-r.top)/Math.max(1,r.height),0,1);
  return clampViewport({x:start.anchor.x-rx*newW,y:start.anchor.y-ry*newH,w:newW,h:newH});
}
function beginPinchIfPossible(){
  if(activeTouchPointers.size<2)return false;
  const pts=[...activeTouchPointers.values()].slice(0,2),a=pts[0],b=pts[1],mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
  const distance=Math.hypot(a.x-b.x,a.y-b.y);
  pinchGesture={distance:Math.max(1,distance),viewport:{...stageViewport},anchor:stagePointFromClient(mx,my)};
  panGesture=null;
  drag=null;
  return true;
}
function handleViewportPointerDown(e){
  if(e.pointerType!=='touch')return;
  activeTouchPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(activeTouchPointers.size>=2){beginPinchIfPossible();e.preventDefault();return}
  const onObject=!!e.target.closest?.('.object');
  if(!onObject)panGesture={pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,viewport:{...stageViewport}};
}
function handleViewportPointerMove(e){
  if(e.pointerType!=='touch'||!activeTouchPointers.has(e.pointerId))return;
  activeTouchPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(activeTouchPointers.size>=2){
    if(!pinchGesture)beginPinchIfPossible();
    const pts=[...activeTouchPointers.values()].slice(0,2),a=pts[0],b=pts[1],mx=(a.x+b.x)/2,my=(a.y+b.y)/2,d=Math.hypot(a.x-b.x,a.y-b.y);
    stageViewport=viewportFromPinch(pinchGesture,mx,my,d);applyStageViewport();e.preventDefault();return;
  }
  if(panGesture&&panGesture.pointerId===e.pointerId){
    const r=stage.getBoundingClientRect(),dx=(e.clientX-panGesture.startX)/Math.max(1,r.width)*panGesture.viewport.w,dy=(e.clientY-panGesture.startY)/Math.max(1,r.height)*panGesture.viewport.h;
    stageViewport=clampViewport({x:panGesture.viewport.x-dx,y:panGesture.viewport.y-dy,w:panGesture.viewport.w,h:panGesture.viewport.h});
    applyStageViewport();e.preventDefault();
  }
}
function handleViewportPointerEnd(e){
  if(e.pointerType!=='touch')return;
  activeTouchPointers.delete(e.pointerId);
  if(activeTouchPointers.size<2)pinchGesture=null;
  if(activeTouchPointers.size===1){
    const [id,p]=[...activeTouchPointers.entries()][0];
    panGesture={pointerId:id,startX:p.x,startY:p.y,viewport:{...stageViewport}};
  }else if(activeTouchPointers.size===0)panGesture=null;
}
stage.addEventListener('pointerdown',handleViewportPointerDown,{capture:true});
stage.addEventListener('pointermove',handleViewportPointerMove,{capture:true});
stage.addEventListener('pointerup',handleViewportPointerEnd,{capture:true});
stage.addEventListener('pointercancel',handleViewportPointerEnd,{capture:true});
let replaceLightId=null;
let catalogBrand='Amaran';
let catalogFamily='';
let catalogFavoritesOnly=false;
let favoriteLightNames=[];
function loadFavoriteLights(){try{favoriteLightNames=JSON.parse(localStorage.getItem(FAVORITES_KEY)||'[]');if(!Array.isArray(favoriteLightNames))favoriteLightNames=[]}catch{favoriteLightNames=[]}}
function persistFavoriteLights(){try{localStorage.setItem(FAVORITES_KEY,JSON.stringify(favoriteLightNames))}catch(e){console.warn('Favorites BOS',e)}}
function isFavoriteLight(p){return favoriteLightNames.includes(p.name)}
function toggleFavoriteLight(p){if(isFavoriteLight(p))favoriteLightNames=favoriteLightNames.filter(n=>n!==p.name);else favoriteLightNames=[...favoriteLightNames,p.name];persistFavoriteLights();renderLightChooser()}
let autosaveTimer=null;
const SCALE=100;

function uid(prefix){return prefix+'_'+Math.random().toString(36).slice(2,8)}
function rad(d){return d*Math.PI/180}
function deg(r){return r*180/Math.PI}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)/SCALE}
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]||c))}
function svgEl(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e}
function deepClone(v){return JSON.parse(JSON.stringify(v))}
function safeName(s){return String(s||'Plan Feu').trim().replace(/[\/:*?"<>|]+/g,'_').replace(/\s+/g,' ').slice(0,80)||'Plan Feu'}
function snapValue(v){const step=Number(state.snap)||0;return step?Math.round(v/(step*SCALE))*step*SCALE:v}
function ensureStateDefaults(){
  if(!Array.isArray(state.objects))state.objects=[];
  state.snap=[0,.1,.25,.5,1].includes(Number(state.snap))?Number(state.snap):.25;
  if(!['full','names','lightcrew','direction','hidden'].includes(state.labelsMode))state.labelsMode='full';
  if(state.beamsVisible===undefined)state.beamsVisible=true;
  state.gridOpacity=clamp(Number.isFinite(Number(state.gridOpacity))?Number(state.gridOpacity):.5,0,1);
  state.planName=state.planName||defaultPlanName();
  state.folderId=state.folderId||library.folders[0]?.id||'folder_general';
  if(state.planId===undefined)state.planId=null;
  if(state.planOptionsOpen===undefined)state.planOptionsOpen=true;
  if(state.planLength===undefined)state.planLength=10;
  state.planLength=clamp(Number(state.planLength)||10,4,30);
}
function loadLibrary(){
  try{const raw=localStorage.getItem(LIB_KEY),v=raw&&JSON.parse(raw);if(v&&Array.isArray(v.folders)&&Array.isArray(v.plans))library=v}catch{}
  if(!library.folders.length)library.folders=[{id:'folder_general',name:'Plans'}];
}
function persistLibrary(){localStorage.setItem(LIB_KEY,JSON.stringify(library))}
function updateGridOpacity(){
  let raw=Number(state.gridOpacity);
  const v=Number.isFinite(raw)?clamp(raw,0,1):.5;
  state.gridOpacity=v;
  // Le curseur pilote maintenant à la fois l’opacité ET le contraste.
  // À 100 %, la grille devient volontairement très lisible pour un usage de plan technique.
  const dark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  const t=v;
  const smallA=v===0?0:(.10+t*.57), largeA=v===0?0:(.18+t*.72);
  const smallStroke=dark?`rgba(102,116,132,${smallA.toFixed(3)})`:`rgba(68,84,104,${smallA.toFixed(3)})`;
  const largeStroke=dark?`rgba(74,88,104,${largeA.toFixed(3)})`:`rgba(44,58,78,${largeA.toFixed(3)})`;
  stage.querySelectorAll('.grid-small').forEach(n=>{n.style.opacity='1';n.setAttribute('opacity','1');n.style.stroke=smallStroke;n.setAttribute('stroke',smallStroke)});
  stage.querySelectorAll('.grid-large').forEach(n=>{n.style.opacity='1';n.setAttribute('opacity','1');n.style.stroke=largeStroke;n.setAttribute('stroke',largeStroke)});
  if(gridOpacityRange)gridOpacityRange.value=String(Math.round(v*100));
  if(gridOpacityValue)gridOpacityValue.textContent=`${Math.round(v*100)} %`;
}
function updatePlanOptionsUI(){const open=state.planOptionsOpen!==false;if(planOptionsBody)planOptionsBody.classList.toggle('hidden',!open);if(planOptionsToggle){planOptionsToggle.setAttribute('aria-expanded',String(open));if(planOptionsToggleText)planOptionsToggleText.textContent=open?'MASQUER':'OUVRIR';if(planOptionsToggleCaret)planOptionsToggleCaret.textContent=open?'⌃':'⌄';}}
function updatePlanBadge(){if(currentPlanBadge)currentPlanBadge.textContent=`${state.planName||defaultPlanName()} · autosauvegarde`;if(topPlanNameInput&&document.activeElement!==topPlanNameInput)topPlanNameInput.value=state.planName||defaultPlanName();if(planNameInput&&document.activeElement!==planNameInput)planNameInput.value=state.planName||defaultPlanName();if(labelsModeSelect)labelsModeSelect.value=state.labelsMode||'full';if(toggleSnapBtn){const on=Number(state.snap)>0;toggleSnapBtn.classList.toggle('active',on);toggleSnapBtn.textContent=on?'Aimant ON':'Aimant OFF';toggleSnapBtn.setAttribute('aria-pressed',String(on))}if(toggleBeamsBtn){const on=state.beamsVisible!==false;toggleBeamsBtn.classList.toggle('active',on);toggleBeamsBtn.textContent=on?'Faisceau ON':'Faisceau OFF';toggleBeamsBtn.setAttribute('aria-pressed',String(on))}updateGridOpacity();if(planLengthRange)planLengthRange.value=String(Number(state.planLength||10));if(planLengthValue)planLengthValue.textContent=`${Number(state.planLength||10).toFixed(Number(state.planLength)%1?1:0)} m`;updatePlanOptionsUI()}
function snapshotState(){const copy=deepClone(state);copy.selected=null;return copy}
function persistCurrent(){
  try{localStorage.setItem(CURRENT_KEY,JSON.stringify(snapshotState()));if(state.planId){const rec=library.plans.find(p=>p.id===state.planId);if(rec){rec.name=state.planName;rec.folderId=state.folderId;rec.updatedAt=Date.now();rec.state=snapshotState();persistLibrary()}}}catch(e){console.warn('Autosave BOS',e)}
  updatePlanBadge();
}
function scheduleAutosave(){clearTimeout(autosaveTimer);autosaveTimer=setTimeout(persistCurrent,350)}
function formatSavedDate(ts){try{return new Intl.DateTimeFormat('fr-FR',{dateStyle:'short',timeStyle:'short'}).format(new Date(ts))}catch{return ''}}
function downloadBlob(blob,filename){const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1200)}

function presetForObject(o){
  if(!o || o.kind!=='light')return null;
  return lightCatalog.find(p=>p.name===o.name)||lightCatalog.find(p=>p.short===o.short)||null;
}
function lightCapability(o){
  if(!o||o.kind!=='light')return 'daylight';
  const txt=`${o.name||''} ${o.family||''} ${o.short||''} ${o.form||''}`.toLowerCase();
  // Couleur complète : modèles explicitement "c" ou familles RGB/pixel/couleur.
  if(/\b(?:[a-z]*\d+[a-z-]*c|b7c)\b/.test(txt) || /\b(?:cob couleur|nova|infinibar|infinimat|ray|pano|pixel|tubes|tube|go|mt pro|mc pro|\bmc\b|ace 25c)\b/.test(txt))return 'color';
  // Bi-color / CCT variable : la plupart des modèles en "x" et la gamme Halo actuelle.
  if(/\b[a-z]*\d+[a-z-]*x\b/.test(txt) || /\bhalo\b/.test(txt))return 'bicolor';
  return 'daylight';
}
function normalizeLightObject(o){
  if(o.kind!=='light')return o;
  const p=presetForObject(o);
  if(p){
    o.brand=o.brand||p.brand;o.family=o.family||p.family;o.form=o.form||p.form;o.short=o.short||p.short;
    o.beam=Number(o.beam)||p.beam;o.aspect=o.aspect||p.aspect;o.length=o.length||p.length;
  } else {
    o.brand=o.brand||((o.name||'').toLowerCase().includes('aputure')?'Aputure':'Amaran');
    o.family=o.family||'Projecteur';o.form=o.form||'cob';o.short=o.short||String(o.name||'LIGHT').replace(/^amaran\s+|^Aputure\s+/i,'').slice(0,7);
  }
  o.modifier=o.modifier||'none';
  if(o.beamVisible===undefined)o.beamVisible=true;
  if(o.modifierSize===undefined)o.modifierSize=o.modifier==='softbox'?.9:(o.modifier?.startsWith('umbrella')?1.05:.9);
  const capability=lightCapability(o);
  if(capability!=='color')o.colorMode='cct';
  else if(!['cct','hsi'].includes(o.colorMode))o.colorMode='cct';
  o.cct=clamp(Number(o.cct)||5600,2000,10000);
  o.hue=((Number(o.hue)||0)%360+360)%360;
  o.saturation=clamp(Number(o.saturation ?? 100),0,100);
  return o;
}
function seed(){
  state.objects=[
    {id:uid('cam'),kind:'camera',name:'Caméra A',x:stageW()/2,y:stageH()-115,rot:-90,height:1.55,cameraModel:'Sony FX3',focal:50,locked:false},
    {id:uid('subj'),kind:'subject',name:'Sujet 1',x:stageW()/2,y:stageH()/2-10,rot:90,height:1.75,locked:false},
    {id:uid('light'),kind:'light',name:'amaran Halo 200x',brand:'Amaran',family:'Halo',form:'halo',short:'H200',x:Math.max(140,stageW()/2-215),y:stageH()/2+20,rot:-15,beam:55,beamVisible:true,intensity:60,height:2.0,modifier:'none',modifierSize:.9,colorMode:'cct',cct:5600,hue:0,saturation:100,locked:false}
  ];
  state.objects.forEach(o=>{o.labelVisible=true;o.labelPos='auto'});
  state.selected=state.objects[2].id;
  state.activePreviewCamera=state.objects[0].id;
  state.openingBindingVersion=2;
}
function normalizeCameraObject(o){
  if(!o||o.kind!=='camera')return o;
  o.cameraModel=cameras[o.cameraModel]?o.cameraModel:(cameras[state.cameraModel]?state.cameraModel:'Sony FX3');
  o.focal=clamp(Number(o.focal||state.focal||50),12,300);
  o.height=clamp(Number(o.height||1.55),0.2,4);
  return o;
}
function cameraSettings(o){normalizeCameraObject(o);return {sensor:cameras[o.cameraModel],focal:o.focal};}

function renderCanvas(){
  updateStageGeometry();
  state.objects.filter(o=>o.kind==='decor'&&o.type==='wall').forEach(syncWallChildren);
  beamsLayer.innerHTML='';objectsLayer.innerHTML='';
  state.objects.filter(o=>o.kind==='camera').forEach(drawCameraFov);
  if(state.beamsVisible!==false)state.objects.filter(o=>o.kind==='light'&&o.beamVisible!==false).forEach(drawLightBeam);
  state.objects.forEach(drawObject);
  renderPreview();
  updatePlanBadge();
  scheduleAutosave();
}
function render(){renderCanvas();renderInspector()}
function drawCameraFov(o){
  const {sensor,focal}=cameraSettings(o),hfov=2*Math.atan(sensor.w/(2*focal)),len=stageH()*.74,half=Math.tan(hfov/2)*len;
  beamsLayer.appendChild(svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'camera-fov',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`}));
}
function kelvinToRgb(kelvin){
  let temp=clamp(Number(kelvin)||5600,1000,40000)/100,r,g,b;
  if(temp<=66){r=255;g=99.4708025861*Math.log(temp)-161.1195681661;b=temp<=19?0:138.5177312231*Math.log(temp-10)-305.0447927307}
  else{r=329.698727446*Math.pow(temp-60,-.1332047592);g=288.1221695283*Math.pow(temp-60,-.0755148492);b=255}
  return [Math.round(clamp(r,0,255)),Math.round(clamp(g,0,255)),Math.round(clamp(b,0,255))];
}
function lightColor(o,alpha=.14){
  normalizeLightObject(o);
  if(o.colorMode==='hsi')return {fill:`hsla(${o.hue},${o.saturation}%,50%,${alpha})`,stroke:`hsla(${o.hue},${Math.max(35,o.saturation)}%,48%,${Math.min(.72,alpha*4)})`};
  const [r,g,b]=kelvinToRgb(o.cct);return {fill:`rgba(${r},${g},${b},${alpha})`,stroke:`rgba(${r},${g},${b},${Math.min(.72,alpha*4)})`};
}
function lightColorText(o){normalizeLightObject(o);return o.colorMode==='hsi'?`H ${Math.round(o.hue)}° · S ${Math.round(o.saturation)}%`:`${Math.round(o.cct)} K`}
function fixtureBeamOffset(o){
  // Les sources plates / linéaires sont représentées vues du dessus par leur longueur.
  // Leur face lumineuse projette donc perpendiculairement au grand axe de l'icône.
  return ['panel','panel-wide','nova','nova-narrow','mat','strip','tube','pixel-bar'].includes(o?.form)?90:0;
}
function displayBeamAngle(o){
  const raw=clamp(Number(o.beam)||55,4,179);
  // Le cône du plan reste un repère schématique. Les sources surfaciques ou linéaires
  // très ouvertes sont volontairement plafonnées afin de garder le plan lisible.
  if(o?.form==='nova-narrow')return raw;
  if(['mat','panel','panel-wide','nova'].includes(o?.form))return Math.min(raw,68);
  if(o?.form==='strip')return Math.min(raw,120);
  if(['tube','pixel-bar'].includes(o?.form))return Math.min(raw,90);
  return raw;
}
function fixtureEmitterBase(o){
  if(['tube','pixel-bar','strip'].includes(o?.form)){
    const L=clamp(Number(o.length)||62,28,90);
    return {type:'line',span:Math.max(22,L*0.92),len:270};
  }
  if(['mat','panel','panel-wide','nova','nova-narrow'].includes(o?.form)){
    const aspect=o.aspect||1.5,w=clamp(38*aspect,38,78);
    return {type:'surface',span:Math.max(22,w-4),len:255};
  }
  return {type:'point',span:0,len:310};
}
function drawLightBeam(o){
  const beam=displayBeamAngle(o),base=fixtureEmitterBase(o),len=base.len,half=Math.tan(rad(beam/2))*len,c=lightColor(o,.13),beamRot=o.rot+fixtureBeamOffset(o);
  const points=base.type==='point'?`0,0 ${len},${-half} ${len},${half}`:`0,${-(base.span/2)} ${len},${-half} ${len},${half} 0,${base.span/2}`;
  beamsLayer.appendChild(svgEl('polygon',{points,class:'beam',style:`fill:${c.fill};stroke:${c.stroke}`,transform:`translate(${o.x} ${o.y}) rotate(${beamRot})`}));
}

function supportsSoftbox(o){
  const no=['tube','pixel-bar','strip','bulb','mat','pocket-round'];
  return o.kind==='light'&&!no.includes(o.form);
}
function cameraModelShortName(name=''){
  return String(name).replace(/^Sony\s+/i,'').trim()||String(name||'');
}
function addLightModifier(g,o){
  if(!o.modifier||o.modifier==='none')return;
  const size=Math.max(.3,Number(o.modifierSize)||.9),px=size*SCALE;
  if(o.modifier==='softbox'){
    const linear=['ray','panel','panel-wide','nova','nova-narrow'].includes(o.form);
    if(linear){
      const w=Math.max(34,px*.32),h=Math.max(52,px*.9),x=22;
      g.appendChild(svgEl('rect',{x,y:-h/2,width:w,height:h,rx:Math.min(10,h*.1),class:'softbox-shape'}));
      g.appendChild(svgEl('line',{x1:18,y1:-h*.24,x2:x,y2:-h*.34,class:'softbox-strut'}));
      g.appendChild(svgEl('line',{x1:18,y1:h*.24,x2:x,y2:h*.34,class:'softbox-strut'}));
    } else {
      const face=Math.max(42,px*.75),neck=18,half=face/2,x0=16,x1=x0+neck,x2=x1+face;
      g.appendChild(svgEl('polygon',{points:`${x0},${-half*.42} ${x1},${-half} ${x2},${-half} ${x2},${half} ${x1},${half} ${x0},${half*.42}`,class:'softbox-shape'}));
      g.appendChild(svgEl('line',{x1:x0,y1:-half*.34,x2:x1,y2:-half*.84,class:'softbox-strut'}));
      g.appendChild(svgEl('line',{x1:x0,y1:half*.34,x2:x1,y2:half*.84,class:'softbox-strut'}));
    }
    return;
  }
  if(o.modifier==='umbrella-reflect'||o.modifier==='umbrella-diffusion'){
    const cls=o.modifier==='umbrella-reflect'?'umbrella-reflect-shape':'umbrella-diffusion-shape';
    const stem=24,depth=Math.max(18,px*.28),half=Math.max(22,px*.42),x0=18,x1=x0+stem;
    g.appendChild(svgEl('line',{x1:x0,y1:0,x2:x1,y2:0,class:'umbrella-stem'}));
    g.appendChild(svgEl('path',{d:`M ${x1} ${-half} Q ${x1+depth} 0 ${x1} ${half}`,class:cls}));
    g.appendChild(svgEl('line',{x1:x1,y1:-half,x2:x1,y2:half,class:'umbrella-rim'}));
    const t=svgEl('text',{x:x1+depth*.45,y:4,class:'umbrella-code','text-anchor':'middle'});t.textContent=o.modifier==='umbrella-reflect'?'R':'D';g.appendChild(t);
  }
}
function addFixtureSymbol(g,o){
  const form=o.form||'cob',modelText=(o.short||'L').slice(0,7),bodyClass=`fixture-body ${o.brand==='Aputure'?'aputure-fixture':'amaran-fixture'}`,lensClass='fixture-lens';
  const addModelText=(x=0,y=4,size=8)=>{const t=svgEl('text',{x,y,class:'fixture-code','text-anchor':'middle','font-size':size});t.textContent=modelText;g.appendChild(t)};
  if(form==='tube'||form==='pixel-bar'||form==='strip'){
    const L=o.length||62;g.appendChild(svgEl('rect',{x:-L/2,y:-8,width:L,height:16,rx:7,class:bodyClass}));
    if(form==='pixel-bar'){const count=Math.max(3,Math.round(L/12));for(let i=0;i<count;i++)g.appendChild(svgEl('rect',{x:-L/2+5+i*(L-10)/count,y:-4,width:5,height:8,rx:2,class:'fixture-pixel'}))}
    else if(form==='strip')g.appendChild(svgEl('path',{d:`M ${-L/2+5} 0 Q ${-L/4} -6 0 0 T ${L/2-5} 0`,class:'fixture-strip-line'}));
    addModelText(0,23,8);return;
  }
  if(['panel','panel-wide','nova','nova-narrow','mat'].includes(form)){
    const aspect=o.aspect||1.5,w=clamp(38*aspect,38,78),h=clamp(38/aspect,18,42),cls=form==='mat'?'fixture-mat':(form==='nova-narrow'?'fixture-nova-narrow':bodyClass);
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:form==='mat'?3:7,class:cls}));
    if(form==='mat')g.appendChild(svgEl('rect',{x:-w/2+4,y:-h/2+4,width:w-8,height:h-8,rx:2,class:'fixture-mat-inner'}));
    else g.appendChild(svgEl('rect',{x:-w/2+5,y:-h/2+5,width:w-10,height:h-10,rx:4,class:'fixture-panel-face'}));
    addModelText(0,3,Math.min(8,Math.max(6,42/modelText.length)));return;
  }
  if(form==='pocket'||form==='pocket-round'){
    if(form==='pocket-round')g.appendChild(svgEl('circle',{cx:0,cy:0,r:20,class:bodyClass}));else g.appendChild(svgEl('rect',{x:-20,y:-16,width:40,height:32,rx:9,class:bodyClass}));
    g.appendChild(svgEl('circle',{cx:14,cy:0,r:5,class:lensClass}));addModelText(-3,3,8);return;
  }
  if(form==='bulb'){g.appendChild(svgEl('circle',{cx:4,cy:0,r:17,class:'fixture-bulb'}));g.appendChild(svgEl('rect',{x:-23,y:-8,width:12,height:16,rx:3,class:bodyClass}));addModelText(4,3,8);return}
  const heavy=form.includes('heavy'),storm=form.startsWith('storm'),ls=form.startsWith('ls'),halo=form==='halo',ray=form==='ray';
  const w=heavy?46:(storm?40:(ls?38:36)),h=heavy?34:(storm?32:30);
  g.appendChild(svgEl('rect',{x:-w/2-7,y:-h/2,width:w,height:h,rx:storm?5:8,class:bodyClass}));
  if(storm)g.appendChild(svgEl('path',{d:`M ${-w/2-2} ${-h/2+5} L ${-w/2-8} 0 L ${-w/2-2} ${h/2-5}`,class:'fixture-storm-fin'}));
  if(ls)g.appendChild(svgEl('line',{x1:-w/2,y1:-h/2+7,x2:w/2-7,y2:-h/2+7,class:'fixture-ridge'}));
  if(halo)g.appendChild(svgEl('circle',{cx:w/2-4,cy:0,r:15,class:'fixture-halo-ring'}));
  else if(ray)g.appendChild(svgEl('circle',{cx:w/2-3,cy:0,r:14,class:'fixture-ray-head'}));
  else g.appendChild(svgEl('polygon',{points:`${w/2-7},${-h/2+3} ${w/2+14},-11 ${w/2+14},11 ${w/2-7},${h/2-3}`,class:lensClass}));
  addModelText(-5,3,Math.min(8,Math.max(6,38/modelText.length)));
}

function drawAccessorySymbol(g,o){
  const w=Math.max(50,(o.width||1.2)*55),h=Math.max(16,Math.min(82,(o.height||1.2)*32));
  if(o.type==='diffusion'){
    const barH=Math.max(10,Math.min(16,h*0.28));
    g.appendChild(svgEl('rect',{x:-w/2,y:-barH/2,width:w,height:barH,rx:barH/2,class:'diffusion-bar'}));
    g.appendChild(svgEl('line',{x1:-w/2+6,y1:0,x2:w/2-6,y2:0,class:'diffusion-bar-core'}));
    for(let x=-w/2+10;x<w/2-10;x+=16)g.appendChild(svgEl('line',{x1:x,y1:-barH/2+1.5,x2:x+8,y2:barH/2-1.5,class:'diffusion-hatch'}));
    g.appendChild(svgEl('line',{x1:-w/2,y1:-barH/2-4,x2:-w/2,y2:barH/2+4,class:'grip-cap'}));
    g.appendChild(svgEl('line',{x1:w/2,y1:-barH/2-4,x2:w/2,y2:barH/2+4,class:'grip-cap'}));
    return {w,h:Math.max(20,barH+10)};
  } else if(o.type==='borniol'){
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:3,class:'borniol-shape'}));
  } else if(o.type==='negative'){
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:3,class:'negative-shape'}));
    g.appendChild(svgEl('text',{x:0,y:4,'text-anchor':'middle',class:'negative-code'})).textContent='NEG';
  } else {
    const barH=Math.max(10,Math.min(16,h*0.28));
    g.appendChild(svgEl('rect',{x:-w/2,y:-barH/2,width:w,height:barH,rx:barH/2,class:'reflector-bar'}));
    g.appendChild(svgEl('line',{x1:-w/2+10,y1:barH/2-1,x2:w/2-10,y2:-barH/2+1,class:'reflector-line'}));
    g.appendChild(svgEl('line',{x1:-w/2,y1:-barH/2-4,x2:-w/2,y2:barH/2+4,class:'grip-cap'}));
    g.appendChild(svgEl('line',{x1:w/2,y1:-barH/2-4,x2:w/2,y2:barH/2+4,class:'grip-cap'}));
    return {w,h:Math.max(20,barH+10)};
  }
  return {w,h};
}
function drawDecorSymbol(g,o){
  const w=Math.max(45,(o.width||1)*55),h=Math.max(28,(o.height||.8)*48);
  if(o.type==='wall'){
    g.appendChild(svgEl('line',{x1:-w/2,y1:0,x2:w/2,y2:0,class:'wall-line'}));
    g.appendChild(svgEl('line',{x1:-w/2,y1:-5,x2:-w/2,y2:5,class:'wall-cap'}));g.appendChild(svgEl('line',{x1:w/2,y1:-5,x2:w/2,y2:5,class:'wall-cap'}));
    return {w,h:20};
  }
  if(o.type==='door'){
    g.appendChild(svgEl('line',{x1:-w/2,y1:0,x2:w/2,y2:0,class:'door-frame'}));
    g.appendChild(svgEl('line',{x1:-w/2,y1:0,x2:-w/2,y2:-w,class:'door-leaf'}));
    g.appendChild(svgEl('path',{d:`M ${-w/2} ${-w} A ${w} ${w} 0 0 1 ${w/2} 0`,class:'door-arc'}));
    return {w,h:w+15};
  }
  if(o.type==='window'){
    g.appendChild(svgEl('line',{x1:-w/2,y1:-5,x2:w/2,y2:-5,class:'window-line'}));g.appendChild(svgEl('line',{x1:-w/2,y1:5,x2:w/2,y2:5,class:'window-line'}));
    g.appendChild(svgEl('line',{x1:0,y1:-8,x2:0,y2:8,class:'window-mullion'}));return {w,h:22};
  }
  g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:7,class:'table-shape'}));g.appendChild(svgEl('rect',{x:-w/2+6,y:-h/2+6,width:w-12,height:h-12,rx:5,class:'table-inner'}));return {w,h};
}

function modelDisplayName(o){
  if(!o||o.kind!=='light')return o?.name||'';
  const p=presetForObject(o);
  const n=p?.name||o.name||'Projecteur';
  return n.replace(/^amaran\b/i,'Amaran').replace(/^aputure\b/i,'Aputure');
}
function infoModeForObject(o){
  const mode=state.labelsMode||'full';
  if(mode==='hidden')return 'hidden';
  if(mode==='full')return 'full';
  if(mode==='names')return 'names';
  if(mode==='lightcrew')return (o.kind==='light'||o.kind==='accessory')?'full':'hidden';
  if(mode==='direction')return (o.kind==='light'||o.kind==='accessory')?'hidden':'names';
  return 'names';
}
function deleteObjectById(id){
  const o=state.objects.find(x=>x.id===id);if(!o)return;
  state.objects=state.objects.filter(x=>x.id!==id);
  if(state.activePreviewCamera===id)state.activePreviewCamera=state.objects.find(x=>x.kind==='camera')?.id||null;
  if(state.selected===id)state.selected=null;
  render();
}
function duplicateObjectById(id){
  const src=state.objects.find(x=>x.id===id);if(!src)return;
  const copy=deepClone(src);
  copy.id=uid(src.kind||'obj');
  copy.x=(Number(src.x)||0)+24;
  copy.y=(Number(src.y)||0)+24;
  copy.name=`${src.name||kindLabel(src)} copie`;
  copy.locked=false;
  state.objects.push(copy);
  state.selected=copy.id;
  if(copy.kind==='camera'&&!state.activePreviewCamera)state.activePreviewCamera=copy.id;
  render();
}
function beamSliderMax(o){
  if(!o||o.kind!=='light')return 179;
  if(o.form==='nova-narrow')return 60;
  if(['strip','tube','pixel-bar','mat','panel','panel-wide','nova'].includes(o.form))return 120;
  return 179;
}
function drawObject(o){
  if(o.kind==='light')normalizeLightObject(o);
  const g=svgEl('g',{class:`object ${state.selected===o.id?'selected':''} ${o.locked?'locked':''}`,transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`,'data-id':o.id});
  let hitW=96,hitH=96,labelY=50;
  if(o.kind==='camera'){
    g.appendChild(svgEl('circle',{r:36,class:'selection-ring'}));g.appendChild(svgEl('rect',{x:-21,y:-16,width:34,height:32,rx:7,class:'camera-body'}));g.appendChild(svgEl('polygon',{points:'13,-10 34,-17 34,17 13,10',class:'camera-lens'}));
  } else if(o.kind==='subject'){
    g.appendChild(svgEl('circle',{r:34,class:'selection-ring'}));g.appendChild(svgEl('circle',{cx:0,cy:0,r:22,class:'subject-body'}));g.appendChild(svgEl('polygon',{points:'30,0 18,-7 18,7',class:'subject-nose'}));
  } else if(o.kind==='light'){
    g.appendChild(svgEl('circle',{r:48,class:'selection-ring'}));addLightModifier(g,o);addFixtureSymbol(g,o);labelY=62;
  } else if(o.kind==='accessory'){
    const d=drawAccessorySymbol(g,o);hitW=d.w+24;hitH=d.h+24;labelY=d.h/2+28;g.appendChild(svgEl('rect',{x:-hitW/2,y:-hitH/2,width:hitW,height:hitH,rx:8,class:'selection-box'}));
  } else if(o.kind==='decor'){
    const d=drawDecorSymbol(g,o);hitW=d.w+24;hitH=d.h+24;labelY=d.h/2+28;g.appendChild(svgEl('rect',{x:-hitW/2,y:-hitH/2,width:hitW,height:hitH,rx:8,class:'selection-box'}));
  }
  g.appendChild(svgEl('rect',{x:-hitW/2,y:-hitH/2,width:hitW,height:hitH,class:'hit'}));
  if(state.selected===o.id){
    const toolsY=-hitH/2-25;
    const dup=svgEl('g',{class:'object-duplicate',transform:`translate(${-18} ${toolsY}) rotate(${-o.rot})`,'data-id':o.id});
    dup.appendChild(svgEl('circle',{cx:0,cy:0,r:13,class:'object-duplicate-bg'}));
    dup.appendChild(svgEl('rect',{x:-5.5,y:-3.5,width:8.5,height:8.5,rx:1.8,class:'object-duplicate-icon'}));
    dup.appendChild(svgEl('rect',{x:-2.5,y:-6.5,width:8.5,height:8.5,rx:1.8,class:'object-duplicate-icon'}));
    dup.appendChild(svgEl('path',{d:'M 0 -2.5 L 0 2.5 M -2.5 0 L 2.5 0',class:'object-duplicate-plus'}));
    dup.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();duplicateObjectById(o.id)});
    g.appendChild(dup);
    const trash=svgEl('g',{class:'object-trash',transform:`translate(${18} ${toolsY}) rotate(${-o.rot})`,'data-id':o.id});
    trash.appendChild(svgEl('circle',{cx:0,cy:0,r:13,class:'object-trash-bg'}));
    trash.appendChild(svgEl('path',{d:'M -5 -5 L 5 -5 M -3 -8 L 3 -8 M -4 -3 L -3 6 L 3 6 L 4 -3 M -1 -2 L -1 4 M 1 -2 L 1 4',class:'object-trash-icon'}));
    trash.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();deleteObjectById(o.id)});
    g.appendChild(trash);
  }
  const objectInfoMode=infoModeForObject(o);
  if(objectInfoMode!=='hidden'){
    const pos=o.labelPos||'auto';let lx=0,ly=labelY,anchor='middle';
    if(pos==='top'){ly=-hitH/2-18}else if(pos==='left'){lx=-hitW/2-12;ly=0;anchor='end'}else if(pos==='right'){lx=hitW/2+12;ly=0;anchor='start'}else if(pos==='bottom'){ly=hitH/2+24}
    const label=svgEl('g',{transform:`rotate(${-o.rot}) translate(${lx} ${ly})`}),t=svgEl('text',{class:'object-label','text-anchor':anchor});t.textContent=o.name;label.appendChild(t);
    if(objectInfoMode==='full'){
      if(o.kind==='light'){const st=svgEl('text',{class:'object-sub','text-anchor':anchor,y:17});const modLabel=o.modifier==='softbox'?'Softbox':o.modifier==='umbrella-reflect'?'Parapluie réflexion':o.modifier==='umbrella-diffusion'?'Parapluie diffusion':'';const base=`${o.intensity}% · ${lightColorText(o)}${modLabel?' · '+modLabel:''}`;st.textContent=state.labelsMode==='lightcrew'?`${base} · H ${Number(o.height||2).toFixed(1)} m`:base;label.appendChild(st)}
      else if(o.kind==='camera'){const st=svgEl('text',{class:'object-sub','text-anchor':anchor,y:17});st.textContent=`${cameraModelShortName(o.cameraModel)} · ${Math.round(o.focal||50)} mm · H ${Number(o.height||1.55).toFixed(2)} m`;label.appendChild(st)}
      else if(o.kind==='accessory'||o.kind==='decor'){const st=svgEl('text',{class:'object-sub','text-anchor':anchor,y:17});st.textContent=`${(o.width||0).toFixed(1)} × ${(o.height||0).toFixed(1)} m${o.locked?' · verrouillé':''}`;label.appendChild(st)}
    }
    g.appendChild(label);
  }
  if(state.selected===o.id&&!o.locked){
    const beamOffset=o.kind==='light'?fixtureBeamOffset(o):0;const gizmo=svgEl('g',{class:'rotation-gizmo',transform:beamOffset?`rotate(${beamOffset})`:''});gizmo.appendChild(svgEl('line',{x1:40,y1:0,x2:65,y2:0,class:'rotation-stem'}));const handle=svgEl('circle',{cx:74,cy:0,r:12,class:'rotation-handle','data-id':o.id});gizmo.appendChild(handle);const arrow=svgEl('path',{d:'M 69 -4 A 6 6 0 1 1 69 4 M 69 4 L 66 1 M 69 4 L 72 1',class:'rotation-icon','data-id':o.id});gizmo.appendChild(arrow);const angle=svgEl('text',{x:74,y:-19,class:'rotation-angle','text-anchor':'middle'});let shownAngle=o.rot+beamOffset;while(shownAngle>180)shownAngle-=360;while(shownAngle<=-180)shownAngle+=360;angle.textContent=`${Math.round(shownAngle)}°`;gizmo.appendChild(angle);handle.addEventListener('pointerdown',startRotate);arrow.addEventListener('pointerdown',startRotate);gizmo.addEventListener('pointerdown',e=>e.stopPropagation());g.appendChild(gizmo);
  }
  g.addEventListener('pointerdown',startDrag);objectsLayer.appendChild(g);
}

function pointerToStage(e){const pt=stage.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(stage.getScreenCTM().inverse())}
function startDrag(e){
  if(e.pointerType==='touch'&&activeTouchPointers.size>1)return;
  e.preventDefault();e.stopPropagation();const id=e.currentTarget.dataset.id,o=state.objects.find(x=>x.id===id);if(!o)return;
  if(state.selected!==id){state.selected=id;renderInspector()}
  if(o.kind==='camera'){state.activePreviewCamera=o.id;renderPreview()}
  if(o.locked){renderInspector();return}
  const p=pointerToStage(e);drag={mode:'move',id,dx:p.x-o.x,dy:p.y-o.y,pointerId:e.pointerId};stage.setPointerCapture?.(e.pointerId);
}
function startRotate(e){if(e.pointerType==='touch'&&activeTouchPointers.size>1)return;e.preventDefault();e.stopPropagation();const id=e.currentTarget.dataset.id||e.currentTarget.closest?.('[data-id]')?.dataset.id,o=state.objects.find(x=>x.id===id);if(!o||o.locked)return;state.selected=id;if(o.kind==='camera')state.activePreviewCamera=o.id;drag={mode:'rotate',id,pointerId:e.pointerId,rotateOffset:o.kind==='light'?fixtureBeamOffset(o):0};stage.setPointerCapture?.(e.pointerId)}
stage.addEventListener('pointermove',e=>{
  if(!drag)return;const o=state.objects.find(x=>x.id===drag.id);if(!o)return;const p=pointerToStage(e);
  if(drag.mode==='rotate'){
    o.rot=deg(Math.atan2(p.y-o.y,p.x-o.x))-(drag.rotateOffset||0);if(o.rot>180)o.rot-=360;if(o.rot<=-180)o.rot+=360;
  } else {
    const targetX=clamp(snapValue(p.x-drag.dx),35,965),targetY=clamp(snapValue(p.y-drag.dy),35,585);
    o.x=targetX;o.y=targetY;
  }renderCanvas();
});
function endGesture(){if(!drag)return;try{stage.releasePointerCapture?.(drag.pointerId)}catch{}drag=null;render()}
stage.addEventListener('pointerup',endGesture);stage.addEventListener('pointercancel',endGesture);
stage.addEventListener('pointerdown',e=>{if(e.target.closest?.('.object'))return;if(state.selected!==null){state.selected=null;render()}});

let inspectorCollapsed=false;
function updateInspectorCollapse(){
  if(!inspector||!inspectorBody||!toggleInspectorBtn)return;
  inspector.classList.toggle('collapsed',inspectorCollapsed);
  inspectorBody.hidden=inspectorCollapsed;
  toggleInspectorBtn.setAttribute('aria-expanded',String(!inspectorCollapsed));
  if(inspectorToggleLabel)inspectorToggleLabel.textContent=inspectorCollapsed?'Afficher':'Masquer';
}
if(toggleInspectorBtn)toggleInspectorBtn.addEventListener('click',()=>{inspectorCollapsed=!inspectorCollapsed;updateInspectorCollapse()});
updateInspectorCollapse();

function selected(){return state.objects.find(o=>o.id===state.selected)}
function kindLabel(o){return o.kind==='camera'?(o.name||'Caméra'):o.kind==='subject'?(o.name||'Personnage'):o.kind==='light'?(o.name||'Projecteur'):o.kind==='accessory'?(o.name||'Accessoire'):(o.name||'Décor')}
function toggleButtons(key,current,options){return `<div class="inspector-choice" data-choice="${key}">${options.map(([value,label])=>`<button data-value="${esc(value)}" class="${current===value?'active':''}">${esc(label)}</button>`).join('')}</div>`}
function renderInspector(){
  const o=selected();if(!o){inspectorEmpty.classList.remove('hidden');inspectorFields.classList.add('hidden');selectionHint.textContent='Sélectionne un élément';if(changeFixtureHeader)changeFixtureHeader.classList.add('hidden');return}
  inspectorEmpty.classList.add('hidden');inspectorFields.classList.remove('hidden');selectionHint.textContent=o.kind==='light'?modelDisplayName(o):kindLabel(o);
  if(changeFixtureHeader)changeFixtureHeader.classList.add('hidden');
  if(o.kind==='camera')normalizeCameraObject(o);
  let html='';
  if(o.kind==='light'){const currentIndex=Math.max(0,lightCatalog.findIndex(p=>p.name===o.name||p.short===o.short));html+=`<div class="field"><label>Projecteur / modèle</label><select id="selectedLightModel">${lightCatalog.map((p,i)=>`<option value="${i}" ${i===currentIndex?'selected':''}>${esc(p.name.replace(/^amaran\s+/i,'Amaran ').replace(/^Aputure\s+/i,'Aputure '))}</option>`).join('')}</select></div>`;}
  html+=`<div class="field"><label>${o.kind==='light'?'Nom personnalisé':'Nom'}</label><input data-k="name" value="${esc(o.name)}"></div>`;
  if(o.kind==='camera'){
    html+=`<div class="field"><label>Caméra / capteur</label><select id="selectedCameraModel">${Object.keys(cameras).map(name=>`<option value="${esc(name)}" ${o.cameraModel===name?'selected':''}>${esc(name)}</option>`).join('')}</select></div>`;
    const focalPresets=[18,24,28,35,50,85,105,135];
    html+=`<div class="field"><label>Focale</label><div class="field-inline"><input id="cameraFocalInput" data-k="focal" type="number" min="12" max="300" step="1" value="${Math.round(o.focal)}"><span class="unit">mm</span></div><div class="preset-row">${focalPresets.map(v=>`<button type="button" class="preset-chip ${Math.round(o.focal)===v?'active':''}" data-focal-preset="${v}">${v}</button>`).join('')}</div></div>`;
    html+=`<div class="field slider-field"><div class="slider-head"><label>Hauteur caméra</label><strong data-slider-out="height">${Number(o.height||1.55).toFixed(2)} m</strong></div><input data-k="height" type="range" min="0.2" max="4" step="0.05" value="${o.height}"></div>`;
  }
  if(o.kind==='subject')html+=`<div class="field slider-field"><div class="slider-head"><label>Taille</label><strong data-slider-out="height">${Number(o.height||1.75).toFixed(2)} m</strong></div><input data-k="height" type="range" min="1" max="2.2" step="0.01" value="${o.height}"></div>`;
  else if(o.kind==='light')html+='';
  else if(o.kind==='accessory'||o.kind==='decor')html+=`<div class="field slider-field"><div class="slider-head"><label>Largeur</label><strong data-slider-out="width">${Number(o.width||0).toFixed(1)} m</strong></div><input data-k="width" type="range" min="0.1" max="20" step="0.1" value="${o.width}"></div>`;
  else if(o.kind!=='camera')html+=`<div class="field"><label>Distance sujet</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
  if(o.kind==='accessory'||o.kind==='decor'){
    const zDefault=o.kind==='accessory'?(o.height||1.2):(o.type==='wall'?2.5:o.type==='door'?2.04:o.type==='window'?1.2:o.type==='table'?.75:1);
    o.zHeight=Number(o.zHeight||zDefault);
    if(o.elevation===undefined)o.elevation=o.type==='window'?.9:(o.kind==='accessory'?.35:0);
    const depthLabel=o.kind==='decor'&&['wall','door','window'].includes(o.type)?'Épaisseur':'Profondeur';
    html+=`<div class="field slider-field"><div class="slider-head"><label>${depthLabel}</label><strong data-slider-out="height">${Number(o.height||0).toFixed(2)} m</strong></div><input data-k="height" type="range" min="0.05" max="20" step="0.05" value="${o.height}"></div>`;
    html+=`<div class="field slider-field"><div class="slider-head"><label>Hauteur réelle</label><strong data-slider-out="zHeight">${Number(o.zHeight||0).toFixed(2)} m</strong></div><input data-k="zHeight" type="range" min="0.05" max="10" step="0.05" value="${o.zHeight}"></div>`;
    if(o.kind==='accessory'||o.type==='window')html+=`<div class="field slider-field"><div class="slider-head"><label>Hauteur au sol</label><strong data-slider-out="elevation">${Number(o.elevation||0).toFixed(2)} m</strong></div><input data-k="elevation" type="range" min="0" max="5" step="0.05" value="${o.elevation}"></div>`;
  }
  if(o.kind==='light'){
    html+=`<div class="field"><label>Accessoire lumière</label>${toggleButtons('modifier',o.modifier||'none',supportsSoftbox(o)?[['none','Nu'],['softbox','Softbox'],['umbrella-reflect','Parapluie réflexion'],['umbrella-diffusion','Parapluie diffusion']]:[['none','Nu']])}</div>`;
    if(o.modifier&&o.modifier!=='none'){
      const cm=Math.round((Number(o.modifierSize)||.9)*100),label=o.modifier.startsWith('umbrella')?'Diamètre parapluie':'Taille accessoire';
      html+=`<div class="field slider-field"><div class="slider-head"><label>${label}</label><strong data-slider-out="modifierSize">${cm} cm</strong></div><input data-k="modifierSize" data-convert="cm" type="range" min="30" max="300" step="5" value="${cm}"></div>`;
    }
    const capability=lightCapability(o);
    html+=`<div class="field slider-field"><div class="slider-head"><label>Intensité</label><strong data-slider-out="intensity">${Math.round(o.intensity)} %</strong></div><input data-k="intensity" type="range" min="0" max="100" step="1" value="${o.intensity}"></div>`;
    if(capability==='color'){
      html+=`<div class="field"><label>Mode couleur</label>${toggleButtons('colorMode',o.colorMode||'cct',[['cct','Température'],['hsi','HSI']])}</div>`;
      if((o.colorMode||'cct')==='hsi'){
        html+=`<div class="field-grid"><div class="field"><label>Hue</label><div class="field-inline"><input data-k="hue" type="number" min="0" max="360" step="1" value="${Math.round(o.hue||0)}"><span class="unit">°</span></div></div><div class="field slider-field"><div class="slider-head"><label>Saturation</label><strong data-slider-out="saturation">${Math.round(o.saturation??100)} %</strong></div><input data-k="saturation" type="range" min="0" max="100" step="1" value="${Math.round(o.saturation??100)}"></div></div>`;
      } else {
        html+=`<div class="field slider-field"><div class="slider-head"><label>Température de couleur</label><strong data-slider-out="cct">${Math.round(o.cct||5600)} K</strong></div><input data-k="cct" type="range" min="2000" max="10000" step="100" value="${Math.round(o.cct||5600)}"></div>`;
      }
    } else if(capability==='bicolor') {
      html+=`<div class="field slider-field"><div class="slider-head"><label>Température de couleur</label><strong data-slider-out="cct">${Math.round(o.cct||5600)} K</strong></div><input data-k="cct" type="range" min="2000" max="10000" step="100" value="${Math.round(o.cct||5600)}"></div>`;
    } else {
      html+=`<div class="field"><label>Température fixe</label><div class="field-inline"><input disabled value="${Math.round(o.cct||5600)}"><span class="unit">K</span></div></div>`;
    }
    const beamMax=beamSliderMax(o),beamValue=Math.min(beamMax,Math.max(4,Math.round(Number(o.beam)||55)));
    html+=`<div class="field slider-field"><div class="slider-head"><label>Ouverture du cône</label><strong data-slider-out="beam">${beamValue}°</strong></div><input data-k="beam" type="range" min="4" max="${beamMax}" step="1" value="${beamValue}"><small class="field-help">Schématique : sert à visualiser l'ouverture sur le plan.</small></div>`;
  }
  if(o.kind==='accessory'||o.kind==='decor')html+=`<label class="lock-row"><input id="lockSelected" type="checkbox" ${o.locked?'checked':''}> <span>Verrouiller la position</span></label>`;
  inspectorFields.innerHTML=html;
  inspectorFields.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('input',()=>{const obj=selected();if(!obj)return;const key=inp.dataset.k;let val=inp.value;if(['height','width','zHeight','elevation','intensity','beam','focal','modifierSize','cct','hue','saturation'].includes(key))val=Number(val);if(inp.dataset.convert==='cm')val=val/100;if(key==='focal')val=clamp(Number.isFinite(val)?val:Number(inp.value)||obj.focal||50,12,300);obj[key]=val;const out=inp.parentElement?.querySelector(`[data-slider-out="${key}"]`)||inp.closest('.field')?.querySelector(`[data-slider-out="${key}"]`);if(out){const num=Number(inp.value);const shown=inp.dataset.convert==='cm'?Math.round(num):(key==='cct'||key==='beam'||key==='focal'?Math.round(num):num);out.textContent=key==='cct'?`${shown} K`:key==='beam'?`${shown}°`:key==='focal'?`${shown} mm`:['height','width','zHeight','elevation'].includes(key)?`${num.toFixed(key==='width'?1:2)} m`:inp.dataset.convert==='cm'?`${shown} cm`:`${Math.round(num)} %`}if(key==='focal'){const numVal=Math.round(obj.focal||50);const focalInput=document.getElementById('cameraFocalInput');if(focalInput&&document.activeElement!==focalInput)focalInput.value=String(numVal);inspectorFields.querySelectorAll('[data-focal-preset]').forEach(btn=>btn.classList.toggle('active',Number(btn.dataset.focalPreset)===numVal))}if(obj.kind==='camera')state.activePreviewCamera=obj.id;renderCanvas()}));
  const camModel=document.getElementById('selectedCameraModel');if(camModel)camModel.onchange=()=>{const obj=selected();if(!obj||obj.kind!=='camera')return;obj.cameraModel=camModel.value;state.activePreviewCamera=obj.id;renderCanvas()};
  inspectorFields.querySelectorAll('[data-focal-preset]').forEach(btn=>btn.onclick=()=>{const obj=selected();if(!obj||obj.kind!=='camera')return;obj.focal=clamp(Number(btn.dataset.focalPreset)||50,12,300);state.activePreviewCamera=obj.id;renderInspector();renderCanvas()});
  const lightModel=document.getElementById('selectedLightModel');if(lightModel)lightModel.onchange=()=>{const obj=selected();if(!obj||obj.kind!=='light')return;const preset=lightCatalog[Number(lightModel.value)];if(preset)addLightFromPreset(preset,obj.id)};
  inspectorFields.querySelectorAll('[data-choice] button').forEach(btn=>btn.onclick=()=>{const obj=selected();if(!obj)return;const key=btn.parentElement.dataset.choice;obj[key]=btn.dataset.value;if(key==='modifier'){if(obj.modifier==='softbox'&&!obj.modifierSize)obj.modifierSize=.9;if(obj.modifier?.startsWith('umbrella'))obj.modifierSize=Number(obj.modifierSize)||1.05}render()});
  const lock=document.getElementById('lockSelected');if(lock)lock.onchange=()=>{o.locked=lock.checked;render()};
}
function nearestSubjectDistance(o){const ss=state.objects.filter(x=>x.kind==='subject');if(!ss.length)return 0;return Math.min(...ss.map(s=>dist(o,s)))}

// V0.8 — association au mur explicite : aucun aimantage automatique.
function isOpening(o){return o?.kind==='decor'&&['window','door'].includes(o.type)}
function wallFrame(wall){
  const a=rad(wall.rot||0);return{ux:{x:Math.cos(a),y:Math.sin(a)},uy:{x:-Math.sin(a),y:Math.cos(a)},half:(wall.width||3)*SCALE/2};
}
function openingPlacementOnWall(o,wall,x=o.x,y=o.y){
  const f=wallFrame(wall),dx=x-wall.x,dy=y-wall.y,along=dx*f.ux.x+dy*f.ux.y,perp=dx*f.uy.x+dy*f.uy.y,halfOpening=(o.width||1)*SCALE/2;
  const limit=Math.max(0,f.half-halfOpening),clamped=clamp(along,-limit,limit);
  return{along,perp,clamped,x:wall.x+f.ux.x*clamped,y:wall.y+f.ux.y*clamped,rot:wall.rot||0};
}
function attachOpeningToWall(o,wall,x=o.x,y=o.y){
  if(!isOpening(o)||!wall||wall.type!=='wall')return false;const p=openingPlacementOnWall(o,wall,x,y);o.wallId=wall.id;o.wallOffset=p.clamped/SCALE;o.x=p.x;o.y=p.y;o.rot=p.rot;return true;
}
function detachOpening(o){if(!o)return;delete o.wallId;delete o.wallOffset}
function findNearbyWall(o,x=o.x,y=o.y,maxDistance=.32){
  if(!isOpening(o))return null;let best=null;for(const wall of state.objects.filter(w=>w.kind==='decor'&&w.type==='wall')){
    const p=openingPlacementOnWall(o,wall,x,y),halfOpening=(o.width||1)*SCALE/2,within=Math.abs(p.along)<=wallFrame(wall).half+halfOpening*.35;
    if(!within)continue;const d=Math.abs(p.perp)/SCALE;if(d<=maxDistance&&(!best||d<best.d))best={wall,p,d};
  }return best;
}
function syncOpeningToWall(o){
  if(!isOpening(o)||!o.wallId)return;const wall=state.objects.find(w=>w.id===o.wallId&&w.type==='wall');if(!wall){detachOpening(o);return}
  const f=wallFrame(wall),halfOpening=(o.width||1)*SCALE/2,limit=Math.max(0,f.half-halfOpening),off=clamp(Number(o.wallOffset??0)*SCALE,-limit,limit);o.wallOffset=off/SCALE;o.x=wall.x+f.ux.x*off;o.y=wall.y+f.ux.y*off;o.rot=wall.rot||0;
}
function syncWallChildren(wall){state.objects.filter(o=>o.wallId===wall.id).forEach(syncOpeningToWall)}
function migrateOpeningBindings(){
  // V1.0 simplifie le décor : fenêtres et portes restent toujours des objets libres.
  state.objects.filter(isOpening).forEach(detachOpening);
  state.openingBindingVersion=3;
}

function cameraSpace(cam,obj){const dx=(obj.x-cam.x)/SCALE,dy=(obj.y-cam.y)/SCALE,a=-rad(cam.rot);return{forward:dx*Math.cos(a)-dy*Math.sin(a),side:dx*Math.sin(a)+dy*Math.cos(a)}}
function cameraFovs(cam){const {sensor,focal}=cameraSettings(cam),hfov=2*Math.atan(sensor.w/(2*focal)),effectiveH=Math.min(sensor.h,sensor.w*9/16),vfov=2*Math.atan(effectiveH/(2*focal));return{hfov,vfov,sensor,focal}}
function projectWorld(cam,x,y,z,W=1600,H=900){
  const cs=cameraSpace(cam,{x,y});if(cs.forward<=.03)return null;const {hfov,vfov}=cameraFovs(cam),halfW=cs.forward*Math.tan(hfov/2),halfH=cs.forward*Math.tan(vfov/2);return{x:W*(.5+cs.side/(2*halfW)),y:H*(.5-(z-(cam.height||1.55))/(2*halfH)),forward:cs.forward,side:cs.side};
}
function shotLabel(item,monitorH=900){
  if(!item||!item.bbox)return null;
  const top=Number(item.bbox.y0),bottom=Number(item.bbox.y1),fullH=Math.abs(bottom-top);
  if(!Number.isFinite(top)||!Number.isFinite(bottom)||fullH<1)return null;
  // Si le haut du sujet est fortement hors cadre, le découpage ne correspond plus à une nomenclature fiable.
  if(top < -monitorH*.05)return null;
  // Le bas du cadre est converti en hauteur anatomique (0 = pieds, 1 = sommet du crâne).
  const cutFromGround=bottom<=monitorH?0:clamp((bottom-monitorH)/fullH,0,1);
  if(cutFromGround===0){
    const r=fullH/monitorH;
    return r<.52?'Plan pied large':'Plan pied';
  }
  // Catégories fondées sur le point de coupe réel du corps, et non sur sa hauteur totale projetée.
  if(cutFromGround<.43)return'Plan américain';       // coupe cuisses / au-dessus du genou
  if(cutFromGround<.60)return'Plan taille';          // bassin / taille
  if(cutFromGround<.76)return'Plan poitrine';        // buste / poitrine
  if(cutFromGround<.90)return'Gros plan';            // épaules / base du cou
  return'Très gros plan';                            // visage
}
function objectAxisEndpoints(o,widthMeters){const a=rad(o.rot||0),dx=Math.cos(a)*widthMeters*SCALE/2,dy=Math.sin(a)*widthMeters*SCALE/2;return[{x:o.x-dx,y:o.y-dy},{x:o.x+dx,y:o.y+dy}]}
function svgNode(tag,attrs={},text=''){const el=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))el.setAttribute(k,v);if(text)el.textContent=text;return el}
function verticalPlanePoints(cam,o,width,z0,z1){
  const [a,b]=objectAxisEndpoints(o,width),pts=[projectWorld(cam,a.x,a.y,z0),projectWorld(cam,b.x,b.y,z0),projectWorld(cam,b.x,b.y,z1),projectWorld(cam,a.x,a.y,z1)];return pts.some(p=>!p)?null:pts;
}
function projectedVerticalPlane(cam,o,width,z0,z1,cls,label){
  const pts=verticalPlanePoints(cam,o,width,z0,z1);if(!pts)return null;const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y),g=svgNode('g',{'data-depth':Math.max(...pts.map(p=>p.forward))});g.appendChild(svgNode('polygon',{points:pts.map(p=>`${p.x},${p.y}`).join(' '),class:cls}));
  if(label){const cx=xs.reduce((a,b)=>a+b,0)/4,cy=ys.reduce((a,b)=>a+b,0)/4;g.appendChild(svgNode('text',{x:cx,y:cy,class:'preview-object-code','text-anchor':'middle','dominant-baseline':'middle'},label))}
  return{node:g,depth:pts.reduce((a,p)=>a+p.forward,0)/4,bbox:{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}};
}
function pathFromProjectedPoints(pts){return`M ${pts.map(p=>`${p.x} ${p.y}`).join(' L ')} Z`}
function angleDistance180(a,b){let d=Math.abs((((Number(a||0)-Number(b||0))+90)%180+180)%180-90);return d}
function previewWallMatch(o){
  if(!isOpening(o))return null;
  if(o.wallId){const wall=state.objects.find(w=>w.id===o.wallId&&w.kind==='decor'&&w.type==='wall');if(wall)return{wall,p:openingPlacementOnWall(o,wall,o.x,o.y),explicit:true}}
  let best=null;
  for(const wall of state.objects.filter(w=>w.kind==='decor'&&w.type==='wall')){
    const p=openingPlacementOnWall(o,wall,o.x,o.y),angle=angleDistance180(o.rot,wall.rot),perp=Math.abs(p.perp)/SCALE,halfOpening=(o.width||1)*SCALE/2,within=Math.abs(p.along)<=wallFrame(wall).half-halfOpening*.55;
    const tolerance=Math.max(.12,Number(wall.height||.1)/2+Number(o.height||.1)/2+.07);
    if(!within||perp>tolerance||angle>12)continue;
    const score=perp+angle/120;if(!best||score<best.score)best={wall,p,explicit:false,score};
  }
  return best;
}
function previewOpeningProxy(o,match){
  if(!match)return o;const f=wallFrame(match.wall),halfOpening=(o.width||1)*SCALE/2,limit=Math.max(0,f.half-halfOpening),off=clamp(match.p.clamped,-limit,limit);
  return{...o,x:match.wall.x+f.ux.x*off,y:match.wall.y+f.ux.y*off,rot:match.wall.rot||0};
}
function projectedWallWithOpenings(cam,wall){
  const outer=verticalPlanePoints(cam,wall,wall.width||3,0,wall.zHeight||2.5);if(!outer)return null;
  const children=state.objects.filter(isOpening).map(o=>({o,match:previewWallMatch(o)})).filter(x=>x.match?.wall?.id===wall.id);let d=pathFromProjectedPoints(outer),projectedChildren=[];
  for(const {o,match} of children){const proxy=previewOpeningProxy(o,match),z0=o.type==='window'?(o.elevation??.9):0,z1=o.type==='window'?z0+(o.zHeight||1.2):(o.zHeight||2.04),pts=verticalPlanePoints(cam,proxy,o.width||(o.type==='window'?1.5:.9),z0,z1);if(!pts)continue;d+=' '+pathFromProjectedPoints(pts);projectedChildren.push({o,pts});}
  const xs=outer.map(p=>p.x),ys=outer.map(p=>p.y),g=svgNode('g',{'data-depth':Math.max(...outer.map(p=>p.forward))});
  g.appendChild(svgNode('path',{d,class:'preview-wall','fill-rule':'evenodd'}));
  // Le trou est réellement découpé dans le mur. On ne redessine qu'un cadre, sans aplat opaque devant le mur.
  for(const {o,pts} of projectedChildren){
    const cls=o.type==='window'?'preview-window-frame':'preview-door-frame';
    g.appendChild(svgNode('polygon',{points:pts.map(p=>`${p.x},${p.y}`).join(' '),class:cls}));
    if(o.type==='window'){
      const bottomMid={x:(pts[0].x+pts[1].x)/2,y:(pts[0].y+pts[1].y)/2},topMid={x:(pts[2].x+pts[3].x)/2,y:(pts[2].y+pts[3].y)/2};
      g.appendChild(svgNode('line',{x1:bottomMid.x,y1:bottomMid.y,x2:topMid.x,y2:topMid.y,class:'preview-window-mullion'}));
    }
  }
  return{node:g,depth:outer.reduce((a,p)=>a+p.forward,0)/4,bbox:{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}};
}
function projectedBillboard(cam,x,y,zCenter,width,height,cls,label){
  const c=projectWorld(cam,x,y,zCenter);if(!c)return null;const {hfov,vfov}=cameraFovs(cam),W=1600,H=900,pxW=W*width/(2*c.forward*Math.tan(hfov/2)),pxH=H*height/(2*c.forward*Math.tan(vfov/2)),x0=c.x-pxW/2,y0=c.y-pxH/2;
  const g=svgNode('g',{'data-depth':c.forward});g.appendChild(svgNode('rect',{x:x0,y:y0,width:pxW,height:pxH,rx:Math.min(18,Math.max(3,pxH*.08)),class:cls}));if(label&&pxW>28&&pxH>16)g.appendChild(svgNode('text',{x:c.x,y:c.y,class:'preview-object-code','text-anchor':'middle','dominant-baseline':'middle'},label));return{node:g,depth:c.forward,bbox:{x0,x1:x0+pxW,y0,y1:y0+pxH}};
}
function bboxTouchesFrame(b){return b&&b.x1>0&&b.x0<1600&&b.y1>0&&b.y0<900}
function addSubjectPreview(cam,o){
  const bottom=projectWorld(cam,o.x,o.y,0),top=projectWorld(cam,o.x,o.y,o.height||1.75);if(!bottom||!top)return null;const h=Math.abs(bottom.y-top.y),midX=(bottom.x+top.x)/2,w=Math.max(12,h*.28),g=svgNode('g',{'data-depth':bottom.forward});
  const headR=Math.max(4,w*.27),headY=top.y+h*.12;g.appendChild(svgNode('circle',{cx:midX,cy:headY,r:headR,class:'preview-subject'}));g.appendChild(svgNode('rect',{x:midX-w*.38,y:top.y+h*.23,width:w*.76,height:h*.43,rx:w*.22,class:'preview-subject'}));g.appendChild(svgNode('rect',{x:midX-w*.32,y:top.y+h*.60,width:w*.25,height:h*.40,rx:w*.06,class:'preview-subject'}));g.appendChild(svgNode('rect',{x:midX+w*.07,y:top.y+h*.60,width:w*.25,height:h*.40,rx:w*.06,class:'preview-subject'}));
  const faceSize=headR*2;
  if(faceSize>16){
    const a=rad(o.rot||0),forwardLen=.4*SCALE;
    const frontPoint=projectWorld(cam,o.x+Math.cos(a)*forwardLen,o.y+Math.sin(a)*forwardLen,(o.height||1.75)*.9);
    const screenDx=frontPoint?frontPoint.x-midX:0;
    const dir=screenDx>=0?1:-1; // +1 = regarde vers la droite du cadre
    const toCamX=(cam.x-o.x)/SCALE,toCamY=(cam.y-o.y)/SCALE,toCamLen=Math.hypot(toCamX,toCamY)||1;
    const fwdX=Math.cos(a),fwdY=Math.sin(a);
    const towardCam=(fwdX*(toCamX/toCamLen)+fwdY*(toCamY/toCamLen)); // 1 = face caméra, 0 = profil, -1 = dos caméra
    const eyeY=headY-headR*.10,eyeRx=Math.max(1.9,headR*.14),eyeRy=Math.max(1.6,headR*.11),pupilR=Math.max(1.1,headR*.06);
    if(towardCam>0.97){
      // Regard caméra franc uniquement si vraiment face caméra
      const spread=headR*.40,leftX=midX-spread,rightX=midX+spread,noseX=midX;
      g.appendChild(svgNode('ellipse',{cx:leftX,cy:eyeY,rx:eyeRx,ry:eyeRy,class:'preview-face-feature'}));
      g.appendChild(svgNode('ellipse',{cx:rightX,cy:eyeY,rx:eyeRx,ry:eyeRy,class:'preview-face-feature'}));
      g.appendChild(svgNode('circle',{cx:leftX,cy:eyeY,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('circle',{cx:rightX,cy:eyeY,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('polygon',{points:`${noseX},${headY+headR*.02} ${noseX+headR*.08},${headY+headR*.20} ${noseX-headR*.08},${headY+headR*.20}`,class:'preview-face-nose-fill'}));
    }else if(towardCam>0.78){
      // Face légèrement de biais : deux yeux presque symétriques, nez très peu décalé
      const amt=(0.97-towardCam)/(0.97-0.78);
      const spread=headR*(.40-.02*amt),shift=dir*headR*(.03+.06*amt),noseX=midX+dir*headR*(.04+.08*amt);
      const leftX=midX-spread+shift,rightX=midX+spread+shift;
      const farScale=1-amt*.10,nearScale=1+amt*.03;
      const leftNear=dir<0,rightNear=dir>0;
      g.appendChild(svgNode('ellipse',{cx:leftX,cy:eyeY,rx:eyeRx*(leftNear?nearScale:farScale),ry:eyeRy*(leftNear?nearScale:farScale),class:'preview-face-feature'}));
      g.appendChild(svgNode('ellipse',{cx:rightX,cy:eyeY,rx:eyeRx*(rightNear?nearScale:farScale),ry:eyeRy*(rightNear?nearScale:farScale),class:'preview-face-feature'}));
      g.appendChild(svgNode('circle',{cx:leftX+dir*eyeRx*.22,cy:eyeY,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('circle',{cx:rightX+dir*eyeRx*.22,cy:eyeY,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('path',{d:`M ${noseX} ${headY+headR*.02} L ${noseX+dir*headR*.08} ${headY+headR*.17} L ${noseX-dir*headR*.03} ${headY+headR*.28}`,class:'preview-face-nose'}));
    }else if(towardCam>0.42){
      // Trois-quarts doux : deux yeux, lointain un peu plus petit, nez qui tourne progressivement
      const amt=(0.78-towardCam)/(0.78-0.42);
      const spread=headR*(.39-.05*amt),shift=dir*headR*(.08+.10*amt),noseX=midX+dir*headR*(.10+.12*amt);
      const leftX=midX-spread+shift,rightX=midX+spread+shift;
      const farScale=1-amt*.28,nearScale=1+amt*.04;
      const leftNear=dir<0,rightNear=dir>0;
      g.appendChild(svgNode('ellipse',{cx:leftX,cy:eyeY,rx:eyeRx*(leftNear?nearScale:farScale),ry:eyeRy*(leftNear?nearScale:farScale),class:'preview-face-feature'}));
      g.appendChild(svgNode('ellipse',{cx:rightX,cy:eyeY,rx:eyeRx*(rightNear?nearScale:farScale),ry:eyeRy*(rightNear?nearScale:farScale),class:'preview-face-feature'}));
      g.appendChild(svgNode('circle',{cx:leftX+dir*eyeRx*.3,cy:eyeY,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('circle',{cx:rightX+dir*eyeRx*.3,cy:eyeY,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('path',{d:`M ${noseX} ${headY+headR*.02} L ${noseX+dir*headR*.12} ${headY+headR*.17} L ${noseX-dir*headR*.04} ${headY+headR*.30}`,class:'preview-face-nose'}));
    }else if(towardCam>-0.30){
      // Profil / quasi profil : un oeil placé au-dessus + nez noir clairement hors du visage
      const eyeX=midX+dir*headR*.24,eyeYProfile=headY-headR*.16,triBaseX=midX+dir*headR*.92,triTipX=midX+dir*headR*1.28,triY=headY+headR*.04;
      g.appendChild(svgNode('ellipse',{cx:eyeX,cy:eyeYProfile,rx:eyeRx*1.02,ry:eyeRy*1.02,class:'preview-face-feature'}));
      g.appendChild(svgNode('circle',{cx:eyeX+dir*eyeRx*.20,cy:eyeYProfile,r:pupilR,class:'preview-face-pupil'}));
      g.appendChild(svgNode('polygon',{points:`${triTipX},${triY} ${triBaseX},${triY-headR*.14} ${triBaseX},${triY+headR*.14}`,class:'preview-face-nose-solid'}));
    }else{
      // Dos caméra
      g.appendChild(svgNode('path',{d:`M ${midX-headR*.26} ${headY-headR*.06} Q ${midX} ${headY+headR*.12} ${midX+headR*.26} ${headY-headR*.06}`,class:'preview-face-back'}));
    }
  }
  g.appendChild(svgNode('text',{x:midX,y:Math.max(18,top.y-10),class:'preview-subject-label','text-anchor':'middle'},o.name));
  return{node:g,depth:bottom.forward,bbox:{x0:midX-w/2,x1:midX+w/2,y0:top.y,y1:bottom.y},subjectHeight:h};
}
function addTablePreview(cam,o){
  const a=rad(o.rot||0),ux={x:Math.cos(a),y:Math.sin(a)},uy={x:-Math.sin(a),y:Math.cos(a)},hw=(o.width||1.6)*SCALE/2,hd=(o.height||.8)*SCALE/2,z=o.zHeight||.75,ptsWorld=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sy])=>({x:o.x+ux.x*hw*sx+uy.x*hd*sy,y:o.y+ux.y*hw*sx+uy.y*hd*sy})),pts=ptsWorld.map(p=>projectWorld(cam,p.x,p.y,z));if(pts.some(p=>!p))return null;const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y),g=svgNode('g');g.appendChild(svgNode('polygon',{points:pts.map(p=>`${p.x},${p.y}`).join(' '),class:'preview-table'}));const near=[...pts].sort((a,b)=>a.forward-b.forward).slice(0,2);near.forEach((pt,i)=>{const wp=ptsWorld[pts.indexOf(pt)],base=projectWorld(cam,wp.x,wp.y,0);if(base)g.appendChild(svgNode('line',{x1:pt.x,y1:pt.y,x2:base.x,y2:base.y,class:'preview-table-leg'}))});return{node:g,depth:pts.reduce((a,p)=>a+p.forward,0)/4,bbox:{x0:Math.min(...xs),x1:Math.max(...xs),y0:Math.min(...ys),y1:Math.max(...ys)}};
}
function previewItemForObject(cam,o){
  if(o.id===cam.id)return null;
  if(o.kind==='subject')return addSubjectPreview(cam,o);
  if(o.kind==='decor'){
    // V1.0 : la vue caméra est un contrôle de cadre/encombrement, pas une reconstruction 3D du décor.
    if(o.type==='wall'||o.type==='door')return null;
    if(o.type==='window')return projectedVerticalPlane(cam,o,o.width||1.5,o.elevation??.9,(o.elevation??.9)+(o.zHeight||1.2),'preview-window','FENÊTRE');
    if(o.type==='table')return addTablePreview(cam,o);
  }
  if(o.kind==='accessory'){
    const cls=o.type==='diffusion'?'preview-diffusion':o.type==='reflector'?'preview-reflector':o.type==='borniol'?'preview-borniol':'preview-negative';return projectedVerticalPlane(cam,o,o.width||1.2,o.elevation??.35,(o.elevation??.35)+(o.zHeight||o.height||1.5),cls,o.short||'');
  }
  if(o.kind==='light'){
    const a=rad(o.rot||0),mod=o.modifier||'none',soft=mod==='softbox',umbrella=mod==='umbrella-reflect'||mod==='umbrella-diffusion',modSize=Math.max(.3,Number(o.modifierSize)||(soft?.9:1.05)),shift=soft?Math.max(.25,modSize*.28):umbrella?Math.max(.22,modSize*.22):0,x=o.x+Math.cos(a)*shift*SCALE,y=o.y+Math.sin(a)*shift*SCALE;let w=.38,h=.30,label=o.short||'LIGHT',cls='preview-light';
    if(soft){w=Math.max(.45,modSize*.78);h=Math.max(.45,modSize*.78);label='SOFTBOX';cls='preview-softbox'}else if(umbrella){w=Math.max(.42,modSize*.72);h=Math.max(.42,modSize*.72);label=mod==='umbrella-reflect'?'PARA R':'PARA D';cls=mod==='umbrella-reflect'?'preview-umbrella-reflect':'preview-umbrella-diffusion'}else if(['tube','pixel-bar','strip'].includes(o.form)){w=(o.length||60)/55*.65;h=.10}else if(['panel','panel-wide','nova','nova-narrow','mat'].includes(o.form)){w=.75;h=.48}else if(o.form==='halo'){w=.48;h=.48;cls='preview-halo'};
    return projectedBillboard(cam,x,y,o.height||2,w,h,cls,label);
  }
  if(o.kind==='camera')return projectedBillboard(cam,o.x,o.y,o.height||1.55,.48,.34,'preview-other-camera','CAM');
  return null;
}
function makeMonitorCard(cam,compact=false){
  normalizeCameraObject(cam);const card=document.createElement('div');card.className='camera-monitor-card'+(compact?' compact':'');card.dataset.cameraId=cam.id;
  const head=document.createElement('div');head.className='camera-monitor-head';head.innerHTML=`<div><strong>${esc(cam.name)}</strong><span>${esc(cam.cameraModel)} · ${cam.focal} mm · H ${cam.height.toFixed(2)} m</span></div><button class="monitor-select" type="button">Sélectionner</button>`;head.querySelector('button').onclick=()=>{state.selected=cam.id;state.activePreviewCamera=cam.id;render()};card.appendChild(head);
  const shell=document.createElement('div');shell.className='monitor-shell';const monitor=document.createElement('div');monitor.className='monitor';const svg=svgNode('svg',{viewBox:'0 0 1600 900',preserveAspectRatio:'xMidYMid slice',class:'preview-svg'});svg.appendChild(svgNode('rect',{x:0,y:0,width:1600,height:900,class:'preview-background'}));
  const items=[];let visibleSubjects=[],technical=[],visibleWindows=[];state.objects.forEach(o=>{const item=previewItemForObject(cam,o);if(!item)return;item.object=o;items.push(item);if(bboxTouchesFrame(item.bbox)){if(o.kind==='subject')visibleSubjects.push(item);if(['light','accessory','camera'].includes(o.kind))technical.push(o);if(o.kind==='decor'&&o.type==='window')visibleWindows.push(o)}});items.sort((a,b)=>b.depth-a.depth).forEach(item=>svg.appendChild(item.node));
  const guides=svgNode('g',{class:'preview-guides'});guides.appendChild(svgNode('rect',{x:80,y:45,width:1440,height:810,class:'preview-safe'}));[1600/3,3200/3].forEach(x=>guides.appendChild(svgNode('line',{x1:x,y1:0,x2:x,y2:900,class:'preview-third'})));[300,600].forEach(y=>guides.appendChild(svgNode('line',{x1:0,y1:y,x2:1600,y2:y,class:'preview-third'})));svg.appendChild(guides);monitor.appendChild(svg);
  const label=document.createElement('div');label.className='preview-label';if(visibleSubjects.length){const main=visibleSubjects.sort((a,b)=>Math.abs((a.bbox.x0+a.bbox.x1)/2-800)-Math.abs((b.bbox.x0+b.bbox.x1)/2-800))[0];const framing=shotLabel(main);label.textContent=`${framing?framing+' · ':''}${visibleSubjects.length} sujet${visibleSubjects.length>1?'s':''} visible${visibleSubjects.length>1?'s':''}`}else label.textContent='Aucun sujet dans le cadre';monitor.appendChild(label);
  if(visibleWindows.length){const info=document.createElement('div');info.className='preview-scene-info';info.textContent=`Fenêtre${visibleWindows.length>1?'s':''} visible${visibleWindows.length>1?'s':''} : ${visibleWindows.map(o=>o.name).slice(0,2).join(' · ')}${visibleWindows.length>2?` +${visibleWindows.length-2}`:''}`;monitor.appendChild(info)}
  if(technical.length){const alert=document.createElement('div');alert.className='preview-warning';const names=[...new Set(technical.map(o=>o.kind==='light'?(o.modifier==='softbox'?`${o.short||o.name} + softbox`:o.modifier==='umbrella-reflect'?`${o.short||o.name} + parapluie réflexion`:o.modifier==='umbrella-diffusion'?`${o.short||o.name} + parapluie diffusion`:(o.short||o.name)):o.name))];alert.textContent=`⚠ Dans le champ : ${names.slice(0,3).join(' · ')}${names.length>3?` +${names.length-3}`:''}`;monitor.appendChild(alert)}
  shell.appendChild(monitor);card.appendChild(shell);return card;
}
function renderPreview(){
  const cams=state.objects.filter(o=>o.kind==='camera').map(normalizeCameraObject);cameraMonitors.innerHTML='';previewTabs.innerHTML='';
  if(!cams.length){previewTabs.classList.add('hidden');cameraReadout.textContent='Ajoute une caméra pour afficher le cadre.';cameraMonitors.innerHTML='<div class="no-camera-preview">Ajoute une caméra au plan pour voir son cadre.</div>';return}
  if(!cams.some(c=>c.id===state.activePreviewCamera))state.activePreviewCamera=cams[0].id;
  if(cams.length===1){previewTabs.classList.add('hidden');cameraReadout.textContent='';cameraMonitors.className='camera-monitors one';cameraMonitors.appendChild(makeMonitorCard(cams[0]));return}
  if(cams.length===2){previewTabs.classList.add('hidden');cameraReadout.textContent='2 caméras · vues affichées simultanément.';cameraMonitors.className='camera-monitors two';cams.forEach(c=>cameraMonitors.appendChild(makeMonitorCard(c,true)));return}
  previewTabs.classList.remove('hidden');cameraReadout.textContent=`${cams.length} caméras · sélectionne la vue à afficher.`;cams.forEach(c=>{const b=document.createElement('button');b.className='preview-tab'+(c.id===state.activePreviewCamera?' active':'');b.textContent=c.name;b.onclick=()=>{state.activePreviewCamera=c.id;renderPreview()};previewTabs.appendChild(b)});cameraMonitors.className='camera-monitors one';cameraMonitors.appendChild(makeMonitorCard(cams.find(c=>c.id===state.activePreviewCamera)||cams[0]));
}

function addSubject(){const n=state.objects.filter(o=>o.kind==='subject').length+1,o={id:uid('subj'),kind:'subject',name:`Sujet ${n}`,x:stageW()/2+40*(n-1),y:stageH()/2-10,rot:90,height:1.75,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render()}
function addCamera(){const n=state.objects.filter(o=>o.kind==='camera').length+1,o={id:uid('cam'),kind:'camera',name:`Caméra ${String.fromCharCode(64+n)}`,x:stageW()/2+(n-1)*55,y:stageH()-100,rot:-90,height:1.55,cameraModel:'Sony FX3',focal:50,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;state.activePreviewCamera=o.id;closeAddDialog();render()}
function addLightFromPreset(p,replaceId=null){
  if(replaceId){const o=state.objects.find(x=>x.id===replaceId);if(o){const mod=o.modifier||'none';Object.assign(o,{name:p.name,brand:p.brand,family:p.family,form:p.form,short:p.short,beam:p.beam,aspect:p.aspect,length:p.length,modifier:supportsSoftbox({kind:'light',form:p.form})?mod:'none'});state.selected=o.id;closeAddDialog();render();return}}
  const n=state.objects.filter(o=>o.kind==='light').length,o={id:uid('light'),kind:'light',name:p.name,brand:p.brand,family:p.family,form:p.form,short:p.short,x:245+(n%5)*72,y:235+(n%3)*75,rot:0,beam:p.beam,beamVisible:true,intensity:50,height:2,aspect:p.aspect,length:p.length,modifier:'none',modifierSize:.9,colorMode:'cct',cct:5600,hue:0,saturation:100,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render();
}
function addAccessory(p){const n=state.objects.filter(o=>o.kind==='accessory').length,o={id:uid('acc'),kind:'accessory',type:p.type,name:p.name,short:p.short,x:Math.max(180,stageW()/2-140)+(n%4)*80,y:160+(n%3)*70,rot:0,width:p.width,height:p.height,zHeight:p.height,elevation:p.type==='borniol'?.2:.35,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render()}
function addDecor(p){const n=state.objects.filter(o=>o.kind==='decor').length,zHeight=p.type==='wall'?2.5:p.type==='door'?2.04:p.type==='window'?1.2:.75,elevation=p.type==='window'?.9:0,o={id:uid('decor'),kind:'decor',type:p.type,name:p.name,x:Math.max(200,stageW()/2-70)+(n%4)*90,y:140+(n%3)*80,rot:0,width:p.width,height:p.height,zHeight,elevation,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render()}

function openAddDialog(){replaceLightId=null;showKinds();if(typeof addDialog.showModal==='function')addDialog.showModal();else addDialog.setAttribute('open','')}
function closeAddDialog(){if(addDialog.open&&typeof addDialog.close==='function')addDialog.close();else addDialog.removeAttribute('open');replaceLightId=null}
function hideChoosers(){addKinds.classList.add('hidden');lightChooser.classList.add('hidden');simpleChooser.classList.add('hidden')}
function showKinds(){hideChoosers();addKinds.classList.remove('hidden');dialogTitle.textContent='Choisir un élément'}
function openLightChooser(replaceId=null){
  replaceLightId=replaceId;hideChoosers();lightChooser.classList.remove('hidden');dialogTitle.textContent=replaceId?'Changer de projecteur':'Choisir une lumière';const obj=replaceId?state.objects.find(x=>x.id===replaceId):null;catalogBrand=obj?.brand||catalogBrand||'Amaran';catalogFamily=obj?.family||'';renderLightChooser();if(!addDialog.open){if(typeof addDialog.showModal==='function')addDialog.showModal();else addDialog.setAttribute('open','')}
}
function renderLightChooser(){
  const brands=['Amaran','Aputure'];brandChoices.innerHTML=brands.map(b=>`<button class="choice-btn ${catalogBrand===b?'active':''}" data-brand="${b}">${b}</button>`).join('');
  brandChoices.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{catalogBrand=btn.dataset.brand;catalogFamily='';renderLightChooser()});
  const fams=[...new Set(lightCatalog.filter(p=>p.brand===catalogBrand).map(p=>p.family))];if(!fams.includes(catalogFamily))catalogFamily=fams[0]||'';
  familyChoices.innerHTML=fams.map(f=>`<button class="choice-btn ${catalogFamily===f?'active':''}" data-family="${esc(f)}">${esc(f.toUpperCase())}</button>`).join('');
  familyChoices.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{catalogFamily=btn.dataset.family;renderLightChooser()});
  if(favoriteChoices){favoriteChoices.innerHTML=`<button class="choice-btn ${!catalogFavoritesOnly?'active':''}" data-fav-mode="all">Tous</button><button class="choice-btn ${catalogFavoritesOnly?'active':''}" data-fav-mode="fav">★ Favoris</button>`;favoriteChoices.querySelectorAll('button').forEach(btn=>btn.onclick=()=>{catalogFavoritesOnly=btn.dataset.favMode==='fav';renderLightChooser()})}
  const baseItems=lightCatalog.filter(p=>p.brand===catalogBrand&&p.family===catalogFamily);
  const items=catalogFavoritesOnly?baseItems.filter(isFavoriteLight):baseItems;
  modelChoices.innerHTML=items.length?items.map(p=>`<div class="model-row"><button class="choice-btn model-btn" data-light-index="${lightCatalog.indexOf(p)}">${esc(p.name.replace(/^amaran\s+|^Aputure\s+/i,''))}</button><button class="fav-btn ${isFavoriteLight(p)?'active':''}" type="button" data-fav-index="${lightCatalog.indexOf(p)}" title="Favori">★</button></div>`).join(''):`<div class="empty-inline">Aucun projecteur favori dans cette famille.</div>`;
  modelChoices.querySelectorAll('.model-btn').forEach(btn=>btn.onclick=()=>addLightFromPreset(lightCatalog[Number(btn.dataset.lightIndex)],replaceLightId));
  modelChoices.querySelectorAll('.fav-btn').forEach(btn=>btn.onclick=(e)=>{e.stopPropagation();toggleFavoriteLight(lightCatalog[Number(btn.dataset.favIndex)])});
  const favCount=lightCatalog.filter(isFavoriteLight).length;
  catalogCount.textContent=`${lightCatalog.filter(p=>p.brand===catalogBrand).length} modèles ${catalogBrand} · ${favCount} favori${favCount>1?'s':''}`;
}
function openSimpleChooser(kind){
  hideChoosers();simpleChooser.classList.remove('hidden');const list=kind==='accessory'?accessoryCatalog:decorCatalog;dialogTitle.textContent=kind==='accessory'?'Ajouter un accessoire':'Ajouter un élément de décor';simpleLabel.textContent=kind==='accessory'?'ACCESSOIRE':'DÉCOR';simpleGrid.innerHTML=list.map((p,i)=>`<button class="simple-card" data-index="${i}"><span class="simple-picto ${kind}-${p.type}">${kind==='accessory'?(p.type==='diffusion'?'▧':p.type==='borniol'?'▬':p.type==='negative'?'■':'◇'):(p.type==='wall'?'━':p.type==='door'?'◿':p.type==='window'?'▥':'▭')}</span><strong>${esc(p.name)}</strong><small>${p.width} × ${p.height} m</small></button>`).join('');simpleGrid.querySelectorAll('button').forEach(btn=>btn.onclick=()=>kind==='accessory'?addAccessory(list[Number(btn.dataset.index)]):addDecor(list[Number(btn.dataset.index)]));
}

document.getElementById('openAddBtn').onclick=openAddDialog;
if(planOptionsToggle)planOptionsToggle.onclick=()=>{state.planOptionsOpen=!(state.planOptionsOpen!==false);updatePlanOptionsUI();scheduleAutosave();persistCurrent()};document.getElementById('closeAddBtn').onclick=closeAddDialog;document.getElementById('backToKindsBtn').onclick=()=>{replaceLightId=null;showKinds()};document.getElementById('backSimpleBtn').onclick=showKinds;
addKinds.querySelectorAll('[data-kind]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.kind;if(k==='light')openLightChooser();else if(k==='subject')addSubject();else if(k==='camera')addCamera();else openSimpleChooser(k)});
addDialog.addEventListener('click',e=>{if(e.target===addDialog)closeAddDialog()});

function populateFolderSelect(){
  folderSelect.innerHTML=library.folders.map(f=>`<option value="${esc(f.id)}" ${f.id===state.folderId?'selected':''}>${esc(f.name)}</option>`).join('');
}
function planThumbnailData(planState){
  const len=clamp(Number(planState?.planLength)||10,4,30),w=Math.max(400,Math.round(len*SCALE)),h=Math.round(w*STAGE_RATIO),TW=220,TH=Math.round(TW*h/w),sx=TW/w,sy=TH/h;
  const bg='<rect width="100%" height="100%" fill="#eef2f6"/>';
  const grid=[]; for(let x=0;x<=TW;x+=22)grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${TH}" stroke="#d7dde6" stroke-width="1"/>`); for(let y=0;y<=TH;y+=22)grid.push(`<line x1="0" y1="${y}" x2="${TW}" y2="${y}" stroke="#d7dde6" stroke-width="1"/>`);
  const objs=(planState?.objects||[]).map(o=>{const x=(o.x||0)*sx,y=(o.y||0)*sy; if(o.kind==='camera')return `<g transform="translate(${x},${y}) rotate(${o.rot||0})"><polygon points="-8,-5 8,0 -8,5" fill="#1b6fff"/><rect x="8" y="-7" width="14" height="14" rx="3" fill="#2d7cff"/></g>`; if(o.kind==='subject')return `<g transform="translate(${x},${y}) rotate(${o.rot||0})"><circle cx="0" cy="0" r="9" fill="#1d2533" opacity=".95"/><polygon points="12,0 6.2,-3.4 6.2,3.4" fill="#111"/></g>`; if(o.kind==='light')return `<g transform="translate(${x},${y}) rotate(${o.rot||0})"><rect x="-11" y="-7" width="22" height="14" rx="4" fill="#ffbf3a" stroke="#8d6100" stroke-width="1.5"/><circle cx="8" cy="0" r="7" fill="#f6efcf" stroke="#8d6100" stroke-width="1.5"/></g>`; if(o.kind==='accessory')return `<g transform="translate(${x},${y}) rotate(${o.rot||0})"><line x1="-14" y1="0" x2="14" y2="0" stroke="#9aa3ad" stroke-width="4" stroke-linecap="round"/></g>`; if(o.kind==='decor')return o.type==='wall'?`<g transform="translate(${x},${y}) rotate(${o.rot||0})"><line x1="${-(o.width||2)*50*sx/2}" y1="0" x2="${(o.width||2)*50*sx/2}" y2="0" stroke="#b7aa9a" stroke-width="4" stroke-linecap="square"/></g>`:''; return ''}).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${TW}" height="${TH}" viewBox="0 0 ${TW} ${TH}">${bg}${grid.join('')}${objs}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}
function renderLibraryList(){
  populateFolderSelect();if(planNameInput)planNameInput.value=state.planName||defaultPlanName();
  planLibraryList.innerHTML='';
  library.folders.forEach(folder=>{
    const box=document.createElement('div');box.className='folder-block';
    const title=document.createElement('div');title.className='folder-title';title.textContent=`📁 ${folder.name}`;box.appendChild(title);
    const plans=library.plans.filter(p=>p.folderId===folder.id).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    if(!plans.length){const empty=document.createElement('div');empty.className='folder-empty';empty.textContent='Aucun plan dans ce dossier.';box.appendChild(empty)}
    plans.forEach(rec=>{
      const row=document.createElement('div');row.className='plan-row';
      row.innerHTML=`<div class="plan-row-preview"><img class="plan-thumb" src="${planThumbnailData(rec.state)}" alt="Aperçu de ${esc(rec.name)}"></div><div class="plan-row-main"><strong>${esc(rec.name)}</strong><small>${formatSavedDate(rec.updatedAt)}${rec.id===state.planId?' · plan ouvert':''}</small></div><div class="plan-row-actions"><button class="primary-mini" data-act="open">Ouvrir</button><button data-act="duplicate">Dupliquer</button><button class="danger-mini" data-act="delete">Supprimer</button></div>`;
      row.querySelector('[data-act="open"]').onclick=()=>openLibraryPlan(rec.id);
      row.querySelector('[data-act="duplicate"]').onclick=()=>duplicateLibraryPlan(rec.id);
      row.querySelector('[data-act="delete"]').onclick=()=>deleteLibraryPlan(rec.id);
      box.appendChild(row);
    });planLibraryList.appendChild(box);
  });
}
function openLibraryDialog(){loadLibrary();ensureStateDefaults();renderLibraryList();if(typeof libraryDialog.showModal==='function')libraryDialog.showModal();else libraryDialog.setAttribute('open','')}
function closeLibraryDialog(){if(libraryDialog.open&&typeof libraryDialog.close==='function')libraryDialog.close();else libraryDialog.removeAttribute('open')}
function savePlanToLibrary(opts={}){
  loadLibrary();
  const mode=opts.mode||(!state.planId?'new':'overwrite');
  const folderId=opts.folderId||state.folderId||folderSelect.value||library.folders[0].id;
  const name=(opts.name||topPlanNameInput?.value||planNameInput?.value||state.planName||defaultPlanName()).trim()||defaultPlanName();
  state.planName=name;state.folderId=folderId;
  if(mode==='copy' || !state.planId)state.planId=uid('plan');
  let rec=library.plans.find(p=>p.id===state.planId);if(!rec){rec={id:state.planId};library.plans.push(rec)}
  rec.name=state.planName;rec.folderId=state.folderId;rec.updatedAt=Date.now();rec.state=snapshotState();persistLibrary();persistCurrent();renderLibraryList();updatePlanBadge();flash('Plan enregistré');
  return true;
}
function saveCurrentPlanFlow(){
  loadLibrary();ensureStateDefaults();
  if(!state.planId)return savePlanToLibrary({mode:'new'});
  const overwrite=confirm(`Le plan « ${state.planName} » existe déjà.

OK = Écraser ancien
Annuler = Créer une copie`);
  if(overwrite)return savePlanToLibrary({mode:'overwrite'});
  const copyName=prompt('Nom du plan', `${state.planName} copie`);
  if(!copyName?.trim())return false;
  return savePlanToLibrary({mode:'copy',name:copyName.trim()});
}
function openLibraryPlan(id){const rec=library.plans.find(p=>p.id===id);if(!rec)return;resetStageViewport();state=deepClone(rec.state);state.planId=rec.id;state.planName=rec.name;state.folderId=rec.folderId;ensureStateDefaults();state.objects.forEach(normalizeSceneObject);migrateOpeningBindings();state.selected=null;if(!state.activePreviewCamera)state.activePreviewCamera=state.objects.find(o=>o.kind==='camera')?.id||null;persistCurrent();render();closeLibraryDialog()}
function duplicateLibraryPlan(id){const rec=library.plans.find(p=>p.id===id);if(!rec)return;const copyName=prompt('Nom du plan', `${rec.name} copie`);if(!copyName?.trim())return;const copy=deepClone(rec);copy.id=uid('plan');copy.name=copyName.trim();copy.updatedAt=Date.now();copy.folderId=rec.folderId;copy.state.planId=copy.id;copy.state.planName=copy.name;library.plans.push(copy);persistLibrary();renderLibraryList()}
function deleteLibraryPlan(id){const rec=library.plans.find(p=>p.id===id);if(!rec||!confirm(`Supprimer « ${rec.name} » ?`))return;library.plans=library.plans.filter(p=>p.id!==id);if(state.planId===id)state.planId=null;persistLibrary();persistCurrent();renderLibraryList()}
function newPlan(){persistCurrent();loadLibrary();const folder=state.folderId||folderSelect.value||library.folders[0].id;state.planId=null;state.planName=defaultPlanName();state.folderId=folder;state.snap=.25;state.labelsMode='full';state.gridOpacity=.5;state.planLength=10;seed();resetStageViewport();render();renderLibraryList()}
function newPlanFlow(){if(confirm('Sauvegarder le plan actuel ?')){const ok=saveCurrentPlanFlow();if(!ok)return;}newPlan();flash('Nouveau plan créé')}
function projectPayload(planState=snapshotState()){return {format:'BOS_PLAN_FEU',version:'1.38',exportedAt:new Date().toISOString(),plan:deepClone(planState)}}
function projectFile(planState=snapshotState(),name=state.planName){const payload=projectPayload(planState),blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});return new File([blob],`${safeName(name)}.bosplan.json`,{type:'application/json'})}
async function shareProjectState(planState=snapshotState(),name=state.planName){
  const file=projectFile(planState,name);
  try{
    if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[file]}))){await navigator.share({title:`BOS · Plan Feu — ${name}`,text:'Copie modifiable du plan feu BOS.',files:[file]});return}
  }catch(e){if(e?.name==='AbortError')return;console.warn('Partage BOS',e)}
  downloadBlob(file, file.name);
  alert('Le partage direct de fichiers n’est pas disponible sur ce navigateur. La copie modifiable a été téléchargée : tu peux l’envoyer par AirDrop, Mail, Messages, etc.');
}
async function importProjectFile(file){
  if(!file)return;
  try{
    const raw=JSON.parse(await file.text()),incoming=raw?.format==='BOS_PLAN_FEU'?raw.plan:raw;
    if(!incoming||!Array.isArray(incoming.objects))throw new Error('Format invalide');
    resetStageViewport();state=deepClone(incoming);state.planId=null;state.planName=state.planName||file.name.replace(/\.bosplan\.json$|\.json$/i,'')||defaultPlanName();state.folderId=library.folders[0]?.id||'folder_general';
    ensureStateDefaults();state.objects.forEach(normalizeSceneObject);migrateOpeningBindings();state.selected=null;if(!state.activePreviewCamera)state.activePreviewCamera=state.objects.find(o=>o.kind==='camera')?.id||null;
    persistCurrent();render();closeLibraryDialog();flash('Projet importé');
  }catch(e){console.warn(e);alert('Ce fichier ne semble pas être un projet BOS Plan Feu valide.')}
}

document.getElementById('libraryBtn').onclick=openLibraryDialog;
document.getElementById('closeLibraryBtn').onclick=closeLibraryDialog;
libraryDialog.addEventListener('click',e=>{if(e.target===libraryDialog)closeLibraryDialog()});
document.getElementById('newFolderBtn').onclick=()=>{const name=prompt('Nom du nouveau dossier :');if(!name?.trim())return;const f={id:uid('folder'),name:name.trim()};library.folders.push(f);persistLibrary();state.folderId=f.id;renderLibraryList();folderSelect.value=f.id};
document.getElementById('newPlanBtn').onclick=newPlanFlow;
document.getElementById('saveToLibraryBtn').onclick=()=>savePlanToLibrary({mode:state.planId?'overwrite':'new',name:(planNameInput?.value||state.planName||defaultPlanName()).trim()||defaultPlanName(),folderId:folderSelect.value||state.folderId});
function toggleExportPopover(force){if(!exportPopover||!exportMenuBtn)return;const open=typeof force==='boolean'?force:exportPopover.hasAttribute('hidden');if(open){exportPopover.removeAttribute('hidden')}else{exportPopover.setAttribute('hidden','')}exportMenuBtn.setAttribute('aria-expanded',String(open));}
if(shareProjectBtn)shareProjectBtn.onclick=()=>{toggleExportPopover(false);shareProjectState()};
if(importProjectBtn)importProjectBtn.onclick=()=>importProjectInput?.click();
if(importProjectInput)importProjectInput.onchange=async()=>{const f=importProjectInput.files?.[0];importProjectInput.value='';await importProjectFile(f)};
if(exportMenuBtn)exportMenuBtn.onclick=(e)=>{e.stopPropagation();toggleExportPopover()};
if(exportPopover)exportPopover.onclick=e=>e.stopPropagation();
document.addEventListener('click',e=>{if(exportPopover && !exportPopover.hasAttribute('hidden') && !e.target.closest('.export-wrap'))toggleExportPopover(false)});
if(topPlanNameInput)topPlanNameInput.addEventListener('input',()=>{state.planName=(topPlanNameInput.value||'').trim()||defaultPlanName();if(planNameInput&&document.activeElement!==planNameInput)planNameInput.value=state.planName;persistCurrent();updatePlanBadge()});
if(planNameInput)planNameInput.addEventListener('input',()=>{state.planName=(planNameInput.value||'').trim()||defaultPlanName();if(topPlanNameInput&&document.activeElement!==topPlanNameInput)topPlanNameInput.value=state.planName;persistCurrent();updatePlanBadge()});
document.getElementById('saveBtn').onclick=saveCurrentPlanFlow;
document.getElementById('resetBtn').onclick=newPlanFlow;
function flash(txt){const b=document.getElementById('saveBtn'),lab=b?.querySelector('.tool-label');if(lab){const old=lab.textContent;lab.textContent='✓';b.title=txt;setTimeout(()=>{lab.textContent=old;b.title='Enregistrer le plan'},1200)}else if(b){const old=b.textContent;b.textContent='✓';setTimeout(()=>b.textContent=old,1200)}}
function inlineSvgStyles(original,clone){
  const props=['fill','stroke','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin','opacity','font-family','font-size','font-weight','letter-spacing','paint-order','color'];
  const os=[original,...original.querySelectorAll('*')],cs=[clone,...clone.querySelectorAll('*')];
  os.forEach((node,i)=>{const target=cs[i];if(!target)return;const st=getComputedStyle(node);const css=props.map(p=>`${p}:${st.getPropertyValue(p)}`).join(';');target.setAttribute('style',`${target.getAttribute('style')||''};${css}`)});
}
function exportPng(){
  const fullW=stageW(),fullH=stageH(),outW=1600,outH=Math.round(outW*fullH/fullW),titleH=86;
  const clone=stage.cloneNode(true);clone.setAttribute('xmlns',NS);clone.setAttribute('width',String(outW));clone.setAttribute('height',String(outH));clone.setAttribute('viewBox',`0 0 ${fullW} ${fullH}`);
  inlineSvgStyles(stage,clone);
  clone.querySelectorAll('.rotation-gizmo,.selection-ring,.selection-box,.hit').forEach(n=>n.remove());
  const source=new XMLSerializer().serializeToString(clone),blob=new Blob([source],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),img=new Image();
  img.onload=()=>{const c=document.createElement('canvas');c.width=outW;c.height=outH+titleH;const ctx=c.getContext('2d');ctx.fillStyle=getComputedStyle(document.querySelector('.stage-bg')).getPropertyValue('fill')||'#fbfcfe';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#121821';ctx.font='700 38px system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(state.planName||defaultPlanName(),c.width/2,titleH/2);ctx.drawImage(img,0,titleH,outW,outH);URL.revokeObjectURL(url);c.toBlob(b=>{if(b)downloadBlob(b,`${safeName(state.planName||defaultPlanName())}_Plan_Feu.png`)},'image/png')};
  img.onerror=()=>{URL.revokeObjectURL(url);alert("L’export PNG n’a pas pu être généré sur ce navigateur.")};img.src=url;
}
if(exportBtn)exportBtn.onclick=()=>{toggleExportPopover(false);exportPng()};
if(toggleSnapBtn)toggleSnapBtn.onclick=()=>{state.snap=Number(state.snap)>0?0:.25;updatePlanBadge();renderCanvas()};
labelsModeSelect.onchange=()=>{state.labelsMode=labelsModeSelect.value;renderCanvas()};
toggleBeamsBtn.onclick=()=>{state.beamsVisible=state.beamsVisible===false;updatePlanBadge();renderCanvas()};
if(gridOpacityRange){gridOpacityRange.oninput=()=>{state.gridOpacity=clamp(Number(gridOpacityRange.value)/100,0,1);updateGridOpacity();scheduleAutosave()};gridOpacityRange.onchange=()=>persistCurrent()}
if(planLengthRange){planLengthRange.oninput=()=>{setPlanLength(Number(planLengthRange.value),{keepViewport:true});updatePlanBadge()};planLengthRange.onchange=()=>persistCurrent()}
if(zoomReadout)zoomReadout.addEventListener('click',()=>{resetStageViewport();persistCurrent()})

function normalizeSceneObject(o){
  if(o.kind==='light')normalizeLightObject(o);
  if(o.kind==='camera')normalizeCameraObject(o);
  if(o.kind==='decor'){if(o.zHeight===undefined)o.zHeight=o.type==='wall'?2.5:o.type==='door'?2.04:o.type==='window'?1.2:.75;if(o.elevation===undefined)o.elevation=o.type==='window'?.9:0}
  if(o.kind==='accessory'){if(o.zHeight===undefined)o.zHeight=o.height||1.5;if(o.elevation===undefined)o.elevation=o.type==='borniol'?.2:.35;if(!o.short)o.short=o.type==='diffusion'?'DIFF':o.type==='negative'?'NEG':o.type==='reflector'?'REF':'BOR'}
  if(o.locked===undefined)o.locked=false;if(o.labelVisible===undefined)o.labelVisible=true;if(!o.labelPos)o.labelPos='auto';return o;
}
function load(){
  const versionBadge=document.getElementById('appVersionBadge');if(versionBadge)versionBadge.textContent=APP_VERSION;
  loadLibrary();loadFavoriteLights();
  try{
    const raw=localStorage.getItem(CURRENT_KEY)||localStorage.getItem('bos-plan-feu-v05')||localStorage.getItem('bos-plan-feu-v04')||localStorage.getItem('bos-plan-feu-v03')||localStorage.getItem('bos-plan-feu-v02')||localStorage.getItem('bos-plan-feu-v01');
    const saved=raw&&JSON.parse(raw);
    if(saved&&Array.isArray(saved.objects)){state=saved;if(!state.planName)state.planName=defaultPlanName();state.objects.forEach(normalizeSceneObject);migrateOpeningBindings();if(!state.activePreviewCamera)state.activePreviewCamera=state.objects.find(o=>o.kind==='camera')?.id||null}else seed();
  }catch{seed()}
  ensureStateDefaults();if(!cameras[state.cameraModel])state.cameraModel='Sony FX3';state.focal=Number(state.focal)||50;updateStageGeometry();resetStageViewport();updatePlanBadge();render();
}
window.addEventListener('resize',renderPreview);load();
