var assert = require('assert');

global.XMLHttpRequest = require('node-http-xhr');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;


var { document } = (new JSDOM(`...`)).window;
var window = document.defaultView;

global.document = document

global.Event = window.Event;

import { ajax } from "../src/ajax"

describe('Ajax', function() {

    describe("events", function() {
        it("beforeSend must work", function(done) {
            new ajax({ url: "http://httpbin.org/get", method: "GET", beforeSend: () => { done() } })
        })
        it("success must work", function(done) {
            new ajax({ url: "http://httpbin.org/get", method: "GET", success: () => { done() } })
        })
        it("error must work", function(done) {
            new ajax({ url: "http://httpbin.org/geteee", method: "GET", error: () => { done() } })
        })
        it("complete must work after success", function(done) {
            new ajax({ url: "http://httpbin.org/get", method: "GET", complete: () => { done() } })
        })
        it("complete must work after error", function(done) {
            new ajax({ url: "http://httpbin.org/getee", method: "GET", complete: () => { done() } })
        })
    })

    describe("url", function() {
        it("url must work", function(done) {
            new ajax({ url: "http://httpbin.org/get", method: "GET", success: () => { done() } })
        })
        it("empty url must no work ", function(done) {
            try {
                new ajax({ url: "", method: "GET" })
            } catch (err) {
                done()
            }
        })
    })

    describe("global events", function() {
    	it("start Ajax must work", function(done) {
			document.addEventListener('startAjax', (done()));
            new ajax({ url: "http://httpbin.org/get", method: "GET", global:true})
    	})
    	it("end Ajax must work", function(done) {
			document.addEventListener('endAjax', (done() ));
            new ajax({ url: "http://httpbin.org/get", method: "GET", global:true})
    	})
    })

    describe("method", function() {
        it("GET must work", function(done) {
            new ajax({ url: "http://httpbin.org/get", method: "GET", success: () => { done() } })
        })
        it("POST must work", function(done) {
            new ajax({ url: "http://httpbin.org/post", method: "POST", success: () => { done() } })
        })
    })

    describe("header", function() {
    	it("Can set custom header", function(done) {
            new ajax({
                        header: { one: "two" },
                        url: "http://httpbin.org/get",
                        method: "GET",
                        dataType: "json",
                        success: (status, data) => {
                            if (data.headers.One == "two") { done() }
                        }})
        })
    })

    describe("data", function() {
        it("data in GET must send", function(done) {
            var data = {
                "one": "two"
            }
            new ajax({
                data: data,
                url: "http://httpbin.org/get",
                method: "GET",
                dataType: "json",
                success: (status, data1) => {
                    if (data["one"] == data1.args["one"]) done()
                }
            })
        })
        it("data in GET in URL also work", function(done) {
            var data = {
                "one": "two"
            }
            new ajax({
                data: data,
                url: "http://httpbin.org/get?second=two",
                method: "GET",
                dataType: "json",
                success: (status, data1) => {
                    if (data["one"] == data1.args["one"] && data1.args["second"] == "two") done()
                }
            })
        })
        it("data in POST must work", function(done) {
            var data = {
                one: "two"
            }
            new ajax({
                data: data,
                url: "http://httpbin.org/post",
                method: "POST",
                dataType: "json",
                header:{"Content-Length":7},
                success: (status, data1) => {
                    if (data["one"] == data1.form["one"]) done()
                },
                error(status) {
                    done(status)
                }
            })
        })
    })
})