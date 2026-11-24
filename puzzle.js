/* ============================================
   puzzle.js — 三道审计题
   ============================================ */

var PUZZLES = [
  {
    tag:'Level 1 / 约瑟夫环',
    html:'<p><b>41 个人围成一圈，从 1 号开始循环报数。报到第 3 个人就当场淘汰，下一个人继续从 1 开始报数。</b></p>'+
         '<p>问：<b>最后留下来的那一个人，最开始站在几号位置？</b></p>',
    ph:'输入数字',
    check:function(v){ return v.trim()==='19'; },
    err:'位置不对，重新推。',
    btn:'提交'
  },
  {
    tag:'Level 2 / 生日博弈',
    html:'<p><b>小明和小红都是学生，老师把自己的生日 M 月 N 日的 M 值告诉小明，N 值告诉小红，给出 10 个候选日期：</b></p>'+
         '<div class="cb">3月4日、3月5日、3月8日<br>6月4日、6月7日<br>'+
         '9月1日、9月5日<br>12月1日、12月2日、12月8日</div>'+
         '<p>小明说："我不知道生日是哪天，但我肯定小红也不知道。"<br>'+
         '小红说："我现在知道生日是哪天了。"<br>小明听完立刻说："我现在也知道了。"</p>'+
         '<p>问：<b>老师的真正生日是哪一天？</b></p>',
    ph:'如：9月1日',
    check:function(v){
      var s=v.trim().replace(/\s/g,'');
      return s==='9月1日'||s==='09月01日'||s==='9月01日';
    },
    err:'对话链推不通。',
    btn:'提交'
  },
  {
    tag:'Level 3 / 烧绳计量',
    html:'<p><b>你有足够多的绳子，每根不均匀的绳子单端点燃烧完刚好是 1 小时，绳子燃烧速度全段随机。</b></p>'+
         '<p>问：以下哪个时间长度是<b>无法精准计量</b>出来的？</p>'+
         '<div class="cb">A. 45 分钟<br>B. 20 分钟<br>C. 7.5 分钟<br>D. 1 小时 45 分钟</div>',
    ph:'A / B / C / D',
    check:function(v){ return v.trim().toUpperCase()==='B'; },
    err:'计量方案不成立。',
    btn:'出具审计意见'
  }
];

function renderPuzzle(level){
  var p = PUZZLES[level-1];
  if(!p) return;
  var stage = document.getElementById('stage');
  stage.innerHTML =
    '<div class="q">'+
      '<span class="lv-tag">'+p.tag+'</span>'+
      p.html+
      '<input type="text" id="ans" placeholder="'+p.ph+'">'+
      '<div class="err" id="err">'+p.err+'</div>'+
      '<button id="sub">'+p.btn+'</button>'+
    '</div>';

  document.getElementById('sub').onclick = function(){
    var v = document.getElementById('ans').value;
    if(p.check(v)){
      if(level < PUZZLES.length){
        renderPuzzle(level+1);
      }else{
        if(typeof showFinale === 'function'){
          showFinale();
        }else{
          window.onerror('showFinale 未定义 → finale.js 加载失败或有语法错误');
        }
      }
    }else{
      document.getElementById('err').style.display='block';
    }
  };
  document.getElementById('ans').onkeydown = function(e){
    if(e.key==='Enter') document.getElementById('sub').click();
  };
}
