"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[983],{9983:(x,a,s)=>{s.r(a),s.d(a,{OwnerModule:()=>v});var l=s(6814),r=s(8642),t=s(5879);let c=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-home"]],decls:2,vars:0,consts:[[1,"body-container"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0),t._UZ(1,"router-outlet"),t.qZA())},dependencies:[r.lC],styles:[".body-container[_ngcontent-%COMP%]{height:90vh}"]}),n})();var p=s(9862);function u(n,e){1&n&&(t.TgZ(0,"div",3)(1,"div",4)(2,"span",5),t._uU(3,"Loading..."),t.qZA()()())}function h(n,e){if(1&n&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&n){const o=e.$implicit;t.xp6(1),t.Oqu(o)}}function d(n,e){if(1&n&&(t.TgZ(0,"li"),t._uU(1),t.qZA()),2&n){const o=e.$implicit;t.xp6(1),t.Oqu(o)}}function m(n,e){if(1&n&&(t.TgZ(0,"li",6)(1,"div")(2,"strong"),t._uU(3,"Booking ID:"),t.qZA(),t._uU(4),t.qZA(),t.TgZ(5,"div")(6,"strong"),t._uU(7,"User:"),t.qZA(),t._uU(8),t.qZA(),t.TgZ(9,"div")(10,"strong"),t._uU(11,"Flight Number:"),t.qZA(),t._uU(12),t.qZA(),t.TgZ(13,"div")(14,"strong"),t._uU(15,"Passengers:"),t.qZA(),t.TgZ(16,"ul"),t.YNc(17,h,2,1,"li",7),t.qZA()(),t.TgZ(18,"div")(19,"strong"),t._uU(20,"Total Price:"),t.qZA(),t._uU(21),t.qZA(),t.TgZ(22,"div")(23,"strong"),t._uU(24,"Date:"),t.qZA(),t._uU(25),t.ALo(26,"date"),t.qZA(),t.TgZ(27,"div")(28,"strong"),t._uU(29,"Journey Date:"),t.qZA(),t._uU(30),t.ALo(31,"date"),t.qZA(),t.TgZ(32,"div")(33,"strong"),t._uU(34,"Seat Numbers:"),t.qZA(),t.TgZ(35,"ul"),t.YNc(36,d,2,1,"li",7),t.qZA()(),t.TgZ(37,"div")(38,"strong"),t._uU(39,"Baggage Options:"),t.qZA(),t._uU(40),t.qZA(),t.TgZ(41,"div")(42,"strong"),t._uU(43,"Payment Method:"),t.qZA(),t._uU(44),t.qZA()()),2&n){const o=e.$implicit;t.xp6(4),t.hij(" ",o._id," "),t.xp6(4),t.hij(" ",o.user," "),t.xp6(4),t.hij(" ",o.flight.flightNumber," "),t.xp6(5),t.Q6J("ngForOf",o.passengers),t.xp6(4),t.hij(" ",o.totalPrice," "),t.xp6(4),t.hij(" ",t.lcZ(26,10,o.date)," "),t.xp6(5),t.hij(" ",t.lcZ(31,12,o.journeyDate)," "),t.xp6(6),t.Q6J("ngForOf",o.seatNumbers),t.xp6(4),t.hij(" ",o.baggageOptions," "),t.xp6(4),t.hij(" ",o.paymentMethod," ")}}function Z(n,e){1&n&&(t.TgZ(0,"div",3)(1,"div",4)(2,"span",5),t._uU(3,"Loading..."),t.qZA()()())}function _(n,e){if(1&n&&(t.TgZ(0,"li")(1,"div",6)(2,"div",7)(3,"h5",8),t._uU(4),t.qZA(),t.TgZ(5,"p",9),t._uU(6),t.qZA(),t.TgZ(7,"p",9),t._uU(8),t.qZA(),t.TgZ(9,"p",9),t._uU(10),t.qZA()()()()),2&n){const o=e.$implicit;t.xp6(4),t.Oqu(o.airline),t.xp6(2),t.hij("Flight number: ",o.flightNumber,""),t.xp6(2),t.hij("Departure: ",o.origin,""),t.xp6(2),t.hij("Destination: ",o.destination,"")}}const A=[{path:"",component:c,children:[{path:"bookings",component:(()=>{class n{constructor(o){this.http=o,this.isLoading=!1,this.bookings=[],this.isLoading=!0;const i=localStorage.getItem("airline");this.http.get("http://localhost:5100/bookings").subscribe(g=>{this.bookings=g.filter(q=>q.flight.airline===i),this.isLoading=!1})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(p.eN))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-bookings"]],decls:5,vars:2,consts:[[1,"bookings-container","container","pt-4"],["class","text-center","style","margin-top: 150px;",4,"ngIf"],["class","card mb-4 p-4",4,"ngFor","ngForOf"],[1,"text-center",2,"margin-top","150px"],["role","status",1,"spinner-border"],[1,"sr-only"],[1,"card","mb-4","p-4"],[4,"ngFor","ngForOf"]],template:function(o,i){1&o&&(t.TgZ(0,"ul",0)(1,"h1"),t._uU(2,"Bookings"),t.qZA(),t.YNc(3,u,4,0,"div",1),t.YNc(4,m,45,14,"li",2),t.qZA()),2&o&&(t.xp6(3),t.Q6J("ngIf",i.isLoading),t.xp6(1),t.Q6J("ngForOf",i.bookings))},dependencies:[l.sg,l.O5,l.uU],styles:[".bookings-container[_ngcontent-%COMP%]{list-style-type:none;padding:40px;height:90vh;overflow:auto}"]}),n})()},{path:"flights",component:(()=>{class n{constructor(o){this.http=o,this.isLoading=!1,this.flights=[],this.isLoading=!0;const i=localStorage.getItem("airline");this.http.get(`http://localhost:5100/flights/airline/${i}`).subscribe(g=>{this.flights=g,this.isLoading=!1})}}return n.\u0275fac=function(o){return new(o||n)(t.Y36(p.eN))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-flights"]],decls:5,vars:2,consts:[[1,"flights-container","container"],["class","text-center","style","margin-top: 150px;",4,"ngIf"],[4,"ngFor","ngForOf"],[1,"text-center",2,"margin-top","150px"],["role","status",1,"spinner-border"],[1,"sr-only"],[1,"card","mb-4"],[1,"card-body"],[1,"card-title"],[1,"card-text"]],template:function(o,i){1&o&&(t.TgZ(0,"ul",0)(1,"h1"),t._uU(2,"Flights"),t.qZA(),t.YNc(3,Z,4,0,"div",1),t.YNc(4,_,11,4,"li",2),t.qZA()),2&o&&(t.xp6(3),t.Q6J("ngIf",i.isLoading),t.xp6(1),t.Q6J("ngForOf",i.flights))},dependencies:[l.sg,l.O5],styles:[".flights-container[_ngcontent-%COMP%]{list-style-type:none;padding:40px;height:90vh;overflow:auto}"]}),n})()},{path:"",redirectTo:"/owner/flights",pathMatch:"full"}]}];let T=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[r.Bz.forChild(A),r.Bz]}),n})(),v=(()=>{class n{}return n.\u0275fac=function(o){return new(o||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[l.ez,T]}),n})()}}]);