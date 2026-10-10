// Query the local Outlier index for the content team.
// Long-form only: the content team never uses Shorts outliers, so --format is fixed to long.
// Usage: node tools/outlier.mjs [--days 30] [--min-score 3] [--min-subs 1000]
//        [--country not-in|english|any] [--language en|any] [--niches ai,business] [--query "ai agents"]
//        [--sort score|rising|views|recent] [--limit 25] [--thumbs 6] [--json] [--status]
// --thumbs N downloads the top N thumbnails into inspiration/<date>/ so they can be viewed as images.
import {mkdir,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const BASE=process.env.OUTLIER_URL||'http://127.0.0.1:3210';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=Object.fromEntries(process.argv.slice(2).reduce((pairs,arg,i,all)=>{if(arg.startsWith('--'))pairs.push([arg.slice(2),all[i+1]&&!all[i+1].startsWith('--')?all[i+1]:true]);return pairs;},[]));

async function call(pathname,body){
  let response;
  try{response=await fetch(BASE+pathname,{method:body?'POST':'GET',headers:body?{'Content-Type':'application/json',Origin:BASE}:{},body:body?JSON.stringify(body):undefined});}
  catch{console.error(`Outlier is not running at ${BASE}. Start it with Start-Outlier.cmd (or "node launch.mjs" in the Outlier folder) and try again.`);process.exit(1);}
  const data=await response.json();if(!response.ok){console.error(data.error||`Outlier returned HTTP ${response.status}`);process.exit(1);}return data;
}
const compact=n=>n==null?'—':Intl.NumberFormat('en',{notation:'compact',maximumFractionDigits:1}).format(n);
const age=iso=>{const h=(Date.now()-Date.parse(iso))/3600000;return h<48?`${Math.round(h)}h`:`${Math.round(h/24)}d`;};

if(args.status){const s=await call('/api/index/status');console.log(JSON.stringify(s,null,2));process.exit(0);}

if(args.format&&args.format!=='long')console.error('Note: this team only uses long-form outliers; ignoring --format '+args.format+'.');
const filters={days:Number(args.days||30),format:'long',minScore:Number(args['min-score']??3),minSubscribers:args['min-subs']===undefined?1000:args['min-subs']==='none'?null:Number(args['min-subs']),maxSubscribers:null,
  country:args.country||'not-in',language:args.language||'en',niches:args.niches?String(args.niches).split(','):['ai','business'],query:args.query===true?'':String(args.query||''),duration:'any'};
// The server accepts 0/2/5/10/20 as thresholds: ask for the nearest one below, then apply the exact value here.
const serverMin=[20,10,5,2,0].find(n=>n<=filters.minScore);
const result=await call('/api/index/search',{...filters,minScore:serverMin});
result.videos=result.videos.filter(v=>v.score!=null&&v.score>=filters.minScore);
const sorters={score:(a,b)=>(b.score??0)-(a.score??0),rising:(a,b)=>(b.recentPerHour??-1)-(a.recentPerHour??-1),views:(a,b)=>b.views-a.views,recent:(a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt)};
const videos=result.videos.sort(sorters[args.sort||'score']||sorters.score).slice(0,Number(args.limit||25));

if(args.thumbs){
  const dir=path.join(root,'inspiration',new Date().toISOString().slice(0,10));await mkdir(dir,{recursive:true});
  for(const v of videos.slice(0,Number(args.thumbs)))if(v.thumbnail?.startsWith('https://i.ytimg.com/')){
    const r=await fetch(v.thumbnail);if(r.ok)await writeFile(path.join(dir,`${v.id}.jpg`),Buffer.from(await r.arrayBuffer()));
  }
  console.error(`Thumbnails saved to ${dir}`);
}
if(args.json){console.log(JSON.stringify({filters,matched:result.matched,videos},null,2));process.exit(0);}
console.log(`${result.videos.length}${result.truncated?'+':''} outliers matched (${filters.days}d, ${filters.format}, ≥${filters.minScore}×, country:${filters.country}, lang:${filters.language}). Showing ${videos.length}.\n`);
console.log('| # | Score | Views | Subs | Age | Now/hr | Length | Title | Channel | Link |\n|---|---|---|---|---|---|---|---|---|---|');
videos.forEach((v,i)=>console.log(`| ${i+1} | ${v.score==null?'—':v.score.toFixed(1)+'×'} | ${compact(v.views)} | ${compact(v.subscribers)} | ${age(v.publishedAt)} | ${v.recentPerHour==null?'—':'+'+compact(v.recentPerHour)} | ${Math.round(v.seconds/60)}m | ${v.title.replace(/\|/g,'/')} | ${v.channel.replace(/\|/g,'/')} | https://youtu.be/${v.id} |`));
