export function $$(selector) {
    return document.querySelector(selector);
}

export function $$$(selector) {
    return document.querySelectorAll(selector);
}

export function findChild(el, selector) {
    const child = el.querySelector(selector);
    return child;
}

export function findChildren(el, selector) {
    const children = el.querySelectorAll(selector);
    return children;
}

export function addClass(el, className) {
    const { classList } = el;
    classList.add(className);
}
export function removeClass(el, className) {
    const { classList } = el;
    classList.remove(className);
}

export function containClass(el, className) {
    const { classList } = el;
    const contains = classList.contains(className);
    return contains;
}

export function replaceHref(href) {
    document.location.href = href;
}

export function create(tagName) {
    const el = document.createElement(tagName);
    return el;
}

export function onAll(elArr, eventName, fn) {
    for (const el of elArr) {
        el.addEventListener(eventName, fn);
    }
}

export function on(el, eventName, fn) {
    el.addEventListener(eventName, fn);
}

export function off(el, action, fn) {
    el.removeEventListener(action, fn);
}

export function setStyle(el, proptName, proptVal) {
    el.style[proptName] = proptVal;
}

export function hasAttribute(el, attr) {
    return el.hasAttribute(attr);
}

export function getAttribute(el, attr) {
    return el.getAttribute(attr);
}

export function setAttribute(el, attr, val) {
    el.setAttribute(attr, val);
}

export function removeAttribute(el, attr) {
    el.removeAttribute(attr);
}

export function setHTML(el, html) {
    el.innerHTML = html;
}

export function getOriginUrl() {
    return document.location.origin;
}

export function getIndexOfNodeList(nodelist, targetElement) {
    return [...nodelist].indexOf(targetElement);
}

/**
 * url을 수정해 페이지를 이동시킨다.
 *
 * @param {string} hash
 */
export function goToPage(hash) {
    document.location.href = hash;
}
