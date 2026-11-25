import React,{useState,useEffect,useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
const VIDEO='/hero.mp4';
const PHOTO='/profile.jpg';
const IMG={elder:'/elder.jpg',cyber:'/cyber.jpg'};

const h=React.createElement;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const LINKEDIN="https://www.linkedin.com/in/endhuja-bk",GITHUB="https://github.com/endhu29",MAIL="mailto:endhuja2317@gmail.com";

/* tilt: 3D follow-the-pointer effect */
function useTilt(max){
  const ref=useRef(null);
  const move=e=>{if(reduce)return;const el=ref.current,r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    el.style.transform=`perspective(900px) rotateY(${(x-.5)*max*2}deg) rotateX(${(.5-y)*max*2}deg)`;
    el.style.setProperty('--mx',x*100+'%');el.style.setProperty('--my',y*100+'%');};
  const leave=()=>{if(ref.current)ref.current.style.transform='';};
  return {ref,onMouseMove:move,onMouseLeave:leave};
}
const Tilt=({max=8,className,children,tag='div'})=>h(tag,{className,...useTilt(max)},...[].concat(children));
const Chips=({items})=>h('div',{className:'chips'},items.map(t=>h('span',{key:t},t)));

function Hero(){
  const box=useRef(null),vid=useRef(null);
  const move=e=>{if(reduce)return;const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
    box.current.style.transform=`rotateY(${x*6}deg) rotateX(${-y*5}deg)`;
    vid.current.style.transform=`scale(1.06) translate(${-x*14}px,${-y*10}px)`;};
  const name='Endhuja'.split('');
  return h('section',{id:'top',onMouseMove:move},
    h('video',{ref:vid,src:VIDEO,autoPlay:true,muted:true,loop:true,playsInline:true,preload:'auto','aria-hidden':true}),
    h('div',{className:'wrap hero',ref:box},
      h('h1',null,name.map((c,i)=>h('span',{key:i,style:{animationDelay:(.2+i*.07)+'s'}},c)),
        h('span',{style:{animationDelay:'.8s'}},'\u00A0B.K.')),
      h('p',{className:'tag'},'AI & ML Engineer | Full Stack Developer'),
      h('p',{className:'loc'},'Tamil Nadu, India'),
      h('div',{className:'btns'},h('a',{className:'btn',href:'#projects'},'View projects'),h('a',{className:'btn ghost',href:'#contact'},'Get in touch'))),
    h('div',{className:'scroll','aria-hidden':true},h('i')));
}

function About(){
  const t=useTilt(10);
  return h('section',{id:'about'},h('div',{className:'wrap about'},
    h('div',{className:'photo rv l'},h('div',{className:'frame',...t},h('img',{src:PHOTO,alt:'Portrait of Endhuja B.K.'}))),
    h('div',{className:'rv r',style:{'--d':'.25s'}},h('h2',null,'About me'),
      h('p',null,'I’m a Computer Science (AI & ML) student at Annamalai University, Chidambaram, building web applications that put machine learning to practical use. My work spans Python back ends with FastAPI and Flask, React front ends, and AI features wired into real websites.'),
      h('p',null,'I’ve interned as an AI Development Intern and as a React Developer Intern, and completed Reinforcement Learning (IIT Madras) and Applied Accelerated Artificial Intelligence (IIT Guwahati) certifications.'),
      h('div',{className:'facts'},
        h('div',null,h('b',null,'B.E. CSE (AI&ML)'),h('small',null,'Annamalai University, 2024 – 2027')),
        h('div',null,h('b',null,'2 internships'),h('small',null,'AI development, React')),
        h('div',null,h('b',null,'Tamil Nadu'),h('small',null,'India'))))));
}

function Experience(){
  return h('section',{id:'experience'},h('div',{className:'wrap'},
    h('h2',{className:'rv up'},'Experience'),
    h('p',{className:'lead rv up',style:{'--d':'.12s'}},'Hands-on internships in AI integration and front-end development.'),
    h('div',{className:'cols'},
      h('div',{className:'tl'},
        h('div',{className:'job rv r',style:{'--d':'.5s'}},h('small',null,'June 2026 – July 2026'),h('h3',null,'AI Development Intern'),h('em',null,'Vebbox Software Solution'),
          h('ul',null,h('li',null,'Worked on front-end and back-end integration to connect AI functionality with website components.'),
            h('li',null,'Designed and implemented website features by integrating AI into web-based solutions.'))),
        h('div',{className:'job rv r',style:{'--d':'.95s'}},h('small',null,'June 2025 – July 2025'),h('h3',null,'React Developer Intern'),h('em',null,'Day Dream Solution'),
          h('ul',null,h('li',null,'Worked closely with developers and team members to understand requirements, implement features and resolve UI issues.'),
            h('li',null,'Collaborated on developing and enhancing responsive web applications with React.js.')))),
      h('div',{className:'edu'},h('h3',null,'Education'),
        h('div',{className:'it rv up',style:{'--d':'0.65s'}},h('b',null,'B.E. Computer Science (AI&ML)'),h('small',null,'Faculty of Engineering and Technology, Annamalai University, Chidambaram'),h('small',null,'Aug 2024 – May 2027 | CGPA 7.05 (up to 6th semester)')),
        h('div',{className:'it rv up',style:{'--d':'0.90s'}},h('b',null,'Diploma in Computer Engineering'),h('small',null,'Ponnaiyah Ramajayam Polytechnic College, Kumbakonam'),h('small',null,'Jul 2022 – May 2024 | 80%')),
        h('div',{className:'it rv up',style:{'--d':'1.15s'}},h('b',null,'Certifications'),
          h('ul',null,h('li',null,h('a',{href:'https://drive.google.com/file/d/1POEeHxjf9PheI2Tnli-UgYUetuTjnwih/view?usp=drive_link',target:'_blank',rel:'noopener'},'Reinforcement Learning, IIT Madras')),
            h('li',null,h('a',{href:'https://drive.google.com/file/d/1GBOQxfiEstDMXgsB2qx9XHhibr92AmXq/view?usp=drive_link',target:'_blank',rel:'noopener'},'Applied Accelerated Artificial Intelligence, IIT Guwahati'))))))));
}

const PROJECTS=[
  {n:'Elder Care Assistant',d:'An AI-powered elder care assistant built with FastAPI, SQLAlchemy, SQLite and Jinja2, with secure authentication, session management and REST APIs. Set up with virtual environments and Git.',
   img:IMG.elder,t:['Python','FastAPI','SQLite','SQLAlchemy','HTML','Bootstrap','Passlib (bcrypt)','APScheduler'],u:'https://github.com/endhu29/AI-memory-assistant'},
  {n:'AI-Powered Cyber Threat Intelligence Platform',d:'A hybrid machine learning and rule-based cyber threat detection system. A Random Forest model classifies attacks, and a Flask dashboard visualizes the threats.',
   img:IMG.cyber,t:['Python','Flask','Chart.js','Joblib','Random Forest'],u:'https://github.com/endhu29/-AI-Powered-Cyber-Threat-Intelligence-Platform-'}];
function Projects(){
  return h('section',{id:'projects'},h('div',{className:'wrap'},
    h('h2',{className:'rv up'},'Projects'),h('p',{className:'lead rv up',style:{'--d':'.12s'}},'Two projects that combine machine learning with working web back ends.'),
    h('div',{className:'grid'},PROJECTS.map((p,i)=>h('div',{key:p.n,className:'rv flip',style:{'--d':(.25+i*.3)+'s'}},h(Tilt,{className:'card',max:6},
      h('div',{className:'bg',style:{backgroundImage:`url(${p.img})`}}),h('div',{className:'shade'}),h('h3',null,p.n),h('p',null,p.d),h(Chips,{items:p.t}),
      h('a',{className:'btn',href:p.u,target:'_blank',rel:'noopener'},'View on GitHub')))))));
}

const SKILLS=[['Programming languages',['Python','Java']],
  ['Libraries & frameworks',['FastAPI','LangChain','Streamlit','OpenCV','Scikit-learn']],
  ['Tools & platforms',['Git & GitHub','HuggingFace','n8n','Google Colab','Docker','Firebase','Render','Linux']],
  ['Databases',['MySQL','PostgreSQL']]];
function Skills(){
  return h('section',{id:'skills'},h('div',{className:'wrap'},
    h('h2',{className:'rv up'},'Skills'),h('p',{className:'lead rv up',style:{'--d':'.12s'}},'The languages, frameworks and tools I work with.'),
    h('div',{className:'sk'},SKILLS.map(([t,i],n)=>h('div',{key:t,className:'rv pop',style:{'--d':n*.16+'s'}},h(Tilt,{className:'box',max:7},h('h3',null,t),h(Chips,{items:i})))))));
}

function Contact(){
  return h('section',{id:'contact'},h('div',{className:'wrap'},
    h('h2',{className:'rv zoom'},'Let’s work together'),
    h('p',{className:'lead rv up',style:{'--d':'.12s'}},'I’m open to internships and projects in AI, machine learning and full stack development.'),
    h('div',{className:'links rv up',style:{'--d':'.4s'}},
      h('a',{className:'btn',href:MAIL},'Email me'),
      h('a',{className:'btn ghost',href:GITHUB,target:'_blank',rel:'noopener'},'GitHub'),
      h('a',{className:'btn ghost',href:LINKEDIN,target:'_blank',rel:'noopener'},'LinkedIn')),
    h('p',{style:{marginTop:28,opacity:.8}},'endhuja2317@gmail.com'),
    h('footer',null,'© 2026 Endhuja B.K.')));
}

function App(){
  useEffect(()=>{
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.15});
    document.querySelectorAll('section:not(#top)').forEach(s=>io.observe(s));
    const bar=document.querySelector('.prog'),top=document.getElementById('top');
    const f=()=>{const m=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${m>0?scrollY/m:0})`;top.style.setProperty('--s',Math.min(scrollY/innerHeight,1))};
    f();addEventListener('scroll',f,{passive:true});
    return()=>{io.disconnect();removeEventListener('scroll',f)};
  },[]);
  return h(React.Fragment,null,h('div',{className:'prog'}),h(Hero),h(About),h(Experience),h(Projects),h(Skills),h(Contact));
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));
