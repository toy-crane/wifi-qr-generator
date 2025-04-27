# WiFi QR Generator

Next.js로 구축된 WiFi QR 코드 생성기 프로젝트입니다.

## 프로젝트 소개

이 프로젝트는 WiFi 네트워크 정보를 QR 코드로 변환하여 쉽게 공유할 수 있게 해주는 웹 애플리케이션입니다.

## 시작하기

개발 서버를 실행하려면:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)를 열어 결과를 확인하세요.

## 프로젝트 구조

```
src/
├── app/          # Next.js 13+ App Router
│   ├── hello/    # Hello 페이지 (예시)
│   ├── test/     # 테스트 페이지 (예시)
│   └── wifi/     # WiFi QR 생성 페이지
├── components/   # 재사용 가능한 컴포넌트
│   └── ui/      # UI 컴포넌트 (shadcn/ui)
├── lib/         # 유틸리티 함수 및 공통 로직
└── spec/         # 테스트 관련 파일
```

## 기술 스택

- [Next.js](https://nextjs.org) - React 프레임워크
- TypeScript - 정적 타입 지원
- [Vercel](https://vercel.com) - 배포 플랫폼

## 배포

이 프로젝트는 [Vercel Platform](https://vercel.com/new)을 통해 쉽게 배포할 수 있습니다.

자세한 배포 방법은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참조하세요.
