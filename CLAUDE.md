# 쿠팡파트너스 제휴 마케팅 사이트 - 시스템 규칙

## 에이전트 라우팅
- PM: 아키텍처, 폴더 구조, 규칙 설정, 버그 분석
- FE: UI/UX, 컴포넌트, Tailwind, 프론트엔드 에러
- 콘텐츠: MDX 작성, SEO, 키워드, 대본→포스팅 변환

## 기술 스택
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- 콘텐츠: MDX (content/ 디렉토리)
- 배포: Vercel

## 데이터 분리 원칙 (절대 준수)
- `src/` = FE 팀 전용 (코드)
- `content/` = 콘텐츠 팀 전용 (MDX)
- 콘텐츠 팀은 .tsx/.ts 파일을 절대 수정하지 않음
- FE 팀은 content/ 내 MDX를 직접 수정하지 않음

## 콘텐츠 카테고리
- cleaning: 청소/정리 노하우
- cooking: 요리/레시피

## MDX 프론트매터 스키마
```yaml
title: string (필수)
description: string (필수, SEO 메타)
date: YYYY-MM-DD (필수)
category: "cleaning" | "cooking" (필수)
tags: string[] (선택)
thumbnail: string (선택, /images/ 경로)
```

## 쿠팡 파트너스 규칙
- 쿠팡 링크 자리: `[여기에 쿠팡 링크 삽입]`
- 모든 포스팅 하단에 공정위 문구 자동 포함
- 공정위 문구: "이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."

## 토큰 최적화 규칙
- 전체 파일 재출력 금지 → 변경 부분만 스니펫 제공
- 인사말/부연설명 금지 → 결과물만 출력
- 콘텐츠 추가 시 MDX 파일만 생성 (코드 변경 불필요)
