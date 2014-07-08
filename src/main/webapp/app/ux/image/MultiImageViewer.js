/*
Copyright 2013 Jonas Amundsen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
Ext.define('MyApp.ux.image.MultiImageViewer', {
    extend: 'MyApp.ux.image.ImageViewer',
    alias : 'widget.multiImageViewer',
    requires: ['Ext.XTemplate'],

    config: {
        currentImage: 0,
        imageCount: 0,
        sources: null
    },

    initComponent: function () {
        var me = this;

        me.setSources(me.src);
        me.setImageCount(me.src.length);

        me.currentImageTemplate = me.currentImageTemplate || 'Viewing image {i} out of {total}';
        me.currentImage = 0;
        me.src = me.src[0];

        me.on('beforerender', me.insertPageUI, me);

        me.callParent();
    },

    insertPageUI: function () {
        var me = this,
            toolbar = this.down('toolbar');

        toolbar.add([{
            xtype: 'tbfill'
        }, {
            xtype: 'button',
            icon: 'css/images/resultset_previous.png',
            listeners: { click: me.previousImage, scope: me }
        }, {
            xtype: 'tbtext'
        }, {
            xtype: 'button',
            icon: 'css/images/resultset_next.png',
            listeners: { click: me.nextImage, scope: me }
        }]);

        me.updateImageText();
    },

    nextImage: function () {
        var me = this,
            index = this.getCurrentImage();

        index += 1;

        if (index === me.getImageCount()) {
            index = 0;
        }

        me.setCurrentImage(index);
        me.updateImageText();
    },

    previousImage: function () {
        var me = this,
            index = this.getCurrentImage();

        index -= 1;

        if (index < 0) {
            index = me.getImageCount() - 1;
        }

        me.setCurrentImage(index);
        me.updateImageText();
    },

    applyCurrentImage: function (index) {
        var me = this;

        me.getImage().el.dom.src = me.getSources()[index];

        return index;
    },

    updateImageText: function () {
        var me = this,
            tpl = new Ext.XTemplate(me.currentImageTemplate);

        me.down('toolbar').down('tbtext').setText(tpl.apply({
            i: me.getCurrentImage() + 1,
            total: me.getImageCount()
        }));
    },

    _isCurrentImageInitialized: function () {
        return true;
    }
});