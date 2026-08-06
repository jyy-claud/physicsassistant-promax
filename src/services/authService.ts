export type Session={access_token:string; user:{id:string;email?:string;user_metadata?:{display_name?:string}}};
const storageKey='physicsassistant-session';
const url=import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/,'');
const anon=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const isCloudConfigured=()=>Boolean(url&&anon&& !url.includes('YOUR_PROJECT'));
const headers=(token?:string)=>({'apikey':anon||'', 'Content-Type':'application/json', ...(token?{Authorization:`Bearer ${token}`}:{})});
export const getSession=():Session|null=>{try{return JSON.parse(localStorage.getItem(storageKey)||'null')}catch{return null}};
function setSession(s:Session|null){if(s)localStorage.setItem(storageKey,JSON.stringify(s));else localStorage.removeItem(storageKey);window.dispatchEvent(new Event('physics-auth'));}
async function request(path:string, body?:unknown){if(!isCloudConfigured())throw new Error('请先配置 Supabase 环境变量。');const res=await fetch(`${url}/auth/v1/${path}`,{method:'POST',headers:headers(),body:JSON.stringify(body)});const json=await res.json();if(!res.ok)throw new Error(json.msg||json.error_description||'请求失败');return json;}
export async function signIn(email:string,password:string){const r=await request('token?grant_type=password',{email,password});setSession(r);}
export async function signUp(email:string,password:string,display_name:string){await request('signup',{email,password,data:{display_name},options:{emailRedirectTo:window.location.origin}});}
export function signOut(){setSession(null);}
export async function syncAttempt(questionId:string,selected:number,submitted:boolean,isCorrect?:boolean){const session=getSession();if(!session||!isCloudConfigured())return;await fetch(`${url}/rest/v1/attempts?on_conflict=user_id,question_id`,{method:'POST',headers:{...headers(session.access_token),Prefer:'resolution=merge-duplicates,return=minimal'},body:JSON.stringify({user_id:session.user.id,question_id:questionId,selected_answer:selected,submitted,is_correct:isCorrect,updated_at:new Date().toISOString()})});}
