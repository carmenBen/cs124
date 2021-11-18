(this.webpackJsonpcs124=this.webpackJsonpcs124||[]).push([[0],{46:function(e,t,c){},47:function(e,t,c){},52:function(e,t,c){"use strict";c.r(t);var n=c(19),i=c.n(n),a=c(40),o=c.n(a),l=(c(46),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,53)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,a=t.getLCP,o=t.getTTFB;c(e),n(e),i(e),a(e),o(e)}))}),r=c(5),d=c(15),s=(c(47),c(48),c(12));function u(e){return Object(s.jsxs)("div",{className:"checklist",children:[Object(s.jsx)("input",{type:"checkbox",onInput:e.checkFunction,id:e.id,name:e.id,value:e.id,defaultChecked:e.completed},e.id),Object(s.jsx)("label",{htmlFor:e.id,children:e.title+" ("+{1:"High",2:"Medium",3:"Low"}[e.priority]+") "}),Object(s.jsx)("button",{onClick:function(){return e.modifyTask(e.title,e.id)},children:"Modify"})]})}function j(e){function t(t){return e.items.map((function(c){return t&&c.completed||!t&&!c.completed?Object(s.jsx)(u,{id:c.id,title:c.title,completed:c.completed,checkFunction:function(t){return n=t.target.checked,i=c.id,void e.handleChangeField(i,"completed",n);var n,i},modifyTask:e.modifyTask,priority:c.priority},c.id):void 0}))}return Object(s.jsx)("form",{children:Object(s.jsxs)("table",{children:[Object(s.jsx)("thead",{children:Object(s.jsxs)("tr",{children:[!e.incompleteTasksOnly&&Object(s.jsx)("th",{children:"Complete"}),Object(s.jsx)("th",{children:"Incomplete"})]})}),Object(s.jsx)("tbody",{children:Object(s.jsxs)("tr",{children:[!e.incompleteTasksOnly&&Object(s.jsx)("td",{children:t(!0)}),Object(s.jsx)("td",{children:t(!1)})]})})]})})}function b(e){var t=i.a.useState(""),c=Object(d.a)(t,2),n=c[0],a=c[1],o=i.a.useState("1"),l=Object(d.a)(o,2),r=l[0],u=l[1];return Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{id:"addTask",htmlFor:"newTask",children:"Add New Task:"}),Object(s.jsx)("input",{type:"text",id:"newTask",name:"newTask",onChange:function(e){return a(e.target.value)}}),Object(s.jsxs)("select",{name:"priority",id:"priority-dropdown",onChange:function(e){return u(e.target.value)},children:[Object(s.jsx)("option",{value:"1",children:"High"}),Object(s.jsx)("option",{value:"2",children:"Medium"}),Object(s.jsx)("option",{value:"3",children:"Low"})]}),Object(s.jsx)("input",{type:"button",value:"Cancel",onClick:function(){return e.cancel()}}),Object(s.jsx)("input",{type:"button",value:"Add",onClick:function(t){return e.addNewDataPoint(n,r)}})]})}var h=c(38);function p(e){var t=i.a.useState(e.taskName),c=Object(d.a)(t,2),n=c[0],a=c[1],o=i.a.useState(e.priority),l=Object(d.a)(o,2),r=l[0],u=l[1];return Object(s.jsxs)("div",{children:[Object(s.jsx)("label",{id:"modifyTask",htmlFor:"changeTask",children:"Modify Task:"}),Object(s.jsx)("input",{type:"text",id:"changeTask",name:"changeTask",defaultValue:e.taskName,onChange:function(e){return a(e.target.value)}}),Object(s.jsxs)("select",{name:"priority",id:"priority-dropdown",onChange:function(e){return u(e.target.value)},children:[Object(s.jsx)("option",{value:"1",children:"High"}),Object(s.jsx)("option",{value:"2",children:"Medium"}),Object(s.jsx)("option",{value:"3",children:"Low"})]}),Object(s.jsx)("input",{type:"button",value:"Cancel",onClick:function(){return e.cancel()}}),Object(s.jsx)("input",{type:"button",value:"Modify",onClick:function(){return e.taskName!==n&&e.handleChangeField(e.id,"title",n),void(e.priority!==r&&e.handleChangeField(e.id,"priority",r))}})]})}var O=c(41),m=c(30);var f=function(e){var t=Object(n.useState)("title"),c=Object(d.a)(t,2),i=c[0],a=c[1],o=Object(O.a)(e.collection.orderBy(i,"asc")),l=Object(d.a)(o,3),u=l[0],f=(l[1],l[2],[]);void 0!==u&&(f=u.docs.map((function(e){return e.data()})));var k=Object(n.useState)(!1),x=Object(d.a)(k,2),v=x[0],y=x[1],g=Object(n.useState)("checklist"),C=Object(d.a)(g,2),T=C[0],w=C[1],S=Object(n.useState)([]),F=Object(d.a)(S,2),I=F[0],D=F[1],M=v?"Show Completed Tasks":"Hide Completed Tasks";function N(){w("checklist")}function A(t,c,n){e.collection.doc(t).update(Object(r.a)({},c,n)),w("checklist")}return Object(s.jsxs)("div",{className:"App",children:[Object(s.jsxs)("h1",{children:["To Do List ",Object(s.jsx)("br",{}),"checklist"===T&&Object(s.jsxs)("div",{id:"sort-by",children:["Sort by:",Object(s.jsxs)("select",{name:"sortBy",id:"sortByDropdown",onChange:function(e){return a(e.target.value)},children:[Object(s.jsx)("option",{value:"title",children:"Title"}),Object(s.jsx)("option",{value:"priority",children:"Priority"}),Object(s.jsx)("option",{value:"created",children:"Date created"})]})]})]}),"checklist"===T&&Object(s.jsxs)("div",{children:[Object(s.jsx)(j,{items:f,handleChangeField:A,modifyTask:function(e,t){w("modifyTask"),D([e,t])},completedItems:f.filter((function(e){return e.completed})),incompleteTasksOnly:v}),Object(s.jsxs)("div",{children:[Object(s.jsx)("input",{type:"button",value:"Add New Task",onClick:function(){w("addTask")}}),f.filter((function(e){return e.completed})).length>0&&Object(s.jsx)("input",{type:"button",value:"Delete Completed Items",onClick:function(){f.forEach((function(t){return t.completed&&(c=t.id,e.collection.doc(c).delete(),void w("checklist"));var c})),w("checklist")}}),Object(s.jsx)("input",{type:"button",value:M,onClick:function(){y(!v),w("checklist")}})]})]}),"modifyTask"===T&&Object(s.jsx)(p,{handleChangeField:A,taskName:I[0],id:I[1],cancel:N}),"addTask"===T&&Object(s.jsx)(b,{addNewDataPoint:function(t,c){var n=Object(h.a)();e.collection.doc(n).set({title:t,id:n,completed:!1,priority:c,created:m.a.database.ServerValue.TIMESTAMP}),w("checklist")},cancel:N})]})};function k(e){return Object(s.jsx)(f,{initialData:e.initialData,collection:e.collection})}m.a.initializeApp({apiKey:"AIzaSyCcQ6XCOvMIA7pHME4bWBgy_7OVy_7XErA",authDomain:"cs124-fall2021.firebaseapp.com",projectId:"cs124-fall2021",storageBucket:"cs124-fall2021.appspot.com",messagingSenderId:"264318304667",appId:"1:264318304667:web:4be8d27a02811b1ccd613e"});var x=m.a.firestore().collection("carmenBen-hmc-tasks");o.a.render(Object(s.jsx)(i.a.StrictMode,{children:Object(s.jsx)(k,{initialData:[],collection:x})}),document.getElementById("root")),l()}},[[52,1,2]]]);
//# sourceMappingURL=main.b22c72e8.chunk.js.map