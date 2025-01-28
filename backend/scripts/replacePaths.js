const fs = require('fs');
const path = require('path');

// dist 디렉토리 내 모든 js 파일을 순회
const walkDir = (dir) => {
  const files = fs.readdirSync(dir);
  let jsFiles = [];

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      jsFiles = jsFiles.concat(walkDir(fullPath));
    } else if (file.endsWith('.js')) {
      jsFiles.push(fullPath);
    }
  });

  return jsFiles;
};

// 경로 수정 함수
const replacePathsInFile = (filePath) => {
  let fileContent = fs.readFileSync(filePath, 'utf8');
  const fileDir = path.dirname(filePath); // 현재 파일의 디렉토리 (dist 기준)

  // import 또는 require 경로를 dist 기준으로 변경
  const newContent = fileContent.replace(/(['"])@\/(.*?)\1/g, (match, quote, aliasPath) => {
    const distPath = path.join(__dirname, '../dist', aliasPath); // dist 디렉토리의 절대 경로
    const relativePath = path.relative(fileDir, distPath); // dist 기준 상대 경로 계산
    const normalizedPath = relativePath.replace(/\\/g, '/'); // Windows 경로 호환성 처리
    return `${quote}${normalizedPath}${quote}`;
  });

  if (fileContent !== newContent) {
    // 수정된 내용 파일에 덮어쓰기
    fs.writeFileSync(filePath, newContent, 'utf8');
  }
};

// dist 폴더의 경로 설정
const distPath = path.join(__dirname, '../dist'); // 절대 경로로 설정

if (!fs.existsSync(distPath)) {
  console.error('dist 디렉토리가 존재하지 않습니다. 경로를 확인하세요.');
  process.exit(1);
}

const jsFiles = walkDir(distPath);

if (jsFiles.length === 0) {
  console.warn('수정할 .js 파일이 없습니다.');
  process.exit(0);
}

// 경로 수정 실행
jsFiles.forEach(replacePathsInFile);

console.log('모든 경로 수정 완료!');
