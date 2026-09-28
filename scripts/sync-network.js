const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_EN_FILE = path.join(ROOT_DIR, 'index.html');
const INDEX_BG_FILE = path.join(ROOT_DIR, 'bg', 'index.html');

const fetchText = (url) => {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mobikom-Syndicate/1.0 (+https://mobikom.bg)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchText(res.headers.location));
      }
      if (res.statusCode !== 200) return resolve('');
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
};

const parseRssItems = (xmlText, limit = 10) => {
  if (!xmlText) return [];
  const items = [];
  const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (let i = 0; i < Math.min(itemMatches.length, limit); i++) {
    const raw = itemMatches[i];
    const titleMatch = raw.match(/<title[^>]*>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/i);
    const linkMatch = raw.match(/<link[^>]*>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/link>/i);

    let title = titleMatch ? (titleMatch[2] || '').trim() : '';
    let link = linkMatch ? (linkMatch[2] || '').trim() : '';

    title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');

    if (title && link) {
      items.push({ title, link });
    }
  }
  return items;
};

const parseVipJobs = (xmlText) => {
  if (!xmlText) return [];
  const items = [];
  const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || [];

  itemMatches.forEach((raw) => {
    const titleMatch = raw.match(/<title[^>]*>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/i);
    const linkMatch = raw.match(/<link[^>]*>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/link>/i);
    const descMatch = raw.match(/<description[^>]*>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/description>/i);

    let title = titleMatch ? (titleMatch[2] || '').trim() : '';
    let link = linkMatch ? (linkMatch[2] || '').trim() : '';
    let desc = descMatch ? (descMatch[2] || '').trim() : '';

    if (title && link) {
      items.push({ title, link, desc });
    }
  });
  return items;
};

const replaceSection = (filePath, startTag, endTag, newContent) => {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const startIndex = content.indexOf(startTag);
  const endIndex = content.indexOf(endTag);

  if (startIndex !== -1 && endIndex !== -1) {
    const updated = content.substring(0, startIndex + startTag.length) +
      '\n' + newContent + '\n          ' +
      content.substring(endIndex);
    fs.writeFileSync(filePath, updated, 'utf8');
  }
};

const runSync = async () => {
  const [dobrichXml, dobrujaXml, vipXml] = await Promise.all([
    fetchText('https://www.dobrichnews.com/feeds/posts/default?alt=rss'),
    fetchText('https://www.dobruja.com/feeds/posts/default?alt=rss'),
    fetchText('https://bestjobs.bg/vip-jobs.xml')
  ]);

  const dobrichItems = parseRssItems(dobrichXml, 10);
  const dobrujaItems = parseRssItems(dobrujaXml, 10);
  const vipItems = parseVipJobs(vipXml);

  const dobrichHtml = dobrichItems.map((item) => {
    return `              <li><a href="${item.link}" target="_blank" rel="noopener noreferrer" title="${item.title}">${item.title} &rarr;</a></li>`;
  }).join('\n');

  const dobrujaHtml = dobrujaItems.map((item) => {
    return `              <li><a href="${item.link}" target="_blank" rel="noopener noreferrer" title="${item.title}">${item.title} &rarr;</a></li>`;
  }).join('\n');

  const vipEnHtml = vipItems.map((item) => {
    return `          <article class="feature-card vip-feature-card">
            <div class="vip-badge-row">
              <span class="card-meta" style="color: var(--vip-gold);">VERIFIED VIP POSITION</span>
              <span class="vip-tag">🌟 VIP FAST-TRACK</span>
            </div>
            <div class="vip-sub-bar">📡 Syndicate: mobikom.bg &bull; dobrichnews.com &bull; dobruja.com</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a href="${item.link}" class="card-link" rel="noopener" target="_blank" title="View full specification on BestJobs.bg">View Verified Vacancy &rarr;</a>
          </article>`;
  }).join('\n\n');

  const vipBgHtml = vipItems.map((item) => {
    const bgLink = item.link.replace('/bestjobs/v/', '/bestjobs/bg/v/');
    return `          <article class="feature-card vip-feature-card">
            <div class="vip-badge-row">
              <span class="card-meta" style="color: var(--vip-gold);">ПРОВЕРЕНА VIP ПОЗИЦИЯ</span>
              <span class="vip-tag">🌟 VIP СКОРОСТНО НАЕМАНЕ</span>
            </div>
            <div class="vip-sub-bar">📡 Синдикация: mobikom.bg &bull; dobrichnews.com &bull; dobruja.com</div>
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <a href="${bgLink}" class="card-link" rel="noopener" target="_blank" title="Отворете пълната спецификация в BestJobs.bg">Виж проверената позиция &rarr;</a>
          </article>`;
  }).join('\n\n');

  replaceSection(INDEX_EN_FILE, '<!-- DOBRICHNEWS_START -->', '<!-- DOBRICHNEWS_END -->', dobrichHtml);
  replaceSection(INDEX_EN_FILE, '<!-- DOBRUJA_START -->', '<!-- DOBRUJA_END -->', dobrujaHtml);
  replaceSection(INDEX_EN_FILE, '<!-- VIP_JOBS_START -->', '<!-- VIP_JOBS_END -->', vipEnHtml);

  replaceSection(INDEX_BG_FILE, '<!-- DOBRICHNEWS_START -->', '<!-- DOBRICHNEWS_END -->', dobrichHtml);
  replaceSection(INDEX_BG_FILE, '<!-- DOBRUJA_START -->', '<!-- DOBRUJA_END -->', dobrujaHtml);
  replaceSection(INDEX_BG_FILE, '<!-- VIP_JOBS_START -->', '<!-- VIP_JOBS_END -->', vipBgHtml);
};

runSync();
