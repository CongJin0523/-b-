// ==UserScript==
// @name         Remove Short Videos in bilibili
// @namespace    http://tampermonkey.net/
// @version      2024-12-20
// @description  去除b站推荐列表里面短于3分钟的视频，完全无法理解b站的推荐策略，看短视频我为什么不去刷抖音
// @author       Cong Jin
// @match        https://www.bilibili.com/video*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=bilibili.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const targetNode = document.querySelector('.rec-footer');
    const config = {characterData: true, attributes: true, subtree: true};
    const observer = new MutationObserver((mutationList, observer) => {
        setTimeout(() => {
            console.log(`Remove short video`);
            removeShortVideoAndAd();
        }, 3000);

    });
    observer.observe(targetNode, config);


    const videoElement = document.querySelector('video');
    const observer2 = new MutationObserver((mutationsList, observer) => {
            setTimeout(() => {
            console.log(`Remove short video1`);
            removeShortVideoAndAd();
        }, 3000);
    });
    observer2.observe(videoElement, {attributes: true, attributeFilter: ['src']});
})();


function removeShortVideoAndAd() {
    const videoCards = document.querySelectorAll('.video-page-card-small');
    videoCards.forEach((card) => {

        // Find the child element with the class "duration"
        const durationElement = card.querySelector('.duration');
        if (durationElement) {
            const textContent = durationElement.textContent.trim();
            const timeParts = textContent.split(':');
            if (timeParts.length === 2) {
                const minutes = parseInt(timeParts[0], 10);
                const seconds = parseInt(timeParts[1], 10);
                const totalSeconds = minutes * 60 + seconds;
                // 在这里修改你喜欢的时长
                if (totalSeconds < 360) {
                    card.remove();
                }
            }
        }
    })
    document.querySelectorAll('.video-page-special-card-small').forEach((card) => card.remove());
    // remove the ai 小助手
    setTimeout(() => {
        if (document.querySelector('.video-ai-assistant')) {
            document.querySelector('.video-ai-assistant').remove();
        }
        // remove the action show below the video
        document.querySelectorAll('.act-now').forEach((e) => e.remove())

        if (document.querySelector('.act-end')) {
            document.querySelector('.act-end').remove();
        }

        // remove the recommendation showed end of player
        if (document.querySelector('.bpx-player-ending-wrap')){
            document.querySelector('.bpx-player-ending-wrap').remove();
        }
        }, 500);

    ;
}


