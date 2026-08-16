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
const addDialog=document.getElementById('addDialog');
const addKinds=document.getElementById('addKinds');
const lightChooser=document.getElementById('lightChooser');
const dialogTitle=document.getElementById('dialogTitle');
const lightCatalogEl=document.getElementById('lightCatalog');
const lightSearch=document.getElementById('lightSearch');
const familyFilter=document.getElementById('familyFilter');
const catalogCount=document.getElementById('catalogCount');

const cameras={
  'Sony FX3':{w:35.6,h:23.8},
  'Sony FX6':{w:35.7,h:18.8},
  'Sony a7S III':{w:35.6,h:23.8},
  'Full Frame 3:2':{w:36,h:24},
  'Super 35 / APS-C':{w:23.5,h:15.6}
};

// Catalogue V0.3 : fixtures Amaran + Aputure utiles en plan feu.
// Le champ "form" pilote un pictogramme top-view spécifique à la famille physique.
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

let state={objects:[],selected:null,cameraModel:'Sony FX3',focal:50};
let drag=null;
let catalogBrand='Amaran';
const SCALE=100; // px par mètre

function uid(prefix){return prefix+'_'+Math.random().toString(36).slice(2,8)}
function rad(d){return d*Math.PI/180}
function deg(r){return r*180/Math.PI}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function dist(a,b){return Math.hypot(a.x-b.x,a.y-b.y)/SCALE}
function esc(s){return String(s).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]||c))}
function safeText(s){return String(s??'')}

function presetForObject(o){
  if(!o || o.kind!=='light')return null;
  return lightCatalog.find(p=>p.name===o.name) || lightCatalog.find(p=>p.short===o.short) || null;
}

function normalizeLightObject(o){
  if(o.kind!=='light')return o;
  const p=presetForObject(o);
  if(p){
    o.brand=o.brand||p.brand;o.family=o.family||p.family;o.form=o.form||p.form;o.short=o.short||p.short;
    o.beam=Number(o.beam)||p.beam;o.aspect=o.aspect||p.aspect;o.length=o.length||p.length;
  }else{
    o.brand=o.brand||((o.name||'').toLowerCase().includes('aputure')?'Aputure':'Amaran');
    o.family=o.family||'Projecteur';o.form=o.form||((o.lightType||'').startsWith('Tube')?'tube':'cob');
    o.short=o.short||String(o.name||'LIGHT').replace(/^amaran\s+|^Aputure\s+/i,'').slice(0,6);
  }
  return o;
}

function seed(){
  state.objects=[
    {id:uid('cam'),kind:'camera',name:'Caméra A',x:500,y:505,rot:-90},
    {id:uid('subj'),kind:'subject',name:'Sujet 1',x:500,y:300,rot:90,height:1.75},
    {id:uid('light'),kind:'light',name:'amaran Halo 200x',brand:'Amaran',family:'Halo',form:'halo',short:'H200',x:285,y:330,rot:-15,beam:55,intensity:60,height:2.0}
  ];
  state.selected=state.objects[2].id;
}

function populateCameraSelect(){
  cameraModel.innerHTML='';
  Object.keys(cameras).forEach(name=>{const o=document.createElement('option');o.value=name;o.textContent=name;cameraModel.appendChild(o)});
  cameraModel.value=state.cameraModel;
}

function svgEl(tag,attrs={}){const e=document.createElementNS(NS,tag);for(const[k,v]of Object.entries(attrs))e.setAttribute(k,v);return e}

function renderCanvas(){
  beamsLayer.innerHTML='';objectsLayer.innerHTML='';
  state.objects.filter(o=>o.kind==='camera').forEach(drawCameraFov);
  state.objects.filter(o=>o.kind==='light').forEach(drawLightBeam);
  state.objects.forEach(drawObject);
  renderPreview();
}
function render(){renderCanvas();renderInspector()}

function drawCameraFov(o){
  const sensor=cameras[state.cameraModel];
  const hfov=2*Math.atan(sensor.w/(2*state.focal));
  const len=460,half=Math.tan(hfov/2)*len;
  beamsLayer.appendChild(svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'camera-fov',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`}));
}
function drawLightBeam(o){
  const beam=clamp(Number(o.beam)||55,4,179);
  const len=310,half=Math.tan(rad(beam/2))*len;
  beamsLayer.appendChild(svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'beam',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`}));
}

