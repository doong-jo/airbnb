import _ from "../services/constants";
import { getOriginUrl } from "./light-dom.js";

/**
 * data를 서버에 요청하고 응답받는다.
 *
 * @param {string} [method='GET'] 요청 메소드
 * @param {object} [data={}] 요청 데이터
 * @param {string} [url=''] 서버 url
 * @param {object} [headers = { "Content-Type": "application/json" }] 요청 헤더
 */
export async function requestServer(
    method = "GET",
    data = {},
    url = "",
    headers = { "Content-Type": "application/json" }
) {
    let targetURL = url;
    const fetchOptions = {};
    fetchOptions.method = method;
    fetchOptions.headers = headers;

    if (fetchOptions.method === _.METHOD.POST) {
        fetchOptions.body = JSON.stringify(data);
    } else if (fetchOptions.method === _.METHOD.GET) {
        const getMethodUrl = new URL(url);
        getMethodUrl.search = new URLSearchParams(data);

        targetURL = getMethodUrl;
    }

    const responseData = await fetch(targetURL, fetchOptions);
    if (responseData.status === 200 || responseData.status === 201) {
        const response = await responseData.json();
        if (response) {
            return response;
        }
    } else {
        throw new Error("fail requestServer : (status isn't success code)");
    }
}

export async function fetchData(dataUrl) {
    let resultData;

    try {
        resultData = await requestServer(
            _.METHOD.GET,
            {},
            `${getOriginUrl()}${dataUrl}`,
            _.HEADER_TYPE_JSON
        );
    } catch (e) {
        console.error(e.message);
        return;
    }

    return resultData;
}

export function watchPageVisibility(visibleFunc, inVisibleFunc) {
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") {
        // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
        visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
        hidden = "msHidden";
        visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
        hidden = "webkitHidden";
        visibilityChange = "webkitvisibilitychange";
    }

    function handleVisibilityChange() {
        if (document[hidden]) {
            inVisibleFunc();
        } else {
            visibleFunc();
        }
    }

    if (typeof document[hidden] === "undefined") {
        console.log(
            "This page requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
        );
    } else {
        document.addEventListener(
            visibilityChange,
            handleVisibilityChange,
            false
        );
    }
}
