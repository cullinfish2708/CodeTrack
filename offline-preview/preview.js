(function(){
  const h = React.createElement;
  const TODAY='2026-09-30';
  const seed=[
    {id:'p1',title:'Valid Parentheses',topic:'Stack',language:'Java',difficulty:'Easy',status:'Solved',time:18,solvedOn:'2026-09-30',bookmarked:true},
    {id:'p2',title:'Longest Substring Without Repeating Characters',topic:'Sliding Window',language:'Python',difficulty:'Medium',status:'Solved',time:34,solvedOn:'2026-09-29',bookmarked:true},
    {id:'p3',title:'Binary Tree Level Order Traversal',topic:'Trees',language:'Java',difficulty:'Medium',status:'Solved',time:26,solvedOn:'2026-09-29',bookmarked:false},
    {id:'p4',title:'Merge Intervals',topic:'Intervals',language:'C++',difficulty:'Medium',status:'Review',time:41,solvedOn:'2026-09-28',bookmarked:true},
    {id:'p5',title:'Two Sum',topic:'Hash Map',language:'Python',difficulty:'Easy',status:'Solved',time:12,solvedOn:'2026-09-27',bookmarked:false},
    {id:'p6',title:'Number of Islands',topic:'Graphs',language:'JavaScript',difficulty:'Medium',status:'Solved',time:38,solvedOn:'2026-09-26',bookmarked:false},
    {id:'p7',title:'Climbing Stairs',topic:'Dynamic Programming',language:'Python',difficulty:'Easy',status:'Solved',time:10,solvedOn:'2026-09-25',bookmarked:false},
    {id:'p8',title:'Minimum Window Substring',topic:'Sliding Window',language:'Java',difficulty:'Hard',status:'Attempted',time:55,solvedOn:'2026-09-24',bookmarked:true},
    {id:'p9',title:'Product of Array Except Self',topic:'Arrays',language:'C++',difficulty:'Medium',status:'Solved',time:29,solvedOn:'2026-09-23',bookmarked:false},
    {id:'p10',title:'Reverse Linked List',topic:'Linked List',language:'Java',difficulty:'Easy',status:'Solved',time:14,solvedOn:'2026-09-22',bookmarked:false},
    {id:'p11',title:'Kth Largest Element in an Array',topic:'Heap',language:'Python',difficulty:'Medium',status:'Review',time:47,solvedOn:'2026-09-21',bookmarked:true},
    {id:'p12',title:'LRU Cache',topic:'Design',language:'JavaScript',difficulty:'Hard',status:'Attempted',time:63,solvedOn:'2026-09-20',bookmarked:true}
  ];
  const goals0={monthly:30,weeklyMinutes:300,weeklyTopics:4};
  const fmt=s=>new Date(s+'T12:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'});
  const shift=(s,d)=>{const x=new Date(s+'T12:00:00'); x.setDate(x.getDate()+d); return x.toISOString().slice(0,10)};
  const week=()=>Array.from({length:7},(_,i)=>shift(TODAY,-i));
  const Progress=({v})=>h('div',{className:'progress'},h('i',{style:{width:v+'%'}}));
  const Dot=({d})=>h('i',{className:'dot '+d.toLowerCase()});
  function Nav({root,view}){return h('nav',{className:'nav'},[
    ['dashboard','⌂ Dashboard'],['library','▤ Problem Library'],['analytics','◒ Analytics'],['goals','◎ Goals']
  ].map(([k,l])=>h('button',{key:k,className:view===k?'active':'',onClick:()=>root.setState({view:k,modal:false})},l)))}
  function Row({p,root}){return h('div',{className:'row'},[
    h(Dot,{d:p.difficulty,key:'d'}),
    h('div',{key:'m'},[h('strong',null,p.title),h('small',null,p.topic+' · '+p.language+' · '+fmt(p.solvedOn))]),
    h('span',{className:'pill '+p.status.toLowerCase(),key:'s'},p.status),h('span',{key:'t',className:'muted'},p.time+'m'),
    h('button',{key:'b',className:'bookmark '+(p.bookmarked?'on':''),onClick:()=>root.toggleBookmark(p.id)},'★'),
    h('button',{key:'e',className:'edit',onClick:()=>root.openEdit(p)},'Edit')
  ])}
  function Dashboard({root}){
    const ps=root.state.problems, solved=ps.filter(p=>p.status==='Solved'), ws=solved.filter(p=>week().includes(p.solvedOn));
    const streak=calcStreak(ps), month=solved.filter(p=>p.solvedOn.startsWith('2026-09')).length, wp=ws.reduce((n,p)=>n+p.time,0), mp=Math.min(100,Math.round(month/root.state.goals.monthly*100)), wpp=Math.min(100,Math.round(wp/root.state.goals.weeklyMinutes*100));
    return h('div',{className:'body'},[
      h('div',{className:'hero',key:'hero'},[
        h('div',{className:'card hero-left',key:'l'},[h('span',{className:'tag'},'TODAY / '+fmt(TODAY)),h('h2',null,'Small reps. Real progress.'),h('p',null,'A focused workspace for coding practice: log the question, capture the idea, and keep the next review visible.'),h('button',{className:'inline',onClick:root.openNew},'+ Log today\'s problem')]),
        h('div',{className:'card ringwrap',key:'r'},[h('div',{className:'ring'},[h('strong',null,streak),h('span',null,'day streak')]),h('span',{className:'chip c1'},'DSA'),h('span',{className:'chip c2'},'React'),h('span',{className:'chip c3'},'SQL')])
      ]),
      h('div',{className:'hero',style:{gridTemplateColumns:'1fr'},key:'mini'},h('div',{className:'card mini'},[
        h('div',{className:'split'},[h('span',null,'Monthly target'),h('b',null,month+'/'+root.state.goals.monthly)]),h(Progress,{v:mp}),h('div',{className:'small'},[h('span',null,mp+'% complete'),h('button',{onClick:()=>root.setState({view:'goals'})},'Adjust target')]),
        h('hr'),h('div',{className:'split'},[h('span',null,'Weekly practice time'),h('b',null,wp+'m')]),h(Progress,{v:wpp}),h('div',{className:'small'},[h('span',null,wpp+'% of '+root.state.goals.weeklyMinutes+'m'),h('button',{onClick:()=>root.setState({view:'analytics'})},'See details')])
      ])),
      h('div',{className:'stats',key:'stats'},[
        stat('Solved this week',ws.length,'across 7 days'),stat('Solved total',solved.length,'kept in this browser'),stat('Bookmarked',ps.filter(p=>p.bookmarked).length,'questions to revisit'),stat('Avg. solve time',Math.round(solved.reduce((n,p)=>n+p.time,0)/Math.max(1,solved.length))+'m','solved records')
      ]),
      h('div',{className:'sec',key:'sec'},[h('div',null,[h('div',{className:'eyebrow'},'RECENT ACTIVITY'),h('h3',null,'Latest problem records')]),h('button',{className:'textbtn',onClick:()=>root.setState({view:'library'})},'Open full library →')]),
      h('div',{className:'list',key:'list'},solved.slice(0,5).map(p=>h(Row,{p,root,key:p.id})))
    ]);
  }
  function stat(a,b,c){return h('div',{className:'card stat'},[h('div',{className:'label'},a),h('div',{className:'value'},b),h('div',{className:'detail'},c)])}
  function Library({root}){
    const s=root.state, list=s.problems.filter(p=>`${p.title} ${p.topic} ${p.language}`.toLowerCase().includes(s.query.toLowerCase()) && (s.difficulty==='All'||p.difficulty===s.difficulty) && (s.status==='All'||p.status===s.status) && (s.language==='All'||p.language===s.language) && (!s.savedOnly||p.bookmarked));
    return h('div',{className:'body'},[
      h('div',{className:'toolbar'},[
        h('div',{className:'search'},['⌕',h('input',{value:s.query,onChange:e=>root.setState({query:e.target.value}),placeholder:'Search title, topic or language...'})]),
        select('difficulty',s.difficulty,['All','Easy','Medium','Hard'],v=>root.setState({difficulty:v})),select('status',s.status,['All','Solved','Review','Attempted'],v=>root.setState({status:v})),select('language',s.language,['All','Java','Python','JavaScript','C++'],v=>root.setState({language:v})),
        h('button',{className:'saved '+(s.savedOnly?'on':''),onClick:()=>root.setState({savedOnly:!s.savedOnly})},'★ Saved')
      ]),
      h('div',{className:'sec'},[h('div',{className:'muted'},list.length+' matching records'),h('button',{className:'textbtn',onClick:root.openNew},'+ Add record')]),
      h('div',{className:'table'},[h('div',{className:'th'},[h('span',null,'Problem'),h('span',null,'Difficulty'),h('span',null,'Status'),h('span',null,'Language'),h('span',null,'Time'),h('span',null,'')]),list.map(p=>h('div',{className:'tr',key:p.id},[
        h('div',{className:'title'},[h(Dot,{d:p.difficulty}),h('div',[h('strong',null,p.title),h('small',null,p.topic+' · '+fmt(p.solvedOn))])]),h('span',{className:'difficulty '+p.difficulty.toLowerCase()},p.difficulty),h('span',{className:'pill '+p.status.toLowerCase()},p.status),h('span',null,p.language),h('span',null,p.time+'m'),h('div',{className:'row-actions'},[h('button',{className:'bookmark '+(p.bookmarked?'on':''),onClick:()=>root.toggleBookmark(p.id)},'★'),h('button',{onClick:()=>root.openEdit(p)},'Edit'),h('button',{className:'danger',onClick:()=>root.deleteProblem(p.id)},'Delete')])
      ]))])
    ]);
  }
  function select(label,val,opts,on){return h('select',{value:val,onChange:e=>on(e.target.value),'aria-label':label},opts.map(x=>h('option',{key:x},x)))}
  function Analytics({root}){
    const ps=root.state.problems, solved=ps.filter(p=>p.status==='Solved'), ws=week(), counts=ws.map(d=>solved.filter(p=>p.solvedOn===d).length), max=Math.max(1,...counts), avg=Math.round(solved.reduce((n,p)=>n+p.time,0)/Math.max(1,solved.length));
    const dif=['Easy','Medium','Hard'].map(d=>[d,solved.filter(p=>p.difficulty===d).length]);
    const topics=Object.entries(solved.reduce((a,p)=>(a[p.topic]=(a[p.topic]||0)+1,a),{})).sort((a,b)=>b[1]-a[1]).slice(0,6);
    return h('div',{className:'body'},[
      h('div',{className:'analysis'},[h('div',{className:'card big'},[h('span',{className:'tag'},'PRACTICE SIGNAL'),h('h2',null,avg+' min'),h('p',{className:'muted'},'Average time per solved problem.'),h('p',{className:'muted'},'The goal is not to minimize every timer - use the trend to find topics that deserve another pass.')]),h('div',{className:'card big'},[h('div',{className:'eyebrow'},'7-DAY OUTPUT'),h('h2',null,counts.reduce((a,b)=>a+b,0)),h('p',{className:'muted'},'solved questions'),h('div',{className:'barbox'},counts.map((n,i)=>h('div',{className:'barcol',key:i},[h('div',{className:'bar',style:{height:(n/max*100)+'%'}}),h('span',null,new Date(ws[i]+'T12:00:00').toLocaleDateString('en-IN',{weekday:'narrow'}))])))])]),
      h('div',{className:'twocol'},[h('div',{className:'card chart'},[h('div',{className:'eyebrow'},'DIFFICULTY MIX'),h('h3',null,'What are you solving?'),dif.map(([d,n])=>h('div',{className:'meter',key:d},[h('div',{className:'meter-head'},[h('span',null,d),h('b',null,n)]),h(Progress,{v:solved.length?n/solved.length*100:0})]))]),h('div',{className:'card chart'},[h('div',{className:'eyebrow'},'TOP TOPICS'),h('h3',null,'Where practice clusters'),topics.map(([t,n])=>h('div',{className:'topic',key:t},[h('span',null,t),h('div',{className:'track'},h('i',{style:{width:Math.min(100,n*18)+'%'}})),h('b',null,n)]))])])
    ]);
  }
  function Goals({root}){const g=root.state.goals,ps=root.state.problems,solved=ps.filter(p=>p.status==='Solved'),month=solved.filter(p=>p.solvedOn.startsWith('2026-09')).length,mins=solved.filter(p=>week().includes(p.solvedOn)).reduce((n,p)=>n+p.time,0),topics=new Set(solved.filter(p=>week().includes(p.solvedOn)).map(p=>p.topic)).size;return h('div',{className:'body'},[
    h('div',{className:'goals'},[h('div',{className:'card panel'},[h('div',{className:'eyebrow'},'CURRENT TARGETS'),h('h3',null,'Keep the practice measurable'),goal('01','Monthly solved problems',month,g.monthly,'problems'),goal('02','Weekly practice time',mins,g.weeklyMinutes,'minutes'),goal('03','Topics touched this week',topics,g.weeklyTopics,'topics')]),h('div',{className:'card panel'},[h('div',{className:'eyebrow'},'PERSONAL SETTINGS'),h('h3',null,'Adjust your targets'),inputGoal('Monthly solved target',g.monthly,v=>root.setState({tempMonthly:v})),inputGoal('Weekly practice minutes',g.weeklyMinutes,v=>root.setState({tempMinutes:v})),inputGoal('Weekly topic target',g.weeklyTopics,v=>root.setState({tempTopics:v})),h('button',{className:'actions primary',onClick:()=>root.setState({goals:{monthly:Number(root.state.tempMonthly||g.monthly),weeklyMinutes:Number(root.state.tempMinutes||g.weeklyMinutes),weeklyTopics:Number(root.state.tempTopics||g.weeklyTopics)}})},'Save goals'),h('div',{className:'side-note'},'Current streak: '+calcStreak(ps)+' days')])])
  ]);}
  function goal(n,t,c,tar,u){const p=Math.min(100,Math.round(c/tar*100));return h('div',{className:'goal'},[h('div',{className:'goalnum'},n),h('div',null,[h('div',{className:'goalhead'},[h('span',null,t),h('b',null,c+'/'+tar)]),h(Progress,{v:p}),h('div',{className:'goalfoot'},[h('span',null,Math.max(0,tar-c)+' '+u+' remaining'),h('span',null,p+'%')])])])}
  function inputGoal(label,val,on){return h('label',null,[label,h('input',{type:'number',value:val,onChange:e=>on(e.target.value)})])}
  function Modal({root,initial}){const [f,setF]=React.useState?React.useState(null):[null,()=>{}];return h(ModalClass,{root,initial});}
  class ModalClass extends React.Component{
    constructor(p){super(p);this.state={...(p.initial||{title:'',topic:'',language:'JavaScript',difficulty:'Medium',status:'Solved',time:30,solvedOn:TODAY,notes:'',bookmarked:false}),error:''}}
    save(){const f=this.state;if(!f.title.trim())return this.setState({error:'Problem title is required.'});if(!f.topic.trim())return this.setState({error:'Topic is required.'});if(Number(f.time)<1||Number(f.time)>600)return this.setState({error:'Time must be between 1 and 600 minutes.'});this.props.root.saveProblem(f)}
    render(){const f=this.state,set=(k,v)=>this.setState({[k]:v});return h('div',{className:'modalbg'},h('div',{className:'modal'},[
      h('div',{className:'modalhead'},[h('div',null,[h('div',{className:'eyebrow'},'PROBLEM RECORD'),h('h2',null,this.props.initial?'Edit problem':'Log a new problem')]),h('button',{className:'close',onClick:this.props.root.closeModal},'×')]),
      h('div',{className:'form'},[lab('Problem title','wide',f.title,v=>set('title',v),'e.g. Course Schedule'),lab('Topic','',f.topic,v=>set('topic',v),'e.g. Graphs'),labSel('Language','',f.language,v=>set('language',v),['JavaScript','Python','Java','C++','TypeScript']),labSel('Difficulty','',f.difficulty,v=>set('difficulty',v),['Easy','Medium','Hard']),labSel('Status','',f.status,v=>set('status',v),['Solved','Review','Attempted']),lab('Time (minutes)','',f.time,v=>set('time',v),'30'),lab('Date','',f.solvedOn,v=>set('solvedOn',v),'', 'date'),lab('Notes / approach','wide',f.notes,v=>set('notes',v),'Key idea or edge case...','textarea')]),
      f.error&&h('div',{className:'error'},f.error),h('div',{className:'modalactions'},[h('button',{onClick:this.props.root.closeModal},'Cancel'),h('button',{className:'primary',onClick:()=>this.save()},this.props.initial?'Save changes':'Add problem')])
    ]))}
  }
  function lab(label,cls,val,on,ph,type){return h('label',{className:cls},[label,h(type==='textarea'?'textarea':'input',{type:type==='textarea'?undefined:(type||'text'),value:val,onChange:e=>on(e.target.value),placeholder:ph||''})])}
  function labSel(label,cls,val,on,opts){return h('label',{className:cls},[label,h('select',{value:val,onChange:e=>on(e.target.value)},opts.map(o=>h('option',{key:o},o)))])}
  class App extends React.Component{
    constructor(){super();this.state={view:'dashboard',problems:seed,goals:goals0,query:'',difficulty:'All',status:'All',language:'All',savedOnly:false,modal:false,editing:null,tempMonthly:goals0.monthly,tempMinutes:goals0.weeklyMinutes,tempTopics:goals0.weeklyTopics}}
    openNew=()=>this.setState({modal:true,editing:null}); openEdit=p=>this.setState({modal:true,editing:p}); closeModal=()=>this.setState({modal:false});
    toggleBookmark=id=>this.setState(s=>({problems:s.problems.map(p=>p.id===id?{...p,bookmarked:!p.bookmarked}:p)}));
    deleteProblem=id=>{if(confirm('Delete this problem record?'))this.setState(s=>({problems:s.problems.filter(p=>p.id!==id)}))};
    saveProblem=f=>{this.setState(s=>({problems:s.editing?s.problems.map(p=>p.id===s.editing.id?{...f,id:s.editing.id}:p):[{...f,id:'p'+Date.now()},...s.problems],modal:false}))};
    render(){const v=this.state.view;return h('div',{className:'app'},[h('aside',{className:'side'},[h('div',{className:'brand'},[h('div',{className:'mark'},'CT'),h('div',null,[h('b',null,'CodeTrack'),h('small',null,'practice workspace')])]),h(Nav,{root:this,view:v}),h('div',{className:'side-note'},'● Local-first storage\nYour records stay in this browser.'),h('button',{className:'export'},'⇩ Export backup')]),h('main',{className:'main'},[h('header',{className:'top'},[h('div',null,[h('div',{className:'eyebrow'},'FULL STACK WEB DEVELOPMENT / TASK 2'),h('h1',null,v==='dashboard'?'Practice dashboard':v==='library'?'Problem library':v==='analytics'?'Performance analytics':'Practice goals')]),h('div',{className:'actions'},[h('button',{className:'primary',onClick:this.openNew},'+ Log problem')])]),v==='dashboard'?h(Dashboard,{root:this}):v==='library'?h(Library,{root:this}):v==='analytics'?h(Analytics,{root:this}):h(Goals,{root:this})]),this.state.modal&&h(ModalClass,{root:this,initial:this.state.editing})])}
  }
  function calcStreak(ps){const set=new Set(ps.filter(p=>p.status==='Solved').map(p=>p.solvedOn));let c=set.has(TODAY)?TODAY:shift(TODAY,-1),n=0;while(set.has(c)){n++;c=shift(c,-1)}return n}
  ReactDOM.render(h(App),document.getElementById('root'));
})();
