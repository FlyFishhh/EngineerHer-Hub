"use strict";(self.webpackChunkairbnb=self.webpackChunkairbnb||[]).push([[942],{4647:(e,n,i)=>{i.d(n,{A:()=>I});var s,t=i(5043),a=i(7528),l=i(4574);const o=l.Ay.div(s||(s=(0,a.A)(["\n  flex-shrink: 0;\n  box-sizing: border-box;\n  width: ",";\n  padding: 8px;\n\n  .inner {\n    width: 100%;\n    display: flex;\n    gap: 15px;\n    .top {\n      display: flex;\n      height:40px;\n      flex-direction: column;\n      justify-content: space-between;\n    }\n    }\n    .name {\n      // height:20px;\n      // line-heightx;20px;\n    }\n    .time {\n      // height:20px;\n      // line-heightx;20px;\n    }\n  }\n  .comment-action {\n    padding-left: 8px;\n    cursor: 'auto';\n    font-size:16px;\n  }\n  \n  [class*='-col-rtl'] .comment-action {\n    padding-right: 8px;\n    padding-left: 0;\n    font-size:16px;\n    \n  }\n  .anticon-heart{\n    font-size:16px;\n  }\n  .anticon-message{\n    font-size:16px;\n  }\n  .anticon-tag{\n    font-size:16px;\n  }\n\n  .ant-list-items {\n    margin: 0;\n    padding: 0;\n    list-style: none;\n    background-color: #fff;\n    border-radius: 10px;\n}\n"])),(e=>e.itemWidth));var r=i(7755),c=i(9380),d=i(3117),m=i(7506),x=i(5565),p=i(4435),h=i(5627),g=i(7569),u=i(9644),f=i(3689),j=i(9998),v=i(7602),y=i(3216),A=i(5995),w=i(579);const k=(0,t.memo)((e=>{var n;const i=(0,y.Zp)(),s=(0,y.zy)(),{searchTerm:a,handleSearchTermChange:l,handleProfile:k}=(0,t.useContext)(A.o),{itemData:b,itemWidth:N="25%"}=e,I=e=>{let{icon:n,text:i}=e;return(0,w.jsxs)(p.A,{children:[t.createElement(n),i]})};return(0,w.jsxs)(o,{verifyColor:(null===b||void 0===b||null===(n=b.verify_info)||void 0===n?void 0:n.text_color)||"#39576a",itemWidth:N,children:[(0,w.jsx)("div",{className:"inner",children:(0,w.jsx)("div",{style:{width:"100%"},children:(0,w.jsx)(g.Ay,{itemLayout:"vertical",size:"large",dataSource:b,renderItem:(e,n)=>(0,w.jsxs)(g.Ay.Item,{actions:[(0,w.jsx)("div",{onClick:()=>(async e=>{if(localStorage.getItem("token"))try{let n={id:e.postId,type:"like"};200===(await(0,v.nz)(n)).code&&(h.Ay.success("successful!"),"/home"===s.pathname?(l(""),i("/home",{state:{value:""}})):"/profile"===s.pathname?(k(""),i("/profile/",{state:{value:""}})):(k(""),i("/profile/"+e.userId,{state:{value:""}})))}catch(n){}else h.Ay.warning("Please log in first")})(e),children:(0,w.jsx)(I,{icon:"1"===e.likeFlag?r.A:c.A,text:e.likes},"list-vertical-star-o")}),(0,w.jsx)(I,{icon:d.A,text:e.comments},"list-vertical-like-o"),(0,w.jsxs)("div",{onClick:()=>(async e=>{if(localStorage.getItem("token"))try{let n={id:e.postId,type:"collection"};200===(await(0,v.nz)(n)).code&&(h.Ay.success("successful!"),"/home"===s.pathname?(l(""),i("/home",{state:{value:""}})):"/profile"===s.pathname?(k(""),i("/profile/",{state:{value:""}})):(k(""),i("/profile/"+e.userId,{state:{value:""}})))}catch(n){}else h.Ay.warning("Please log in first")})(e),children:[(0,w.jsx)(I,{icon:"1"===e.collectionFlag?m.A:x.A,text:e.collections},"list-vertical-message")," "]})],children:[(0,w.jsx)(g.Ay.Item.Meta,{avatar:(0,w.jsx)(u.A,{onClick:()=>{return n=e.userId,void(localStorage.getItem("token")?i("/profile/".concat(n)):h.Ay.warning("Please log in first"));var n},size:58,src:e.imgUrl}),title:e.name,description:e.createTime}),(0,w.jsxs)("div",{children:[(0,w.jsxs)("div",{onClick:()=>{return n=e.postId,void(localStorage.getItem("token")?i("/detail/".concat(n)):h.Ay.warning("Please log in first"));var n},children:[" ",e.content]}),(0,w.jsx)("div",{style:{width:"450px",marginTop:"20px"},children:e.images.map(((e,n)=>(0,w.jsx)(f.A,{width:150,height:150,src:e,preview:e},n)))})]})]},n)})})}),(0,w.jsx)(j.A,{})]})}));var b;const N=l.Ay.div(b||(b=(0,a.A)(["\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 -8px;\n"]))),I=(0,t.memo)((e=>{const{roomList:n,itemWidth:i}=e;return(0,w.jsxs)(N,{children:[(0,w.jsx)(k,{itemData:n,itemWidth:i}),";"]})}))},3942:(e,n,i)=>{i.r(n),i.d(n,{default:()=>k});var s,t=i(7528);const a=i(4574).Ay.div(s||(s=(0,t.A)(["\n  > .content {\n    width: 970px;\n    margin: 0 auto;\n\n    .userInfo {\n      margin-top: 30px;\n      display: flex;\n      gap: 50px;\n      align-items: center;\n      .rightinfo {\n        display: flex;\n        flex-direction: column;\n        justify-content: space-around;\n        height: 100px;\n\n        .name {\n          font-size: 24px;\n          font-weight: 600;\n        }\n\n        .count {\n          display: flex;\n          gap: 50px;\n          text-align: center;\n          .Following {\n            cursor: pointer;\n          }\n          .Followers {\n            cursor: pointer;\n          }\n        }\n      }\n    }\n\n    .desc {\n      margin-top: 30px;\n    }\n\n    .numbox{\n      position: relative;\n    }\n    .panel {\n      position: absolute;\n      top: 54px;\n      right: -75px;\n      width: 240px;\n      background-color: #fff;\n      border-radius: 10px;\n      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);\n      color: #666;\n      z-index: 10;\n\n      .top,\n      .bottom {\n        padding: 10px 0;\n\n        .item {\n          height: 40px;\n          line-height: 40px;\n          padding: 0 16px;\n          display: flex;\n          gap: 10px;\n\n          &:hover {\n            background-color: #f5f5f5;\n          }\n        }\n      }\n\n      .top {\n        border-bottom: 1px solid #ddd;\n      }\n    }\n  }\n"])));var l=i(5337),o=i(6558),r=i(289),c=i(5627),d=i(9644),m=i(1802),x=i(9998),p=i(1364),h=i(8366),g=i(151),u=i(4647),f=i(5043),j=i(3216),v=i(5475),y=i(7602),A=i(5995),w=i(579);const k=(0,f.memo)((()=>{const{handleProfile:e}=(0,f.useContext)(A.o),{TextArea:n}=o.A,[i,s]=(0,f.useState)({}),[t,k]=(0,f.useState)(!1),{id:b}=(0,j.g)(),[N]=r.A.useForm(),[I,C]=(0,f.useState)([]),S=async()=>{try{if(b){const e=await(0,y.lC)(b);if(200===e.code){s(e.data);let n=[{label:"Posts",key:1,children:(0,w.jsx)(u.A,{roomList:e.data.postList,itemWidth:"100%"})},{label:"Bookmarks",key:2,children:(0,w.jsx)(u.A,{roomList:e.data.collectionList,itemWidth:"100%"})}];C(n)}}else{let e=JSON.parse(localStorage.getItem("userInfo")).id;const n=await(0,y.lC)(e);if(200===n.code){s(n.data);let e=[{label:"Posts",key:1,children:(0,w.jsx)(u.A,{roomList:n.data.postList,itemWidth:"100%"})},{label:"Bookmarks",key:2,children:(0,w.jsx)(u.A,{roomList:n.data.collectionList,itemWidth:"100%"})}];C(e)}}}catch(e){console.log(e)}},[z,L]=(0,f.useState)(!1),[P,U]=(0,f.useState)(!1);return(0,f.useEffect)((()=>{function e(){L(!1),U(!1)}return S(),window.addEventListener("click",e,!0),()=>{window.removeEventListener("click",e,!0)}}),[b,e]),(0,w.jsx)(a,{children:(0,w.jsxs)("div",{className:"content",children:[(0,w.jsxs)("div",{className:"userInfo",children:[(0,w.jsxs)("div",{children:[" ",(0,w.jsx)(d.A,{size:100,src:i.imgUrl})]}),(0,w.jsxs)("div",{className:"rightinfo",children:[(0,w.jsx)("div",{className:"name",children:i.name}),(0,w.jsxs)("div",{className:"count",children:[(0,w.jsxs)("div",{className:"Following",children:[(0,w.jsxs)("div",{className:"numbox",children:[(0,w.jsx)("span",{onClick:function(){L(!0)},children:i.focusNum}),z&&(0,w.jsx)("div",{className:"panel",children:(0,w.jsx)("div",{className:"top",children:i.focusList.map((e=>(0,w.jsx)(v.N_,{to:"/profile/"+e.id,children:(0,w.jsxs)("div",{className:"item",children:[(0,w.jsx)("div",{children:(0,w.jsx)(d.A,{size:28,children:"User"})}),(0,w.jsx)("div",{children:e.name})]})},e.id)))})})]}),(0,w.jsx)("div",{children:"Following"})]}),(0,w.jsxs)("div",{className:"Following",children:[(0,w.jsxs)("div",{className:"numbox",children:[(0,w.jsx)("span",{onClick:function(){U(!0)},children:i.fansNum}),P&&(0,w.jsx)("div",{className:"panel",children:(0,w.jsx)("div",{className:"top",children:i.fansList.map((e=>(0,w.jsx)(v.N_,{to:"/profile/"+e.id,children:(0,w.jsxs)("div",{className:"item",children:[(0,w.jsx)("div",{children:(0,w.jsx)(d.A,{size:28,children:"User"})}),(0,w.jsx)("div",{children:e.name})]})})))})})]}),(0,w.jsx)("div",{children:"Followers"})]})]})]}),(0,w.jsx)("div",{children:localStorage.getItem("token")==i.id?(0,w.jsx)(m.A,{type:"primary",onClick:()=>{k(!0)},children:"Edit Profile"}):(0,w.jsxs)("div",{children:[(0,w.jsx)(m.A,{type:"primary",onClick:async()=>{try{if(b){200===(await(0,y.XC)({id:b})).code&&(c.Ay.success("successful"),S())}}catch(e){console.log(e)}},children:i.focusFlag?"Unfollow":"Follow"}),(0,w.jsx)(v.N_,{to:"/messagesDetail/"+b,children:(0,w.jsx)(m.A,{style:{marginLeft:"15px"},type:"primary",children:"Send Message"})})]})})]}),(0,w.jsx)("div",{className:"desc",children:i.remark}),(0,w.jsx)(x.A,{}),(0,w.jsx)(p.A,{items:I}),(0,w.jsx)(h.A,{title:"Edit UserInfo",onCancel:()=>{k(!1)},open:t,footer:null,children:(0,w.jsxs)(r.A,{form:N,layout:"vertical",labelCol:{span:6},wrapperCol:{span:18},onFinish:async e=>{console.log(e);let n={id:JSON.parse(localStorage.getItem("userInfo")).id};if(e.name&&(n.name=e.name),e.password&&(n.password=e.password),e.remark&&(n.remark=e.remark),e.imgUrl){const i=e.imgUrl.fileList.map((e=>e.response.data));n.imgUrl=i}200===(await(0,y.f8)(n)).code&&(c.Ay.success("successful!"),k(!1),S())},children:[(0,w.jsx)(r.A.Item,{label:"Avatar",name:"imgUrl",children:(0,w.jsx)(g.A,{action:"http://agbgxw.natappfree.cc/user/upload",listType:"picture-card",maxCount:1,children:(0,w.jsxs)("div",{children:[(0,w.jsx)(l.A,{}),(0,w.jsx)("div",{style:{marginTop:8},children:"Upload"})]})})}),(0,w.jsx)(r.A.Item,{label:"UserName",name:"name",children:(0,w.jsx)(o.A,{placeholder:"Your UserName"})}),(0,w.jsx)(r.A.Item,{label:"Password",name:"password",children:(0,w.jsx)(o.A.Password,{placeholder:"New Password"})}),(0,w.jsx)(r.A.Item,{label:"",name:"remark",children:(0,w.jsx)(n,{rows:4,placeholder:"Your Personal signature"})}),(0,w.jsx)(r.A.Item,{children:(0,w.jsx)(m.A,{type:"primary",htmlType:"submit",className:"login-form-button",children:"Submit"})})]})})]})})}))}}]);
//# sourceMappingURL=942.0deb92e0.chunk.js.map