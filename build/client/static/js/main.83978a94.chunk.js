(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,n){e.exports=n(73)},46:function(e,t,n){},73:function(e,t,n){"use strict";n.r(t);var a,r,o,i,c,l,s,u,p,g,m,d,h,b,f,v,E,y=n(0),C=n.n(y),O=n(18),j=n.n(O),L=n(2),S=n.n(L),w=n(8),k=n(19),x=n(5),N=n(9),U=n(15),D=n(14),A=n(16),P=(n(46),n(20)),F=n(6),I=(n(29),n(1)),G=n(13),z=n.n(G),B=(a=I.d.bound,r=I.d.bound,o=I.d.bound,i=function(){function e(){Object(x.a)(this,e),Object(P.a)(this,"user",c,this),Object(P.a)(this,"isLoggedIn",l,this)}return Object(N.a)(e,[{key:"login",value:function(){var e=Object(w.a)(S.a.mark(function e(t){var n;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.a.post("/login",{username:t});case 2:n=e.sent,console.log(n),n.data&&(this.isLoggedIn=!0,this.user=n.data);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"logout",value:function(){this.isLoggedIn=!1,this.user={}}},{key:"newUser",value:function(){var e=Object(w.a)(S.a.mark(function e(t){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.a.post("/api/user/new",t);case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()}]),e}(),c=Object(F.a)(i.prototype,"user",[I.k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),l=Object(F.a)(i.prototype,"isLoggedIn",[I.k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),Object(F.a)(i.prototype,"login",[a],Object.getOwnPropertyDescriptor(i.prototype,"login"),i.prototype),Object(F.a)(i.prototype,"logout",[r],Object.getOwnPropertyDescriptor(i.prototype,"logout"),i.prototype),Object(F.a)(i.prototype,"newUser",[o],Object.getOwnPropertyDescriptor(i.prototype,"newUser"),i.prototype),i),M=n(37),J=(s=I.d.bound,u=I.d.bound,p=I.d.bound,g=function(){function e(){Object(x.a)(this,e),Object(P.a)(this,"legs",m,this),Object(P.a)(this,"current",d,this)}return Object(N.a)(e,[{key:"getOne",value:function(){var e=Object(w.a)(S.a.mark(function e(t){var n;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.a.get("/api/leg",{params:{id:t}});case 2:n=e.sent,this.current=n.data;case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getMany",value:function(){var e=Object(w.a)(S.a.mark(function e(t){var n;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.a.get("api/leg/search",{params:Object(M.a)({},t)});case 2:n=e.sent,this.legs=n.data;case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"updateLeg",value:function(){var e=Object(w.a)(S.a.mark(function e(t){var n;return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.a.put("/api/leg/".concat(t.id),t);case 2:n=e.sent,console.log(n.data),this.current=n.data;case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()}]),e}(),m=Object(F.a)(g.prototype,"legs",[I.k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),d=Object(F.a)(g.prototype,"current",[I.k],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),Object(F.a)(g.prototype,"getOne",[s],Object.getOwnPropertyDescriptor(g.prototype,"getOne"),g.prototype),Object(F.a)(g.prototype,"getMany",[u],Object.getOwnPropertyDescriptor(g.prototype,"getMany"),g.prototype),Object(F.a)(g.prototype,"updateLeg",[p],Object.getOwnPropertyDescriptor(g.prototype,"updateLeg"),g.prototype),g),R={UserStore:new B,LegStore:new J},T=n(22),W=n(17),$=n(7),q=function(e){return C.a.createElement("div",null,C.a.createElement(T.c,{to:"/"},"home"),C.a.createElement("button",{onClick:function(){return e.history.push("/new")}},"New User"),C.a.createElement("button",{onClick:function(){return e.history.push("/leg")}},"legs"),C.a.createElement("button",{onClick:function(){return e.history.push("/leg/new")}},"New leg"),C.a.createElement("button",{onClick:function(){return e.history.push("/leg/search")}},"search leg"),C.a.createElement("button",{onClick:function(){return z.a.post("/logout")}},"logout"))},H=Object($.b)("UserStore")(h=Object($.c)(h=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(U.a)(this,Object(D.a)(t).call(this,e))).onChange=function(e){n.setState({username:e.target.value})},n.state={username:""},n}return Object(A.a)(t,e),Object(N.a)(t,[{key:"render",value:function(){var e=this;return C.a.createElement(C.a.Fragment,null,this.props.UserStore.isLoggedIn?C.a.createElement(C.a.Fragment,null,C.a.createElement("div",null,JSON.stringify(this.props.UserStore.user)),C.a.createElement("button",{onClick:function(){e.props.UserStore.logout()}},"logout")):C.a.createElement(C.a.Fragment,null,C.a.createElement("input",{type:"text",value:this.state.username,placeholder:"Username",onChange:this.onChange}),C.a.createElement("button",{onClick:function(){e.props.UserStore.login(e.state.username)}},"login")),C.a.createElement("button",{onClick:function(){e.props.history.push("/test")}},"go test"))}}]),t}(y.Component))||h)||h,K=function(e){function t(){return Object(x.a)(this,t),Object(U.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(A.a)(t,e),Object(N.a)(t,[{key:"render",value:function(){var e=this;return C.a.createElement("button",{onClick:function(){return e.props.history.push("/")}},"go home")}}]),t}(y.Component);var Q=Object($.b)("UserStore")(b=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(U.a)(this,Object(D.a)(t).call(this,e))).onChange=function(e){n.setState(Object(k.a)({},e.target.id,e.target.value))},n.onClick=function(e){n.props.UserStore.newUser(n.state).then(function(){n.props.history.push("new/confirmation")}).catch(function(e){console.log(e.response)})},n.state={username:"",email:"",firstName:"",lastName:"",middleName:""},n}return Object(A.a)(t,e),Object(N.a)(t,[{key:"render",value:function(){return C.a.createElement("div",null,C.a.createElement("input",{type:"text",id:"username",onChange:this.onChange,placeholder:"Username"}),C.a.createElement("input",{type:"text",id:"email",onChange:this.onChange,placeholder:"Email"}),C.a.createElement("input",{type:"text",id:"firstName",onChange:this.onChange,placeholder:"First Name"}),C.a.createElement("input",{type:"text",id:"lastName",onChange:this.onChange,placeholder:"Last Name"}),C.a.createElement("input",{type:"text",id:"middleName",onChange:this.onChange,placeholder:"Middle Name"}),C.a.createElement("button",{onClick:this.onClick},"Register"))}}]),t}(y.Component))||b;function V(e){return C.a.createElement("div",null,"New User Created")}var X=function(e){return C.a.createElement("div",null,"mock 404 error",C.a.createElement("button",{onClick:function(){return e.history.goBack()}},"go back"),C.a.createElement("button",{onClick:function(){return e.history.push("/")}},"go home"))},Y=Object($.b)("LegStore")(f=Object($.c)(f=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(U.a)(this,Object(D.a)(t).call(this,e))).onChange=function(e){n.setState(Object(k.a)({},e.target.id,e.target.value))},n.getLeg=function(){n.props.LegStore.getOne(n.state.id)},n.getCard=Object(w.a)(S.a.mark(function e(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:z()({url:"/generator",method:"GET",params:{id:n.props.LegStore.current.id},responseType:"blob"}).then(function(e){console.log(e.headers);var t=e.headers["x-suggested-filename"],n=window.URL.createObjectURL(new Blob([e.data])),a=document.createElement("a");a.href=n,a.setAttribute("download",t),document.body.appendChild(a),a.click()});case 1:case"end":return e.stop()}},e)})),n.state={id:""},n}return Object(A.a)(t,e),Object(N.a)(t,[{key:"render",value:function(){var e,t,n,a,r,o,i,c,l,s,u="",p="",g="";if(this.props.LegStore.current.id){var m=this.props.LegStore.current;e=m.firstName,t=m.lastName,u=m.title,n=m.session,a=m.district,r=m.email,o=m.legPage,i=m.phoneNum,c=m.notes,p=m.createdAt,g=m.updatedAt,l=m.grades,s=m.party,console.log(typeof p),l=l.map(function(e){return C.a.createElement("li",{key:e.type},e.type,": ",e.grade)})}return C.a.createElement(C.a.Fragment,null,C.a.createElement("input",{type:"text",value:this.state.id,onChange:this.onChange,id:"id",placeholder:"ID"}),C.a.createElement("button",{onClick:this.getLeg},"get leg"),C.a.createElement("div",null,"first name: ",e),C.a.createElement("div",null,"last name: ",t),C.a.createElement("div",null,"party: ",s),C.a.createElement("div",null,"session: ",n),C.a.createElement("div",null,"title: ",u.toLowerCase()),C.a.createElement("div",null,"district: ",a),C.a.createElement("div",null,"email: ",r),C.a.createElement("div",null,"legislator webapage: ",o),C.a.createElement("div",null,"phone number: ",i),C.a.createElement("div",null,"grades:",C.a.createElement("ul",null,l)),C.a.createElement("div",null,"notes: ",c),this.props.LegStore.current.id&&C.a.createElement(C.a.Fragment,null,C.a.createElement("div",null,"created: ",new Date(p).toLocaleDateString()),C.a.createElement("div",null,"updatedAt: ",new Date(g).toLocaleDateString()),C.a.createElement("button",{onClick:this.getCard},"get card"),C.a.createElement(T.b,{to:"/leg/update"},"update info")))}}]),t}(y.Component))||f)||f,Z=Object($.b)("LegStore")(v=Object($.c)(v=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(U.a)(this,Object(D.a)(t).call(this,e))).update=Object(w.a)(S.a.mark(function e(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.props.LegStore.updateLeg(n.state);case 2:n.props.history.push("/leg");case 3:case"end":return e.stop()}},e)})),n.onChange=function(e){"title"===e.target.id&&n.setState({title:e.target.value.toUpperCase()}),n.setState(Object(k.a)({},e.target.id,e.target.value))},n.onGradeChange=function(e){var t=n.state.grades.slice();t[e.target.dataset.i]={type:e.target.id,grade:e.target.value.toUpperCase().substring(0,1)},n.setState({grades:t})},n.state={id:n.props.LegStore.current.id,fullName:n.props.LegStore.current.fullName||"",firstName:n.props.LegStore.current.firstName||"",middleName:n.props.LegStore.current.middleName||"",party:n.props.LegStore.current.party||"",imgLink:n.props.LegStore.current.imgLink||"",lastName:n.props.LegStore.current.lastName||"",title:n.props.LegStore.current.title||"",session:n.props.LegStore.current.session||0,district:n.props.LegStore.current.district||0,email:n.props.LegStore.current.email||"",legPage:n.props.LegStore.current.legPage||"",phoneNum:n.props.LegStore.current.phoneNum||"",notes:n.props.LegStore.current.notes||"",createdAt:n.props.LegStore.current.createdAt||"",updatedAt:n.props.LegStore.current.updatedAt||"",grades:n.props.LegStore.current.grades||""},n}return Object(A.a)(t,e),Object(N.a)(t,[{key:"render",value:function(){var e,t,n,a,r,o,i,c,l,s,u=this,p="",g="",m="";if(this.props.LegStore.current.id){var d=this.state;e=d.firstName,t=d.lastName,p=d.title,n=d.session,a=d.district,r=d.email,o=d.legPage,i=d.phoneNum,c=d.notes,g=d.createdAt,m=d.updatedAt,l=d.grades,s=d.party,console.log(typeof g),l=l.map(function(e,t){return C.a.createElement("li",{key:e.type},e.type,": ",C.a.createElement("input",{type:"text",id:e.type,"data-i":t,value:e.grade,onChange:u.onGradeChange}))})}return C.a.createElement(C.a.Fragment,null,C.a.createElement("div",null,"first name: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"firstName",value:e})),C.a.createElement("div",null,"last name: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"lastName",value:t})),C.a.createElement("div",null,"party: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"party",value:s})),C.a.createElement("div",null,"session: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"session",value:n})),C.a.createElement("div",null,"title: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"title",value:p.toLowerCase()})),C.a.createElement("div",null,"district: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"district",value:a})),C.a.createElement("div",null,"email: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"email",value:r})),C.a.createElement("div",null,"legislator webapage: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"legPage",value:o})),C.a.createElement("div",null,"phone number: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"phoneNum",value:i})),C.a.createElement("div",null,"grades:",C.a.createElement("ul",null,l)),C.a.createElement("div",null,"notes: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"notes",value:c})),this.props.LegStore.current.id&&C.a.createElement(C.a.Fragment,null,C.a.createElement("div",null,"created: ",new Date(g).toLocaleDateString()),C.a.createElement("div",null,"updatedAt: ",new Date(m).toLocaleDateString()),C.a.createElement("button",{onClick:this.update},"update")))}}]),t}(y.Component))||v)||v,_=Object($.b)("LegStore")(E=Object($.c)(E=function(e){function t(e){var n;return Object(x.a)(this,t),(n=Object(U.a)(this,Object(D.a)(t).call(this,e))).update=Object(w.a)(S.a.mark(function e(){return S.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n.props.LegStore.updateLeg(n.state);case 2:n.props.history.push("/leg");case 3:case"end":return e.stop()}},e)})),n.onChange=function(e){"title"===e.target.id&&n.setState({title:e.target.value.toUpperCase()}),n.setState(Object(k.a)({},e.target.id,e.target.value))},n.onGradeChange=function(e){var t=n.state.grades.slice();t[e.target.dataset.i]={type:e.target.id,grade:e.target.value.toUpperCase().substring(0,1)},n.setState({grades:t})},n.state={id:0,fullName:n.props.LegStore.current.fullName,firstName:n.props.LegStore.current.firstName,middleName:n.props.LegStore.current.middleName,party:n.props.LegStore.current.party,imgLink:n.props.LegStore.current.imgLink,lastName:n.props.LegStore.current.lastName,title:n.props.LegStore.current.title,session:n.props.LegStore.current.session,district:n.props.LegStore.current.district,email:n.props.LegStore.current.email,legPage:n.props.LegStore.current.legPage,phoneNum:n.props.LegStore.current.phoneNum,notes:n.props.LegStore.current.notes,createdAt:n.props.LegStore.current.createdAt,updatedAt:n.props.LegStore.current.updatedAt,grades:n.props.LegStore.current.grades},n}return Object(A.a)(t,e),Object(N.a)(t,[{key:"render",value:function(){var e,t,n,a,r,o,i,c,l,s,u=this,p="",g="",m="";if(this.props.LegStore.current.id){var d=this.state;e=d.firstName,t=d.lastName,p=d.title,n=d.session,a=d.district,r=d.email,o=d.legPage,i=d.phoneNum,c=d.notes,g=d.createdAt,m=d.updatedAt,l=d.grades,s=d.party,console.log(typeof g),l=l.map(function(e,t){return C.a.createElement("li",{key:e.type},e.type,": ",C.a.createElement("input",{type:"text",id:e.type,"data-i":t,value:e.grade,onChange:u.onGradeChange}))})}return C.a.createElement(C.a.Fragment,null,C.a.createElement("div",null,"first name: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"firstName",value:e})),C.a.createElement("div",null,"last name: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"lastName",value:t})),C.a.createElement("div",null,"party: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"party",value:s})),C.a.createElement("div",null,"session: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"session",value:n})),C.a.createElement("div",null,"title: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"title",value:p.toLowerCase()})),C.a.createElement("div",null,"district: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"district",value:a})),C.a.createElement("div",null,"email: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"email",value:r})),C.a.createElement("div",null,"legislator webapage: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"legPage",value:o})),C.a.createElement("div",null,"phone number: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"phoneNum",value:i})),C.a.createElement("div",null,"grades:",C.a.createElement("ul",null,l)),C.a.createElement("div",null,"notes: ",C.a.createElement("input",{type:"text",onChange:this.onChange,id:"notes",value:c})),this.props.LegStore.current.id&&C.a.createElement(C.a.Fragment,null,C.a.createElement("div",null,"created: ",new Date(g).toLocaleDateString()),C.a.createElement("div",null,"updatedAt: ",new Date(m).toLocaleDateString()),C.a.createElement("button",{onClick:this.update},"update")))}}]),t}(y.Component))||E)||E,ee=function(e){function t(){return Object(x.a)(this,t),Object(U.a)(this,Object(D.a)(t).apply(this,arguments))}return Object(A.a)(t,e),t}(y.Component),te=function(){return C.a.createElement($.a,R,C.a.createElement(T.a,null,C.a.createElement(W.a,{component:q}),C.a.createElement(W.c,null,C.a.createElement(W.a,{exact:!0,path:"/",component:H}),C.a.createElement(W.a,{path:"/test",component:K}),C.a.createElement(W.a,{exact:!0,path:"/new",component:Q}),C.a.createElement(W.a,{path:"/new/confirmation",component:V}),C.a.createElement(W.a,{exact:!0,path:"/leg",component:Y}),C.a.createElement(W.a,{path:"/leg/update",component:Z}),C.a.createElement(W.a,{path:"/leg/new",component:_}),C.a.createElement(W.a,{path:"/leg/search",component:ee}),C.a.createElement(W.a,{component:X}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));j.a.render(C.a.createElement(te,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[40,1,2]]]);
//# sourceMappingURL=main.83978a94.chunk.js.map