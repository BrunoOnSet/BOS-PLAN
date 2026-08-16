const NS='http://www.w3.org/2000/svg';
const stage=document.getElementById('stage');
const beamsLayer=document.getElementById('beamsLayer');
const objectsLayer=document.getElementById('objectsLayer');
const inspectorEmpty=document.getElementById('inspectorEmpty');
const inspectorFields=document.getElementById('inspectorFields');
const selectionHint=document.getElementById('selectionHint');
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
const catalogCount=document.getElementById('catalogCount');
const simpleGrid=document.getElementById('simpleGrid');
const simpleLabel=document.getElementById('simpleLabel');
const snapSelect=document.getElementById('snapSelect');
const labelsModeSelect=document.getElementById('labelsModeSelect');
const toggleBeamsBtn=document.getElementById('toggleBeamsBtn');
const gridOpacityRange=document.getElementById('gridOpacityRange');
const gridOpacityValue=document.getElementById('gridOpacityValue');
const currentPlanBadge=document.getElementById('currentPlanBadge');
const libraryDialog=document.getElementById('libraryDialog');
const planNameInput=document.getElementById('planNameInput');
const folderSelect=document.getElementById('folderSelect');
const planLibraryList=document.getElementById('planLibraryList');

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
const LIB_KEY='bos-plan-feu-library-v06';
let state={objects:[],selected:null,activePreviewCamera:null,cameraModel:'Sony FX3',focal:50,snap:.25,labelsMode:'full',beamsVisible:true,gridOpacity:.45,planId:null,planName:'Plan sans titre',folderId:'folder_general'};
let library={folders:[{id:'folder_general',name:'Plans'}],plans:[]};
let drag=null;
let replaceLightId=null;
let catalogBrand='Amaran';
let catalogFamily='';
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
  if(!['full','names','hidden'].includes(state.labelsMode))state.labelsMode='full';
  if(state.beamsVisible===undefined)state.beamsVisible=true;
  state.gridOpacity=clamp(Number(state.gridOpacity)||.45,.1,1);
  state.planName=state.planName||'Plan sans titre';
  state.folderId=state.folderId||library.folders[0]?.id||'folder_general';
  if(state.planId===undefined)state.planId=null;
}
function loadLibrary(){
  try{const raw=localStorage.getItem(LIB_KEY),v=raw&&JSON.parse(raw);if(v&&Array.isArray(v.folders)&&Array.isArray(v.plans))library=v}catch{}
  if(!library.folders.length)library.folders=[{id:'folder_general',name:'Plans'}];
}
function persistLibrary(){localStorage.setItem(LIB_KEY,JSON.stringify(library))}
function updateGridOpacity(){const v=clamp(Number(state.gridOpacity)||.45,.1,1);state.gridOpacity=v;const small=v;const large=clamp(.22+v*.9,.32,1);stage.style.setProperty('--grid-small-opacity',small.toFixed(2));stage.style.setProperty('--grid-large-opacity',large.toFixed(2));if(gridOpacityRange)gridOpacityRange.value=String(Math.round(v*100));if(gridOpacityValue)gridOpacityValue.textContent=`${Math.round(v*100)} %`}
function updatePlanBadge(){if(currentPlanBadge)currentPlanBadge.textContent=`${state.planName||'Plan sans titre'} · autosauvegarde`;if(snapSelect)snapSelect.value=String(Number(state.snap)||0);if(labelsModeSelect)labelsModeSelect.value=state.labelsMode||'full';if(toggleBeamsBtn){const on=state.beamsVisible!==false;toggleBeamsBtn.classList.toggle('active',on);toggleBeamsBtn.textContent=on?'Faisceaux ON':'Faisceaux OFF';toggleBeamsBtn.setAttribute('aria-pressed',String(on))}updateGridOpacity()}
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
  return o;
}
function seed(){
  state.objects=[
    {id:uid('cam'),kind:'camera',name:'Caméra A',x:500,y:505,rot:-90,height:1.55,cameraModel:'Sony FX3',focal:50,locked:false},
    {id:uid('subj'),kind:'subject',name:'Sujet 1',x:500,y:300,rot:90,height:1.75,locked:false},
    {id:uid('light'),kind:'light',name:'amaran Halo 200x',brand:'Amaran',family:'Halo',form:'halo',short:'H200',x:285,y:330,rot:-15,beam:55,beamVisible:true,intensity:60,height:2.0,modifier:'none',modifierSize:.9,locked:false}
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
  const {sensor,focal}=cameraSettings(o),hfov=2*Math.atan(sensor.w/(2*focal)),len=460,half=Math.tan(hfov/2)*len;
  beamsLayer.appendChild(svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'camera-fov',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`}));
}
function drawLightBeam(o){
  const beam=clamp(Number(o.beam)||55,4,179),len=310,half=Math.tan(rad(beam/2))*len;
  beamsLayer.appendChild(svgEl('polygon',{points:`0,0 ${len},${-half} ${len},${half}`,class:'beam',transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`}));
}