function addFixtureSymbol(g,o){
  const form=o.form||'cob';
  const modelText=(o.short||'L').slice(0,7);
  const bodyClass=`fixture-body ${o.brand==='Aputure'?'aputure-fixture':'amaran-fixture'}`;
  const lensClass='fixture-lens';

  const addModelText=(x=0,y=4,size=8)=>{
    const t=svgEl('text',{x,y,class:'fixture-code','text-anchor':'middle','font-size':size});t.textContent=modelText;g.appendChild(t);
  };

  if(form==='tube' || form==='pixel-bar' || form==='strip'){
    const L=o.length||62;
    g.appendChild(svgEl('rect',{x:-L/2,y:-8,width:L,height:16,rx:7,class:bodyClass}));
    if(form==='pixel-bar'){
      const count=Math.max(3,Math.round(L/12));
      for(let i=0;i<count;i++)g.appendChild(svgEl('rect',{x:-L/2+5+i*(L-10)/count,y:-4,width:5,height:8,rx:2,class:'fixture-pixel'}));
    }else if(form==='strip'){
      g.appendChild(svgEl('path',{d:`M ${-L/2+5} 0 Q ${-L/4} -6 0 0 T ${L/2-5} 0`,class:'fixture-strip-line'}));
    }
    addModelText(0,23,8);
    return;
  }
  if(form==='panel' || form==='panel-wide' || form==='nova' || form==='nova-narrow' || form==='mat'){
    const aspect=o.aspect||1.5;
    const w=clamp(38*aspect,38,78),h=clamp(38/aspect,18,42);
    const cls=form==='mat'?'fixture-mat':(form==='nova-narrow'?'fixture-nova-narrow':bodyClass);
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:form==='mat'?3:7,class:cls}));
    if(form==='mat'){
      g.appendChild(svgEl('rect',{x:-w/2+4,y:-h/2+4,width:w-8,height:h-8,rx:2,class:'fixture-mat-inner'}));
    }else{
      g.appendChild(svgEl('rect',{x:-w/2+5,y:-h/2+5,width:w-10,height:h-10,rx:4,class:'fixture-panel-face'}));
    }
    addModelText(0,3,Math.min(8,Math.max(6,42/modelText.length)));
    return;
  }
  if(form==='pocket' || form==='pocket-round'){
    if(form==='pocket-round')g.appendChild(svgEl('circle',{cx:0,cy:0,r:20,class:bodyClass}));
    else g.appendChild(svgEl('rect',{x:-20,y:-16,width:40,height:32,rx:9,class:bodyClass}));
    g.appendChild(svgEl('circle',{cx:14,cy:0,r:5,class:lensClass}));
    addModelText(-3,3,8);return;
  }
  if(form==='bulb'){
    g.appendChild(svgEl('circle',{cx:4,cy:0,r:17,class:'fixture-bulb'}));
    g.appendChild(svgEl('rect',{x:-23,y:-8,width:12,height:16,rx:3,class:bodyClass}));
    addModelText(4,3,8);return;
  }

  // Point sources : silhouette différente selon la gamme.
  const heavy=form.includes('heavy');
  const storm=form.startsWith('storm');
  const ls=form.startsWith('ls');
  const halo=form==='halo';
  const ray=form==='ray';
  const w=heavy?46:(storm?40:(ls?38:36));
  const h=heavy?34:(storm?32:30);
  g.appendChild(svgEl('rect',{x:-w/2-7,y:-h/2,width:w,height:h,rx:storm?5:8,class:bodyClass}));
  if(storm){
    g.appendChild(svgEl('path',{d:`M ${-w/2-2} ${-h/2+5} L ${-w/2-8} 0 L ${-w/2-2} ${h/2-5}`,class:'fixture-storm-fin'}));
  }
  if(ls){g.appendChild(svgEl('line',{x1:-w/2,y1:-h/2+7,x2:w/2-7,y2:-h/2+7,class:'fixture-ridge'}));}
  if(halo){g.appendChild(svgEl('circle',{cx:w/2-4,cy:0,r:15,class:'fixture-halo-ring'}));}
  else if(ray){g.appendChild(svgEl('circle',{cx:w/2-3,cy:0,r:14,class:'fixture-ray-head'}));}
  else g.appendChild(svgEl('polygon',{points:`${w/2-7},${-h/2+3} ${w/2+14},-11 ${w/2+14},11 ${w/2-7},${h/2-3}`,class:lensClass}));
  addModelText(-5,3,Math.min(8,Math.max(6,38/modelText.length)));
}

