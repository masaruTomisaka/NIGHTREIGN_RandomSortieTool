// ===== キャラ定義（key/ファイル名は英名、表示は和名） =====
  const CHARACTERS = [
    { key:"wylder",     name:"追跡者", img:"https://img.gamewith.jp/img/68fa049a304ba02481ebc5833da6f5f0.png",     dlc:false },
    { key:"guardian",   name:"守護者", img:"https://img.gamewith.jp/img/ff9a88020ff4c03b949be9b3a45f2962.png",   dlc:false },
    { key:"ironeye",    name:"鉄の目", img:"https://img.gamewith.jp/img/d25e1bc48b824ce4481c874556a11030.png",    dlc:false },
    { key:"duchess",    name:"レディ", img:"https://img.gamewith.jp/img/eb358b8c34d2df0e3b257df18520ab6a.png",    dlc:false },
    { key:"raider",     name:"無頼漢", img:"https://img.gamewith.jp/img/4c0db0c00e5de40220c9dd9794ef78d0.png",     dlc:false },
    { key:"revenant",   name:"復讐者", img:"https://img.gamewith.jp/img/111f105fad7797802953a09e3aaae886.png",   dlc:false },
    { key:"recluse",    name:"隠者",   img:"https://img.gamewith.jp/img/2bdb68d9b79ae75d0a175ee028167122.png",    dlc:false },
    { key:"executor",   name:"執行者", img:"https://img.gamewith.jp/img/b1e7abaf1e4dea1d9326aae3cd196ae0.png",   dlc:false },
    // DLC
    { key:"scholar",    name:"学者",   img:"https://img.gamewith.jp/img/a5663f5ca25970cbae7ecd66a7cd45c7.png",    dlc:true  },
    { key:"undertaker", name:"葬儀屋", img:"https://img.gamewith.jp/img/8e5a1b7c84e8fa23424d4accbb6fe263.png", dlc:true  }
  ];

  // ===== ボス/ステージ定義 =====
  const STAGES = [
    // 通常（本編）
    { key:"gradius",  name:"三つ首の獣",    type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/5be58aa5bb22342c03ca1ab20171de64.png" },
    { key:"adel",     name:"喰らいつく顎",  type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/fe592489b2c001299bc31fa060fb2e9f.png" },
    { key:"gnoster",  name:"知性の蟲",      type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/f142d8630b6eb6587b69de6f4530c603.png" },
    { key:"maris",    name:"兆し",          type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/b3f0232284df2d549777e3f32af5927f.png" },
    { key:"libra",    name:"調律の魔物",    type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/64cd7fbafccf7116d1004f2cd7da9023.png" },
    { key:"fulghor",  name:"闇駆ける狩人",  type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/4fdfba64d501eeea9d4d053d37091828.jpg" },
    { key:"caligo",   name:"霧の裂け目",    type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/769309700c3f36cfcad4f304632aa219.png" },
    { key:"nameless", name:"夜を象る者",    type:"通常",   dlc:false, img:"https://img.gamewith.jp/img/8b4d1ec87e3760bc97931c5446d70868.png" },

    // 通常（DLC）
    { key:"harmonia", name:"安寧者たち", type:"通常", dlc:true, img:"https://img.gamewith.jp/img/a5ff91b5bce189ea26552e571b176723.png" },
    { key:"straghess", name:"瓦礫の王",   type:"通常", dlc:true, img:"https://img.gamewith.jp/img/6660b03a33990ae9ff2437f63e3289cc.png" },

    // 常夜（日替わり枠：①〜③）
    { key:"everdark1", name:"常夜①", type:"常夜", dlc:false, img:"https://media.fromsoftware.jp/nightreign/resources/images/gallery/pc/screenshot/003@0.75x.jpg" },
    { key:"everdark2", name:"常夜②", type:"常夜", dlc:false, img:"https://media.fromsoftware.jp/nightreign/resources/images/gallery/pc/screenshot/003@0.75x.jpg" },
    { key:"everdark3", name:"常夜③", type:"常夜", dlc:false, img:"https://media.fromsoftware.jp/nightreign/resources/images/gallery/pc/screenshot/003@0.75x.jpg" },

    // 深き夜（モード枠）
    { key:"deepnight", name:"深き夜", type:"深き夜", dlc:false, img:"https://media.fromsoftware.jp/nightreign/resources/images/article/250828_1/pc/02@0.75x.jpg" }
  ];

  // ===== Elements =====
  const playerCountRadios = [
    document.getElementById("playerCount1"),
    document.getElementById("playerCount2"),
    document.getElementById("playerCount3")
  ];
  const allowDupEl = document.getElementById("allowDup");
  const startBtn = document.getElementById("startBtn");
  const clearBtn = document.getElementById("clearBtn");
  const historyEl = document.getElementById("history");
  const warnBox = document.getElementById("warnBox");

  const fNormal = document.getElementById("fNormal");
  const fEverdark = document.getElementById("fEverdark");
  const fDeep = document.getElementById("fDeep");
  const fDLC = document.getElementById("fDLC");

  // ===== Utils =====
  const randInt = (n) => Math.floor(Math.random() * n);

  /// ===== HTMLエスケープ =====
  function escapeHtml(str){
    return String(str).replace(/[&<>"']/g, s => ({
      "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
    }[s]));
  }

  /// ===== 警告表示 =====
  function showWarn(msg){
    warnBox.style.display = "block";
    warnBox.textContent = msg;
  }

  /// ===== 警告非表示 =====
  function hideWarn(){
    warnBox.style.display = "none";
    warnBox.textContent = "";
  }

  /// ===== ステージクラス取得 =====
  function stageClass(type){
    if (type === "通常") return "stage-normal";
    if (type === "常夜") return "stage-everdark";
    return "stage-deep";
  }

  /// ===== 有効ステージタイプ取得 =====
  function enabledStageTypes(){
    const t = [];
    if (fNormal.checked) t.push("通常");
    if (fEverdark.checked) t.push("常夜");
    if (fDeep.checked) t.push("深き夜");
    return t;
  }

  /// ===== DLC許可判定 =====
  function allowDLCAll(){
    return !!fDLC.checked;
  }

  /// ===== キャラプール取得 =====
  function characterPool(){
    const allow = allowDLCAll();
    return CHARACTERS.filter(c => allow || !c.dlc);
  }

  /// ===== ステージプール取得 =====
  function stagePool(){
    const enabled = enabledStageTypes();
    const allow = allowDLCAll();
    return STAGES.filter(s => enabled.includes(s.type) && (allow || !s.dlc));
  }

  /// ===== ステージ抽選 =====
  function pickStageFiltered(){
    const pool = stagePool();
    if (pool.length === 0) throw new Error("抽選対象のボス/ステージがありません。type選択 or DLCトグルをご確認ください。");
    return pool[randInt(pool.length)];
  }

  /// ===== キャラ抽選 =====
  function pickCharacters(nPlayers, allowDup=true){
    const poolBase = characterPool();
    if (poolBase.length === 0) throw new Error("抽選対象のキャラがありません。DLCトグルをご確認ください。");
    if (!allowDup && nPlayers > poolBase.length) throw new Error("重複不可の場合、出撃キャラ数が抽選対象キャラ数を超えています。");

    const picks = [];
    if (allowDup){
      for (let i=0;i<nPlayers;i++) picks.push(poolBase[randInt(poolBase.length)]);
    } else {
      const pool = structuredClone(poolBase);
      for (let i=0;i<nPlayers;i++) picks.push(pool.splice(randInt(pool.length), 1)[0]);
    }
    return picks;
  }

  /// ===== キャラフレームクラス取得 =====
  function charFrameClass(idx){
    if (idx === 1) return "char1";
    if (idx === 2) return "char2";
    if (idx === 3) return "char3";
    return "";
  }

  /// ===== カード作成共通部 =====
  function buildCard({title, pill, imgSrc, imgAlt, fallbackHtml, extraClass=""}){
    const card = document.createElement("div");
    card.className = `card ${extraClass}`.trim();

    const head = document.createElement("div");
    head.className = "cardHead";
    head.innerHTML = `<span class=\"name\">${title}</span>`;

    const imgWrap = document.createElement("div");
    imgWrap.className = "imgWrap";

    const img = document.createElement("img");
    img.alt = imgAlt;
    img.src = imgSrc;
    img.loading = "lazy";
    img.referrerPolicy = "no-referrer";

    img.onerror = () => {
      imgWrap.innerHTML = `<div style="padding:0 14px; color:var(--muted); font-size:12px; line-height:1.5;">` +
        `画像が見つかりませんでした。<br/><b>${escapeHtml(imgSrc)}</b>` +
        `</div>`;
    };

    imgWrap.appendChild(img);

    const fb = document.createElement("div");
    fb.className = "fallback";
    fb.innerHTML = fallbackHtml;

    card.appendChild(head);
    card.appendChild(imgWrap);
    card.appendChild(fb);
    return card;
  }

  /// ===== ボスカード作成 =====
  function createBossCard(stageObj){
    return buildCard({
      title: `${escapeHtml(stageObj.name)}`,
      pill: "",
      imgSrc: stageObj.img,
      imgAlt: stageObj.name,
      fallbackHtml: "",
      extraClass: `bossCard ${stageClass(stageObj.type)}`
    });
  }

  /// ===== キャラカード作成 =====
  function createCharCard(c, idx){
    return buildCard({
      title: `${escapeHtml(c.name)}`,
      pill: "",
      imgSrc: c.img,
      imgAlt: c.name,
      fallbackHtml: "",
      extraClass: charFrameClass(idx)
    });
  }

  /// ===== 結果ブロック作成 =====
  function createResultBlock(picks, stageObj, rollIndex){
    const block = document.createElement("div");
    block.className = "block";

    const head = document.createElement("div");
    head.className = "blockHead";

    const left = document.createElement("div");
    left.innerHTML = `<b>抽選 #${rollIndex}</b> <span style=\"color:var(--muted); font-size:12px;\">（${picks.length}人）</span>`;

    head.appendChild(left);
    block.appendChild(head);

    const row = document.createElement("div");
    row.className = "resultRow";
    row.appendChild(createBossCard(stageObj));
    picks.forEach((c, i) => row.appendChild(createCharCard(c, i+1)));
    block.appendChild(row);

    return block;
  }

  /// ===== スタートボタン状態更新 =====
  function updateStartBtnState(){
    try {
      const nPlayers = Number(playerCountRadios.find(r => r.checked)?.value || 3);

      if (enabledStageTypes().length === 0) {
        startBtn.disabled = true;
        showWarn("ステージtypeが未選択です。少なくとも1つ選択してください。");
        return;
      }
      if (stagePool().length === 0) {
        startBtn.disabled = true;
        showWarn("抽選対象のボス/ステージがありません。type選択 or DLCトグルをご確認ください。");
        return;
      }
      if (characterPool().length === 0) {
        startBtn.disabled = true;
        showWarn("抽選対象のキャラがありません。DLCトグルをご確認ください。");
        return;
      }
      if (!allowDupEl.checked && nPlayers > characterPool().length) {
        startBtn.disabled = true;
        showWarn("重複不可の場合、出撃キャラ数が抽選対象キャラ数を超えています。");
        return;
      }

      startBtn.disabled = false;
      hideWarn();
    } catch (e) {
      startBtn.disabled = true;
      showWarn(e.message);
    }
  }

  /// ===== メイン処理 =====
  function doStart(){
    try {
      updateStartBtnState();
      if (startBtn.disabled) return;

      const nPlayers = Number(playerCountRadios.find(r => r.checked)?.value || 3);
      const allowDup = !!allowDupEl.checked;

      // 履歴数を取得
      let startIndex = historyEl.children.length;
      const stageObj = pickStageFiltered();
      const picks = pickCharacters(nPlayers, allowDup);
      const resultBlock = createResultBlock(picks, stageObj, startIndex + 1);
      historyEl.insertBefore(resultBlock, historyEl.firstChild);

    } catch (e) {
      showWarn(e.message);
    }
  }

  /// ===== イベント登録 =====
  function clearAll(){
    historyEl.innerHTML = "";
    hideWarn();
  }

  startBtn.addEventListener("click", doStart);
  clearBtn.addEventListener("click", clearAll);

  [...playerCountRadios, allowDupEl, fNormal, fEverdark, fDeep, fDLC]
    .forEach(el => el.addEventListener("change", updateStartBtnState));

  updateStartBtnState();