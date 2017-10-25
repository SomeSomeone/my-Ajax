
var ajax = function(params) {

    this.url = params.url
    this.data = params.data || {}
    this.method = params.method || "GET"
    this.header = params.header || {}
    this.dataType = params.dataType || "text"
    this.username = params.username || ""
    this.password = params.password || ""

    this.beforeSend = params.beforeSend || (function() {})
    this.onComplete = params.complete || (function() {})
    this.onSuccess = params.success || (function() {})
    this.onError = params.error || (function() {})

    this.async = !(params.async === false)
    this.global = !!params.global




    var processingResponseByDataType = {
        "text": (data) => { return data },
        "html": (data) => { return data },
        "xml": (data) => {
            var parser = new DOMParser();
            return parser.parseFromString(data, "text/xml")
        },
        "json": (data) => { return JSON.parse(data) },
        "script": (data) => { return (new Function(data)()) }, //need check
        "text": (data) => { return data },
    }

	var getXmlHttp = ()=>{
	  let xmlhttp;
	  try {
	    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	  } catch (e) {
	    try {
	      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	    } catch (E) {
	      xmlhttp = false;
	    }
	  }
	  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
	    xmlhttp = new XMLHttpRequest();
	  }
	  return xmlhttp;
	}

    var responseProcessing = (response) => {
        return (processingResponseByDataType[this.dataType] || ((data) => { return data }))(response)
    }
    var paramsProcessing = () => {
        let params = ""
        let params_get = ""
        let params_post = ""
        for (let key in this.data) {
            if (params != "") { params += "&" }
            params += encodeURIComponent(key) + "=" + encodeURIComponent(this.data[key])
        }

        if (this.method != "GET") {
            params_post = params
        } else {
            if (params != "") {
                if (this.url.indexOf("?") >= 0) {
                    if (this.url[-1] != "?" ) {
                        params = "&" + params
                    }
                } else {
                    params = "?" + params
                }
            }
            params_get = params
        }


        return { params_get, params_post }
    }
    var headerProcessing = () => {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        for (let key in this.header)
            xhr.setRequestHeader(key, this.header[key])
    }
    var generateEvent = (name) => {
        if (this.global) document.dispatchEvent(new Event(name))
    }


    generateEvent("startAjax")
    this.beforeSend()
    var xhr = getXmlHttp();
    var { params_get, params_post } = paramsProcessing()
    xhr.open(this.method, this.url + params_get, this.async, this.username, this.password);
    headerProcessing()
    xhr.send(params_post);

    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        this.status = xhr.status
        if (this.status >= 200 && this.status < 300) {
            this.response = responseProcessing(xhr.responseText)
            this.onSuccess(this.status, this.response)
        } else {
            this.onError(this.status, this.response)
        }
        this.onComplete(this.status, this.response)

        generateEvent("endAjax")
    }

}
export {ajax}