function drawObject(o){
  if(o.kind==='light')normalizeLightObject(o);
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
    g.appendChild(svgEl('circle',{r:45,class:'selection-ring'}));
    addFixtureSymbol(g,o);
    g.appendChild(svgEl('rect',{x:-48,y:-48,width:96,height:96,class:'hit'}));
  }

  const label=svgEl('g',{transform:`rotate(${-o.rot}) translate(0 ${o.kind==='light'?58:50})`});
  const t=svgEl('text',{class:'object-label','text-anchor':'middle'});t.textContent=o.name;label.appendChild(t);
  if(o.kind==='light'){
    const st=svgEl('text',{class:'object-sub','text-anchor':'middle',y:17});st.textContent=`${o.family||'Lumière'} · ${o.intensity}%`;label.appendChild(st);
  }
  g.appendChild(label);

  if(state.selected===o.id){
    const gizmo=svgEl('g',{class:'rotation-gizmo'});
    gizmo.appendChild(svgEl('line',{x1:40,y1:0,x2:65,y2:0,class:'rotation-stem'}));
    const handle=svgEl('circle',{cx:74,cy:0,r:12,class:'rotation-handle','data-id':o.id});gizmo.appendChild(handle);
    const arrow=svgEl('path',{d:'M 69 -4 A 6 6 0 1 1 69 4 M 69 4 L 66 1 M 69 4 L 72 1',class:'rotation-icon','data-id':o.id});gizmo.appendChild(arrow);
    const angle=svgEl('text',{x:74,y:-19,class:'rotation-angle','text-anchor':'middle'});angle.textContent=`${Math.round(o.rot)}°`;gizmo.appendChild(angle);
    handle.addEventListener('pointerdown',startRotate);arrow.addEventListener('pointerdown',startRotate);
    gizmo.addEventListener('pointerdown',e=>e.stopPropagation());g.appendChild(gizmo);
  }

  g.addEventListener('pointerdown',startDrag);objectsLayer.appendChild(g);
}

function pointerToStage(e){const pt=stage.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(stage.getScreenCTM().inverse())}
function startDrag(e){
  e.preventDefault();e.stopPropagation();
  const id=e.currentTarget.dataset.id;const o=state.objects.find(x=>x.id===id);if(!o)return;
  const p=pointerToStage(e);drag={mode:'move',id,dx:p.x-o.x,dy:p.y-o.y,pointerId:e.pointerId};stage.setPointerCapture?.(e.pointerId);
  if(state.selected!==id){state.selected=id;render()}
}
function startRotate(e){
  e.preventDefault();e.stopPropagation();const id=e.currentTarget.dataset.id||e.currentTarget.closest?.('[data-id]')?.dataset.id;
  const o=state.objects.find(x=>x.id===id);if(!o)return;state.selected=id;drag={mode:'rotate',id,pointerId:e.pointerId};stage.setPointerCapture?.(e.pointerId);
}
stage.addEventListener('pointermove',e=>{
  if(!drag)return;const o=state.objects.find(x=>x.id===drag.id);if(!o)return;const p=pointerToStage(e);
  if(drag.mode==='rotate'){
    o.rot=deg(Math.atan2(p.y-o.y,p.x-o.x));if(o.rot>180)o.rot-=360;if(o.rot<=-180)o.rot+=360;
  }else{o.x=clamp(p.x-drag.dx,35,965);o.y=clamp(p.y-drag.dy,35,585)}
  renderCanvas();
});
function endGesture(){if(!drag)return;try{stage.releasePointerCapture?.(drag.pointerId)}catch{}drag=null;renderInspector()}
stage.addEventListener('pointerup',endGesture);stage.addEventListener('pointercancel',endGesture);
stage.addEventListener('pointerdown',e=>{if(e.target.closest?.('.object'))return;if(state.selected!==null){state.selected=null;render()}});

