var list = require('../../data/word-list.js')

Page({
    data: {
    },
    onLoad: function (options) {

        var idx = Math.floor(Math.random() * 499) + 1
        var word = list.wordList[idx]    
    
        this.setData({
            content: word.content,
            pron: word.pron,
            definition: word.definition,
            audio: word.audio
        })

    },
    show: function () {
        this.setData({
            showNot: true
        })
    },

    next: function () {
        this.setData({
            showNot: false
        })
        var idx = Math.floor(Math.random() * 499) + 1
        var word = list.wordList[idx]    
    
        this.setData({
            content: word.content,
            pron: word.pron,
            definition: word.definition,
            audio: word.audio
        })

        // var that = this;
        // wx.request({
        //     url: 'https://api.shanbay.com/bdc/search/?word=' + word,
        //     data: {},
        //     method: 'GET',
        //     success: function (res) {
        //         console.log(res)
        //         that.setData({
        //             content: res.data.data.content,
        //             audio: res.data.data.audio_addresses.us[0],
        //             pron: res.data.data.pron,
        //             definition: res.data.data.definition
        //         })
        //         // wx.downloadFile({
        //         //     url: res.data.data.audio_addresses.us[0], 
        //         //     success: function (res) {
        //         //         wx.playVoice({
        //         //             filePath: res.tempFilePath
        //         //         })
        //         //     }
        //         // })
        //     },
        //     fail: function () {
        //     },
        //     complete: function () {
        //     }
        // })
    },
    read: function () {
        console.log(this.data.audio)
        wx.playVoice({
            filePath: this.data.audio,
            success: function (res) {
                console.log('ok')
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        })
    }
})