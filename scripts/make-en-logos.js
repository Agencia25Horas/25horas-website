// Gera as variantes EN dos logos (correr: node scripts/make-en-logos.js):
//  - b25restaurantes-en.png  RESTAURANTES -> RESTAURANTS (splice: tira o "E", re-centra)
//  - b25eventos-en.png       EVENTOS      -> EVENTS      (splice: tira o "O", re-centra)
//  - 25saude-en.png          SAÚDE        -> HEALTH      (E+A reais; H/L/T desenhados
//                                                         com a métrica medida no logo)
// As coordenadas das letras foram medidas por scan do canal alpha dos PNGs
// originais — se os logos base mudarem, é preciso remedir.
const sharp = require("sharp");
const path = require("path");

const ROOT = path.join(__dirname, "..", "public", "media", "logos");
const OUT = ROOT; // escreve directamente em public/media/logos

const ALPHA_MIN = 40;

async function loadRaw(file) {
  const { data, info } = await sharp(path.join(ROOT, file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, W: info.width, H: info.height, C: info.channels };
}
const alphaAt = (img, x, y) => img.data[(y * img.W + x) * img.C + 3];

// bbox vertical de conteúdo numa janela [x0..x1] x [y0..y1]
function vBounds(img, x0, x1, y0, y1) {
  let top = null, bot = null;
  for (let y = y0; y <= y1; y++) {
    let has = false;
    for (let x = x0; x <= x1; x++) if (alphaAt(img, x, y) > ALPHA_MIN) { has = true; break; }
    if (has) { if (top === null) top = y; bot = y; }
  }
  return [top, bot];
}
// bbox horizontal
function hBounds(img, x0, x1, y0, y1) {
  let l = null, r = null;
  for (let x = x0; x <= x1; x++) {
    let has = false;
    for (let y = y0; y <= y1; y++) if (alphaAt(img, x, y) > ALPHA_MIN) { has = true; break; }
    if (has) { if (l === null) l = x; r = x; }
  }
  return [l, r];
}

// ── splice genérico: remove uma letra da band e re-centra a palavra ──
async function splice({ file, out, bandY, letters, removeIdx, center }) {
  const img = await loadRaw(file);
  const [by0, by1] = bandY;
  const bandH = by1 - by0 + 1;

  // gaps originais entre letras consecutivas
  const gaps = [];
  for (let i = 1; i < letters.length; i++) gaps.push(letters[i][0] - letters[i - 1][1] - 1);
  const avgGap = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);

  // sequência final de índices (sem a letra removida)
  const keep = letters.map((_, i) => i).filter((i) => i !== removeIdx);

  // larguras + gaps da nova palavra (usa o gap original ANTES de cada letra
  // mantida; para a letra que passou a seguir-se ao buraco, usa avgGap)
  const widths = keep.map((i) => letters[i][1] - letters[i][0] + 1);
  const newGaps = [];
  for (let k = 1; k < keep.length; k++) {
    const i = keep[k];
    newGaps.push(keep[k - 1] === i - 1 ? letters[i][0] - letters[i - 1][1] - 1 : avgGap);
  }
  const totalW = widths.reduce((a, b) => a + b, 0) + newGaps.reduce((a, b) => a + b, 0);
  let cursor = Math.round(center - totalW / 2);

  // recorta cada letra mantida (banda completa em altura, para preservar baseline)
  const base = sharp(path.join(ROOT, file));
  const comps = [];
  for (let k = 0; k < keep.length; k++) {
    const i = keep[k];
    const [lx0, lx1] = letters[i];
    const buf = await sharp(path.join(ROOT, file))
      .extract({ left: lx0, top: by0, width: lx1 - lx0 + 1, height: bandH })
      .png()
      .toBuffer();
    comps.push({ input: buf, left: cursor, top: by0 });
    cursor += widths[k] + (k < newGaps.length ? newGaps[k] : 0);
  }

  // apaga a band original (retângulo transparente) e compõe as letras novas
  const eraser = {
    input: {
      create: {
        width: img.W,
        height: bandH + 8,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    },
    left: 0,
    top: by0 - 4,
    blend: "dest-out",
  };
  await base
    .ensureAlpha()
    .composite([eraser, ...comps])
    .png()
    .toFile(path.join(OUT, out));
  console.log(`${out}: palavra nova centrada em ${center}, largura ${totalW}`);
}

// ── HEALTH para o 25saude.png ──
async function makeHealth() {
  const file = "25saude.png";
  const img = await loadRaw(file);
  // band medida: y 438..525; letras S[609,655] A[704,766] Ú[819,869] D[929,982] E[1039,1078]
  const bandY0 = 438, bandY1 = 525;
  const E = [1039, 1078], A = [704, 766], D = [929, 982];

  // métricas a partir do E: cap height, baseline, espessuras
  const [eTop, eBot] = vBounds(img, E[0], E[1], bandY0, bandY1);
  const capH = eBot - eTop + 1;
  // espessura vertical (stem do E): varre uma linha ENTRE o braço de topo e o
  // do meio (a meia altura apanharia o braço do meio e mediria o braço inteiro)
  const scanY = eTop + Math.round(capH * 0.3);
  let stemW = 0;
  for (let x = E[0]; x <= E[1]; x++) {
    if (alphaAt(img, x, scanY) > ALPHA_MIN) stemW++;
    else if (stemW > 0) break;
  }
  // espessura horizontal (arm de topo do E): varre a coluna do meio do E
  const midX = Math.round((E[0] + E[1]) / 2);
  let armH = 0;
  for (let y = eTop; y <= eBot; y++) {
    if (alphaAt(img, midX, y) > ALPHA_MIN) armH++;
    else if (armH > 0) break;
  }
  console.log(`SAÚDE: capH=${capH} baseline=${eBot} stemW=${stemW} armH=${armH}`);

  const eW = E[1] - E[0] + 1;
  const aW = A[1] - A[0] + 1;
  const dW = D[1] - D[0] + 1;
  const hW = dW + 2;              // H ligeiramente mais largo que o D
  const lW = eW + 2;              // L ~ largura do E
  const tW = Math.round(aW * 0.82); // T um pouco mais estreito que o A

  // glyphs desenhados (SVG, sem font): H, L, T
  const svgGlyph = (w, rects) =>
    Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${capH}">` +
      rects.map((r) => `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="#fff"/>`).join("") +
      `</svg>`,
    );
  const Hglyph = svgGlyph(hW, [
    [0, 0, stemW, capH],
    [hW - stemW, 0, stemW, capH],
    [0, Math.round((capH - armH) / 2), hW, armH],
  ]);
  const Lglyph = svgGlyph(lW, [
    [0, 0, stemW, capH],
    [0, capH - armH, lW, armH],
  ]);
  const Tglyph = svgGlyph(tW, [
    [0, 0, tW, armH],
    [Math.round((tW - stemW) / 2), 0, stemW, capH],
  ]);

  // E e A reais, recortados à cap height (sem acento)
  const Ebuf = await sharp(path.join(ROOT, file))
    .extract({ left: E[0], top: eTop, width: eW, height: capH })
    .png().toBuffer();
  const [aTop] = vBounds(img, A[0], A[1], bandY0, bandY1);
  const Abuf = await sharp(path.join(ROOT, file))
    .extract({ left: A[0], top: aTop, width: aW, height: eBot - aTop + 1 })
    .png().toBuffer();

  // centra a palavra nova no MESMO eixo da palavra original (decisão do
  // designer): centro de S..E = (609+1078)/2
  const center = 844;

  // ordem: H E A L T H — gap uniforme (média dos gaps originais ≈ 55)
  const GAP = 54;
  const seq = [
    { w: hW, buf: Hglyph, top: eTop },
    { w: eW, buf: Ebuf, top: eTop },
    { w: aW, buf: Abuf, top: aTop },
    { w: lW, buf: Lglyph, top: eTop },
    { w: tW, buf: Tglyph, top: eTop },
    { w: hW, buf: Hglyph, top: eTop },
  ];
  const totalW = seq.reduce((a, s) => a + s.w, 0) + GAP * (seq.length - 1);
  let cursor = Math.round(center - totalW / 2);
  const comps = seq.map((s) => {
    const c = { input: s.buf, left: cursor, top: s.top };
    cursor += s.w + GAP;
    return c;
  });

  const eraser = {
    input: {
      create: { width: img.W, height: bandY1 - bandY0 + 1 + 10, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 1 } },
    },
    left: 0,
    top: bandY0 - 5,
    blend: "dest-out",
  };
  await sharp(path.join(ROOT, file))
    .ensureAlpha()
    .composite([eraser, ...comps])
    .png()
    .toFile(path.join(OUT, "25saude-en.png"));
  console.log(`25saude-en.png: HEALTH centrado em ${center}, largura ${totalW}`);
}

(async () => {
  await splice({
    file: "b25restaurantes.png",
    out: "b25restaurantes-en.png",
    bandY: [644, 701],
    letters: [
      [344, 391], [415, 454], [478, 522], [542, 586], [602, 663], [686, 736],
      [763, 810], [829, 891], [917, 969], [991, 1035], [1059, 1097], [1121, 1164],
    ],
    removeIdx: 10, // o "E" de ...NT(E)S
    center: 754,   // centro da palavra original (344+1164)/2
  });
  await splice({
    file: "b25eventos.png",
    out: "b25eventos-en.png",
    bandY: [562, 613],
    letters: [
      [406, 441], [466, 516], [543, 577], [607, 651], [678, 719], [743, 796], [823, 861],
    ],
    removeIdx: 5, // o "O" de EVENT(O)S
    center: 634,  // (406+861)/2
  });
  await makeHealth();
})().catch((e) => { console.error(e); process.exit(1); });
