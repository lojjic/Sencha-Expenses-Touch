/*
 * File: app/view/ListPanel.js
 * Date: Sun Oct 23 2011 11:17:57 GMT-0500 (CDT)
 *
 * This file was generated by Sencha Designer version 2.0.0.
 * http://www.sencha.com/products/designer/
 *
 * This file will be generated the first time you export.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

Ext.define('MyApp.view.ListPanel', {
    extend: 'MyApp.view.ui.ListPanel',
    alias: 'widget.listpanel',

    initialize: function() {
        var me = this;
        me.callParent(arguments);
    },

    onSwitchToAddTap: function(button, e, options) {
        button.up('#mainPanel').setActiveItem(1);
    },

    onListPainted: function(component, options) {
        // Create Model
        Ext.define('Expense', {
            extend: "Ext.data.Model",
            fields: [
            {name: 'username', type: 'string'},
            {name: 'merchant', type: 'string'},
            {name: 'category', type: 'string'},
            {name: 'amount', type: 'int'},
            {name: 'timestamp',type: 'date'}
            ],
            proxy: {
                id: 'expenseDB', //Uses new user/timestamp
                type: 'syncstorage',
                key: 'expense'
            }
        });
        
        // Create store and assign to List
        var store = Ext.create('Ext.data.Store', {
            model: 'Expense',
            sorters: [ {
                property: 'timestamp',
                direction: 'DESC'
            } ],
            autoLoad: true
        });
        component.setStore(store);
        
        // Sync IO Setup
        Ext.io.setup({key: "expense"});
        Ext.io.init();
        
        // Sync data from localstorage
        store.sync();
    }

});