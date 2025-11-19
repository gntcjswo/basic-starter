#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
	console.log("사용법: create-basic-starter 프로젝트명");
	process.exit(1);
}

const targetPath = path.join(process.cwd(), projectName);

// 프로젝트 폴더 생성
fs.ensureDirSync(targetPath);

// 템플릿 경로
const templatePath = path.join(__dirname, '../template');

// 템플릿을 프로젝트에 복사
fs.copySync(templatePath, targetPath, { overwrite: true });

console.log(`프로젝트 생성 완료: ${projectName}`);
console.log("cd", projectName);