function selected(){return state.objects.find(o=>o.id===state.selected)}
function renderInspector(){
  const o=selected();
  if(!o){inspectorEmpty.classList.remove('hidden');inspectorFields.classList.add('hidden');selectionHint.textContent='Sélectionne un élément';return}
  inspectorEmpty.classList.add('hidden');inspectorFields.classList.remove('hidden');selectionHint.textContent=o.kind==='camera'?'Caméra':o.kind==='subject'?'Personnage':`${o.brand||''} · ${o.family||'Projecteur'}`;
  let html=`<div class="field"><label>Nom</label><input data-k="name" value="${esc(o.name)}"></div>`;
  if(o.kind==='light'){
    html+=`<div class="fixture-summary"><span class="fixture-brand">${esc(o.brand||'')}</span><strong>${esc(o.name)}</strong><small>${esc(o.family||'')}</small></div>`;
  }
  html+=`<div class="field-grid"><div class="field"><label>Rotation</label><div class="field-inline"><input data-k="rot" type="number" min="-180" max="180" value="${Math.round(o.rot)}"><span class="unit">°</span></div></div>`;
  if(o.kind==='subject')html+=`<div class="field"><label>Taille</label><div class="field-inline"><input data-k="height" type="number" min="1" max="2.2" step="0.01" value="${o.height}"><span class="unit">m</span></div></div>`;
  else if(o.kind==='light')html+=`<div class="field"><label>Hauteur</label><div class="field-inline"><input data-k="height" type="number" min="0" max="5" step="0.1" value="${o.height}"><span class="unit">m</span></div></div>`;
  else html+=`<div class="field"><label>Distance sujet</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
  html+='</div>';
  if(o.kind==='light'){
    html+=`<div class="field"><label>Intensité</label><div class="field-inline"><input data-k="intensity" type="range" min="0" max="100" value="${o.intensity}"><span class="unit">${o.intensity}%</span></div></div>`;
    html+=`<div class="field"><label>Ouverture du cône</label><div class="field-inline"><input data-k="beam" type="number" min="4" max="179" value="${o.beam}"><span class="unit">°</span></div></div>`;
    html+=`<div class="field"><label>Distance au sujet le plus proche</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
    html+=`<button class="change-fixture" id="changeFixtureBtn">Changer de modèle</button>`;
  }
  html+=`<button class="danger" id="deleteSelected">Supprimer cet élément</button>`;
  inspectorFields.innerHTML=html;
  inspectorFields.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('input',()=>{
    const obj=selected();if(!obj)return;let val=inp.value;if(['rot','height','intensity','beam'].includes(inp.dataset.k))val=Number(val);obj[inp.dataset.k]=val;
    if(inp.dataset.k==='intensity'){const u=inp.parentElement?.querySelector('.unit');if(u)u.textContent=`${val}%`}
    renderCanvas();
  }));
  document.getElementById('deleteSelected').onclick=()=>{state.objects=state.objects.filter(x=>x.id!==o.id);state.selected=null;render()};
  const change=document.getElementById('changeFixtureBtn');if(change)change.onclick=()=>openLightChooser(o.id);
}
function nearestSubjectDistance(o){const ss=state.objects.filter(x=>x.kind==='subject');if(!ss.length)return 0;return Math.min(...ss.map(s=>dist(o,s)))}

function activeCamera(){return state.objects.find(o=>o.kind==='camera')||null}
function cameraSpace(cam,obj){const dx=(obj.x-cam.x)/SCALE,dy=(obj.y-cam.y)/SCALE;const a=-rad(cam.rot);return{forward:dx*Math.cos(a)-dy*Math.sin(a),side:dx*Math.sin(a)+dy*Math.cos(a)}}
function shotLabel(subjectPixelHeight,monitorH){const r=subjectPixelHeight/monitorH;if(r<.42)return'Plan pied large';if(r<.62)return'Plan pied';if(r<.86)return'Plan américain / taille';if(r<1.18)return'Plan poitrine';if(r<1.65)return'Gros plan';return'Très gros plan'}
function renderPreview(){
  previewScene.innerHTML='';const cam=activeCamera();if(!cam){previewLabel.textContent='Ajoute une caméra';cameraReadout.textContent='—';return}
  const sensor=cameras[state.cameraModel];const hfov=2*Math.atan(sensor.w/(2*state.focal)),vfov=2*Math.atan(sensor.h/(2*state.focal));
  const monitor=document.getElementById('monitor');const mh=monitor.clientHeight||562;
  const subjects=state.objects.filter(o=>o.kind==='subject').map(s=>({s,...cameraSpace(cam,s)})).filter(v=>v.forward>.1);
  let visible=0,main=null;
  subjects.forEach(v=>{
    const halfW=v.forward*Math.tan(hfov/2),xNorm=.5+(v.side/(2*halfW));const subjH=v.s.height||1.75,camH=1.55;
    const frameHeight=2*v.forward*Math.tan(vfov/2),pixelH=mh*subjH/frameHeight,centerVertical=.5+((camH-subjH/2)/frameHeight);
    const div=document.createElement('div');div.className='preview-person'+(state.selected===v.s.id?' selected-person':'');
    div.innerHTML='<div class="p-head"></div><div class="p-torso"></div><div class="p-leg l"></div><div class="p-leg r"></div>';
    div.style.left=`${xNorm*100}%`;div.style.top=`${centerVertical*100}%`;div.style.transform=`translate(-50%,-50%) scale(${pixelH/360})`;previewScene.appendChild(div);
    if(xNorm>-.2&&xNorm<1.2){visible++;if(!main||Math.abs(v.side)<Math.abs(main.side))main={...v,pixelH}}
  });
  if(main){const d=main.forward.toFixed(2),label=shotLabel(main.pixelH,mh);previewLabel.textContent=`${label} · sujet à ${d} m`;cameraReadout.textContent=`${state.cameraModel} · ${state.focal} mm · ${visible} sujet${visible>1?'s':''} dans la zone`}
  else{previewLabel.textContent='Aucun sujet devant la caméra';cameraReadout.textContent=`${state.cameraModel} · ${state.focal} mm`}
}

