'use strict';
const userNameInput = document.getElementById('user-name');　
//htmlに書いた、user-nameというidが付いたinput tagを、プログラムでいじれるようにする、という宣言。

const assessmentButton = document.getElementById('assessment');
//htmlに書いた、assessmentというidが付いたbutton tagを、プログラムでいじれるようにする、という宣言。

const resultDivided = document.getElementById('result-area');
//htmlに書いた、result-areaというidが付いたdiv tagを、プログラムでいじれるようにする、という宣言。

const tweetDivided = document.getElementById('tweet-area');
//htmlに書いた、tweet-areaというidが付いたdiv tagを、プログラムでいじれるようにする、という宣言。

/**
 * 指定した要素の子どもを全て削除する。引数で入力されたelementの中身を全部削除する。
 * @param {HTMLElement} elementとは、HTMLの要素のこと。（）内に入るのは、関数の引数。自分で設定できる。
 */
function removeALLChildren(element) {　
    while (element.firstChild) {
        // 子供の要素がある限り削除
        element.removeChild(element.firstChild);
    }
}



assessmentButton.onclick = () => {
//アロー関数。　”() =>" は　"function()"と同じ意味。
//assessmentButton.onclick = function() {　上記と同じ意味のコード。assessment buttonをクリックした時に、この関数を実行せよ。
//無名関数。関数名を省略できる。名前が無い関数は他では使えない。
 const userName = userNameInput.value;　
 //入力した名前（input tagが持っているvalueというプロパティの値、つまり入力した名前）を取ってくる。組み込み関数。
 if (userName.length === 0) {
　//if(!userName) { でも同様の意味
     //名前が空の時は、
     return;
     //戻り値無しでそこで処理を終了する。特定の処理の際、処理を終了させるような処理をガード句という。if,elseと使っても書ける。
     //returnの後に処理が書いてあってもそれは実行されない。
 }

/**
 * 以下のほうが上記よりもっとシンプル。
 * assessmentButton.onclick = () => {　ボタンをクリックすると、
 *   let userName = userNameInput.value;　入力された名前を取ってきて、
 *   if(!userName) {　名前がなかったら処理終了、
 *     return;
 * }
 * removeAllChildren(resultDivided);　名前が入力されていたら、初期化してから、
 * showAssessmentResult(resultDivided);　結果を表示する。
 * }
*/

 
//診断結果エリアの作成
removeALLChildren(resultDivided);　

/** result-areaというdivタグの中に何かタグがある限り（子供の要素があるかぎり）ループする。
 *   while (resultDivided.firstChild) {　//result-areaの中にある一番最初のタグを持ってくる。
 *   
 *   resultDivided.removeChild(resultDivided.firstChild); //そのタグを消します。
 *}
*/

//htmlの”result-area"というdivタグの中に”診断結果”という文字列を表示する。JSの中でh3タグを作る。
const header = document.createElement('h3'); //要素を作成する。要素を先に作ってから、中身（innerText)を設定できる。
header.innerText = '診断結果';　//内側のテキスト。タグの中に文字を設定する。
resultDivided.appendChild(header);　//div要素が親で、h3の見出しを子要素にする。result-areaにh3変数を設定。

const paragraph = document.createElement('p');　//pで段落要素を作成して、
const result = assessment(userName);　//以前作成したassessment関数で診断処理を実行。
paragraph.innerText = result;　//診断結果の文字列を作成し、
resultDivided.appendChild(paragraph);　//そのpタグ内の文字列として入れる。ここでもdiv要素の子要素としてpタグを追加している。
//文字を入れるときはhタグよりもpタグがおすすめ。適当な余白が確保されるから。

/**　以下の方がさらにシンプル。このresultは外から引数で持ってきてる。
 * function appendAssessmentResult(element, result) {
 * const h3 = document.createElement('h3');
 * h3.innerText = '診断結果';
 * element.appendChild(h3);
 * 
 * const p = document.createElement('p');
 * p.innerText = result;
 * element.appendChild(p);
 * }
*/



//ツイートエリアの作成
removeALLChildren(tweetDivided);
const anchor = document.createElement('a');

const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag=' +
  encodeURIComponent('あなたのいいところ') + 
//　hrefValue変数への代入時に日本語文字列ではなく、URIエンコードされた’あなたのいいところ’という文字列を結合している。
  '&ref_src=twsrc%5Etfw';

anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button'; //プロパティに値を設定している。class属性には専用のプロパティが用意されている。
// anchor.setAttribute('class', 'twitter-hashtag-button');とも書ける。
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #あなたのいいところ';
tweetDivided.appendChild(anchor);

//widgets.jsを動作させ、リンク部分をTwitterのボタンのような見た目にする。
const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};


const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号を取得して、それを足し合わせる。
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って、添字の数値を求める。
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    return result = result.replace(/{userName}/g, userName); 　
    return result;
}

/**console.log(assessment('太郎'));
*console.log(assessment('次郎'));
*console.log(assessment('太郎'));
*/

// test code
console.assert(
    assessment('太郎') ===
    '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    'The replace process is not correct.'
);

console.assert(
    assessment('太郎') ===　assessment('太郎'),
    'The replace process is not correct.'
);
