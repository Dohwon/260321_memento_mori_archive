# 260321_memento_mori_archive

`Reflective Atelier`는 감정 기록, 철학적 해석, 회고형 읽기를 한 화면 안에서 운영하는 개인 아카이브 프로젝트다. 프로젝트 자체는 구현 완료 상태이고, 서비스는 계속 운영 중이다.

## Status
- `Completed Project`
- `Operating on Railway`
- Live: `https://memento-mori-archive-production.up.railway.app`

## What It Includes
- `Journal`: 날짜별 기록, 검색, 필터, 재열람 프롬프트, 댓글
- `Chat Archive`: 업로드 대화 전용 감정 아카이브
- `Overlay Library`: 철학자/인지 상태 오버레이 탐색
- `Hexagon Signal`: 상태 시각화
- `Philosophy MBTI`: 철학 성향 기반 질문 플로우

## Privacy And Security
- 공개 저장소에는 원문 대화 파일, 비공개 글 데이터, 댓글 데이터, 방문 카운터, MBTI 집계 같은 개인 런타임 데이터가 포함되지 않는다.
- `Chat Archive`는 정적 파일이 아니라 서버 검증 뒤에만 응답된다.
- 잠금 해제와 관리자 인증은 서버 측 검증으로 처리하고, 브라우저에는 `HttpOnly` 쿠키만 남긴다.
- 루트 `data/` 경로는 정적 서빙에서 차단한다.
- 민감한 비밀번호 원문과 세션 시크릿은 Railway 환경변수로만 관리한다.

## Repo Structure
- `index.html`, `styles.css`, `app.js`: 프론트엔드 UI
- `server.js`: 단일 Node.js 서버와 API
- `assets/`: 공개 정적 리소스
- `data/`: 로컬/배포 런타임 데이터 저장 위치
- `.railwayignore`: Railway 업로드 제외 목록

## Local Run
```bash
npm install
npm start
```

기본 실행 포트는 `4318`이다.

## Deployment Notes
- Railway로 운영한다.
- 공개 GitHub 저장소에는 코드와 공개 자산만 반영한다.
- 운영 데이터와 비밀번호성 값은 Git이 아니라 배포 환경에서 주입한다.

## Last Updated
- 2026-04-04
