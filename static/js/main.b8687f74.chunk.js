(this.webpackJsonpcs124=this.webpackJsonpcs124||[]).push([[0],{46:function(e,t,c){},47:function(e,t,c){},52:function(e,t,c){"use strict";c.r(t);var n=c(17),i=c.n(n),l=c(41),a=c.n(l),o=(c(46),function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,53)).then((function(t){var c=t.getCLS,n=t.getFID,i=t.getFCP,l=t.getLCP,a=t.getTTFB;c(e),n(e),i(e),l(e),a(e)}))}),s=c(5),d=c(15),r=(c(47),c(48),c(12));function u(e){return Object(r.jsxs)("div",{className:"checklist",children:[Object(r.jsx)("input",{type:"checkbox",onInput:e.checkFunction,id:e.id,name:e.id,value:e.id,defaultChecked:e.completed},e.id),Object(r.jsx)("label",{htmlFor:e.id,children:e.title+" ("+{1:"High",2:"Medium",3:"Low"}[e.priority]+") "}),Object(r.jsx)("button",{onClick:function(){return e.modifyTask(e.title,e.id)},children:"Modify"})]})}function j(e){function t(t){return e.items.map((function(c){return t&&c.completed||!t&&!c.completed?Object(r.jsx)(u,{id:c.id,title:c.title,completed:c.completed,checkFunction:function(t){return n=t.target.checked,i=c.id,void e.handleChangeField(i,"completed",n);var n,i},modifyTask:e.modifyTask,priority:c.priority},c.id):void 0}))}return Object(r.jsx)("form",{children:Object(r.jsxs)("table",{children:[Object(r.jsx)("thead",{children:Object(r.jsxs)("tr",{children:[!e.incompleteTasksOnly&&Object(r.jsx)("th",{children:"Complete"}),Object(r.jsx)("th",{children:"Incomplete"})]})}),Object(r.jsx)("tbody",{children:Object(r.jsxs)("tr",{children:[!e.incompleteTasksOnly&&Object(r.jsx)("td",{children:t(!0)}),Object(r.jsx)("td",{children:t(!1)})]})})]})})}function b(e){var t=i.a.useState(""),c=Object(d.a)(t,2),n=c[0],l=c[1],a=i.a.useState("1"),o=Object(d.a)(a,2),s=o[0],u=o[1];return Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{id:"addTask",htmlFor:"newTask",children:"Add New Task:"}),Object(r.jsx)("input",{type:"text",id:"newTask",name:"newTask",onChange:function(e){return l(e.target.value)}}),Object(r.jsxs)("select",{name:"priority",id:"priority-dropdown","aria-label":"dropdown to select priority",onChange:function(e){return u(e.target.value)},children:[Object(r.jsx)("option",{value:"1",children:"High"}),Object(r.jsx)("option",{value:"2",children:"Medium"}),Object(r.jsx)("option",{value:"3",children:"Low"})]}),Object(r.jsx)("input",{type:"button",value:"Cancel",onClick:function(){return e.cancel()}}),Object(r.jsx)("input",{type:"button",value:"Add",onClick:function(t){return e.addNewDataPoint(n,s)}})]})}var h=c(33);function p(e){var t=i.a.useState(e.taskName),c=Object(d.a)(t,2),n=c[0],l=c[1],a=i.a.useState(e.priority),o=Object(d.a)(a,2),s=o[0],u=o[1];return Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{id:"modifyTask",htmlFor:"changeTask",children:"Modify Task:"}),Object(r.jsx)("input",{type:"text",id:"changeTask",name:"changeTask",defaultValue:e.taskName,onChange:function(e){return l(e.target.value)}}),Object(r.jsxs)("select",{name:"priority",id:"priority-dropdown","aria-label":"dropdown to select priority",onChange:function(e){return u(e.target.value)},children:[Object(r.jsx)("option",{value:"1",children:"High"}),Object(r.jsx)("option",{value:"2",children:"Medium"}),Object(r.jsx)("option",{value:"3",children:"Low"})]}),Object(r.jsx)("input",{type:"button",value:"Cancel",onClick:function(){return e.cancel()}}),Object(r.jsx)("input",{type:"button",value:"Modify",onClick:function(){return e.taskName!==n&&e.handleChangeField(e.id,"title",n),void(e.priority!==s&&e.handleChangeField(e.id,"priority",s))}})]})}var O=c(39),f=c(30);function x(e){var t=i.a.useState(""),c=Object(d.a)(t,2),n=c[0],l=c[1];return Object(r.jsxs)("div",{children:[Object(r.jsx)("label",{id:"addList",htmlFor:"newList",children:"Add New List:"}),Object(r.jsx)("input",{type:"text",id:"newList",name:"newList",onChange:function(e){return l(e.target.value)}}),Object(r.jsx)("input",{type:"button",value:"Cancel",onClick:function(){return e.cancel()}}),Object(r.jsx)("input",{type:"button",value:"Add",onClick:function(t){return e.addNewList(n)}})]})}function m(e){return Object(r.jsxs)("div",{children:[Object(r.jsxs)("h1",{id:"deleteList",children:["Are you sure you want to delete ",e.listName,"?"]}),Object(r.jsx)("input",{type:"button",value:"Cancel",onClick:function(){return e.cancel()}}),Object(r.jsx)("input",{type:"button",value:"Confirm",onClick:function(){return e.deleteCurrentList(e.listId)}})]})}var k=function(e){var t=Object(n.useState)("title"),c=Object(d.a)(t,2),i=c[0],l=c[1],a=Object(O.a)(e.collection),o=Object(d.a)(a,3),u=o[0],k=o[1],v=(o[2],[{title:"To Do",id:"v1-1636654768436-2119059561616"}]);void 0!==u&&(console.log("reading in lists"),v=u.docs.map((function(e){return e.data()})));var y=Object(n.useState)(v[0].id),C=Object(d.a)(y,2),g=C[0],w=C[1],T=Object(O.a)(e.collection.doc(g).collection("tasks").orderBy(i,"asc")),L=Object(d.a)(T,3),S=L[0],N=(L[1],L[2],[]);void 0!==S&&(N=S.docs.map((function(e){return e.data()})));var F=Object(n.useState)(!1),D=Object(d.a)(F,2),I=D[0],A=D[1],B=Object(n.useState)("checklist"),M=Object(d.a)(B,2),P=M[0],H=M[1],E=Object(n.useState)([]),z=Object(d.a)(E,2),V=z[0],q=z[1],J=I?"Show Completed Tasks":"Hide Completed Tasks";function K(){H("checklist")}function R(t,c,n){e.collection.doc(g).collection("tasks").doc(t).update(Object(s.a)({},c,n)),H("checklist")}return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)("h1",{children:[!k&&v.filter((function(e){return e.id===g}))[0].title,"checklist"===P&&Object(r.jsxs)("div",{className:"selectDropdowns",children:[Object(r.jsxs)("div",{id:"sort-by",children:["Sort by:",Object(r.jsxs)("select",{name:"sortBy",id:"sortByDropdown","aria-label":"dropdown to select value to sort by",onChange:function(e){return l(e.target.value)},defaultValue:i,children:[Object(r.jsx)("option",{value:"title",selected:"title"===i,children:"Title"}),Object(r.jsx)("option",{value:"priority",selected:"priority"===i,children:"Priority"}),Object(r.jsx)("option",{value:"created",selected:"created"===i,children:"Date created"})]})]}),Object(r.jsxs)("div",{id:"sort-by",children:["Select a list:",Object(r.jsx)("select",{name:"listSelector","aria-label":"dropdown to select list",id:"listSelectorDropdown",onChange:function(e){return w(e.target.value)},children:v.map((function(e){return Object(r.jsx)("option",{value:e.id,selected:e.id===g,children:e.title})}))}),Object(r.jsx)("button",{id:"addButton","aria-label":"Add new list",onClick:function(){H("newList")},children:"+"}),"v1-1636654768436-2119059561616"!==g&&Object(r.jsx)("button",{id:"deleteButton",value:"Delete Current List","aria-label":"Delete list",onClick:function(){H("deleteList")},children:Object(r.jsx)("i",{className:"fa fa-trash","aria-hidden":"true"})})]})]})]}),"deleteList"===P&&Object(r.jsx)(m,{listName:v.filter((function(e){return e.id===g}))[0].title,listId:g,deleteCurrentList:function(t){e.collection.doc(t).delete(),console.log("id: ",t),w(v[0].id),H("checklist")},cancel:K}),"checklist"===P&&Object(r.jsxs)("div",{children:[Object(r.jsx)(j,{items:N,handleChangeField:R,modifyTask:function(e,t){H("modifyTask"),q([e,t])},completedItems:N.filter((function(e){return e.completed})),incompleteTasksOnly:I}),Object(r.jsxs)("div",{className:"buttons",children:[Object(r.jsx)("input",{type:"button",value:"Add New Task",onClick:function(){H("addTask")}}),Object(r.jsx)("input",{type:"button",value:J,onClick:function(){A(!I),H("checklist")}}),N.filter((function(e){return e.completed})).length>0&&Object(r.jsx)("input",{type:"button",value:"Delete Completed Tasks",onClick:function(){N.forEach((function(t){return t.completed&&(c=t.id,e.collection.doc(g).collection("tasks").doc(c).delete(),void H("checklist"));var c})),H("checklist")}})]})]}),"modifyTask"===P&&Object(r.jsx)(p,{handleChangeField:R,taskName:V[0],id:V[1],cancel:K}),"addTask"===P&&Object(r.jsx)(b,{addNewDataPoint:function(t,c){var n=Object(h.a)();e.collection.doc(g).collection("tasks").doc(n).set({title:t,id:n,completed:!1,priority:c,created:f.a.database.ServerValue.TIMESTAMP,list:g}),H("checklist")},cancel:K}),"newList"===P&&Object(r.jsx)(x,{addNewList:function(t){var c=Object(h.a)();e.collection.doc(c).set({title:t,id:c}),console.log("added new list"),w(v[0].id),H("checklist")},cancel:K})]})};function v(e){return Object(r.jsx)(k,{initialData:e.initialData,collection:e.collection})}f.a.initializeApp({apiKey:"AIzaSyCd9qqxvMpEKpBzwfWcc2tlRFa6ICaLH_s",authDomain:"hmc-cs124-fa21-labs.firebaseapp.com",projectId:"hmc-cs124-fa21-labs",storageBucket:"hmc-cs124-fa21-labs.appspot.com",messagingSenderId:"949410042946",appId:"1:949410042946:web:0113b139a7e3cd1cc709db"});var y=f.a.firestore().collection("carmenBen-hmc-tasks");a.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)(v,{initialData:[],collection:y})}),document.getElementById("root")),o()}},[[52,1,2]]]);
//# sourceMappingURL=main.b8687f74.chunk.js.map