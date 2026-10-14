const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
const key = 'NEXT_PUBLIC_PAGE_PUBLISH_DATE';
const now = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');

let content = '';
if (fs.existsSync(envPath)) {
  content = fs.readFileSync(envPath, 'utf8');
  if (new RegExp(`^${key}=`, 'm').test(content)) {
    content = content.replace(new RegExp(`^${key}=.*$`, 'm'), `${key}=${now}`);
  } else {
    content = `${content.replace(/\s*$/, '')}\n${key}=${now}\n`;
  }
}

fs.writeFileSync(envPath, content, 'utf8');