function supportsSoftbox(o){
  const no=['tube','pixel-bar','strip','bulb','mat','pocket-round'];
  return o.kind==='light'&&!no.includes(o.form);
}
function addLightModifier(g,o){
  if(!o.modifier||o.modifier==='none')return;
  if(o.modifier==='softbox'){
    const linear=['ray','panel','panel-wide','nova','nova-narrow'].includes(o.form);
    if(linear){
      g.appendChild(svgEl('rect',{x:25,y:-25,width:30,height:50,rx:5,class:'softbox-shape'}));
      g.appendChild(svgEl('line',{x1:20,y1:-14,x2:25,y2:-20,class:'softbox-strut'}));
      g.appendChild(svgEl('line',{x1:20,y1:14,x2:25,y2:20,class:'softbox-strut'}));
    } else {
      g.appendChild(svgEl('polygon',{points:'18,-13 36,-28 66,-28 66,28 36,28 18,13',class:'softbox-shape'}));
      g.appendChild(svgEl('line',{x1:18,y1:-10,x2:36,y2:-24,class:'softbox-strut'}));
      g.appendChild(svgEl('line',{x1:18,y1:10,x2:36,y2:24,class:'softbox-strut'}));
    }
    return;
  }
  if(o.modifier==='umbrella-reflect'||o.modifier==='umbrella-diffusion'){
    const cls=o.modifier==='umbrella-reflect'?'umbrella-reflect-shape':'umbrella-diffusion-shape';
    g.appendChild(svgEl('line',{x1:18,y1:0,x2:43,y2:0,class:'umbrella-stem'}));
    g.appendChild(svgEl('path',{d:'M 43 -34 Q 73 0 43 34',class:cls}));
    g.appendChild(svgEl('line',{x1:43,y1:-34,x2:43,y2:34,class:'umbrella-rim'}));
    const t=svgEl('text',{x:55,y:4,class:'umbrella-code','text-anchor':'middle'});t.textContent=o.modifier==='umbrella-reflect'?'R':'D';g.appendChild(t);
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
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:3,class:'diffusion-frame'}));
    for(let x=-w/2+10;x<w/2;x+=14)g.appendChild(svgEl('line',{x1:x,y1:-h/2+3,x2:x+Math.min(h-6,18),y2:h/2-3,class:'diffusion-hatch'}));
  } else if(o.type==='borniol'){
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:3,class:'borniol-shape'}));
  } else if(o.type==='negative'){
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:3,class:'negative-shape'}));
    g.appendChild(svgEl('text',{x:0,y:4,'text-anchor':'middle',class:'negative-code'})).textContent='NEG';
  } else {
    g.appendChild(svgEl('rect',{x:-w/2,y:-h/2,width:w,height:h,rx:4,class:'reflector-shape'}));
    g.appendChild(svgEl('line',{x1:-w/2+8,y1:h/2-5,x2:w/2-8,y2:-h/2+5,class:'reflector-line'}));
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

function drawObject(o){
  if(o.kind==='light')normalizeLightObject(o);
  const g=svgEl('g',{class:`object ${state.selected===o.id?'selected':''} ${o.locked?'locked':''}`,transform:`translate(${o.x} ${o.y}) rotate(${o.rot})`,'data-id':o.id});
  let hitW=96,hitH=96,labelY=50;
  if(o.kind==='camera'){
    g.appendChild(svgEl('circle',{r:36,class:'selection-ring'}));g.appendChild(svgEl('rect',{x:-21,y:-16,width:34,height:32,rx:7,class:'camera-body'}));g.appendChild(svgEl('polygon',{points:'13,-10 34,-17 34,17 13,10',class:'camera-lens'}));
  } else if(o.kind==='subject'){
    g.appendChild(svgEl('circle',{r:34,class:'selection-ring'}));g.appendChild(svgEl('ellipse',{cx:0,cy:0,rx:19,ry:29,class:'subject-body'}));g.appendChild(svgEl('circle',{cx:17,cy:0,r:9,class:'subject-head'}));
  } else if(o.kind==='light'){
    g.appendChild(svgEl('circle',{r:48,class:'selection-ring'}));addLightModifier(g,o);addFixtureSymbol(g,o);labelY=62;
  } else if(o.kind==='accessory'){
    const d=drawAccessorySymbol(g,o);hitW=d.w+24;hitH=d.h+24;labelY=d.h/2+28;g.appendChild(svgEl('rect',{x:-hitW/2,y:-hitH/2,width:hitW,height:hitH,rx:8,class:'selection-box'}));
  } else if(o.kind==='decor'){
    const d=drawDecorSymbol(g,o);hitW=d.w+24;hitH=d.h+24;labelY=d.h/2+28;g.appendChild(svgEl('rect',{x:-hitW/2,y:-hitH/2,width:hitW,height:hitH,rx:8,class:'selection-box'}));
  }
  g.appendChild(svgEl('rect',{x:-hitW/2,y:-hitH/2,width:hitW,height:hitH,class:'hit'}));
  if(state.labelsMode!=='hidden'&&o.labelVisible!==false){
    const pos=o.labelPos||'auto';let lx=0,ly=labelY,anchor='middle';
    if(pos==='top'){ly=-hitH/2-18}else if(pos==='left'){lx=-hitW/2-12;ly=0;anchor='end'}else if(pos==='right'){lx=hitW/2+12;ly=0;anchor='start'}else if(pos==='bottom'){ly=hitH/2+24}
    const label=svgEl('g',{transform:`rotate(${-o.rot}) translate(${lx} ${ly})`}),t=svgEl('text',{class:'object-label','text-anchor':anchor});t.textContent=o.name;label.appendChild(t);
    if(state.labelsMode==='full'){
      if(o.kind==='light'){const st=svgEl('text',{class:'object-sub','text-anchor':anchor,y:17});const modLabel=o.modifier==='softbox'?'Softbox':o.modifier==='umbrella-reflect'?'Parapluie réflexion':o.modifier==='umbrella-diffusion'?'Parapluie diffusion':'';st.textContent=`${o.family||'Lumière'}${modLabel?' · '+modLabel:''} · ${o.intensity}%`;label.appendChild(st)}
      else if(o.kind==='accessory'||o.kind==='decor'){const st=svgEl('text',{class:'object-sub','text-anchor':anchor,y:17});st.textContent=`${(o.width||0).toFixed(1)} × ${(o.height||0).toFixed(1)} m${o.locked?' · verrouillé':''}`;label.appendChild(st)}
    }
    g.appendChild(label);
  }
  if(state.selected===o.id&&!o.locked){
    const gizmo=svgEl('g',{class:'rotation-gizmo'});gizmo.appendChild(svgEl('line',{x1:40,y1:0,x2:65,y2:0,class:'rotation-stem'}));const handle=svgEl('circle',{cx:74,cy:0,r:12,class:'rotation-handle','data-id':o.id});gizmo.appendChild(handle);const arrow=svgEl('path',{d:'M 69 -4 A 6 6 0 1 1 69 4 M 69 4 L 66 1 M 69 4 L 72 1',class:'rotation-icon','data-id':o.id});gizmo.appendChild(arrow);const angle=svgEl('text',{x:74,y:-19,class:'rotation-angle','text-anchor':'middle'});angle.textContent=`${Math.round(o.rot)}°`;gizmo.appendChild(angle);handle.addEventListener('pointerdown',startRotate);arrow.addEventListener('pointerdown',startRotate);gizmo.addEventListener('pointerdown',e=>e.stopPropagation());g.appendChild(gizmo);
  }
  g.addEventListener('pointerdown',startDrag);objectsLayer.appendChild(g);
}

function pointerToStage(e){const pt=stage.createSVGPoint();pt.x=e.clientX;pt.y=e.clientY;return pt.matrixTransform(stage.getScreenCTM().inverse())}
function startDrag(e){
  e.preventDefault();e.stopPropagation();const id=e.currentTarget.dataset.id,o=state.objects.find(x=>x.id===id);if(!o)return;
  if(state.selected!==id){state.selected=id;renderInspector()}
  if(o.kind==='camera'){state.activePreviewCamera=o.id;renderPreview()}
  if(o.locked){renderInspector();return}
  const p=pointerToStage(e);drag={mode:'move',id,dx:p.x-o.x,dy:p.y-o.y,pointerId:e.pointerId};stage.setPointerCapture?.(e.pointerId);
}
function startRotate(e){e.preventDefault();e.stopPropagation();const id=e.currentTarget.dataset.id||e.currentTarget.closest?.('[data-id]')?.dataset.id,o=state.objects.find(x=>x.id===id);if(!o||o.locked)return;state.selected=id;if(o.kind==='camera')state.activePreviewCamera=o.id;drag={mode:'rotate',id,pointerId:e.pointerId};stage.setPointerCapture?.(e.pointerId)}
stage.addEventListener('pointermove',e=>{
  if(!drag)return;const o=state.objects.find(x=>x.id===drag.id);if(!o)return;const p=pointerToStage(e);
  if(drag.mode==='rotate'){
    o.rot=deg(Math.atan2(p.y-o.y,p.x-o.x));if(o.rot>180)o.rot-=360;if(o.rot<=-180)o.rot+=360;
  } else {
    const targetX=clamp(snapValue(p.x-drag.dx),35,965),targetY=clamp(snapValue(p.y-drag.dy),35,585);
    o.x=targetX;o.y=targetY;
  }renderCanvas();
});
function endGesture(){if(!drag)return;try{stage.releasePointerCapture?.(drag.pointerId)}catch{}drag=null;render()}
stage.addEventListener('pointerup',endGesture);stage.addEventListener('pointercancel',endGesture);
stage.addEventListener('pointerdown',e=>{if(e.target.closest?.('.object'))return;if(state.selected!==null){state.selected=null;render()}});

function selected(){return state.objects.find(o=>o.id===state.selected)}
function kindLabel(o){return o.kind==='camera'?'Caméra':o.kind==='subject'?'Personnage':o.kind==='light'?`${o.brand||''} · ${o.family||'Projecteur'}`:o.kind==='accessory'?'Accessoire':'Décor'}
function toggleButtons(key,current,options){return `<div class="inspector-choice" data-choice="${key}">${options.map(([value,label])=>`<button data-value="${esc(value)}" class="${current===value?'active':''}">${esc(label)}</button>`).join('')}</div>`}
function renderInspector(){
  const o=selected();if(!o){inspectorEmpty.classList.remove('hidden');inspectorFields.classList.add('hidden');selectionHint.textContent='Sélectionne un élément';return}
  inspectorEmpty.classList.add('hidden');inspectorFields.classList.remove('hidden');selectionHint.textContent=kindLabel(o);
  if(o.kind==='camera')normalizeCameraObject(o);
  let html=`<div class="field"><label>Nom</label><input data-k="name" value="${esc(o.name)}"></div>`;
  if(o.kind==='light')html+=`<div class="fixture-summary"><span class="fixture-brand">${esc(o.brand||'')}</span><strong>${esc(o.name)}</strong><small>${esc(o.family||'')}</small></div>`;
  if(o.kind==='camera'){
    html+=`<div class="field"><label>Caméra / capteur</label><select id="selectedCameraModel">${Object.keys(cameras).map(name=>`<option value="${esc(name)}" ${o.cameraModel===name?'selected':''}>${esc(name)}</option>`).join('')}</select></div>`;
    html+=`<div class="field-grid"><div class="field"><label>Focale</label><div class="field-inline"><input data-k="focal" type="number" min="12" max="300" step="1" value="${o.focal}"><span class="unit">mm</span></div></div><div class="field"><label>Hauteur caméra</label><div class="field-inline"><input data-k="height" type="number" min="0.2" max="4" step="0.05" value="${o.height}"><span class="unit">m</span></div></div></div>`;
  }
  html+=`<div class="direct-edit-note">Position et orientation : règle-les directement sur le plan du dessus.</div>`;
  html+=`<div class="field-grid">`;
  if(o.kind==='subject')html+=`<div class="field"><label>Taille</label><div class="field-inline"><input data-k="height" type="number" min="1" max="2.2" step="0.01" value="${o.height}"><span class="unit">m</span></div></div>`;
  else if(o.kind==='light')html+=`<div class="field"><label>Hauteur source</label><div class="field-inline"><input data-k="height" type="number" min="0" max="5" step="0.1" value="${o.height}"><span class="unit">m</span></div></div>`;
  else if(o.kind==='accessory'||o.kind==='decor')html+=`<div class="field"><label>Largeur</label><div class="field-inline"><input data-k="width" type="number" min="0.1" max="20" step="0.1" value="${o.width}"><span class="unit">m</span></div></div>`;
  else if(o.kind!=='camera')html+=`<div class="field"><label>Distance sujet</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
  html+='</div>';
  if(o.kind==='accessory'||o.kind==='decor'){
    const zDefault=o.kind==='accessory'?(o.height||1.2):(o.type==='wall'?2.5:o.type==='door'?2.04:o.type==='window'?1.2:o.type==='table'?.75:1);
    o.zHeight=Number(o.zHeight||zDefault);
    if(o.elevation===undefined)o.elevation=o.type==='window'?.9:(o.kind==='accessory'?.35:0);
    const depthLabel=o.kind==='decor'&&['wall','door','window'].includes(o.type)?'Épaisseur':'Profondeur';
    html+=`<div class="field-grid"><div class="field"><label>${depthLabel}</label><div class="field-inline"><input data-k="height" type="number" min="0.05" max="20" step="0.05" value="${o.height}"><span class="unit">m</span></div></div><div class="field"><label>Hauteur réelle</label><div class="field-inline"><input data-k="zHeight" type="number" min="0.05" max="10" step="0.05" value="${o.zHeight}"><span class="unit">m</span></div></div></div>`;
    if(o.kind==='accessory'||o.type==='window')html+=`<div class="field"><label>Hauteur au sol</label><div class="field-inline"><input data-k="elevation" type="number" min="0" max="5" step="0.05" value="${o.elevation}"><span class="unit">m</span></div></div>`;
  }
  if(o.kind==='light'){
    html+=`<div class="field"><label>Accessoire lumière</label>${toggleButtons('modifier',o.modifier||'none',supportsSoftbox(o)?[['none','Nu'],['softbox','Softbox'],['umbrella-reflect','Parapluie réflexion'],['umbrella-diffusion','Parapluie diffusion']]:[['none','Nu']])}</div>`;
    if(o.modifier&&o.modifier!=='none')html+=`<div class="field"><label>${o.modifier.startsWith('umbrella')?'Diamètre parapluie':'Taille accessoire'}</label><div class="field-inline"><input data-k="modifierSize" type="number" min="0.3" max="3" step="0.05" value="${Number(o.modifierSize||.9).toFixed(2)}"><span class="unit">m</span></div></div>`;
    html+=`<label class="lock-row"><input id="beamVisibleSelected" type="checkbox" ${o.beamVisible!==false?'checked':''}> <span>Afficher le faisceau de ce projecteur</span></label>`;
    html+=`<div class="field"><label>Intensité</label><div class="field-inline"><input data-k="intensity" type="range" min="0" max="100" value="${o.intensity}"><span class="unit">${o.intensity}%</span></div></div>`;
    html+=`<div class="field"><label>Ouverture du cône (schématique)</label><div class="field-inline"><input data-k="beam" type="number" min="4" max="179" value="${o.beam}"><span class="unit">°</span></div><small class="field-help">Valeur indicative pour le dessin du plan, pas une donnée photométrique garantie.</small></div>`;
    html+=`<div class="field"><label>Distance au sujet le plus proche</label><div class="field-inline"><input disabled value="${nearestSubjectDistance(o).toFixed(2)}"><span class="unit">m</span></div></div>`;
    html+=`<button class="change-fixture" id="changeFixtureBtn">Changer de modèle</button>`;
  }
  if(o.labelVisible===undefined)o.labelVisible=true;if(!o.labelPos)o.labelPos='auto';
  html+=`<div class="field-divider"></div><div class="field"><label>Informations sur le plan</label><label class="label-row"><span>Afficher les infos</span><input id="labelVisibleSelected" type="checkbox" ${o.labelVisible!==false?'checked':''}></label><div class="inspector-choice five" data-choice="labelPos">${[['auto','Auto'],['top','Haut'],['bottom','Bas'],['left','Gauche'],['right','Droite']].map(([v,l])=>`<button data-value="${v}" class="${o.labelPos===v?'active':''}">${l}</button>`).join('')}</div></div>`;
  if(o.kind==='accessory'||o.kind==='decor')html+=`<label class="lock-row"><input id="lockSelected" type="checkbox" ${o.locked?'checked':''}> <span>Verrouiller la position</span></label>`;
  html+=`<button class="danger" id="deleteSelected">Supprimer cet élément</button>`;inspectorFields.innerHTML=html;
  inspectorFields.querySelectorAll('[data-k]').forEach(inp=>inp.addEventListener('input',()=>{const obj=selected();if(!obj)return;const key=inp.dataset.k;let val=inp.value;if(['height','width','zHeight','elevation','intensity','beam','focal','modifierSize'].includes(key))val=Number(val);obj[key]=val;if(key==='intensity'){const u=inp.parentElement?.querySelector('.unit');if(u)u.textContent=`${val}%`}if(obj.kind==='camera')state.activePreviewCamera=obj.id;renderCanvas()}));
  const camModel=document.getElementById('selectedCameraModel');if(camModel)camModel.onchange=()=>{const obj=selected();if(!obj||obj.kind!=='camera')return;obj.cameraModel=camModel.value;state.activePreviewCamera=obj.id;renderCanvas()};
  inspectorFields.querySelectorAll('[data-choice] button').forEach(btn=>btn.onclick=()=>{const obj=selected();if(!obj)return;const key=btn.parentElement.dataset.choice;obj[key]=btn.dataset.value;if(key==='modifier'){if(obj.modifier==='softbox'&&!obj.modifierSize)obj.modifierSize=.9;if(obj.modifier?.startsWith('umbrella'))obj.modifierSize=Number(obj.modifierSize)||1.05}render()});
  const beamVisible=document.getElementById('beamVisibleSelected');if(beamVisible)beamVisible.onchange=()=>{o.beamVisible=beamVisible.checked;renderCanvas()};
  const labelVisible=document.getElementById('labelVisibleSelected');if(labelVisible)labelVisible.onchange=()=>{o.labelVisible=labelVisible.checked;render()};
  const lock=document.getElementById('lockSelected');if(lock)lock.onchange=()=>{o.locked=lock.checked;render()};
  document.getElementById('deleteSelected').onclick=()=>{state.objects=state.objects.filter(x=>x.id!==o.id);if(state.activePreviewCamera===o.id)state.activePreviewCamera=state.objects.find(x=>x.kind==='camera')?.id||null;state.selected=null;render()};
  const change=document.getElementById('changeFixtureBtn');if(change)change.onclick=()=>openLightChooser(o.id);
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
function shotLabel(subjectPixelHeight,monitorH=900){const r=subjectPixelHeight/monitorH;if(r<.42)return'Plan pied large';if(r<.62)return'Plan pied';if(r<.86)return'Plan américain / taille';if(r<1.18)return'Plan poitrine';if(r<1.65)return'Gros plan';return'Très gros plan'}
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
  const headR=Math.max(4,w*.27),headY=top.y+h*.12;g.appendChild(svgNode('circle',{cx:midX,cy:headY,r:headR,class:'preview-subject'}));g.appendChild(svgNode('rect',{x:midX-w*.38,y:top.y+h*.23,width:w*.76,height:h*.43,rx:w*.22,class:'preview-subject'}));g.appendChild(svgNode('rect',{x:midX-w*.32,y:top.y+h*.60,width:w*.25,height:h*.40,rx:w*.06,class:'preview-subject'}));g.appendChild(svgNode('rect',{x:midX+w*.07,y:top.y+h*.60,width:w*.25,height:h*.40,rx:w*.06,class:'preview-subject'}));g.appendChild(svgNode('text',{x:midX,y:Math.max(18,top.y-10),class:'preview-subject-label','text-anchor':'middle'},o.name));
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
    const a=rad(o.rot||0),mod=o.modifier||'none',soft=mod==='softbox',umbrella=mod==='umbrella-reflect'||mod==='umbrella-diffusion',shift=(soft||umbrella)?.35:0,x=o.x+Math.cos(a)*shift*SCALE,y=o.y+Math.sin(a)*shift*SCALE;let w=.38,h=.30,label=o.short||'LIGHT',cls='preview-light';
    if(soft){w=Number(o.modifierSize)||.9;h=w;label='SOFTBOX';cls='preview-softbox'}else if(umbrella){w=Number(o.modifierSize)||1.05;h=w;label=mod==='umbrella-reflect'?'PARA R':'PARA D';cls=mod==='umbrella-reflect'?'preview-umbrella-reflect':'preview-umbrella-diffusion'}else if(['tube','pixel-bar','strip'].includes(o.form)){w=(o.length||60)/55*.65;h=.10}else if(['panel','panel-wide','nova','nova-narrow','mat'].includes(o.form)){w=.75;h=.48}else if(o.form==='halo'){w=.48;h=.48;cls='preview-halo'};
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
  const label=document.createElement('div');label.className='preview-label';if(visibleSubjects.length){const main=visibleSubjects.sort((a,b)=>Math.abs((a.bbox.x0+a.bbox.x1)/2-800)-Math.abs((b.bbox.x0+b.bbox.x1)/2-800))[0];label.textContent=`${shotLabel(main.subjectHeight||0)} · ${visibleSubjects.length} sujet${visibleSubjects.length>1?'s':''} visible${visibleSubjects.length>1?'s':''}`}else label.textContent='Aucun sujet dans le cadre';monitor.appendChild(label);
  if(visibleWindows.length){const info=document.createElement('div');info.className='preview-scene-info';info.textContent=`Fenêtre${visibleWindows.length>1?'s':''} visible${visibleWindows.length>1?'s':''} : ${visibleWindows.map(o=>o.name).slice(0,2).join(' · ')}${visibleWindows.length>2?` +${visibleWindows.length-2}`:''}`;monitor.appendChild(info)}
  if(technical.length){const alert=document.createElement('div');alert.className='preview-warning';const names=[...new Set(technical.map(o=>o.kind==='light'?(o.modifier==='softbox'?`${o.short||o.name} + softbox`:o.modifier==='umbrella-reflect'?`${o.short||o.name} + parapluie réflexion`:o.modifier==='umbrella-diffusion'?`${o.short||o.name} + parapluie diffusion`:(o.short||o.name)):o.name))];alert.textContent=`⚠ Dans le champ : ${names.slice(0,3).join(' · ')}${names.length>3?` +${names.length-3}`:''}`;monitor.appendChild(alert)}
  shell.appendChild(monitor);card.appendChild(shell);return card;
}
function renderPreview(){
  const cams=state.objects.filter(o=>o.kind==='camera').map(normalizeCameraObject);cameraMonitors.innerHTML='';previewTabs.innerHTML='';
  if(!cams.length){previewTabs.classList.add('hidden');cameraReadout.textContent='Ajoute une caméra pour afficher le cadre.';cameraMonitors.innerHTML='<div class="no-camera-preview">Ajoute une caméra au plan pour voir son cadre.</div>';return}
  if(!cams.some(c=>c.id===state.activePreviewCamera))state.activePreviewCamera=cams[0].id;
  if(cams.length===1){previewTabs.classList.add('hidden');cameraReadout.textContent='1 caméra · la prévisualisation suit sa position, sa focale et son capteur.';cameraMonitors.className='camera-monitors one';cameraMonitors.appendChild(makeMonitorCard(cams[0]));return}
  if(cams.length===2){previewTabs.classList.add('hidden');cameraReadout.textContent='2 caméras · vues affichées simultanément.';cameraMonitors.className='camera-monitors two';cams.forEach(c=>cameraMonitors.appendChild(makeMonitorCard(c,true)));return}
  previewTabs.classList.remove('hidden');cameraReadout.textContent=`${cams.length} caméras · sélectionne la vue à afficher.`;cams.forEach(c=>{const b=document.createElement('button');b.className='preview-tab'+(c.id===state.activePreviewCamera?' active':'');b.textContent=c.name;b.onclick=()=>{state.activePreviewCamera=c.id;renderPreview()};previewTabs.appendChild(b)});cameraMonitors.className='camera-monitors one';cameraMonitors.appendChild(makeMonitorCard(cams.find(c=>c.id===state.activePreviewCamera)||cams[0]));
}

function addSubject(){const n=state.objects.filter(o=>o.kind==='subject').length+1,o={id:uid('subj'),kind:'subject',name:`Sujet ${n}`,x:500+40*(n-1),y:300,rot:90,height:1.75,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render()}
function addCamera(){const n=state.objects.filter(o=>o.kind==='camera').length+1,o={id:uid('cam'),kind:'camera',name:`Caméra ${String.fromCharCode(64+n)}`,x:500+(n-1)*55,y:520,rot:-90,height:1.55,cameraModel:'Sony FX3',focal:50,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;state.activePreviewCamera=o.id;closeAddDialog();render()}
function addLightFromPreset(p,replaceId=null){
  if(replaceId){const o=state.objects.find(x=>x.id===replaceId);if(o){const mod=o.modifier||'none';Object.assign(o,{name:p.name,brand:p.brand,family:p.family,form:p.form,short:p.short,beam:p.beam,aspect:p.aspect,length:p.length,modifier:supportsSoftbox({kind:'light',form:p.form})?mod:'none'});state.selected=o.id;closeAddDialog();render();return}}
  const n=state.objects.filter(o=>o.kind==='light').length,o={id:uid('light'),kind:'light',name:p.name,brand:p.brand,family:p.family,form:p.form,short:p.short,x:245+(n%5)*72,y:235+(n%3)*75,rot:0,beam:p.beam,beamVisible:true,intensity:50,height:2,aspect:p.aspect,length:p.length,modifier:'none',modifierSize:.9,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render();
}
function addAccessory(p){const n=state.objects.filter(o=>o.kind==='accessory').length,o={id:uid('acc'),kind:'accessory',type:p.type,name:p.name,short:p.short,x:360+(n%4)*80,y:190+(n%3)*70,rot:0,width:p.width,height:p.height,zHeight:p.height,elevation:p.type==='borniol'?.2:.35,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render()}
function addDecor(p){const n=state.objects.filter(o=>o.kind==='decor').length,zHeight=p.type==='wall'?2.5:p.type==='door'?2.04:p.type==='window'?1.2:.75,elevation=p.type==='window'?.9:0,o={id:uid('decor'),kind:'decor',type:p.type,name:p.name,x:430+(n%4)*90,y:160+(n%3)*80,rot:0,width:p.width,height:p.height,zHeight,elevation,locked:false,labelVisible:true,labelPos:'auto'};state.objects.push(o);state.selected=o.id;closeAddDialog();render()}

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
  const items=lightCatalog.filter(p=>p.brand===catalogBrand&&p.family===catalogFamily);
  modelChoices.innerHTML=items.map(p=>`<button class="choice-btn model-btn" data-light-index="${lightCatalog.indexOf(p)}">${esc(p.name.replace(/^amaran\s+|^Aputure\s+/i,''))}</button>`).join('');
  modelChoices.querySelectorAll('button').forEach(btn=>btn.onclick=()=>addLightFromPreset(lightCatalog[Number(btn.dataset.lightIndex)],replaceLightId));
  catalogCount.textContent=`${lightCatalog.filter(p=>p.brand===catalogBrand).length} modèles ${catalogBrand} · même catalogue matériel que BOS Light`;
}
function openSimpleChooser(kind){
  hideChoosers();simpleChooser.classList.remove('hidden');const list=kind==='accessory'?accessoryCatalog:decorCatalog;dialogTitle.textContent=kind==='accessory'?'Ajouter un accessoire':'Ajouter un élément de décor';simpleLabel.textContent=kind==='accessory'?'ACCESSOIRE':'DÉCOR';simpleGrid.innerHTML=list.map((p,i)=>`<button class="simple-card" data-index="${i}"><span class="simple-picto ${kind}-${p.type}">${kind==='accessory'?(p.type==='diffusion'?'▧':p.type==='borniol'?'▬':p.type==='negative'?'■':'◇'):(p.type==='wall'?'━':p.type==='door'?'◿':p.type==='window'?'▥':'▭')}</span><strong>${esc(p.name)}</strong><small>${p.width} × ${p.height} m</small></button>`).join('');simpleGrid.querySelectorAll('button').forEach(btn=>btn.onclick=()=>kind==='accessory'?addAccessory(list[Number(btn.dataset.index)]):addDecor(list[Number(btn.dataset.index)]));
}

document.getElementById('openAddBtn').onclick=openAddDialog;document.getElementById('closeAddBtn').onclick=closeAddDialog;document.getElementById('backToKindsBtn').onclick=()=>{replaceLightId=null;showKinds()};document.getElementById('backSimpleBtn').onclick=showKinds;
addKinds.querySelectorAll('[data-kind]').forEach(btn=>btn.onclick=()=>{const k=btn.dataset.kind;if(k==='light')openLightChooser();else if(k==='subject')addSubject();else if(k==='camera')addCamera();else openSimpleChooser(k)});
addDialog.addEventListener('click',e=>{if(e.target===addDialog)closeAddDialog()});

function populateFolderSelect(){
  folderSelect.innerHTML=library.folders.map(f=>`<option value="${esc(f.id)}" ${f.id===state.folderId?'selected':''}>${esc(f.name)}</option>`).join('');
}
function renderLibraryList(){
  populateFolderSelect();planNameInput.value=state.planName||'Plan sans titre';
  planLibraryList.innerHTML='';
  library.folders.forEach(folder=>{
    const box=document.createElement('div');box.className='folder-block';
    const title=document.createElement('div');title.className='folder-title';title.textContent=`📁 ${folder.name}`;box.appendChild(title);
    const plans=library.plans.filter(p=>p.folderId===folder.id).sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
    if(!plans.length){const empty=document.createElement('div');empty.className='folder-empty';empty.textContent='Aucun plan dans ce dossier.';box.appendChild(empty)}
    plans.forEach(rec=>{
      const row=document.createElement('div');row.className='plan-row';
      row.innerHTML=`<div class="plan-row-main"><strong>${esc(rec.name)}</strong><small>${formatSavedDate(rec.updatedAt)}${rec.id===state.planId?' · plan ouvert':''}</small></div><div class="plan-row-actions"><button class="primary-mini" data-act="open">Ouvrir</button><button data-act="duplicate">Dupliquer</button><button class="danger-mini" data-act="delete">Supprimer</button></div>`;
      row.querySelector('[data-act="open"]').onclick=()=>openLibraryPlan(rec.id);
      row.querySelector('[data-act="duplicate"]').onclick=()=>duplicateLibraryPlan(rec.id);
      row.querySelector('[data-act="delete"]').onclick=()=>deleteLibraryPlan(rec.id);
      box.appendChild(row);
    });planLibraryList.appendChild(box);
  });
}
function openLibraryDialog(){loadLibrary();ensureStateDefaults();renderLibraryList();if(typeof libraryDialog.showModal==='function')libraryDialog.showModal();else libraryDialog.setAttribute('open','')}
function closeLibraryDialog(){if(libraryDialog.open&&typeof libraryDialog.close==='function')libraryDialog.close();else libraryDialog.removeAttribute('open')}
function savePlanToLibrary(){
  const name=(planNameInput.value||'').trim()||'Plan sans titre',folderId=folderSelect.value||library.folders[0].id;
  state.planName=name;state.folderId=folderId;
  if(!state.planId)state.planId=uid('plan');
  let rec=library.plans.find(p=>p.id===state.planId);if(!rec){rec={id:state.planId};library.plans.push(rec)}
  rec.name=name;rec.folderId=folderId;rec.updatedAt=Date.now();rec.state=snapshotState();persistLibrary();persistCurrent();renderLibraryList();flash('Plan enregistré');
}
function openLibraryPlan(id){const rec=library.plans.find(p=>p.id===id);if(!rec)return;state=deepClone(rec.state);state.planId=rec.id;state.planName=rec.name;state.folderId=rec.folderId;ensureStateDefaults();state.objects.forEach(normalizeSceneObject);migrateOpeningBindings();state.selected=null;if(!state.activePreviewCamera)state.activePreviewCamera=state.objects.find(o=>o.kind==='camera')?.id||null;persistCurrent();render();closeLibraryDialog()}
function duplicateLibraryPlan(id){const rec=library.plans.find(p=>p.id===id);if(!rec)return;const copy=deepClone(rec);copy.id=uid('plan');copy.name=`${rec.name} copie`;copy.updatedAt=Date.now();copy.state.planId=copy.id;copy.state.planName=copy.name;library.plans.push(copy);persistLibrary();renderLibraryList()}
function deleteLibraryPlan(id){const rec=library.plans.find(p=>p.id===id);if(!rec||!confirm(`Supprimer « ${rec.name} » ?`))return;library.plans=library.plans.filter(p=>p.id!==id);if(state.planId===id)state.planId=null;persistLibrary();persistCurrent();renderLibraryList()}
function newPlan(){persistCurrent();const folder=folderSelect.value||library.folders[0].id;state.planId=null;state.planName='Plan sans titre';state.folderId=folder;state.snap=.25;state.labelsMode='full';state.gridOpacity=.45;seed();render();renderLibraryList()}
function exportProject(){const payload={format:'BOS_PLAN_FEU',version:'1.1',exportedAt:new Date().toISOString(),plan:snapshotState()};downloadBlob(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}),`${safeName(state.planName)}.bosplan.json`)}

document.getElementById('libraryBtn').onclick=openLibraryDialog;
document.getElementById('closeLibraryBtn').onclick=closeLibraryDialog;
libraryDialog.addEventListener('click',e=>{if(e.target===libraryDialog)closeLibraryDialog()});
document.getElementById('newFolderBtn').onclick=()=>{const name=prompt('Nom du nouveau dossier :');if(!name?.trim())return;const f={id:uid('folder'),name:name.trim()};library.folders.push(f);persistLibrary();state.folderId=f.id;renderLibraryList();folderSelect.value=f.id};
document.getElementById('newPlanBtn').onclick=newPlan;
document.getElementById('saveToLibraryBtn').onclick=savePlanToLibrary;
document.getElementById('exportProjectBtn').onclick=exportProject;
document.getElementById('saveBtn').onclick=()=>{if(!state.planId){openLibraryDialog();planNameInput.focus()}else{persistCurrent();flash('Plan sauvé')}};
document.getElementById('resetBtn').onclick=()=>{if(confirm('Réinitialiser le contenu de ce plan ?')){const meta={planId:state.planId,planName:state.planName,folderId:state.folderId,snap:state.snap,labelsMode:state.labelsMode,gridOpacity:state.gridOpacity};seed();Object.assign(state,meta);render()}};
function flash(txt){const b=document.getElementById('saveBtn'),old=b.textContent;b.textContent='✓ '+txt;setTimeout(()=>b.textContent=old,1200)}
function inlineSvgStyles(original,clone){
  const props=['fill','stroke','stroke-width','stroke-dasharray','stroke-linecap','stroke-linejoin','opacity','font-family','font-size','font-weight','letter-spacing','paint-order','color'];
  const os=[original,...original.querySelectorAll('*')],cs=[clone,...clone.querySelectorAll('*')];
  os.forEach((node,i)=>{const target=cs[i];if(!target)return;const st=getComputedStyle(node);const css=props.map(p=>`${p}:${st.getPropertyValue(p)}`).join(';');target.setAttribute('style',`${target.getAttribute('style')||''};${css}`)});
}
function exportPng(){
  const clone=stage.cloneNode(true);clone.setAttribute('xmlns',NS);clone.setAttribute('width','1600');clone.setAttribute('height','992');clone.setAttribute('viewBox','0 0 1000 620');
  inlineSvgStyles(stage,clone);
  clone.querySelectorAll('.rotation-gizmo,.selection-ring,.selection-box,.hit').forEach(n=>n.remove());
  const source=new XMLSerializer().serializeToString(clone),blob=new Blob([source],{type:'image/svg+xml;charset=utf-8'}),url=URL.createObjectURL(blob),img=new Image();
  img.onload=()=>{const c=document.createElement('canvas');c.width=1600;c.height=992;const ctx=c.getContext('2d');ctx.fillStyle=getComputedStyle(document.querySelector('.stage-bg')).getPropertyValue('fill')||'#fbfcfe';ctx.fillRect(0,0,c.width,c.height);ctx.drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(url);c.toBlob(b=>{if(b)downloadBlob(b,`${safeName(state.planName)}_Plan_Feu.png`)},'image/png')};
  img.onerror=()=>{URL.revokeObjectURL(url);alert("L’export PNG n’a pas pu être généré sur ce navigateur.")};img.src=url;
}
document.getElementById('exportBtn').onclick=exportPng;
snapSelect.onchange=()=>{state.snap=Number(snapSelect.value)||0;renderCanvas()};
labelsModeSelect.onchange=()=>{state.labelsMode=labelsModeSelect.value;renderCanvas()};
toggleBeamsBtn.onclick=()=>{state.beamsVisible=state.beamsVisible===false;updatePlanBadge();renderCanvas()};
if(gridOpacityRange){gridOpacityRange.oninput=()=>{state.gridOpacity=clamp(Number(gridOpacityRange.value)/100,.1,1);updateGridOpacity();scheduleAutosave()};gridOpacityRange.onchange=()=>persistCurrent()}

function normalizeSceneObject(o){
  if(o.kind==='light')normalizeLightObject(o);
  if(o.kind==='camera')normalizeCameraObject(o);
  if(o.kind==='decor'){if(o.zHeight===undefined)o.zHeight=o.type==='wall'?2.5:o.type==='door'?2.04:o.type==='window'?1.2:.75;if(o.elevation===undefined)o.elevation=o.type==='window'?.9:0}
  if(o.kind==='accessory'){if(o.zHeight===undefined)o.zHeight=o.height||1.5;if(o.elevation===undefined)o.elevation=o.type==='borniol'?.2:.35;if(!o.short)o.short=o.type==='diffusion'?'DIFF':o.type==='negative'?'NEG':o.type==='reflector'?'REF':'BOR'}
  if(o.locked===undefined)o.locked=false;if(o.labelVisible===undefined)o.labelVisible=true;if(!o.labelPos)o.labelPos='auto';return o;
}
function load(){
  loadLibrary();
  try{
    const raw=localStorage.getItem(CURRENT_KEY)||localStorage.getItem('bos-plan-feu-v05')||localStorage.getItem('bos-plan-feu-v04')||localStorage.getItem('bos-plan-feu-v03')||localStorage.getItem('bos-plan-feu-v02')||localStorage.getItem('bos-plan-feu-v01');
    const saved=raw&&JSON.parse(raw);
    if(saved&&Array.isArray(saved.objects)){state=saved;if(!state.planName)state.planName=localStorage.getItem(CURRENT_KEY)?'Plan sans titre':'Plan importé V0.5';state.objects.forEach(normalizeSceneObject);migrateOpeningBindings();if(!state.activePreviewCamera)state.activePreviewCamera=state.objects.find(o=>o.kind==='camera')?.id||null}else seed();
  }catch{seed()}
  ensureStateDefaults();if(!cameras[state.cameraModel])state.cameraModel='Sony FX3';state.focal=Number(state.focal)||50;updatePlanBadge();render();
}
window.addEventListener('resize',renderPreview);load();
