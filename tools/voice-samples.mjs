// Export your raw Wispr Flow dictations into voice/samples/ so the team can learn how you actually talk.
// Usage: node tools/voice-samples.mjs [--apps claude] [--min-words 20]
// Only dictations made into the listed apps are exported (default: claude), so anything you dictated
// into messages, email or other apps stays out of this folder. Uses the raw speech-to-text (asrText),
// before Wispr's clean-up, because the fillers and self-corrections are part of your voice.
import {DatabaseSync} from 'node:sqlite';
import {mkdir,writeFile,copyFile,rm,mkdtemp} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const args=Object.fromEntries(process.argv.slice(2).reduce((p,a,i,all)=>{if(a.startsWith('--'))p.push([a.slice(2),all[i+1]]);return p;},[]));
const apps=(args.apps||'claude').toLowerCase().split(',');
const minWords=Number(args['min-words']||20);
const source=path.join(process.env.APPDATA||'','Wispr Flow','flow.sqlite');

// Work on a copy so the running Wispr Flow app is never locked or modified.
const temp=await mkdtemp(path.join(tmpdir(),'wispr-'));
try{
  for(const suffix of ['','-wal','-shm'])await copyFile(source+suffix,path.join(temp,'flow.sqlite'+suffix)).catch(e=>{if(!suffix)throw e;});
  const db=new DatabaseSync(path.join(temp,'flow.sqlite'),{readOnly:true});
  const rows=db.prepare('SELECT timestamp,app,asrText,numWords,duration FROM History WHERE asrText IS NOT NULL ORDER BY timestamp').all()
    .filter(r=>apps.includes(String(r.app||'').toLowerCase())&&(r.numWords||0)>=minWords);
  db.close();
  const dir=path.join(root,'voice','samples');await mkdir(dir,{recursive:true});
  const words=rows.reduce((n,r)=>n+(r.numWords||0),0),seconds=rows.reduce((n,r)=>n+(r.duration||0),0);
  const body=rows.map(r=>`## ${r.timestamp} (${r.numWords} words, ${Math.round(r.duration)}s)\n\n${r.asrText.trim()}\n`).join('\n');
  await writeFile(path.join(dir,'wispr-dictations.md'),`# Raw dictations (Wispr Flow, apps: ${apps.join(', ')})\n\n${rows.length} dictations, ${words} words, about ${seconds?Math.round(words/(seconds/60)):'?'} words per minute while dictating.\n\n${body}`);
  console.log(`Exported ${rows.length} dictations (${words} words) to voice/samples/wispr-dictations.md`);
}catch(error){
  console.error(error.code==='ENOENT'?`Wispr Flow history not found at ${source}.`:`Could not read Wispr Flow history: ${error.message}`);process.exitCode=1;
}finally{await rm(temp,{recursive:true,force:true});}