function addSubject(){
  const n=state.objects.filter(o=>o.kind==='subject').length+1;const o={id:uid('subj'),kind:'subject',name:`Sujet ${n}`,x:500+40*(n-1),y:300,rot:90,height:1.75};state.objects.push(o);state.selected=o.id;closeAddDialog();render();
}
function addCamera(){
  const n=state.objects.filter(o=>o.kind==='camera').length+1;const o={id:uid('cam'),kind:'camera',name:`Caméra ${String.fromCharCode(64+n)}`,x:500,y:520,rot:-90};state.objects.push(o);state.selected=o.id;closeAddDialog();render();
}
function addLightFromPreset(p,replaceId=null){
  if(replaceId){
    const o=state.objects.find(x=>x.id===replaceId);if(o){Object.assign(o,{name:p.name,brand:p.brand,family:p.family,form:p.form,short:p.short,beam:p.beam,aspect:p.aspect,length:p.length});state.selected=o.id;closeAddDialog();render();return}
  }
  const n=state.objects.filter(o=>o.kind==='light').length;
  const o={id:uid('light'),kind:'light',name:p.name,brand:p.brand,family:p.family,form:p.form,short:p.short,x:245+(n%5)*72,y:235+(n%3)*75,rot:0,beam:p.beam,intensity:50,height:2,aspect:p.aspect,length:p.length};
  state.objects.push(o);state.selected=o.id;closeAddDialog();render();
}

let replaceLightId=null;
function openAddDialog(){replaceLightId=null;showKinds();if(typeof addDialog.showModal==='function')addDialog.showModal();else addDialog.setAttribute('open','')}
function closeAddDialog(){if(addDialog.open&&typeof addDialog.close==='function')addDialog.close();else addDialog.removeAttribute('open');replaceLightId=null}
function showKinds(){addKinds.classList.remove('hidden');lightChooser.classList.add('hidden');dialogTitle.textContent='Choisir un élément'}
function openLightChooser(replaceId=null){
  replaceLightId=replaceId;addKinds.classList.add('hidden');lightChooser.classList.remove('hidden');dialogTitle.textContent=replaceId?'Changer de projecteur':'Choisir une lumière';
  const obj=replaceId?state.objects.find(x=>x.id===replaceId):null;catalogBrand=obj?.brand||catalogBrand||'Amaran';
  document.querySelectorAll('.brand-tab').forEach(b=>b.classList.toggle('active',b.dataset.brand===catalogBrand));
  lightSearch.value='';fillFamilyFilter();renderLightCatalog();if(!addDialog.open){if(typeof addDialog.showModal==='function')addDialog.showModal();else addDialog.setAttribute('open','')}
}
function fillFamilyFilter(){
  const fams=[...new Set(lightCatalog.filter(p=>p.brand===catalogBrand).map(p=>p.family))];
  familyFilter.innerHTML='<option value="">Toutes les familles</option>'+fams.map(f=>`<option value="${esc(f)}">${esc(f)}</option>`).join('');
}
function lightIconMarkup(p){
  const f=p.form||'cob';
  return `<span class="catalog-fixture form-${esc(f)} brand-${p.brand.toLowerCase()}"><span class="catalog-shape"></span><b>${esc(p.short)}</b></span>`;
}
function renderLightCatalog(){
  const q=lightSearch.value.trim().toLowerCase(),fam=familyFilter.value;
  const items=lightCatalog.filter(p=>p.brand===catalogBrand&&(!fam||p.family===fam)&&(!q||`${p.name} ${p.family} ${p.short}`.toLowerCase().includes(q)));
  catalogCount.textContent=`${items.length} modèle${items.length>1?'s':''} · ${catalogBrand}`;
  lightCatalogEl.innerHTML=items.map((p,i)=>`<button class="light-card" data-light-index="${lightCatalog.indexOf(p)}">${lightIconMarkup(p)}<span class="light-card-copy"><strong>${esc(p.name.replace(/^amaran\s+|^Aputure\s+/i,''))}</strong><small>${esc(p.family)}</small></span></button>`).join('');
  if(!items.length)lightCatalogEl.innerHTML='<div class="no-results">Aucun modèle trouvé.</div>';
  lightCatalogEl.querySelectorAll('.light-card').forEach(btn=>btn.onclick=()=>addLightFromPreset(lightCatalog[Number(btn.dataset.lightIndex)],replaceLightId));
}

