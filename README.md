# my-starter

> HTML·SCSS 퍼블리싱용 보일러플레이트를 한 번에 복사해 주는 `npx` 스캐폴드입니다.  
> English: A small **npx** scaffold that copies an HTML + Sass publishing starter into a new folder.

## 개요

이 저장소는 **CLI 패키지**와 **`template/` 폴더의 실제 작업물**로 구성됩니다.

| 구분 | 설명 |
|------|------|
| 루트 `package.json` | `fs-extra`로 `template/`을 지정한 폴더로 복사하는 생성기 |
| `bin/create.js` | 프로젝트 이름(폴더명)을 인자로 받아 동일 이름의 디렉터리를 만들고 템플릿을 복사 |
| `template/` | Sass 빌드, PostCSS(Autoprefixer·PurgeCSS), IE11 대응 `browserslist`, 가이드용 `index.html` 등 |

생성된 프로젝트는 **pnpm**을 기본 패키지 매니저로 두고 있으며(`packageManager` 필드), `sass`·`postcss-cli`·`concurrently` 등으로 로컬 개발과 빌드를 수행합니다.

## 사전 요구 사항

- **Node.js** (LTS 권장)
- **npm** 7+ (`npx` 포함) — 생성기 실행용
- 생성된 폴더에서는 **pnpm** 사용을 권장합니다(`template/package.json` 기준).

## 설치 방법 (권장)

GitHub에 이 저장소를 올린 뒤, 원하는 프로젝트 폴더 이름을 마지막 인자로 넘깁니다.

```bash
npx github:woosung/my-starter my-project
```

실행이 끝나면 현재 작업 디렉터리 아래에 `my-project` 폴더가 생기고, 그 안에 `template/` 내용이 그대로 복사됩니다.

### 한 번에 안 될 때

npm·npx 버전에 따라 GitHub 패키지의 **바이너리 이름**을 명시해야 할 수 있습니다.

```bash
npx github:woosung/my-starter create-my-starter my-project
```

여기서 `create-my-starter`는 루트 `package.json`의 `bin` 필드에 정의된 명령 이름입니다.

## 생성 직후 할 일

```bash
cd my-project
pnpm install
pnpm dev
```

| 스크립트 | 설명 |
|----------|------|
| `pnpm dev` | Sass watch + PostCSS(Autoprefixer 등) watch를 동시 실행 |
| `pnpm build` | Sass 빌드 후 `ui-style.css`에 대해 PostCSS 일괄 처리 |
| `pnpm sass` / `pnpm build:sass` | SCSS만 컴파일 |
| `pnpm prefix` / `pnpm build:prefix` | `dist/assets/css/ui-style.css`에 PostCSS 적용 |

정적 파일은 `template/index.html` 및 `dist/` 쪽 구조를 참고하면 됩니다.

## 저장소 구조

```
.
├── bin/
│   └── create.js      # 프로젝트 생성 CLI
├── template/          # 복사되는 퍼블리싱 템플릿
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── src/scss/      # 스타일 진입점: ui-style.scss → styles
└── package.json       # create-* 패키지 메타데이터
```

## 커스터마이징 참고

- **PurgeCSS**는 `template/postcss.config.js`에서 `content` 경로를 참조합니다. 실제 마크업 위치에 맞게 경로를 수정하는 것이 좋습니다.
- **IE11** 등 구형 브라우저는 `browserslist`와 PostCSS의 `overrideBrowserslist` 설정을 함께 맞춥니다.

## 오픈 소스·포트폴리오

- 저장소 URL 예시: `https://github.com/woosung/my-starter`
- 포트폴리오에는 위 링크와 함께 **“`npx github:woosung/my-starter <프로젝트명>`으로 퍼블리싱 스타터를 배포”** 같은 한 줄 설명을 넣으면 의도가 잘 전달됩니다.
- 공개 시 **LICENSE** 파일과 `package.json`의 `license`·`repository` 필드를 채워 두면 신뢰도가 올라갑니다.

## 라이선스

이 저장소 루트에 라이선스 파일이 없다면, 배포 전에 사용할 라이선스(MIT 등)를 추가하세요. 생성되는 `template/package.json`의 `license` 값은 기본으로 `ISC`입니다.
