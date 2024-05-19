sap.ui.require(["sap/ui/Device","sap/ui/test/Opa5","sap/ui/test/matchers/AggregationLengthEquals","sap/ui/test/matchers/PropertyStrictEquals","sap/ui/test/matchers/Properties","sap/ui/test/actions/EnterText","sap/ui/test/actions/Press"],(e,t,s,r,o,i,a)=>{"use strict";const n="sap.ui.demo.todo.view.App";const c="addTodoItemInput";const m="searchTodoItemsInput";const h="todoList";const g=e.browser.mobile?"toolbar-footer":"toolbar";const l=e.browser.mobile?"clearCompleted-footer":"clearCompleted";t.createPageObjects({onTheAppPage:{actions:{iEnterTextForNewItemAndPressEnter(e){return this.waitFor({id:c,viewName:n,actions:[new i({text:e})],errorMessage:"The text cannot be entered"})},iEnterTextForSearchAndPressEnter(e){this._waitForToolbar();return this.waitFor({id:m,viewName:n,actions:[new i({text:e})],errorMessage:"The text cannot be entered"})},iSelectTheLastItem(e){return this.waitFor({id:h,viewName:n,actions:[t=>{const s=t.getItems().length;const r=t.getItems()[s-1].getContent()[0].getItems()[0];this._triggerCheckboxSelection(r,e)}],errorMessage:"Last checkbox cannot be pressed"})},iSelectAllItems(e){return this.waitFor({id:h,viewName:n,actions:[t=>{t.getItems().forEach(t=>{const s=t.getContent()[0].getItems()[0];this._triggerCheckboxSelection(s,e)})}],errorMessage:"checkbox cannot be pressed"})},_triggerCheckboxSelection(e,t){if(e.getSelected()&&!t||!e.getSelected()&&t){const t=new a;t.controlAdapters["sap.m.CustomListItem"]="selectMulti-CB";t.executeOn(e)}},iClearTheCompletedItems(){this._waitForToolbar();return this.waitFor({id:l,viewName:n,actions:[new a],errorMessage:"checkbox cannot be pressed"})},iFilterForItems(e){this._waitForToolbar();return this.waitFor({viewName:n,controlType:"sap.m.SegmentedButtonItem",matchers:[new o({key:e})],actions:[new a],errorMessage:"SegmentedButton can not be pressed"})},_waitForToolbar(){this.waitFor({id:g,viewName:n,success:e=>this.waitFor({controlType:"sap.m.ToggleButton",visible:false,success:s=>{const r=s.find(t=>t.getId().startsWith(e.getId())&&t.getParent()===e);if(r){this.waitFor({id:r.getId(),actions:new a})}else{t.assert.ok(true,"The overflow toggle button is not present")}}})})}},assertions:{iShouldSeeTheItemBeingAdded(e,o){return this.waitFor({id:h,viewName:n,matchers:[new s({name:"items",length:e}),e=>{const t=e.getItems().length;const s=e.getItems()[t-1].getContent()[0].getItems()[1].getItems()[0];return new r({name:"text",value:o}).isMatching(s)}],success(){t.assert.ok(true,"The table has "+e+" item(s), with '"+o+"' as last item")},errorMessage:"List does not have expected entry '"+o+"'."})},iShouldSeeTheLastItemBeingCompleted(e){return this.waitFor({id:h,viewName:n,matchers:[t=>{const s=t.getItems().length;const r=t.getItems()[s-1].getContent()[0].getItems()[0];return e&&r.getSelected()||!e&&!r.getSelected()}],success(){t.assert.ok(true,"The last item is marked as completed")},errorMessage:"The last item is not disabled."})},iShouldSeeAllButOneItemBeingRemoved(e){return this.waitFor({id:h,viewName:n,matchers:[new s({name:"items",length:1}),t=>{const s=t.getItems()[0].getContent()[0].getItems()[1].getItems()[0];return new r({name:"text",value:e}).isMatching(s)}],success(){t.assert.ok(true,"The table has 1 item, with '"+e+"' as Last item")},errorMessage:"List does not have expected entry '"+e+"'."})},iShouldSeeItemCount(e){return this.waitFor({id:h,viewName:n,matchers:[new s({name:"items",length:e})],success(){t.assert.ok(true,"The table has "+e+" item(s)")},errorMessage:"List does not have expected number of items '"+e+"'."})}}}})});
//# sourceMappingURL=App.js.map