document.getElementById('openAddBtn').onclick=openAddDialog;
document.getElementById('closeAddBtn').onclick=closeAddDialog;
document.getElementById('backToKindsBtn').onclick=()=>{replaceLightId=null;showKinds()};
addKinds.querySelectorAll('[data-kind]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.kind;if(k==='light')openLightChooser();else if(k==='subject')addSubject();else addCamera()});
document.querySelectorAll('.brand-tab').forEach(btn=>btn.onclick=()=>{catalogBrand=btn.dataset.brand;document.querySelectorAll('.brand-tab').forEach(b=>b.classList.toggle('active',b===btn));fillFamilyFilter();renderLightCatalog()});
lightSearch.addEventListener('input',renderLightCatalog);familyFilter.addEventListener('change',renderLightCatalog);
addDialog.addEventListener('click',e=>{if(e.target===addDialog)closeAddDialog()});

focalInput.addEventListener('input',()=>{state.focal=clamp(Number(focalInput.value)||50,12,300);render()});
cameraModel.addEventListener('change',()=>{state.cameraModel=cameraModel.value;render()});

document.getElementById('saveBtn').onclick=()=>{localStorage.setItem('bos-plan-feu-v03',JSON.stringify(state));flash('Plan sauvé')};
document.getElementById('resetBtn').onclick=()=>{if(confirm('Réinitialiser le plan ?')){['bos-plan-feu-v03','bos-plan-feu-v02','bos-plan-feu-v01'].forEach(k=>localStorage.removeItem(k));seed();syncCameraUi();render()}};
function flash(txt){const b=document.getElementById('saveBtn'),old=b.textContent;b.textContent='✓ '+txt;setTimeout(()=>b.textContent=old,1200)}

function exportPng(){
  const clone=stage.cloneNode(true);clone.setAttribute('width','1400');clone.setAttribute('height','868');
  const serializer=new XMLSerializer(),source=serializer.serializeToString(clone);const blob=new Blob([source],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),img=new Image();
  img.onload=()=>{const c=document.createElement('canvas');c.width=1400;c.height=868;const ctx=c.getContext('2d');ctx.fillStyle='#fbfcfe';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);c.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='BOS_Plan_Feu.png';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)},'image/png')};img.src=url;
}
document.getElementById('exportBtn').onclick=exportPng;

function syncCameraUi(){cameraModel.value=state.cameraModel;focalInput.value=state.focal}
function load(){
  try{
    const raw=localStorage.getItem('bos-plan-feu-v03')||localStorage.getItem('bos-plan-feu-v02')||localStorage.getItem('bos-plan-feu-v01');const saved=JSON.parse(raw);
    if(saved&&Array.isArray(saved.objects)){state=saved;state.objects.forEach(normalizeLightObject)}else seed();
  }catch{seed()}
  if(!cameras[state.cameraModel])state.cameraModel='Sony FX3';state.focal=Number(state.focal)||50;
  populateCameraSelect();syncCameraUi();render();
}
window.addEventListener('resize',renderPreview);load();
