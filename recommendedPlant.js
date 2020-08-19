'use strict';
const userNameInput = document.getElementById('user-name');　//constは一度代入すると再代入できない宣言。
const recommendedPlantButton = document.getElementById('recommendedPlant');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

function removeAllChildren(element){
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}
recommendedPlantButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {　//名前が空の時は処理を終了。
        return;
    }
    
    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = 'お名前と性格に基づくおすすめ植物';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = recommendedPlant(userName);　//resultは配列。0：診断結果文、1：画像表示のためのindex番号。
    paragraph.innerText = result[0];
    resultDivided.appendChild(paragraph);

    const img = document.createElement('img');
    const index = result[1];
    img.src = images[index]
    resultDivided.appendChild(img);


    // ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたにおすすめの植物') +
        '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-text', result[0]);
    anchor.innerText = 'Tweet #あなたにおすすめの植物';
    anchor.setAttribute('data-image', result[1]);

    tweetDivided.appendChild(anchor);

    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
       recommendedPlantButton.onclick();
    }
};

const answers = [
        '{userName}さんには、モンステラがおすすめです。メキメキと大きくなります。',
        '{userName}さんには、カシワバゴムノキが良いと思います。大きな葉っぱは頼り甲斐があります。',
        '{userName}さんには、ガジュマルがふさわしいです。生命力にあふれています。',
        '{userName}さんには、ポインセチアがお似合いです。毎日クリスマス感を味わえます。',
        '{userName}さんには、フィカスバーガンディをおすすめします。とにかく丈夫です。',
        '{userName}さんには、ポトスがよいのではないでしょうか。日を浴びるとするすると育ちます。',
        '{userName}さんには、フィカスベンガレンシスがぴったりです。まがった幹が良い感じです。'
];

var img = [];
const images = [
    img[0] = 'gh-pages/img0.jpg',
    img[1] = 'plant_pictures/img1.jpg',
    img[2] = 'plant_pictures/img2.jpg',
    img[3] = 'plant_pictures/img3.jpg',
    img[4] = 'https://kanoyumi.github.io/assessment/img4.jpg',
    img[5] = 'plant_pictures/img5.jpg',
    img[6] = 'plant_pictures/img6.jpg'
];

/**
 * 名前の文字列と選んだ性格を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前、性格
 * @return {string} 診断結果（画像も）
 */
function recommendedPlant(userName) {
 let sumOfCharCode = 0;
 for (let i =0; i < userName.length; i++) { //
     sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);　//userNameの全部の文字を、一文字ずつ文字コードに変換して,　足していく。
    
 }

 const index = sumOfCharCode % answers.length;
 let result = answers[index];
 
 // {userName}をユーザーの名前に置き換える。
　result = result.replace(/\{userName\}/g, userName);
　return [result, index]; //画像を表示させるためにindex番号が欲しい。
}






